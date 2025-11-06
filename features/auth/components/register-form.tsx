import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
  } from 'react-native';
  import { Controller, useForm } from 'react-hook-form';
  import { router } from 'expo-router';
  import { TextInput } from 'react-native-paper';
  import useAppToast from '@/hooks/useAppToast';
  import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerInputSchema, useSignup } from '../api/register';
import { Button } from 'react-native';
  export default function RegisterForm() {
    const register = useSignup();
    const {success,error:errorToast} = useAppToast()
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterInput>({
      resolver: zodResolver(registerInputSchema),
      defaultValues: {
        firstName:'',
        lastName:'',
        middleName:'',
        phoneNumber:'',
        email: '',
        password: '',
      },
    });
    const onSubmit = (values: RegisterInput) => {
      register.mutate(
        { data: values },
        {
          onSuccess(response) {
            success(response.message || 'Registration successful')
            router.replace('/login');
          },
          onError(error) {
            const errorMessage = error instanceof Error
            ? error.message :'Registration failed. Please try again.'
            errorToast(errorMessage)
          },
        },
      );
    };
  
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.loginText}>Register</Text>
        <Text style={styles.infoText}>
          Please enter the 6 digit one time code to activate your account!
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="FirstName"
              placeholder="Enter your FirstName"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="firstName"
        />
         <View style={styles.error}>
          {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="LastName"
              placeholder="Enter your LastName"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="lastName"
        />
         <View style={styles.error}>
          {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Middle Name"
              placeholder="Enter your middleName (optional)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="middleName"
        />
         <View style={styles.error}>
          {errors.middleName && <Text style={styles.error}>{errors.middleName.message}</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="PhoneNumber"
              placeholder="Enter your phonenumber"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="phoneNumber"
        />
        <View style={styles.error}>
          {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="email"
        />
        <View style={styles.error}>
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              style={styles.input}
              placeholderTextColor={'#6E717C'}
              textColor="#6E717C"
              activeOutlineColor="#6E717C"
              outlineStyle={{
                borderWidth: 1,
                borderRadius: 30,
                borderColor: '#6E717C4F',
              }}
            />
          )}
          name="password"
        />
        <View style={styles.error}>
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
        </View>
        <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <Button color={'#FF0083'} title='signin' onPress={() => router.push('/login')}/>
      </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
            {register.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.text}>Register</Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    input: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 30,
      marginHorizontal: 20,
      paddingInlineStart: 20,
      // borderWidth: 1,
      borderColor: '#6E717C4F',
      backgroundColor: '#F9FAFC',
      borderRadius: 30,
      height: 40,
    },
    buttonContainer: {
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 40,
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
    text: {
      fontFamily: 'Poppins',
      fontSize: 18,
      color: '#FFF2F2',
      fontWeight: 'bold',
      lineHeight: 21,
      letterSpacing: 2,
    },
    error: {
      paddingHorizontal: 20,
      color: 'red',
      marginTop: -10,
    },
    loginText: {
      fontFamily: 'Poppins',
      fontWeight: '700',
      fontSize: 29,
      // lineHeight:22,
      letterSpacing: 0.06,
      color: '#000000',
      textAlign: 'center',
    //   marginTop: 100,
      marginBottom: 29,
    },
    infoText: {
      fontFamily: 'Poppins',
      fontWeight: '300',
      fontSize: 15,
      lineHeight: 22,
      letterSpacing: 0.06,
      color: '#000000',
      textAlign: 'center',
      marginLeft: 41,
      marginRight: 35,
      marginBottom: 44,
    },
    accountContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:8
      },
      accountText:{
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21,
      },
      accountButton:{
        color: '#FF0083',
      }
  });
  