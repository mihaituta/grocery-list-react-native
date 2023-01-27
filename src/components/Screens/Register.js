import { useLayoutEffect, useState } from 'react'
import { UserAuth } from '../Auth/AuthContext'
import AuthForm from '../Auth/AuthForm'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { createUser } = UserAuth()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const handleSubmit = async () => {
    console.log('register')
    setError('')
    try {
      await createUser(email, password)
      return navigation.navigate('Home')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use!')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak!')
      }
    }
  }

  return (
    <AuthForm
      navigation={navigation}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      setError={setError}
    />
  )
}

export default Register
