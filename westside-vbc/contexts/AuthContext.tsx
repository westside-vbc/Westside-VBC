"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  deleteUser
} from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  loginWithGoogle: (isRegister?: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  resetPassword: async () => {},
  loginWithGoogle: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error("Error sending password reset email:", error)
      throw error
    }
  }

  const loginWithGoogle = async (isRegister: boolean = false) => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const additionalInfo = getAdditionalUserInfo(result)

      if (!isRegister && additionalInfo?.isNewUser) {
        // If they are logging in but the account is new, reject it
        await deleteUser(result.user)
        await firebaseSignOut(auth)
        throw new Error("Account not found. Please register first.")
      }
    } catch (error: any) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, resetPassword, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
