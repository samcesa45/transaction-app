import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import { VerifyRequestInput, useVerifyRequest } from '../api/verify';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/use-auth-store';
import * as Clipboard from 'expo-clipboard';
import { ResendOtpInput, useResendOtp } from '../api/resend-otp';
import { ActivityIndicator } from 'react-native-paper';

export default function VerifyForm() {
  const { setToken, setRefreshTkn, setIsAuthenticated } = useAuthStore();
  const verify = useVerifyRequest();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const resendOtp = useResendOtp();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyRequestInput>({
    defaultValues: {
      userId: '',
      otp: '',
    },
  });

  // Set userId when it becomes available from route params
  useEffect(() => {
    if (userId) {
      setValue('userId', String(userId));
    }
  }, [userId, setValue]);

  useEffect(() => {
    (async () => {
      const clipboardText = await Clipboard.getStringAsync();
      const digits = clipboardText.replace(/\D/g, '').slice(0, 6);
      if (digits.length === 6) {
        const newOtp = digits.split('');
        setOtp(newOtp);
        setValue('otp', digits);
      }
    })();
  }, []);

  //    Auto-submit when OTP is complete
  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [otp]);

  const onSubmit = (values: VerifyRequestInput) => {
    verify.mutate(
      { data: values },
      {
        onSuccess(response) {
          setToken(response.accessToken);
          setRefreshTkn(response.refreshToken);
          setIsAuthenticated(true);
          router.replace('/');
        },
        onError(error) {
          //Reset OTP on error
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
          console.error('verification failed:', error);
        },
      },
    );
  };

  const handleResendOtp = (values: ResendOtpInput) => {
    resendOtp.mutate(
      { data: values },
      {
        onSuccess(response) {
          // console.log(response);
        },
        onError(error) {
          console.error(error.message);
        },
      },
    );
  };
  const handleInputChange = (index: number, value: string) => {
    //only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    setValue('otp', otpString);

    //Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (!otp[index] && index > 0) {
        //Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Cleaar current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        setValue('otp', newOtp.join(''));
      }
    }
  };

  const handlePaste = async (index: number) => {
    try {
      //Get clipboard content
      const clipboardText = await Clipboard.getStringAsync();
      const digits = clipboardText.replace(/\D/g, '').slice(0, 6);

      //if clipboard has a valid 6-digit code
      if (digits.length === 6) {
        const newOtp = digits.split('');
        setOtp(newOtp);
        setValue('otp', digits);
        //Move focus to last input
        inputRefs.current[5]?.focus();
      }
    } catch (error) {
      console.warn('Clipboard read failed', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.verifyText}>Verify</Text>
      <Text style={styles.infoText}>
        Please enter the 6 digit one time code to activate your account!
      </Text>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              digit && styles.inputFilled,
              errors.otp && styles.inputError,
            ]}
            ref={(el: any) => (inputRefs.current[index] = el)}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(value) => handleInputChange(index, value)}
            onKeyPress={(e) => handleKeyPress(index, e.nativeEvent.key)}
            onFocus={() => handlePaste(index)}
            editable={!verify.isPending}
            selectTextOnFocus
            autoFocus={index === 0}
          />
        ))}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.resendText}>Didn't receive a Code?</Text>
        <Button
          title="Resend Code"
          onPress={handleSubmit(handleResendOtp)}
          disabled={resendOtp.isPending}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, verify.isPending && styles.btnDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={verify.isPending || otp.join('').length !== 6}
        >
          {verify.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Verify</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  verifyText: {
    fontSize: 29,
    fontFamily: 'Poppins',
    color: '#1F1F1F',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 29,
  },
  infoText: {
    fontFamily: 'Poppins',
    lineHeight: 22,
    letterSpacing: 0.06,
    textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    marginLeft: 41,
    marginRight: 35,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  input: {
    width: 55,
    height: 55,
    backgroundColor: '#F2F2F2',
    borderColor: '#1F1F1F66',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 12,
    fontSize: 20,
    textAlign: 'center',
  },
  inputFilled: {
    borderColor: '#FF0083',
    backgroundColor: '#DD323F1A',
  },
  inputError: {
    borderColor: '#FF0083',
  },
  btnContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  btn: {
    borderRadius: 30,
    backgroundColor: '#FF0083',
    padding: 15,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: '#676464',
    elevation: 5,
  },
  btnDisabled: {
    backgroundColor: '#FFB3D9',
    opacity: 0.7,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  textContainer: {
    marginTop: 40,
    marginBottom: 72,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#000000',
    lineHeight: 22,
    letterSpacing: 0.06,
  },
  errorText: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
});
