import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Image} from 'react-native';

export interface User {
  nickname: string; // 닉네임
  profile: string; // 프로필사진
  phone: string; // 휴대폰번호
  emergency: string; // 비상연락번호
  token: string | undefined | null; // 액세스토큰
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {authorize} = authSlice.actions;
