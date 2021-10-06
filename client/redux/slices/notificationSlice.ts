import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationStatusEnum } from '../../components/notification/notification';

export interface NotificationState {
    status: NotificationStatusEnum
    header: string
    content: string
    isActive: boolean
}

const initialState: NotificationState = {
    status: NotificationStatusEnum.Successfull,
    header: 'Notification Header',
    content: 'Woohoo, you&apos;re reading this text in a modal!',
    isActive: false
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        newNotification: (state, action: PayloadAction<NotificationState>) => {
            return state = action.payload
        },
        closeNotification: (state, action: PayloadAction<NotificationState>) => {
            return state = initialState
        }
    }
})

export const { newNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer