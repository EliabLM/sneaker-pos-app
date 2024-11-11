import { User } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer