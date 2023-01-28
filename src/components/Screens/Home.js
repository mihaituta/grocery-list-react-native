import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import Header from '../Layout/Header'
import { UserAuth } from '../Auth/AuthContext'
import { ListsContext } from '../List/ListsContextProvider'

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

  const formattedDate = (list) => {
    const date = new Date(list)
    // prettier-ignore
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // prettier-ignore
    return `${'(' + days[date.getDay()] + ') ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear().toString().slice(2)}`
  }

  const listRedirect = (list) => {
    listsCtx.setCurrentList({ list })
    navigation.navigate('List', { urlId: list.urlId })
  }

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
        // LIST CARD
        renderItem={(list) => (
          <Pressable
            android_ripple={{ color: `rgb(252, 211, 77)` }}
            className={`h-28 flex-1 max-w-[43%] my-2.5   ${
              list.index % 2 === 0 ? 'mr-2.5 ml-4' : 'ml-2.5 mr-4'
            } bg-zinc-800 rounded list-none relative`}
            style={{
              shadowColor: 'rgb(0, 0, 0)',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}
            onPress={() => listRedirect(list.item)}
          >
            {/*ITEMS PREVIEW*/}
            <View className='text-neutral-400 px-2 py-1 h-4/6 mr-2 overflow-hidden overflow-ellipsis'>
              {list.item.foodItems &&
                list.item.foodItems.map((item, index) => (
                  <BouncyCheckbox
                    fillColor={'#FBBF24'}
                    className='pb-1'
                    innerIconStyle={{ borderWidth: 1.5 }}
                    disabled
                    isChecked={item.checked}
                    disableBuiltInState
                    size={15}
                    key={item.id}
                    textComponent={
                      <Text
                        numberOfLines={1}
                        className='ml-2 text-neutral-400 text-md'
                      >
                        {item.name + (index === 2 ? '...' : '')}
                      </Text>
                    }
                  />
                ))}
            </View>

            {/*LIST DATE*/}
            <Text className='text-amber-300 text-md absolute right-3 bottom-2.5'>
              {formattedDate(list.item.date)}
            </Text>
          </Pressable>
        )}
        // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </>
  )
}

export default Home
