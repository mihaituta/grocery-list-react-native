import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { UserAuth } from '../Auth/AuthContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Header = ({
  navigation,
  children,
  listPage,
  buttonText,
  buttonFunction,
}) => {
  const { user } = UserAuth()

  return (
    <View
      className='bg-zinc-800 p-4 pt-10 z-10 mb-2'
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
      {/*BACK BUTTON*/}
      {listPage && (
        <Pressable
          android_ripple={{ color: `rgb(252, 211, 77)` }}
          className='h-10 w-20 text-lg text-amber-300 flex flex-row items-center'
          onPress={() => {
            navigation.goBack()
          }}
        >
          <MaterialCommunityIcons
            name='arrow-u-left-top'
            size={24}
            color='rgb(252, 211, 77)'
          />

          <Text
            includeFontPadding={false}
            textAlignVertical={true}
            className='text-2xl text-amber-300 ml-1  pb-[2px]'
          >
            Lists
          </Text>
        </Pressable>
      )}

      <View className='flex flex-row mt-2 mb-3 justify-between'>
        <View>
          <Text className='text-white text-3xl font-semibold'>
            Grocery List
          </Text>
          <Text className='text-white text-base mt-2'>
            {user && user.email}
          </Text>
        </View>

        {/*BUTTON LOGOUT (Home page) / DELETE LIST*/}
        <Pressable
          android_ripple={{ color: `rgb(252, 211, 77)` }}
          className='border border-amber-300 px-3 h-10 text-lg text-amber-300 flex flex-row items-center'
          onPress={buttonFunction}
        >
          <Text
            includeFontPadding={false}
            textAlignVertical={true}
            className='text-lg text-amber-300'
          >
            {buttonText}
          </Text>
        </Pressable>
      </View>
      {children}
    </View>
  )
}

export default Header
