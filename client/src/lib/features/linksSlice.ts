import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { createLinkSchema } from "../schemas";
import { z } from "zod";
import { axiosServices } from "../utils";
import { Link } from "../types";

interface linkState {
  links: Link[];
  loading: boolean;   
  funcLoading: boolean;   
  error: null | string;
}

const initialState: linkState = {
  links: [],
  loading: false,
  funcLoading: false,
  error: null,
};

const name = "links";
const extraActions = extraActionsFunction();

export const linkSlice = createSlice({
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
    createLink: createLink(),
    updateLink: updateLink(),
    deleteLink: deleteLink(),
    getAllUserLinks: getAllUserLinks()
  };

  // create api -------------------------------------
  function createLink() {
    return createAsyncThunk(
      `${name}/createLink`,
      async (data: z.infer<typeof createLinkSchema>, { rejectWithValue }) => {
        try {
          const response = await axiosServices.post(`/links`, data);
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function updateLink() {
    return createAsyncThunk(
      `${name}/updateLink`,
      async (data: Partial<{obj: any , id: string}>, { rejectWithValue }) => {
        try {
          const response = await axiosServices.put(`/links/${data.id}`, data.obj);
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function deleteLink() {
    return createAsyncThunk(
      `${name}/deleteLink`,
      async (id:string, { rejectWithValue }) => {
        try {
          const response = await axiosServices.delete(`/links/${id}`);
          return response.data;
        } catch (err: any) {
          return rejectWithValue(
            err?.response?.data?.message || "Something went wrong"
          );
        }
      }
    );
  }

  function getAllUserLinks() {
    return createAsyncThunk(`${name}/getAllUserLinks`, async (data:null,{rejectWithValue}) => {
      try {
        const response = await axiosServices.get(`/links/user`);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(
          err?.response?.data?.message || "Something went wrong"
        );
      }
    });
  }

}

function extraReducersFunction(builder: ActionReducerMapBuilder<linkState>) {
  createLinkReducer(builder);
  updateLinkReducer(builder);
  deleteLinkReducer(builder);
  getAllUserLinksReducer(builder)

  function createLinkReducer(builder: ActionReducerMapBuilder<linkState>) {
    builder
      .addCase(extraActions.createLink.pending, (state) => {
        state.funcLoading = true;
        state.error = null;
      })
      .addCase(extraActions.createLink.fulfilled, (state, action) => {
        state.funcLoading = false;
        state.links = [...state.links, action.payload.data]
        state.error = null;
      })
      .addCase(extraActions.createLink.rejected, (state, action: any) => {
        state.funcLoading = false;
        state.error = action.payload as string;
      });
  }

  function updateLinkReducer(builder: ActionReducerMapBuilder<linkState>) {
    builder
      .addCase(extraActions.updateLink.pending, (state) => {
        state.funcLoading = true;
        state.error = null;
      })
      .addCase(extraActions.updateLink.fulfilled, (state, action) => {
        state.funcLoading = false;
        state.links = state.links.map((e)=>{
          if(e.id === action.payload?.data?.id){
            return action.payload.data
          }
          return e
        })
        state.error = null;
      })
      .addCase(extraActions.updateLink.rejected, (state, action: any) => {
        state.funcLoading = false;
        state.error = action.payload as string;
      });
  }

  function deleteLinkReducer(builder: ActionReducerMapBuilder<linkState>) {
    builder
      .addCase(extraActions.deleteLink.pending, (state) => {
        state.funcLoading = true;
        state.error = null;
      })
      .addCase(extraActions.deleteLink.fulfilled, (state, action) => {
        state.funcLoading = false;
        state.links = state.links.filter((e)=>e.id !== action.payload?.data?.id)
        state.error = null;
      })
      .addCase(extraActions.deleteLink.rejected, (state, action: any) => {
        state.funcLoading = false;
        state.error = action.payload as string;
      });
  }


  function getAllUserLinksReducer(builder: ActionReducerMapBuilder<linkState>) {
    builder
      .addCase(extraActions.getAllUserLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(extraActions.getAllUserLinks.fulfilled, (state,action) => {
        state.loading = false;
        state.links = action.payload.data
        state.error = null;
      })
      .addCase(extraActions.getAllUserLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

}

export const linkActions = { ...linkSlice.actions, ...extraActions };

export default linkSlice.reducer;
