import { Dispatch, PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit'
import { UserInforItem } from '../customer/da'
import { CustomerController } from '../customer/controller'
import { AccountController } from './controller'

interface AccountSimpleResponse {
    data?: UserInforItem,
    onLoading?: boolean,
    type?: string
}

const initState: AccountSimpleResponse = {
    data: undefined,
    onLoading: false
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initState,
    reducers: {
        handleActions: (state, action: PayloadAction<any>) => {
            console.log(action.payload.type)
            switch (action.payload.type) {
                case 'GETINFOR':
                    state.data = action.payload.data
                    break;
                case 'LOGOUT':
                    state.data = undefined
                    state.onLoading = false
                    state.type = undefined
                    break;
                // case 'CHANGEPASS':
                //     state.data = action.payload.data
                //     break;
                default:
                    break;
            }
            state.onLoading = false
        },
        onFetching: (state) => {
            state.onLoading = true
        },
        onResetAccount: (state) => {
            state.data = undefined
            state.onLoading = false
            state.type = undefined
        }
    },
})

const { handleActions, onFetching, onResetAccount } = accountSlice.actions

export default accountSlice.reducer
export { onResetAccount }

export class AccountActions {
    static getInfor = (dispatch: Dispatch<UnknownAction>) => {
        dispatch(onFetching())
        CustomerController.getInfor().then(res => {
            if (res) {
                dispatch(handleActions({
                    type: 'GETINFOR',
                    data: res,
                }))
            }
        })
    }

    static logout = async (dispatch: Dispatch<UnknownAction>) => {
        dispatch(onFetching())
        AccountController.logout()
        dispatch(handleActions({
            type: 'LOGOUT',
        }))
    }
}