import React from 'react'
import { AlertProps, DialogProps, ToastProps } from '.'

export const AppContext = React.createContext({
  getState: (key: string): any => {},
  setState: (key: string, value: any): void => {},
  showAlert: (props: AlertProps): void => {},
  showDialog: (props: DialogProps): void => {},
  showToast: (props: ToastProps): void => {},
  showHeader: (view: boolean): void => {},
  showFooter: (view: boolean): void => {},
})
