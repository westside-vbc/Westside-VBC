import { NextRequest, NextResponse } from "next/server"

const ADMIN_EMAILS = ["filemonjose13@gmail.com", "jason4realyt@gmail.com"]

const GITHUB_API = "https://api.github.com"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface FileChange {
  path: string
  content: string
  message: string
}

async function getRepoFileTree(owner: string, repo: string, token: string, branch: string): Promise<string[]> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
  if (!res.ok) throw new Error(`Failed to fetch repo tree: ${res.statusText}`)
  const data = await res.json()
  return data.tree
    .filter((item: { type: string; path: string }) => 
      item.type === "blob" && 
      (item.path.endsWith(".tsx") || item.path.endsWith(".ts") || item.path.endsWith(".css") || item.path.endsWith(".json")) &&
      !item.path.includes("node_modules") &&
      !item.path.includes(".next")
    )
    .map((item: { path: string }) => item.path)
}

async function getFileContent(owner: string, repo: string, path: string, token: string, branch: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
  if (!res.ok) throw new Error(`Failed to fetch file ${path}: ${res.statusText}`)
  const data = await res.json()
  const content = Buffer.from(data.content, "base64").toString("utf-8")
  return { content, sha: data.sha }
}

async function updateFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  token: string,
  branch: string,
  sha?: string
): Promise<void> {
  // Get current SHA if not provided
  if (!sha) {
    try {
      const existing = await getFileContent(owner, repo, path, token, branch)
      sha = existing.sha
    } catch {
      // File doesn't exist yet, sha stays undefined for creation
    }
  }

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Failed to update file ${path}: ${res.statusText} - ${error}`)
  }
}

async function callGemini(
  apiKey: string,
  systemPrompt: string,
  conversationHistory: ChatMessage[],
  userMessage: string
): Promise<string> {
  const contents = [
    ...conversationHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ]

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 8192,
        },
      }),
    }
  )

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Gemini API error: ${res.statusText} - ${error}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."
}

function parseFileChanges(response: string): FileChange[] {
  const changes: FileChange[] = []
  // Match pattern: FILE_CHANGE:path/to/file followed by code block
  const regex = /FILE_CHANGE:(.*?)\n```[\w]*\n([\s\S]*?)```/g
  let match

  while ((match = regex.exec(response)) !== null) {
    const path = match[1].trim()
    const content = match[2].trim()
    changes.push({
      path,
      content,
      message: `AI update: Modified ${path}`,
    })
  }

  return changes
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [], userEmail } = await request.json()

    // Admin check
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json(
        { error: "Unauthorized. Only admins can use the AI assistant." },
        { status: 403 }
      )
    }

    const geminiKey = process.env.GEMINI_API_KEY
    const githubToken = process.env.GITHUB_TOKEN
    const githubOwner = process.env.GITHUB_OWNER || "josehagen"
    const githubRepo = process.env.GITHUB_REPO || "Westside-VBC"
    const githubBranch = process.env.GITHUB_BRANCH || "main"

    if (!geminiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 })
    }
    if (!githubToken) {
      return NextResponse.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 })
    }

    // Get the repo file tree for context
    const fileTree = await getRepoFileTree(githubOwner, githubRepo, githubToken, githubBranch)

    // Determine which files the AI needs to read
    const systemPrompt = `You are an AI code assistant for the Westside VBC website, a Next.js application.

Your job is to help admin users modify the website's code through natural language instructions.

Here is the project file structure:
${fileTree.map(f => `- ${f}`).join("\n")}

When the user asks you to make changes:
1. First, think about which files need to be modified
2. If you need to see a file's content, respond with: READ_FILE:path/to/file (one per line)
3. When you have enough context, provide the complete modified file contents using this exact format for EACH file you want to change:

FILE_CHANGE:path/to/file
\`\`\`tsx
// entire file content here
\`\`\`

IMPORTANT RULES:
- Always provide the COMPLETE file content, not just the changed parts
- The file path should be relative to the repo root (e.g., westside-vbc/app/page.tsx)
- You can modify multiple files in one response
- Explain what you changed and why
- If the user's request is unclear, ask for clarification
- Do NOT modify .env files, package.json, or config files unless specifically asked
- Preserve all existing functionality unless asked to remove it
- Keep the existing code style (TypeScript, Tailwind CSS, etc.)
- When you only need to chat/explain without code changes, just respond normally without FILE_CHANGE blocks`

    // First, call Gemini to understand the request
    let aiResponse = await callGemini(geminiKey, systemPrompt, conversationHistory, message)

    // Check if AI wants to read files
    const readFileRegex = /READ_FILE:(.*)/g
    let readMatch
    const filesToRead: string[] = []
    while ((readMatch = readFileRegex.exec(aiResponse)) !== null) {
      filesToRead.push(readMatch[1].trim())
    }

    // If AI needs to read files, fetch them and re-ask
    if (filesToRead.length > 0) {
      const fileContents: string[] = []
      for (const filePath of filesToRead) {
        try {
          const { content } = await getFileContent(githubOwner, githubRepo, filePath, githubToken, githubBranch)
          fileContents.push(`--- ${filePath} ---\n${content}\n--- end ---`)
        } catch (err) {
          fileContents.push(`--- ${filePath} --- (File not found or error reading: ${err}) ---`)
        }
      }

      const contextMessage = `Here are the file contents you requested:\n\n${fileContents.join("\n\n")}\n\nNow please provide the changes based on the user's original request: "${message}"`
      
      // Call Gemini again with file context
      const updatedHistory: ChatMessage[] = [
        ...conversationHistory,
        { role: "user", content: message },
        { role: "assistant", content: aiResponse },
      ]
      aiResponse = await callGemini(geminiKey, systemPrompt, updatedHistory, contextMessage)
    }

    // Parse any file changes from the response
    const fileChanges = parseFileChanges(aiResponse)

    // Apply changes to GitHub if any
    const appliedChanges: string[] = []
    const errors: string[] = []

    for (const change of fileChanges) {
      try {
        await updateFile(
          githubOwner,
          githubRepo,
          change.path,
          change.content,
          change.message,
          githubToken,
          githubBranch
        )
        appliedChanges.push(change.path)
      } catch (err) {
        errors.push(`Failed to update ${change.path}: ${err}`)
      }
    }

    // Clean up the response (remove FILE_CHANGE blocks for the chat display)
    let cleanResponse = aiResponse
      .replace(/FILE_CHANGE:.*?\n```[\w]*\n[\s\S]*?```/g, "")
      .replace(/READ_FILE:.*/g, "")
      .trim()

    // Add status info
    if (appliedChanges.length > 0) {
      cleanResponse += `\n\n✅ **Changes pushed to GitHub (${githubBranch} branch):**\n${appliedChanges.map(f => `- \`${f}\``).join("\n")}`
    }
    if (errors.length > 0) {
      cleanResponse += `\n\n❌ **Errors:**\n${errors.map(e => `- ${e}`).join("\n")}`
    }

    return NextResponse.json({
      response: cleanResponse,
      filesChanged: appliedChanges,
      errors,
    })
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 }
    )
  }
}
