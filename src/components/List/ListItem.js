import { Pressable, Text, View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const ListItem = (list, listsCtx, navigation) => {
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

  return (
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
  )
}

export default ListItem
