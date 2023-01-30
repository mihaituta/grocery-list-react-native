import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native'

import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import Header from '../Layout/Header'
import { UserAuth } from '../Auth/AuthContext'
import { ListsContext } from '../List/ListsContextProvider'
import ListItem from '../List/ListItem'

const Home = ({ navigation }) => {
  const { logout } = UserAuth()
  const listsCtx = useContext(ListsContext)
  const loadingLists = listsCtx.loadingLists

  const handleLogout = async () => {
    try {
      await logout()
      navigation.navigate('Login')
    } catch (e) {
      console.log(e.message)
    }
  }

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    listsCtx.getLists()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  // to display when lists are retrieved from the API or there are no lists at all
  const emptyComponent = () => {
    return loadingLists ? (
      <View className='flex items-center justify-center mt-6'>
        <ActivityIndicator
          size='large'
          color='rgb(252, 211, 77)'
          style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
        />
        <Text className='text-xl text-amber-300 mt-6'>Loading lists...</Text>
      </View>
    ) : listsCtx.lists.length === 0 ? (
      <Text className='text-xl text-amber-300 mt-1 mx-4'>No lists added.</Text>
    ) : (
      ''
    )
  }

  return (
    <>
      <StatusBar style='light' />

      <FlatList
        data={listsCtx.lists}
        stickyHeaderIndices={[0]}
        // HEADER
        ListHeaderComponent={
          <Header buttonText='Logout' buttonFunction={handleLogout}>
            <Pressable
              android_ripple={{ color: `rgb(252, 211, 77)` }}
              className='border border-amber-300 px-3 h-10 text-lg w-24 justify-center
              text-amber-300 flex flex-row items-center'
              onPress={listsCtx.addList}
            >
              <Text className='text-lg text-amber-300'>Add list</Text>
            </Pressable>
          </Header>
        }
        // REFRESH
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#18181B'}
            colors={['rgb(252, 211, 77)']}
            progressViewOffset={20}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        className='flex-1'
        numColumns={2}
        // EMPTY COMPONENT
        ListEmptyComponent={emptyComponent}
        // LIST ITEM
        renderItem={(list) => ListItem(list, listsCtx, navigation)}
      />
    </>
  )
}

export default Home
