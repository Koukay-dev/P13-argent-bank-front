import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirstname, getLastname, getToken } from "../../Selectors";

const ApiUserProfilePath = "http://localhost:3001/api/v1/user/profile";

export const getUserDataThunk = createAsyncThunk(
  "user/getUserDatathunk",
  async (token, thunkApi) => {
    try {
      const userResponse = await fetch(ApiUserProfilePath, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = await userResponse.json();
      if (!userResponse.ok) {
        throw new Error(
          userData.message || "Erreur de récupération des données"
        );
      }
      thunkApi.dispatch(populateUserData(userData.body));
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const modifyUserDataThunk = createAsyncThunk(
  "user/modifyUserDataThunk",
  async ({ firstname, lastname }, thunkApi) => {
    try {
      firstname = firstname?.trim() ? firstname : getFirstname(thunkApi.getState());
      lastname = lastname?.trim() ? lastname : getLastname(thunkApi.getState());
      console.log(firstname, lastname);
      const userResponse = await fetch(ApiUserProfilePath, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken(thunkApi.getState())}`,
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname,
        }),
      });

      const userData = await userResponse.json();
      console.log(userData);
      if (!userResponse.ok) {
        throw new Error(
          userData.message || "Erreur de récupération des données"
        );
      }
      thunkApi.dispatch(populateUserData(userData.body));
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const userInitialState = {
  firstname: null,
  lastname: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState ,
  reducers: {
    populateUserData: (currentState, action) => {
      return {
        ...currentState,
        firstname: action.payload.firstName,
        lastname: action.payload.lastName,
      };
    },
    userLogout: () => {
      return userInitialState
    }

  },
});

export const {
  populateUserData,
  updateFirstname,
  updateLastname,
  updateFullname,
  userLogout
} = userSlice.actions;
