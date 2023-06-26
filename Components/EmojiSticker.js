import { View, Image } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  log,
} from 'react-native-reanimated';



const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);





export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  // const { width, height } = parent_image;

  // console.log("TEST", parent_image);



  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });



  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      const { translationX, translationY } = event;
      const minX = 0; // Minimum X coordinate
      const maxX = 280 - (scaleImage.value - 40) // Maximum X coordinate 240 for big. 280 for small
      const minY = -90; // Minimum Y coordinate
      const maxY = 310 - (scaleImage.value - 40); // Maximum Y coordinate 270 for big 310 for small

      // Update the sticker position while constraining it within the image boundaries
      translateX.value = Math.max(minX, Math.min(maxX, translationX + context.translateX));
      translateY.value = Math.max(minY, Math.min(maxY, translationY + context.translateY));
    },
  });


  // const onDrag = useAnimatedGestureHandler({
  //   onStart: (event, context) => {
  //     context.translateX = translateX.value;
  //     context.translateY = translateY.value;
  //   },
  //   onActive: (event, context) => {
  //     translateX.value = event.translationX + context.translateX;
  //     translateY.value = event.translationY + context.translateY;
  //   },
  // });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );


}