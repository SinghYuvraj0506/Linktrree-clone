import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createLinkSchema } from "../schemas";
import { z } from "zod";
import { axiosServices } from "../utils";
import {
  BACKGROUNDOPTIONS,
  BUTTONOPTIONS,
  BUTTONROUNDEDOPTIONS,
} from "../types";

interface appearanceState {
  data: {
    background?: BACKGROUNDOPTIONS;
    backgroundColor?: string | string[];
    image?: string;
    video?: string;
    buttonType?: BUTTONOPTIONS;
    buttonRoundedType?: BUTTONROUNDEDOPTIONS;
    buttonColor?: string;
    buttonfontColor?: string;
  } | null;
  loading: boolean;
  error: null | string;
}

const initialState: appearanceState = {
  data: {
    background: BACKGROUNDOPTIONS.FLAT,
    backgroundColor: "#ffffff",
    buttonType: BUTTONOPTIONS.FILL,
    buttonRoundedType: BUTTONROUNDEDOPTIONS.MEDIUM,
    buttonColor: "#60a5fa", // blue
    buttonfontColor: "#ffffff",
    image:
      "https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg",
  },
  loading: false,
  error: null,
};

const name = "appearance";
const extraActions = extraActionsFunction();

export const appearanceSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateBackground: (
      state,
      action: PayloadAction<{
        background: BACKGROUNDOPTIONS | null;
        backgroundColor: string | string[] | null;
        image: string | null;
      }>
    ) => {
      state.data = {
        ...state.data,
        background: action.payload.background ?? state.data?.background,
        backgroundColor:
          action.payload.backgroundColor ?? state.data?.backgroundColor,
        image: action.payload.image ?? state.data?.image,
      };
    },
    updateButton: (
      state,
      action: PayloadAction<{
        buttonType: BUTTONOPTIONS | null;
        buttonRoundedType: BUTTONROUNDEDOPTIONS | null;
        buttonColor: string | null;
        buttonfontColor: string | null;
      }>
    ) => {
      state.data = {
        ...state.data,
        buttonType: action.payload.buttonType ?? state.data?.buttonType,
        buttonRoundedType:
          action.payload.buttonRoundedType ?? state.data?.buttonRoundedType,
        buttonColor: action.payload.buttonColor ?? state.data?.buttonColor,
        buttonfontColor:
          action.payload.buttonfontColor ?? state.data?.buttonfontColor,
      };
    },
    updateData: (
      state,
      action: PayloadAction<{
        buttonType: BUTTONOPTIONS | null;
        buttonRoundedType: BUTTONROUNDEDOPTIONS | null;
        buttonColor: string | null;
        buttonfontColor: string | null;
        background: BACKGROUNDOPTIONS | null;
        backgroundColor: string | string[] | null;
        image: string | null;
      }>
    ) => {
      state.data = {
        background: action.payload.background ?? state.data?.background,
        image: action.payload.image ?? state.data?.image,
        backgroundColor:
          action.payload.backgroundColor ?? state.data?.backgroundColor,
        buttonType: action.payload.buttonType ?? state.data?.buttonType,
        buttonRoundedType:
          action.payload.buttonRoundedType ?? state.data?.buttonRoundedType,
        buttonColor: action.payload.buttonColor ?? state.data?.buttonColor,
        buttonfontColor:
          action.payload.buttonfontColor ?? state.data?.buttonfontColor,
      };
    },
  },
  extraReducers: (builder) => extraReducersFunction(builder),
});

function extraActionsFunction() {
  return {
    updateUserAppearance: updateUserAppearance(),
  };

  // create api -------------------------------------

  function updateUserAppearance() {
    return createAsyncThunk(
      `${name}/updateUserAppearance`,
      async (data: any, { rejectWithValue }) => {
        try {
          const response = await axiosServices.put(`/user`, {
            templateData: data,
          });
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }
}

function extraReducersFunction(
  builder: ActionReducerMapBuilder<appearanceState>
) {
}

export const appearanceActions = {
  ...appearanceSlice.actions,
  ...extraActions,
};

export default appearanceSlice.reducer;
