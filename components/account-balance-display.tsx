import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
type Props = {
  balance: number;
  locale?: string;
  currency?: string;
  showBalance: boolean;
};

export default function AccountBalanceDisplay({
  balance,
  locale = 'en-NG',
  currency = 'NGN',
  showBalance = false,
}: Props) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  const formatted = formatter.format(balance);

  const match = formatted.match(/([^0-9.,]+)?([\d,]+)(?:\.(\d+))?/);
  const symbol = match?.[1] || '';
  // const parts = formatted.split('.')
  const integer = match?.[2] || '';
  const decimal = match?.[3] || '';

  return (
    <View
      style={[
        styles.container,
        { alignItems: showBalance ? 'baseline' : 'center' },
      ]}
    >
      {showBalance ? (
        <>
          {symbol && <Text style={styles.decimalText}>{symbol}</Text>}
          <Text style={styles.integerText}>{integer}</Text>
          {decimal && <Text style={styles.decimalText}>.{decimal}</Text>}
        </>
      ) : (
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={36}
          color="black"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  integerText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  decimalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  hiddenText: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 3,
  },
});
