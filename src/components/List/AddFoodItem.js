import { useState } from 'react'
import { TextInput, View } from 'react-native'
import SavedFoodsChips from './SavedFoodsChips'
import ListCheckedStatus from './ListCheckedStatus'

const AddFoodItem = ({ listsCtx, listPage, foodItems, currentList }) => {
  const [itemName, setItemName] = useState('')
  const [filteredFoods, setFilteredFoods] = useState('')

  const addFoodItemHandler = (e, foodName) => {
    if (itemName !== '') {
      const foodItem = {
        name: foodName ? foodName : itemName,
        checked: false,
      }
      listsCtx.addFoodItem(foodItem)

      // if item is already added in savedFoods don't add it again
      if (!foodName) listsCtx.addSavedFood(itemName)

      setItemName('')
    }
  }

  const itemNameChangeHandler = (inputNameValue) => {
    setItemName(inputNameValue)
    //prettier-ignore
    inputNameValue && setFilteredFoods(listsCtx.savedFoods && listsCtx.savedFoods.filter((food) => {
            const stringHasMultipleWords = food.includes(' ')
            if (stringHasMultipleWords) {
              const splitWord = food.split(' ')
              // returns true if one of the words in the string starts with the typed input
              return splitWord.filter((splitWord) => splitWord.toLowerCase().startsWith(inputNameValue.toLowerCase())).length > 0
            }
            return food.toLowerCase().startsWith(inputNameValue.toLowerCase())
          })
      )
  }

  return (
    <View>
      {itemName && (
        <SavedFoodsChips
          listPage={listPage}
          itemName={itemName}
          filteredFoods={filteredFoods}
          addFoodItemHandler={addFoodItemHandler}
        />
      )}
      <View className='flex flex-row items-center justify-between'>
        <TextInput
          enablesReturnKeyAutomatically={true}
          value={itemName}
          onChangeText={(value) => itemNameChangeHandler(value)}
          blurOnSubmit={false}
          onSubmitEditing={(e) => addFoodItemHandler(e)}
          placeholderTextColor='gray'
          placeholder='Add new item...'
          cursorColor='yellow'
          className='bg-neutral-900 text-white text-lg
             border-0 focus:ring-0 ring-0 rounded w-36 h-11 px-2 '
          returnKeyType='go'
        />

        <ListCheckedStatus
          foodItems={foodItems}
          currentList={currentList}
          listsCtx={listsCtx}
        />
      </View>
    </View>
  )
}

export default AddFoodItem
