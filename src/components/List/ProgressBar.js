import { Animated, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'

const ProgressBar = ({ foodItems }) => {
  const progressBarValue = () => {
    const checkedItems =
      foodItems && foodItems.filter((item) => item.checked === true)
    if (foodItems.length > 0) {
      const value = Math.round((checkedItems.length / foodItems.length) * 100)
      return checkedItems.length === 0 ? 0 : value
    }
    return 0
  }

  const progressBarAnimation = useRef(
    new Animated.Value(progressBarValue())
  ).current

  useEffect(() => {
    Animated.spring(progressBarAnimation, {
      toValue: progressBarValue(),
      /*      speed: 10,
      bounciness: 10,*/
      stiffness: 200,
      damping: 15,
      mass: 1,
      useNativeDriver: false,
    }).start()
  }, [progressBarValue()])

  const animatedWidth = progressBarAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  return (
    <>
      {foodItems && foodItems.length > 0 && (
        <View className='flex flex-row items-center mt-4 h-5'>
          {/*VALUE OF PROGRESSBAR IN TEXT NUMBER*/}
          {progressBarValue() > 0 && (
            <Text className='text-s font-semibold text-white'>
              {progressBarValue()}%
            </Text>
          )}

          {/*PROGRESSBAR CONTAINER BACKGROUND*/}
          <View
            className={`${
              progressBarValue() > 0 ? 'ml-3' : ''
            } bg-neutral-900 rounded-full shrink w-full  h-3`}
          >
            {/*PROGRESSBAR*/}
            <Animated.View
              className={`bg-amber-300 h-3 text-center text-xs font-bold  
              ${
                progressBarValue() === 100 ? 'rounded-full' : 'rounded-l-full'
              }`}
              style={{
                width: animatedWidth,
              }}
            />
          </View>
        </View>
      )}
    </>
  )
}

export default ProgressBar
