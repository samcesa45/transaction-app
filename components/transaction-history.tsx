import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import CardLayout from './ui/cards/card-layout';
import { Avatar, Card } from 'react-native-paper';
import { Image } from 'expo-image';

export default function TransactionHistory() {
  return (
    <View style={styles.container}>
      <View style={styles.transactionHistoryContainer}>
        <Text style={styles.transactionText}>Transaction history</Text>
        <Pressable style={styles.seemoreContainer}>
          <Text style={styles.seemoreText}>See more</Text>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </Pressable>
      </View>
      <CardLayout style={{paddingVertical: 20,paddingHorizontal: 12,}}>
        <Text style={styles.latestTransaction}>Latest transactions</Text>
        <View style={styles.avatarContainer}>
          <Avatar.Icon icon={'timer-outline'} style={styles.avatar} />
          <Text style={styles.avatarText}>No past transactions</Text>
        </View>
      </CardLayout>
      <View>
        <Text style={styles.investmentText}>Investments</Text>
        <CardLayout>
            <Image style={styles.image} source={{uri:'https://picsum.photos/700'}}/>
            <View style={styles.investmentContainer}>
                <Text style={styles.imageFooterText}>Make your money work and earn more! Open a GTFM account on your website.</Text>
                <MaterialIcons name="chevron-right" size={24} color="gray"/>
            </View>
        </CardLayout>
      </View>
      <View>
        <Text style={styles.investmentText}>Pension</Text>
        <CardLayout>
            <Image style={styles.image} source={{uri:'https://picsum.photos/600'}}/>
            <View style={styles.investmentContainer}>
                <Text style={styles.imageFooterText}>Link your Transaction Trust Pension Account and manage your retirement funds.</Text>
                <MaterialIcons name="chevron-right" size={24} color="gray"/>
            </View>
        </CardLayout>
      </View>
      <View>
        <Text style={styles.investmentText}>Don't miss</Text>
        <CardLayout>
            <Image style={styles.image} source={{uri:'https://picsum.photos/500'}}/>
            <View style={styles.investmentContainer}>
                <Text style={styles.imageFooterText}>Same Transaction, more range.</Text>
                <MaterialIcons name="chevron-right" size={24} color="gray"/>
            </View>
        </CardLayout>
      </View>
    </View>
  );
}

const rightContent = (props: any) => (
  <Avatar.Icon {...props} icon="chevron-right" />
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  transactionHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seemoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  transactionText: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '500',
  },
  seemoreText: {
    fontSize: 18,
    color: 'gray',
  },
  latestTransaction: {
    fontSize: 18,
    color: 'gray',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  avatar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  avatarText: {
    fontSize: 16,
    color: 'gray',
  },
  investmentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:15,
    paddingHorizontal:15,
    paddingVertical:10,
  },
  investmentText: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 15,
  },
  image:{
    width:'100%',
    height:100
  },
  imageFooterText:{
    fontSize:15,
    color:'#1A1A1A',
    maxWidth:'88%'
  },
});
