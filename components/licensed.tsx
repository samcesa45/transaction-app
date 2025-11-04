import React from 'react'
import CardLayout from './ui/cards/card-layout'
import { Text, View, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'

export default function Licensed() {
  return (
   <CardLayout style={styles.container}>
    <View style={styles.subContainer}>
        <Avatar.Icon icon="folder" style={styles.avatar} size={28}/>
        <Text style={styles.text}>Banking services powered by Transaction Trust Ltd, Licensed by the Central Bank of Nigeria (CBN).</Text>
    </View>
   </CardLayout>
  )
}

const styles = StyleSheet.create ({
  container:{
    backgroundColor:'transparent',
    padding:10,
  },
  subContainer:{
    flexDirection:'row',
    gap:20
  },
  avatar:{
    width:40,
    height:40,
    backgroundColor:'transparent',
    borderWidth:1,
    borderRadius:'50%',
    borderColor:'#ccc'
  },
  text:{
    maxWidth:'80%'
  }
})
