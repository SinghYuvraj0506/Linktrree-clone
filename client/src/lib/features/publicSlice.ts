import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiosServices } from "../utils";
import { Link, Profile } from "../types";
import { updateAppearance } from "../store";
import { appearanceActions } from "./appearanceSlice";

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
    updateLockStatus: (state, action: PayloadAction<{ linkId: string }>) => {
      state.data = {
        ...state.data as any,
        links:
          state.data?.links?.map((e) => {
            if (e.id === action.payload.linkId) {
              return {
                ...e,
                isLocked: false,
              };
            }
            return e;
          }) ?? [],
      };
    },
  },
  extraReducers: (builder) => extraReducersFunction(builder),
});

function extraActionsFunction() {
  return {
    getProfileData: getProfileData(),
    redirectToURL: redirectToURL(),
    checkUnlock: checkUnlock(),
  };

  // create api -------------------------------------
  function getProfileData() {
    return createAsyncThunk(
      `${name}/getProfileData`,
      async (slug: string, { rejectWithValue, dispatch }) => {
        try {
          const response = await axiosServices.get(
            `/public/getProfile/${slug}`
          );

          if(response.data?.data?.redirectTo){
            return window.open(response.data?.data?.redirectTo,"_self")
          }

          dispatch(
            appearanceActions.updateData(
              response.data?.data?.templateData ?? {}
            )
          );
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function redirectToURL() {
    return createAsyncThunk(
      `${name}/redirectToURL`,
      async (data: Link, { rejectWithValue }) => {
        try {
          window.open(
            `${import.meta.env.VITE_BACKEND_URL}public/redirect?id=${
              data?.id
            }&link=${data?.url}`
          );
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function checkUnlock() {
    return createAsyncThunk(
      `${name}/unlockLink`,
      async (data: { id: string; value: string }, { rejectWithValue,dispatch }) => {
        try {
          const response = await axiosServices.get(
            `public/unlock/${data?.id}?value=${data?.value}`
          );
          if(response.data.data.success){
            dispatch(publicActions.updateLockStatus({linkId: data.id}))
            return true;
          }
          return false;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
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
        state.data = action.payload.data;
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
