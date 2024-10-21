import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogout } from "../UserSlice";

const ApiLoginPath = "http://localhost:3001/api/v1/user/login";

/** loginThunk prend en parametre 
 * @param {object} data qui est un objet qui doit contenir {
 * email : email,
 * password : password,
 * navigate (du hook useNavigate de react-router-dom pour faire la redirection après avoir réussi à se login)
 * }
 */
export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (data, thunkApi) => {
    try {
      const loginResponse = await fetch(ApiLoginPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const loginData = await loginResponse.json()
      if(!loginResponse.ok){
        throw new Error(loginData.message || "Erreur à l'authentification")
      }
      thunkApi.dispatch(setAuthToken(loginData.body.token))
      localStorage.setItem('token', loginData.body.token)
      data.navigate('/user')

      
    } catch (error) {

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async (navigate ,thunkApi) => {
  thunkApi.dispatch(authLogout())
  thunkApi.dispatch(userLogout())
  navigate('/')
}) 




export const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem('token') || null },
  reducers: {
    setAuthToken: (currentState, action) => {
      return { ...currentState, token : action.payload};
    },
    authLogout: (currentState) => {
      localStorage.removeItem('token');
      return { ...currentState, token: null };
    },
  },
});

export const {setAuthToken, authLogout } = authSlice.actions