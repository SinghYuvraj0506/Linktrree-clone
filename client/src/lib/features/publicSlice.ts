import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { axiosServices } from "../utils";
import { Link, Profile } from "../types";

interface publicState {
  data: Profile | null;
  loading: boolean; 
  error: null | string;
}

const initialState: publicState = {
  data: null,
  loading: false,
  error: null,
};

const name = "public";
const extraActions = extraActionsFunction();

export const publicSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => extraReducersFunction(builder),
});

function extraActionsFunction() {
  return {
    getProfileData: getProfileData(),
    redirectToURL: redirectToURL(),
  };


  // create api -------------------------------------
  function getProfileData() {
    return createAsyncThunk(`${name}/getProfileData`, async (slug:string,{rejectWithValue}) => {
      try {
        const response = await axiosServices.get(`/public/getProfile/${slug}`);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "Something went wrong"
        );
      }
    });
  }

  function redirectToURL() {
    return createAsyncThunk(`${name}/redirectToURL`, async (data:Link,{rejectWithValue}) => {
      try {
        window.open(`${import.meta.env.VITE_BACKEND_URL}public/redirect?id=${data?.id}&link=${data?.url}`)
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "Something went wrong"
        );
      }
    });
  }
}

function extraReducersFunction(builder: ActionReducerMapBuilder<publicState>) {
  getProfileReducer(builder);

  function getProfileReducer(builder: ActionReducerMapBuilder<publicState>) {
    builder
      .addCase(extraActions.getProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extraActions.getProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data
        state.error = null;
      })
      .addCase(extraActions.getProfileData.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

}

export const publicActions = { ...publicSlice.actions, ...extraActions };

export default publicSlice.reducer;
