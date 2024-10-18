import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ApiUserProfilePath = "http://localhost:3001/api/v1/user/profile";

export const getUserDataThunk = createAsyncThunk(
  "user/getUserDatathunk",
  async (token, thunkApi) => {
    try {
      const userResponse = await fetch(ApiUserProfilePath, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}`},
      });

      const userData = await userResponse.json();
      if (!userResponse.ok) {
        throw new Error(
          userData.message || "Erreur de récupération des données"
        );
      }
      thunkApi.dispatch(populateUserData(userData.body))
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstname: null,
    lastname: null,
  },
  reducers: {
    populateUserData: (currentState, action) => {
      return {
        ...currentState,
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
      };
    },
    updateLastname: (currentState, action) => {
      // rajouter condition avec JWT
      const lastname = { ...currentState, lastname: action.payload };
      return { ...currentState, lastname };
    },
    updateFirstname: (currentState, action) => {
      // rajouter condition avec JWT
      const firstname = { ...currentState, firstname: action.payload };
      return { ...currentState, firstname };
    },
  },
});

export const { populateUserData, updateFirstname, updateLastname} = userSlice.actions