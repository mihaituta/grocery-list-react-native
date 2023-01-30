import { Pressable, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const SavedFoodsChips = ({
  listPage,
  itemName,
  filteredFoods,
  addFoodItemHandler,
}) => {
  return (
    <>
      {listPage && itemName && (
        <View className='flex flex-row flex-wrap gap-0'>
          {filteredFoods &&
            filteredFoods.slice(0, 5).map((foodName) => (
              <Pressable
                className='flex flex-row items-center pl-3 pr-1 mr-3 mb-3 rounded-md
                text-zinc-900 bg-amber-300'
                key={foodName}
                onPress={(e) => addFoodItemHandler(e, foodName)}
              >
                <Text className='pr-0.5 py-2 font-semibold text-[16px]'>
                  {foodName}
                </Text>
                <MaterialIcons name='add' size={22} color='rgb(24, 24, 27)' />
              </Pressable>
            ))}
        </View>
      )}
    </>
  )
}

export default SavedFoodsChips
