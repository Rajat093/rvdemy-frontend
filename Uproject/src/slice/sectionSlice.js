import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSectionData = createAsyncThunk(
  "section/fetchSectionData",
  async (CourseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/section/get-sections/${CourseId}`
      );

      return response.data.sections;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);
export const addSectionData = createAsyncThunk(
  "section/addSectionData",
  async (receive) => {
    console.log(receive);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/section/create-section`,
        receive.formData,
        {
          headers: {
            Authorization: receive.token,
          },
        }
      );

      return response.data.section;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const editSectionData = createAsyncThunk(
  "section/editSectionData",
  async (change) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/section/update-section/${change.id}`,
        { formData: change.payload },
        {
          headers: {
            Authorization: change.token,
          },
        }
      );

      return response.data.section;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const deleteSectionData = createAsyncThunk(
  "section/deleteSectionData",
  async (receive) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/section/delete-section/${receive.sectionIdToDelete}`,
        {
          headers: {
            Authorization: receive.token,
          },
        }
      );
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sections: [],
    formSection: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getSectionData(state, action) {
      state.sections = action.payload;
    },
    createSectionData(state, action) {
      state.formSection = [...state.formSection, action.payload];
    },
    removeSectionData(state, action) {
      state.sections = action.payload;
    },
    changeSectionData(state, action) {
      state.sections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSectionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections = action.payload;
      })
      .addCase(fetchSectionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSectionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addSectionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formSection = action.payload;
      })
      .addCase(addSectionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSectionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteSectionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formSection = action.payload;
      })
      .addCase(deleteSectionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editSectionData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editSectionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formSection = action.payload;
      })
      .addCase(editSectionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  getSectionData,
  createSectionData,
  removeSectionData,
  changeSectionData,
} = sectionSlice.actions;
export default sectionSlice.reducer;
