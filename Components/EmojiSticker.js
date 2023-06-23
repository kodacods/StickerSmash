import { View, Image } from 'react-native';

export default function EmojiSticker({ imageSize, stickerSource }) { //displaying the picked emoji
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
