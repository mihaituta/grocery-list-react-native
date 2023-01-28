import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../Layout/Header'
import { ListsContext } from '../List/ListsContextProvider'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { FontAwesome5 } from '@expo/vector-icons'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const List = ({ navigation, route }) => {
  const listsCtx = useContext(ListsContext)
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems
  const loadingLists = listsCtx.loadingLists
  const urlId = route.params.urlId
  const [refreshing, setRefreshing] = React.useState(false)

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    navigation.navigate('List', { urlId })
    listsCtx.getLists()

    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const deleteFoodItemHandler = (foodItem) => {
    listsCtx.deleteFoodItem(foodItem)
  }

  const foodItemCheckHandler = (index) => {
    let checkbox = foodItems[index]
    checkbox.checked = !checkbox.checked
    listsCtx.updateList({ foodItems, listId: currentList.id })
  }

  const emptyComponent = () => {
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
    ) : foodItems ? (
      <Text className='text-xl text-amber-300 mt-1 mx-4'>List is empty.</Text>
    ) : (
      ''
    )
  }

  const handleOnDragEnd = (result) => {
    /*    const [reorderedItem] = foodItems.splice(result.from, 1)
    foodItems.splice(result.to, 0, reorderedItem)*/
    listsCtx.updateList({ foodItems: result.data, listId: currentList.id })
  }

  const renderItem = ({ item, getIndex, isActive, drag }) => {
    const index = getIndex()
    return (
      <ScaleDecorator>
        <View
          disabled={isActive}
          // px-4  py-3.5
          className={`bg-zinc-800 mb-2 mx-2 rounded flex flex-row
            cursor-pointer justify-between items-center`}
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
        >
          {/*CHECKBOX*/}
          <BouncyCheckbox
            fillColor={'rgb(252, 211, 77)'}
            textStyle={{
              textDecorationLine: 'none',
              color: 'white',
              fontSize: 18,
            }}
            style={{ paddingLeft: 15, paddingVertical: 15, width: '70%' }}
            innerIconStyle={{ borderWidth: 2 }}
            // text-xl text-white flex break-words items-center
            textContainerStyle={{
              marginLeft: 15,
            }}
            iconComponent={
              item.checked ? (
                <FontAwesome name='check' size={17} color='white' />
              ) : (
                ''
              )
            }
            onPress={() => foodItemCheckHandler(index)}
            isChecked={item.checked}
            disableBuiltInState
            size={25}
            key={item.id}
            text={item.name}
          />

          <View className='flex flex-row'>
            {/*DELETE ITEM ICON*/}
            <FontAwesome
              style={{ paddingLeft: 20, paddingRight: 10, paddingVertical: 15 }}
              name='trash'
              size={23}
              color='rgb(252, 211, 77)'
              onPress={() => deleteFoodItemHandler(item)}
            />

            {/*DRAG ICON REORDER*/}
            <FontAwesome
              style={{ paddingLeft: 15, paddingRight: 20, paddingVertical: 15 }}
              onLongPress={drag}
              name='reorder'
              size={24}
              color='rgb(113, 113, 122)'
            />
          </View>
        </View>
      </ScaleDecorator>
    )
  }

  return (
    <>
      <StatusBar style='light' />

      <GestureHandlerRootView>
        <DraggableFlatList
          data={foodItems}
          onDragEnd={handleOnDragEnd}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item)}
          stickyHeaderIndices={[0]}
          autoscrollThreshold={250}
          ListHeaderComponent={
            <Header
              buttonText='Delete list'
              buttonFunction={deleteList}
              listPage={true}
              navigation={navigation}
            >
              {/* <Pressable
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
              </Pressable>
              INPUT ADD ITEM
              <AddFoodItem
                listPage={true}
                listsCtx={listsCtx}
                foodItems={foodItems}
                currentList={currentList}
              />
              <ProgressBar foodItems={foodItems} />*/}
            </Header>
          }
          ListEmptyComponent={emptyComponent}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={'#18181B'}
              colors={['rgb(252, 211, 77)']}
              progressViewOffset={20}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </GestureHandlerRootView>
    </>
  )
}

export default List
