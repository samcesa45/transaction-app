import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '@/features/auth/api/get-user';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/use-auth-store';
import {
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons';
import { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';
import { CardComponent } from '@/components/ui/cards';
import * as Clipboard from 'expo-clipboard';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userQuery = useUser();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('0125148189');
  const [selectedAccountType, setSelectedAccountType] = useState('Savings');
  const user = userQuery?.data;

  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }

  if (userQuery?.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleSelectedAccountNumber = (accountnumber:string,accountType:string) => {
   setSelected(accountnumber)
   setSelectedAccountType(accountType)
   setModalVisible(false)
  };

  const handleCopyAccount = async() => {
    await Clipboard.setStringAsync(selected)
    setSnackbarVisible(true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.greetContainer}>
        <View style={styles.profileIconContainer}>
          <Pressable onPress={() => router.push('/home/profile')}>
            <AntDesign name="user" size={24} color="black" />
          </Pressable>
        </View>
        <Text style={styles.welcomeText}>
          Hello, {user ? user?.firstName : 'Guest'}!
        </Text>
      </View>
      <View style={styles.accountContainer}>
        <View>
          <Pressable
            style={styles.selectAccount}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>{selectedAccountType}</Text>
            <EvilIcons name="chevron-down" size={24} color="black" />
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.accountCopy}
            onPress={handleCopyAccount}
          >
            <Text>{selected}</Text>
            <MaterialCommunityIcons name="content-copy" size={20} color="red" />
          </Pressable>
        </View>
        <Portal>
          <Snackbar
            style={styles.snackbar}
            wrapperStyle={{ top: 35 }}
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
          >
            Account number copied
          </Snackbar>
        </Portal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.bankAccountContainer}>
              <Text style={styles.accountText}>Accounts</Text>
              {cardAcctItems.map((item, index) => (
                <CardComponent
                  key={item.id}
                  onPress={() => handleSelectedAccountNumber(item.title,item.subtitle)}
                  mode="outlined"
                  title={item.title}
                  subtitle={item.subtitle}
                  leftIcon={item.leftIcon}
                  rightIcon={item.rightIcon}
                  isActive={selected === item.title}
                />
              ))}
            </View>
          </View>
          <Pressable onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}

const cardAcctItems = [
  {
    id: 1,
    title: '0125148189',
    subtitle: 'Savings',
    leftIcon: 'currency-ngn',
    rightIcon: 'dots-horizontal',
  },
  {
    id: 2,
    title: '0305392166',
    subtitle: 'Savings',
    leftIcon: 'currency-ngn',
    rightIcon: 'dots-horizontal',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#e5e5e5',
  },
  profileIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  greetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  welcomeText: {
    fontWeight: '500',
    fontSize: 18,
    fontFamily: 'Poppins',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF0083',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#FFF2F2',
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 2,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  accountText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 32,
  },
  accountCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  snackbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
  },
  selectAccount: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  modalContent: {
    height: '35%',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  bankAccountContainer: {
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});
