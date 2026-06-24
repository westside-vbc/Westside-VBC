"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import PageHeader from "@/components/ui/PageHeader"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      await resetPassword(email)
      setMessage("Success! Check your email inbox or spam folder for the reset link.")
      setEmail("")
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Reset Password" imageSrc="/merchlogo.png" imageClassName="object-[center_48%]"/>

      <section className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-black text-[#00274c] mb-2 text-center">Forgot Password?</h2>
          <p className="text-center text-gray-500 mb-6 font-medium">Enter your email and we'll send you a link to reset your password.</p>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-6 text-sm font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#00274c] text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Remembered your password? <Link href="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
