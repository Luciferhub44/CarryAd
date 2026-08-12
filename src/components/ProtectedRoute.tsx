import { Outlet } from 'react-router-dom'
import { RedirectToSignIn, useAuth } from '@clerk/react'

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return null
  if (!isSignedIn) return <RedirectToSignIn />

  return <Outlet />
}
