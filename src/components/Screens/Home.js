import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect } from 'react'
import Header from '../Layout/Header'
import { UserAuth } from '../Auth/AuthContext'

const Home = ({ navigation }) => {
  const { logout } = UserAuth()
  const { user } = UserAuth()
  console.log(user)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigation.navigate('Login')
    } catch (e) {
      console.log(e.message)
    }
  }

  const data = [
    1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1,
    2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7, 1, 2,
    4, 5, 6, 7, 1, 2, 4, 5, 6, 7,
  ]
  return (
    <>
      <StatusBar style='light' />

      <Header buttonText='Logout' buttonFunction={handleLogout} />
      <FlatList
        className='flex  '
        data={data}
        renderItem={(item) => (
          <TouchableOpacity className='border px-3 w-24 h-10 text-lg text-amber-300 border-amber-300'>
            <Text
              className='text-lg text-amber-300'
              onPress={() => navigation.navigate('Lists')}
            >
              list
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default Home
