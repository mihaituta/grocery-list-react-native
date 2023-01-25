import { useLayoutEffect, useState } from 'react'
import { UserAuth } from '../Auth/AuthContext'
import AuthForm from '../Auth/AuthForm'
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = UserAuth()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const handleSubmit = async () => {
    console.log('password', password)
    setError('')
    try {
      await login(email, password)
      return navigation.navigate('Home')
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password!')
      }
    }
  }

  return (
    <AuthForm
      navigation={navigation}
      loginForm={true}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  )
}

import { Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default Login
