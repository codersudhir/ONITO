// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  step: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  sex: string;
  mobile: string;
  govtIdType: string;
  govtId: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const initialState: UserState = {
  step: 1,
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  sex: '',
  mobile: '',
  govtIdType: '',
  govtId: '',
  address: '',
  state: '',
  city: '',
  country: '',
  pincode: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setSex: (state, action: PayloadAction<string>) => {
      state.sex = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    setGovtIdType: (state, action: PayloadAction<string>) => {
      state.govtIdType = action.payload;
    },
    setGovtId: (state, action: PayloadAction<string>) => {
      state.govtId = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setPincode: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
    resetUser: (state) => {
      return initialState;
    },
  },
});

export const {
  setStep,
  setFirstName,
  setLastName,
  setEmail,
  setAge,
  setSex,
  setMobile,
  setGovtIdType,
  setGovtId,
  setAddress,
  setState,
  setCity,
  setCountry,
  setPincode,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
