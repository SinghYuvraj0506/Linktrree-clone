import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import {
  loginFormSchema,
  registerFormSchema,
  updateFormSchema,
} from "../schemas";
import { z } from "zod";
import { axiosServices } from "../utils";
import { AnalyticsData, User } from "../types";
import { fetchInitalData, updateAppearance } from "../store";

interface authState {
  user: User | null;
  analyticsData: AnalyticsData | null;
  loading: boolean; //auth loading state
  funcLoading: boolean;
  error: null | string;
}

const initialState: authState = {
  user: null,
  analyticsData: null,
  loading: false,
  funcLoading: false,
  error: null,
};

const name = "auth";
const extraActions = extraActionsFunction();

export const authSlice = createSlice({
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
    registerUser: registerUser(),
    loginUser: loginUser(),
    getUser: getUser(),
    updateUser: updateUser(),
    logoutUser: logoutUser(),
    checkSlugAvailability: checkSlugAvailability(),
    getAnalytics: getAnalytics(),
  };

  // create api -------------------------------------
  function registerUser() {
    return createAsyncThunk(
      `${name}/registerUser`,
      async (data: z.infer<typeof registerFormSchema>, { rejectWithValue }) => {
        try {
          const response = await axiosServices.post(`/auth/register`, data);
          if (response.data.success) {
            window.open("/onboarding", "_self");
          }
          // return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function loginUser() {
    return createAsyncThunk(
      `${name}/loginUser`,
      async (data: z.infer<typeof loginFormSchema>, { rejectWithValue }) => {
        try {
          const response = await axiosServices.post(`/auth/login`, data);
          if (response.data.success) {
            window.open("/", "_self");
          }
          // return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function getUser() {
    return createAsyncThunk(
      `${name}/getUser`,
      async (data: null, { rejectWithValue }) => {
        try {
          const response = await axiosServices.get(`/auth/me`);
          updateAppearance(response.data?.data?.templateData)
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function logoutUser() {
    return createAsyncThunk(
      `${name}/logoutUser`,
      async (data: null, { rejectWithValue }) => {
        try {
          const response = await axiosServices.get(`/auth/logout`);
          window.open("/", "_self");
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function updateUser() {
    return createAsyncThunk(
      `${name}/updateUser`,
      async (
        data: Partial<z.infer<typeof updateFormSchema>>,
        { rejectWithValue }
      ) => {
        try {
          const response = await axiosServices.put(`/user`, data);
          fetchInitalData()
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function checkSlugAvailability() {
    return createAsyncThunk(
      `${name}/checkSlugAvailability`,
      async (slug: string) => {
        try {
          const response = await axiosServices.get(`/user/checkslug/${slug}`);
          return response.data;
        } catch (err: any) {
          throw new Error(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function getAnalytics() {
    return createAsyncThunk(
      `${name}/getAnalytics`,
      async () => {
        try {
          const response = await axiosServices.get(`/analytics`);
          return response.data;
        } catch (err: any) {
          throw new Error(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }
}

function extraReducersFunction(builder: ActionReducerMapBuilder<authState>) {
  registerUserReducer(builder);
  loginUserReducer(builder);
  getUserReducer(builder);
  getAnalyticsReducer(builder);
  updateUserReducer(builder);

  function registerUserReducer(builder: ActionReducerMapBuilder<authState>) {
    builder
      .addCase(extraActions.registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extraActions.registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(extraActions.registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

  function loginUserReducer(builder: ActionReducerMapBuilder<authState>) {
    builder
      .addCase(extraActions.loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extraActions.loginUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(extraActions.loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

  function getUserReducer(builder: ActionReducerMapBuilder<authState>) {
    builder
      .addCase(extraActions.getUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(extraActions.getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(extraActions.getUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        // state.error = action.payload as string;
      });
  }

  function updateUserReducer(builder: ActionReducerMapBuilder<authState>) {
    builder
      .addCase(extraActions.updateUser.pending, (state) => {
        state.funcLoading = true;
        state.error = null;
      })
      .addCase(extraActions.updateUser.fulfilled, (state) => {
        state.funcLoading = false;
        state.error = null;
      })
      .addCase(extraActions.updateUser.rejected, (state, action) => {
        state.funcLoading = false;
        state.error = action.payload as string;
      });
  }

  function getAnalyticsReducer(builder: ActionReducerMapBuilder<authState>) {
    builder
      .addCase(extraActions.getAnalytics.pending, (state) => {
        state.funcLoading = true;
        state.error = null;
      })
      .addCase(extraActions.getAnalytics.fulfilled, (state, action) => {
        state.funcLoading = false;
        state.analyticsData = action.payload.data
        state.error = null;
      })
      .addCase(extraActions.getAnalytics.rejected, (state, action) => {
        state.funcLoading = false;
        state.error = action.payload as string;
      });
  }
}

export const authActions = { ...authSlice.actions, ...extraActions };

export default authSlice.reducer;
