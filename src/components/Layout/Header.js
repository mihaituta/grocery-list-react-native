import React from 'react'
import {
  Button,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { UserAuth } from '../Auth/AuthContext'

const Header = ({ children, listPage, buttonText, buttonFunction }) => {
  const { user } = UserAuth()
  return (
    <View
      className='bg-zinc-800 p-4 mb-2.5 pt-14'
      style={{
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }}
    >
      <View className='flex flex-row mt-2 mb-3 justify-between'>
        <View>
          <Text className='text-white text-3xl font-semibold'>
            Grocery List
          </Text>
          <Text className='text-white text-base mt-2'>
            {user && user.email}
          </Text>
        </View>

        <Pressable
          android_ripple={{ color: `rgb(252, 211, 77)` }}
          className='border border-amber-300 px-3 h-10 text-lg text-amber-300 flex flex-row items-center'
          onPress={buttonFunction}
        >
          <Text className='text-lg text-amber-300'>{buttonText}</Text>
        </Pressable>
      </View>
      {children}
    </View>
  )
}

export default Header
