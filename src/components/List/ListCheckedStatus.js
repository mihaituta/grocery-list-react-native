import CheckedItemsHelper from '../Helpers/CheckedItemsHelper'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'
const ListCheckedStatus = ({ foodItems, currentList, listsCtx }) => {
  const {
    listCompletedWithAllItemsChecked,
    isListCompleted,
    nrOfCheckedItems,
  } = CheckedItemsHelper(foodItems)

  //if all the items are checked and have prices, calculate the total price
  if (listCompletedWithAllItemsChecked) {
    //prettier-ignore
    const totalPrice = foodItems.reduce((total, foodItem) => total + Number(foodItem.price), 0)

    listsCtx.updateList({
      updateTotalPrice: true,
      totalPrice: String(parseFloat(totalPrice.toFixed(2))),
      listId: currentList.id,
    })
  }

  // reset totalPrice to empty when all the items have been deleted
  if (currentList.foodItems && currentList.foodItems.length === 0) {
    listsCtx.updateList({
      updateTotalPrice: true,
      totalPrice: '',
      listId: currentList.id,
    })
  }

  // prettier-ignore
  // if list is completed, set canUpdateDate to false so the date will never be updated again
  if (isListCompleted && foodItems.length > 0 && currentList.canUpdateDate === true) {
    listsCtx.updateList({ listId: currentList.id, canUpdateDate: false })
  }

  return (
    <View>
      {foodItems && foodItems.length > 0 && (
        <View
          className={`ml-4 flex flex-row items-center rounded pl-1.5 pr-2 py-1 ${
            isListCompleted ? 'bg-green-500/80' : ''
          }`}
        >
          {isListCompleted ? (
            <Feather
              style={{ marginRight: 5, marginTop: 2 }}
              name='check-circle'
              size={21}
              color='white'
            />
          ) : (
            <MaterialCommunityIcons
              style={{ marginRight: 4 }}
              name='cart-outline'
              size={22}
              color='rgb(252, 211, 77)'
            />
          )}
          <Text
            className={`text-[22px]  ${
              isListCompleted ? 'text-white' : 'text-amber-300'
            }`}
          >
            {nrOfCheckedItems}/{foodItems.length}
          </Text>
        </View>
      )}
    </View>
  )
}

export default ListCheckedStatus
