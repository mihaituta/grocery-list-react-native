import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/components/Screens/Home'
import Lists from './src/components/Screens/Lists'
import Login from './src/components/Screens/Login'
import Register from './src/components/Screens/Register'
import {
  AuthContextProvider,
  UserAuth,
} from './src/components/Auth/AuthContext'

import { StatusBar } from 'expo-status-bar'

function AppContent() {
  const Stack = createNativeStackNavigator()
  const navTheme = DefaultTheme
  navTheme.colors.background = '#18181B'
  navTheme.colors.text = '#fff'
  const { user } = UserAuth()

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Lists' component={Lists} />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppContent />
      <StatusBar style='light' />
    </AuthContextProvider>
  )
}
