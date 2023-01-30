import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../Layout/Header'
import { ListsContext } from '../../store/ListsContextProvider'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import FoodItem from '../List/FoodItem'
import AddFoodItem from '../List/AddFoodItem'
import ProgressBar from '../List/ProgressBar'

const List = ({ navigation, route }) => {
  const listsCtx = useContext(ListsContext)
  const currentList = listsCtx.currentList
  const foodItems = listsCtx.currentList.foodItems
  const loadingLists = listsCtx.loadingLists
  const urlId = route.params.urlId

  // clear the current list when leaving the list page
  useEffect(() => {
    return () => {
      listsCtx.setCurrentList({ list: {} })
    }
  }, [])

  // sets the current list from params
  useEffect(() => {
    listsCtx.setCurrentList({ urlId })
  }, [urlId])

  const deleteList = () => {
    listsCtx.deleteList(currentList.id)
    navigation.navigate('Home')
  }

  // to display when lists are retrieved from the API or the list has no food items
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

  const handleOnDragEnd = (reorderedList) =>
    listsCtx.updateList({
      foodItems: reorderedList.data,
      listId: currentList.id,
    })

  return (
    <>
      <StatusBar style='light' />
      <GestureHandlerRootView>
        <DraggableFlatList
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='on-drag'
          data={foodItems}
          onDragEnd={handleOnDragEnd}
          keyExtractor={(item) => item.id}
          renderItem={(item) =>
            FoodItem(item, listsCtx, foodItems, currentList)
          }
          stickyHeaderIndices={[0]}
          autoscrollThreshold={200}
          ListHeaderComponent={
            <Header
              buttonText='Delete list'
              buttonFunction={deleteList}
              listPage={true}
              navigation={navigation}
            >
              {/*INPUT ADD ITEM*/}
              <AddFoodItem
                listPage={true}
                listsCtx={listsCtx}
                foodItems={foodItems}
                currentList={currentList}
              />
              <ProgressBar foodItems={foodItems} />
            </Header>
          }
          ListEmptyComponent={emptyComponent}
        />
      </GestureHandlerRootView>
    </>
  )
}

export default List
