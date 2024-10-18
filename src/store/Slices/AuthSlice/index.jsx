import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ApiLoginPath = "http://localhost:3001/api/v1/user/login";

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (credentials, thunkApi) => {
    try {
      console.log(credentials)
      const loginResponse = await fetch(ApiLoginPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const loginData = await loginResponse.json()
      if(!loginResponse.ok){
        throw new Error(loginData.message || "Erreur à l'authentification")
      }
      thunkApi.dispatch(setAuthToken(loginData.body.token))
      localStorage.setItem('token', loginData.body.token)
      
    } catch (error) {

      return thunkApi.rejectWithValue(error.message);
    }
  }
);



export const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    setAuthToken: (currentState, action) => {
      return { ...currentState, token : action.payload};
    },
    logout: (currentState) => {
      localStorage.removeItem('token');
      return { ...currentState, token: null };
    },
  },
});

export const {setAuthToken, logout } = authSlice.actions