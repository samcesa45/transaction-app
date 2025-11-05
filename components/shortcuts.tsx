import { shortcutItems } from '@/constant';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Shortcuts() {
  return (
    <View style={styles.container}>
      {shortcutItems.map((item) => (
        <Pressable key={item.id}>
          <View style={styles.imgContainer}>
            <Image source={item.img as ImageSourcePropType} />
          </View>
          <Text style={styles.text}>{item.text}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  imgContainer: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: '50%',
    borderColor: '#ccc',
    marginBottom: 10,
  },
  text: {
    fontWeight: '500',
    color: 'gray',
    textTransform: 'capitalize',
  },
});
