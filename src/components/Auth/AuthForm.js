import React, { useState, useRef } from 'react'
import {
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const AuthForm = ({
  navigation,
  loginForm,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
}) => {
  const [showPass, setShowPass] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPassEmpty, setIsPassEmpty] = useState(false)
  const emailInputRef = useRef()
  const passInputRef = useRef()
  const validateInputs = () => {
    if (!email.trim()) setIsEmailEmpty(true)
    if (email.includes('@')) setIsEmailValid(true)

    if (!password.trim()) setIsPassEmpty(true)

    //if neither email nor password are empty and email is valid proceed to submit
    if (email.trim() && password.trim() && email.includes('@')) handleSubmit()
  }

  const errorHandler = (error) => {
    return (
      <>
        {error && (
          <View className='flex flex-row items-center'>
            <FontAwesome
              name='exclamation-circle'
              size={18}
              color={`rgb(239, 68, 68)`}
            />
            <Text className='ml-2 text-red-500 font-bold text-base'>
              {error}
            </Text>
          </View>
        )}
      </>
    )
  }

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setEmail('')
    setPassword('')
    setError('')
    setIsEmailEmpty(false)
    setIsEmailValid(true)
    setIsPassEmpty(false)
    emailInputRef.current.blur()
    passInputRef.current.blur()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  return (
    <SafeAreaView className='min-h-full bg-zinc-800 p-4'>
      <ScrollView
        keyboardShouldPersistTaps='always'
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#18181B'}
            colors={['rgb(252, 211, 77)']}
            progressViewOffset={20}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/*APP TITLE*/}
        <Text className='text-4xl text-white font-bold mt-20 mb-12 text-center'>
          Grocery List
        </Text>

        {/*ERROR*/}
        {error && (
          <View className='flex flex-row items-center justify-center mb-5 bg-red-500 py-3'>
            <FontAwesome
              name='exclamation-triangle'
              size={24}
              color={'white'}
            />
            <Text className='ml-2 text-white font-bold text-xl'>{error}</Text>
          </View>
        )}

        {/*REGISTER/LOGIN TITLE*/}
        <Text className='text-3xl text-white font-bold py-2'>
          {loginForm ? 'Login' : 'Register'}
        </Text>

        {/*EMAIL INPUT*/}
        <Text className='py-2 text-xl text-white font-medium'>
          Email address
        </Text>
        <View className='relative py-2'>
          <TextInput
            className={`focus:border-2 focus:border-amber-300 text-white text-lg bg-zinc-700 p-3 w-full pl-12 ${
              isEmailEmpty || !isEmailValid ? 'border-2 border-red-500' : ''
            }`}
            ref={emailInputRef}
            placeholderTextColor='gray'
            keyboardType='email-address'
            textContentType='emailAddress'
            placeholder='Email'
            autoCapitalize='none'
            autoComplete='email'
            cursorColor='yellow'
            value={email}
            onChangeText={(value) => {
              setEmail(value)
              setError('')
              value.trim() ? setIsEmailEmpty(false) : setIsEmailEmpty(true)
              // email has to be a correct email
              const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
              regex.test(value.trim())
                ? setIsEmailValid(true)
                : setIsEmailValid(false)
            }}
          />

          {/*EMAIL ICON*/}
          <View className='inset-y-0 flex absolute left-3.5 justify-center'>
            <FontAwesome
              name='envelope'
              size={22}
              color={
                isEmailEmpty || !isEmailValid
                  ? 'rgb(239, 68, 68)'
                  : 'rgb(252, 211, 77)'
              }
            />
          </View>
        </View>

        {/*EMAIL EMPTY ERROR*/}
        {errorHandler(
          isEmailEmpty
            ? 'Email field cannot be empty!'
            : !isEmailValid
            ? 'Incorrect email address format!'
            : ''
        )}

        {/*PASSWORD INPUT*/}
        <Text className='py-2 text-xl text-white font-medium'>Password</Text>
        <View className='relative py-2'>
          <TextInput
            ref={passInputRef}
            className={`focus:border-2 focus:border-amber-300 text-white text-lg bg-zinc-700
           p-3 w-full pl-12 ${isPassEmpty ? 'border-2 border-red-500' : ''}`}
            placeholderTextColor='grey'
            secureTextEntry={!showPass}
            placeholder='Password'
            autoCapitalize='none'
            cursorColor='yellow'
            value={password}
            onChangeText={(value) => {
              setPassword(value)
              setError('')
              value.trim() ? setIsPassEmpty(false) : setIsPassEmpty(true)
            }}
          />
          {/*PASSWORD ICON*/}
          <View className='inset-y-0 absolute left-4 flex justify-center items-center'>
            <FontAwesome
              name='lock'
              size={26}
              color={isPassEmpty ? 'rgb(239, 68, 68)' : 'rgb(252, 211, 77)'}
            />
          </View>
          {/*SHOW/HIDE PASSWORD BUTTON*/}
          <Pressable
            className='inset-y-0 flex absolute right-0 justify-center px-3.5'
            onPress={() => {
              setShowPass(!showPass)
            }}
          >
            {showPass ? (
              <FontAwesome
                name='eye'
                size={24}
                color={isPassEmpty ? 'rgb(239, 68, 68)' : 'rgb(252, 211, 77)'}
              />
            ) : (
              <FontAwesome
                name='eye-slash'
                size={24}
                color={isPassEmpty ? 'rgb(239, 68, 68)' : 'rgb(252, 211, 77)'}
              />
            )}
          </Pressable>
        </View>
        {/*PASSWORD EMPTY ERROR*/}
        {errorHandler(isPassEmpty ? 'Password field cannot be empty!' : '')}

        {/*REDIRECT LINK*/}
        <Text className='py-2 text-lg text-white'>
          {loginForm
            ? "Don't have an account yet? "
            : 'Already have an account? '}
          <Text
            className='py-2 text-lg text-white underline'
            onPress={() => {
              navigation.navigate(loginForm ? 'Register' : 'Login')
            }}
          >
            {loginForm ? 'Register' : 'Login'}
          </Text>
        </Text>

        {/*SUBMIT BUTTON*/}
        <Pressable
          android_ripple={{ color: `rgb(253, 224, 71)` }}
          onPress={() => {
            validateInputs()
          }}
          className='border-0 bg-yellow-400/90 w-full p-4 my-3 flex items-center'
        >
          <Text className='text-white text-xl font-bold'>
            {loginForm ? 'Login' : 'Register'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthForm
