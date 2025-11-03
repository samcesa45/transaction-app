import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Animated, TextInputProps, View } from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}
export const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...props
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 40,
    zIndex: 2,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -4], // label moves up
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], //shrink font
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#6E717C', '#000'],
    }),
    paddingRight: 60,
    // backgroundColor:'#fff'
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholder={isFocused ? placeholder : ''}
        placeholderTextColor={'#6E717C'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          { borderColor: isFocused ? '#6E717C4F' : '#F9FAFC' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 30,
    paddingInlineStart: 20,
    borderWidth: 1,
    borderColor: '#6E717C4F',
    backgroundColor: '#F9FAFC',
    borderRadius: 30,
  },
  label: {
    position: 'absolute',
    top: 11,
    left: 32,
    fontSize: 11,
    fontFamily: 'Poppins',
    fontWeight: '400',
    lineHeight: 24,
    color: '#6E717C',
  },
});
