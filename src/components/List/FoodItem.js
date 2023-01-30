import { ScaleDecorator } from 'react-native-draggable-flatlist'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const FoodItem = (
  { item, getIndex, isActive, drag },
  listsCtx,
  foodItems,
  currentList
) => {
  const index = getIndex()
  const deleteFoodItemHandler = (foodItem) => {
    listsCtx.deleteFoodItem(foodItem)
  }

  const foodItemCheckHandler = (index) => {
    let checkbox = foodItems[index]
    checkbox.checked = !checkbox.checked
    listsCtx.updateList({ foodItems, listId: currentList.id })
  }

  return (
    <ScaleDecorator>
      {/*FOOD ITEM*/}
      <View
        disabled={isActive}
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

export default FoodItem
