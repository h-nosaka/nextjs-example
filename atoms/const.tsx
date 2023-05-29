import React from 'react'
import { AlertProps, DialogProps, ToastProps } from '.'

export interface RequestInitExt extends RequestInit {
  data?: { [key: string]: any } | null
}

export interface IApiContext {
  state: { [key: string]: any }
  errors?: { [key: string]: any }
  DeviceId?: string
  Token?: string
  getState: (key: string) => any
  setState: (src: { [key: string]: any }) => void
  showAlert: (props: AlertProps) => void
  showDialog: (props: DialogProps) => void
  showToast: (props: ToastProps) => void
  showHeader: (view: boolean) => void
  showFooter: (view: boolean) => void
  showLoading: () => void
  hideLoading: () => void
  api: (url: string, req: RequestInitExt, option?: ApiOption) => Promise<any>
}

export const defaultApiContext: IApiContext = {
  state: {},
  errors: undefined,
  Token: undefined,
  DeviceId: undefined,
  getState: (key: string): any => {},
  setState: (src: { [key: string]: any }): void => {},
  showAlert: (props: AlertProps): void => {},
  showDialog: (props: DialogProps): void => {},
  showToast: (props: ToastProps): void => {},
  showHeader: (view: boolean): void => {},
  showFooter: (view: boolean): void => {},
  showLoading: (): void => {},
  hideLoading: (): void => {},
  api: (url: string, req: RequestInitExt, option?: ApiOption): Promise<any> => {
    return api(url, req, option)
  },
}

export const AppContext = React.createContext<IApiContext>(defaultApiContext)

export interface ApiOption {
  showLoading?: () => void
  hideLoading?: () => void
  beforeAction?: () => void // リクエスト前に実行する処理
  afterAction?: () => void // リクエスト後に実行する処理
  responseAction?: (response: { response: Response; body: any }) => boolean // responseを直接受け取る場合はtrueを返す
  successStatus?: number[] // 特定のステータスコードが含まれていない場合はrejectする
  failedStatus?: number[] // 特定のステータスコードが含まれている場合はrejectする
}

export const api = (url: string, req: RequestInit, option: ApiOption = {}) => {
  if (!req.headers) {
    req.headers = {}
  }
  req.headers = {
    ...{
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      'Device-Id': localStorage.getItem('DeviceId') || '',
      'Content-Type': 'application/json',
    },
    ...req.headers,
  }
  return new Promise((resolve, reject) => {
    option.showLoading && option.showLoading()
    option.beforeAction && option.beforeAction()
    fetch(url, req)
      .then((rs) => {
        console.log(rs)
        if (option.successStatus && option.successStatus.indexOf(rs.status) === -1) {
          return reject(rs) // 特定のステータスコードの場合はエラーを返却する
        }
        if (option.failedStatus && option.failedStatus.indexOf(rs.status) > -1) {
          return reject(rs) // 特定のステータスコードの場合はエラーを返却する
        }
        return rs.json().then((body) => {
          console.log(body)
          if (option.responseAction && option.responseAction({ response: rs, body: body })) {
            return resolve(rs) // responseAction = trueの場合はレスポンス全体を返却する
          }
          return resolve(body)
        })
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
      .finally(() => {
        option.afterAction && option.afterAction()
        option.hideLoading && option.hideLoading()
      })
  })
}
