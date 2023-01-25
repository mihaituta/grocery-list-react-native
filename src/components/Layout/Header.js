import React from 'react'
import {
  Button,
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'

const Header = ({ children, listPage, buttonText, buttonFunction }) => {
  return (
    <View className='bg-zinc-800 p-4 drop-shadow-lg  '>
      <View className='flex flex-row mt-2 mb-3 justify-between'>
        <View>
          <Text className='text-white text-3xl font-semibold'>
            Grocery List
          </Text>
          <Text className='text-white text-base mt-2'>
            {/*{user.email && user.email}*/}
            demo@gmail.com
          </Text>
        </View>
        {/*    <TouchableHighlight className='border px-3 w-24 h-10 text-lg text-amber-300 border-amber-300'>
          <Text className='text-lg text-amber-300'> {buttonText}</Text>
        </TouchableHighlight>*/}
        <Pressable
          android_ripple
          className='border border-amber-300 px-3 h-10 text-lg text-amber-300 flex flex-row items-center'
        >
          <Text className='text-lg text-amber-300' onPress={buttonFunction}>
            {buttonText}
          </Text>
        </Pressable>
      </View>
      {children}
    </View>
  )
}

export default Header
