import React from 'react'
import {toast} from '@backpackapp-io/react-native-toast'
import { MaterialIcons } from '@expo/vector-icons';

type ToastType = 'success' | 'error'
type ToastOptions = {
    message: string;
    duration?: number;
}

export default function useAppToast() {
    const showToast = (type:ToastType, {message, duration = 2000}: ToastOptions) => {
        const isSuccess = type === 'success';

        toast[type](message,{
            styles:{
                text: {
                    fontWeight:'700',
                    color:'#fff',
                },
                view: {
                    backgroundColor: isSuccess ? 'green' : 'red',
                    borderRadius: 5,
                },
            },
            icon: (
                <MaterialIcons
                name={isSuccess ? 'check-circle' : 'error'}
                size={24}
                color={'#fff'}
                />
            ),
            duration
        })
    }
  return {
    success: (message:string, duration?:number) => showToast('success', {message,duration}),
    error: (message:string, duration?:number) => showToast('error', {message,duration})
  }
}
