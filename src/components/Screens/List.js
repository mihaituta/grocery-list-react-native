import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect } from 'react'
import Header from '../Layout/Header'
import { ListsContext } from '../List/ListsContextProvider'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const List = ({ navigation, route }) => {
  const listsCtx = useContext(ListsContext)
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems
  const loadingLists = listsCtx.loadingLists
  const urlId = route.params.urlId

  const deleteList = () => {
    listsCtx.deleteList(currentList.id)
    navigation.navigate('Home')
  }

  useEffect(() => {
    return () => {
      // clear the current list when leaving the list page
      listsCtx.setCurrentList({ list: {} })
    }
  }, [])

  useEffect(() => {
    listsCtx.setCurrentList({ urlId })
  }, [urlId])

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    navigation.navigate('List', { urlId })
    listsCtx.getLists()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const emptyComponent = (foodItems) => {
    return loadingLists ? (
      <View className='flex items-center justify-center mt-6'>
        <ActivityIndicator
          size='large'
          color='rgb(252, 211, 77)'
          style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
        />
        <Text className='text-xl text-amber-300 mt-6'>
          Loading food items...
        </Text>
      </View>
    ) : !foodItems ? (
      <Text className='text-xl text-amber-300 mt-1 mx-4'>List is empty.</Text>
    ) : (
      ''
    )
  }

  return (
    <>
      <StatusBar style='light' />

      <FlatList
        data={foodItems}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Header buttonText='Delete list' buttonFunction={deleteList}>
            {/*   <Pressable
              android_ripple
              className='border border-amber-300 px-3 h-10 text-lg w-24 justify-center
              text-amber-300 flex flex-row items-center'
            >
              <Text
                className='text-lg text-amber-300'
                onPress={listsCtx.addList}
              >
                Add list
              </Text>
            </Pressable>*/}
            {/*INPUT ADD ITEM*/}
            {/*      <AddFoodItem
              listPage={true}
              listsCtx={listsCtx}
              foodItems={foodItems}
              currentList={currentList}
          />
          <ProgressBar foodItems={foodItems} />*/}
          </Header>
        }
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
        ListEmptyComponent={emptyComponent}
        renderItem={(food) => (
          <Pressable
            className={`bg-zinc-800 px-4 py-3.5 mb-2 mx-2 rounded
            cursor-pointer justify-between `}
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
            // onPress={() => ()}
          >
            <BouncyCheckbox
              fillColor={'rgb(252, 211, 77)'}
              textStyle={{
                textDecorationLine: 'none',
                color: 'white',
                fontSize: 18,
              }}
              innerIconStyle={{ borderWidth: 2 }}
              // text-xl text-white flex break-words items-center
              textContainerStyle={{
                marginLeft: 15,
              }}
              iconComponent={
                food.item.checked ? (
                  <FontAwesome name='check' size={17} color='white' />
                ) : (
                  ''
                )
              }
              isChecked={food.item.checked}
              disableBuiltInState
              size={25}
              key={food.item.id}
              text={food.item.name}
            />
          </Pressable>
        )}
        // ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </>
  )
}

export default List
