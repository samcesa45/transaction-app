import React from 'react';
import { View, StyleSheet, StyleProp } from 'react-native';
type CardProps = {
  children: React.ReactNode;
  style?:StyleProp<any>
};
export default function CardLayout({ children,style }: CardProps) {
  return <View style={[styles.card,style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // paddingVertical: 20,
    // paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
    boxSizing:'border-box'
  },
});
