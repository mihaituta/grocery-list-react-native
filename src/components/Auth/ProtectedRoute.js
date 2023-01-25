import React from 'react'
import { UserAuth } from './AuthContext'

const ProtectedRoute = ({ navigation, children }) => {
  const { user } = UserAuth()

  if (!user) {
    return navigation.navigate('Login')
  }
  return children
}

export default ProtectedRoute
