import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/components/Auth/RootNavigation'
import Home from './src/components/Screens/Home'
import List from './src/components/Screens/List'
import Login from './src/components/Screens/Login'
import Register from './src/components/Screens/Register'
import {
  AuthContextProvider,
  UserAuth,
} from './src/components/Auth/AuthContext'

import { StatusBar } from 'expo-status-bar'
import { ListsContextProvider } from './src/components/List/ListsContextProvider'

function AppContent() {
  const Stack = createNativeStackNavigator()
  const navTheme = DefaultTheme
  navTheme.colors.background = '#18181B'
  navTheme.colors.text = '#fff'
  const { user, userIsLoading } = UserAuth()

  const options = {
    headerShown: false,
    /*    presentation: 'modal',
    animationTypeForReplace: 'push',*/
    animation: 'slide_from_right',
  }

  if (userIsLoading) {
    return
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={options}
              initialParams={{ urlId: '' }}
            />
            <Stack.Screen name='List' component={List} options={options} />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_left',
              }}
            />
            <Stack.Screen
              name='Register'
              component={Register}
              options={options}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ListsContextProvider>
      <AuthContextProvider>
        <AppContent />
        <StatusBar style='light' />
      </AuthContextProvider>
    </ListsContextProvider>
  )
}
