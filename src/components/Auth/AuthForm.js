import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'
import {
  Button,
  Pressable,
  SafeAreaView,
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
}) => {
  const [showPass, setShowPass] = useState(false)

  return (
    <SafeAreaView className=' min-h-full bg-zinc-800 p-4'>
      {/*APP TITLE*/}
      <Text className='text-4xl text-white font-bold my-10 text-center'>
        Grocery List
      </Text>
      {/*REGISTER/LOGIN TITLE*/}
      <Text className='text-3xl text-white font-bold py-2'>
        {loginForm ? 'Login' : 'Register'}
      </Text>

      <Text className='py-2 text-xl text-white font-medium'>Email address</Text>
      <View className='relative py-2'>
        <TextInput
          className='border-0 focus:ring-amber-300 text-white text-lg bg-zinc-700 p-3 w-full pl-12'
          placeholderTextColor='gray'
          keyboardType='email-address'
          textContentType='emailAddress'
          placeholder='Email'
          autoCapitalize='none'
          autoComplete='email'
          cursorColor='yellow'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View className='inset-y-0 flex absolute left-3.5 justify-center'>
          <FontAwesome name='envelope' size={22} color={'rgb(252, 211, 77)'} />
          {/*<EnvelopeIcon className='h-6 w-6' />*/}
        </View>
      </View>

      <Text className='py-2 text-xl text-white font-medium'>Password</Text>
      <View className='relative py-2'>
        <TextInput
          className='border-0 focus:ring-amber-300 text-white text-lg bg-zinc-700 p-3 w-full pl-12'
          placeholderTextColor='gray'
          secureTextEntry={!showPass}
          placeholder='Password'
          autoCapitalize='none'
          cursorColor='yellow'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View className='inset-y-0 absolute left-4 flex justify-center items-center'>
          <FontAwesome name='lock' size={26} color={'rgb(252, 211, 77)'} />
        </View>
        {/*SHOW/HIDE PASSWORD BUTTON*/}
        <Pressable
          className='inset-y-0 flex absolute right-3 justify-center'
          onPress={() => {
            setShowPass(!showPass)
          }}
        >
          {showPass ? (
            <FontAwesome name='eye' size={24} color={'rgb(252, 211, 77)'} />
          ) : (
            <FontAwesome
              name='eye-slash'
              size={24}
              color={'rgb(252, 211, 77)'}
            />
          )}
        </Pressable>
      </View>

      {/*REDIRECT LINK*/}
      <Text className='py-2 text-lg text-white  '>
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

      {/*ERROR*/}
      {error && (
        <Text className='text-red-400 font-bold text-lg mb-2'>{error}</Text>
      )}

      {/*SUBMIT BUTTON*/}
      <Pressable
        onPress={() => {
          handleSubmit()
        }}
        className='border-0 bg-yellow-400/90 hover:bg-yellow-400 w-full p-4 my-5 flex items-center'
      >
        <Text className='text-white text-xl font-bold'>
          {loginForm ? 'Login' : 'Register'}
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default AuthForm
