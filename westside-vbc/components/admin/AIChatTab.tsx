"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, GitBranch, AlertCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  filesChanged?: string[]
  errors?: string[]
  timestamp: Date
}

interface AIChatTabProps {
  userEmail: string
}

export default function AIChatTab({ userEmail }: AIChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm your AI code assistant for Westside VBC. I can help you modify the website's code directly.\n\nTry things like:\n• \"Change the hero title on the homepage\"\n• \"Add a new section to the about page\"\n• \"Update the navigation links\"\n• \"Change the color scheme\"\n\nWhat would you like to change?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setError(null)

    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      // Build conversation history (exclude the welcome message and current message)
      const conversationHistory = messages
        .slice(1)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
          userEmail,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to get AI response")
      }

      const aiMessage: Message = {
        role: "assistant",
        content: data.response,
        filesChanged: data.filesChanged,
        errors: data.errors,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      const errorMessage: Message = {
        role: "assistant",
        content: `❌ Error: ${err instanceof Error ? err.message : "Something went wrong. Please try again."}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content.split("\n").map((line, i) => {
      // Bold text
      const formattedLine = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      )
      // Inline code
      const withCode = formattedLine.replace(
        /`(.*?)`/g,
        '<code class="bg-black/10 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
      )
      // Bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        return (
          <div key={i} className="flex gap-2 ml-2">
            <span>•</span>
            <span dangerouslySetInnerHTML={{ __html: withCode.replace(/^[•-]\s/, "") }} />
          </div>
        )
      }
      return (
        <div key={i}>
          {withCode ? (
            <span dangerouslySetInnerHTML={{ __html: withCode }} />
          ) : (
            <br />
          )}
        </div>
      )
    })
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col" style={{ height: "calc(100vh - 320px)", minHeight: "500px" }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00274c] to-[#003d7a] p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold">AI Code Assistant</h3>
          <p className="text-white/70 text-sm">Chat to modify the website code</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-white/70 text-sm">
          <GitBranch className="w-4 h-4" />
          <span>main</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 bg-[#00274c] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-[#00274c] text-white rounded-br-md"
                  : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
              }`}
            >
              <div className="text-sm leading-relaxed">
                {formatContent(msg.content)}
              </div>

              {/* File changes indicator */}
              {msg.filesChanged && msg.filesChanged.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold mb-1">
                    <GitBranch className="w-3.5 h-3.5" />
                    Files committed to GitHub:
                  </div>
                  {msg.filesChanged.map((file, i) => (
                    <div key={i} className="text-xs text-gray-500 ml-5 font-mono">
                      ✅ {file}
                    </div>
                  ))}
                </div>
              )}

              {/* Errors */}
              {msg.errors && msg.errors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <div className="flex items-center gap-1.5 text-red-600 text-xs font-semibold mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Errors:
                  </div>
                  {msg.errors.map((err, i) => (
                    <div key={i} className="text-xs text-red-500 ml-5">
                      {err}
                    </div>
                  ))}
                </div>
              )}

              <div className={`text-[10px] mt-2 ${
                msg.role === "user" ? "text-white/50" : "text-gray-400"
              }`}>
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-[#00274c] rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking & applying changes...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what to change on the website..."
            className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00274c]/20 focus:border-[#00274c] transition-all max-h-32"
            rows={1}
            disabled={isLoading}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = "auto"
              target.style.height = target.scrollHeight + "px"
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-[#00274c] text-white p-3 rounded-xl hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-2 text-center">
          AI changes are automatically committed to GitHub. Use with care.
        </p>
      </div>
    </div>
  )
}
