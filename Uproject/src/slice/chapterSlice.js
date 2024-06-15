import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChapterData = createAsyncThunk(
  "chapter/fetchChapterData",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/chapter/get-chapters"
      );

      return response.data.chapters;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const createChapterData = createAsyncThunk(
  "chapter/createChapterData",
  async (chapterData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/chapter/create-chapter",
        chapterData.formData,
        {
          headers: {
            Authorization: chapterData.token,
          },
        }
      );

      return response.data.chapter;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const updateChapterData = createAsyncThunk(
  "chapter/updateChapterData",
  async (chapterData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/chapter/update-chapter/${chapterData.id}`,
        chapterData.formData,
        {
          headers: {
            Authorization: chapterData.token,
          },
        }
      );

      return response.data.chapter;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const updateChapterPreview = createAsyncThunk(
  "chapter/updateChapterPreview",
  async (chapterData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/chapter/change-preview/${chapterData.id}`,
        { IsPreview: chapterData.IsPreview },
        {
          headers: {
            Authorization: chapterData.token,
          },
        }
      );

      return response.data.chapter;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const deleteChapterData = createAsyncThunk(
  "chapter/deleteChapterData",
  async (chapterData) => {
    console.log(chapterData);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/chapter/delete-chapter/${chapterData.chapterIdToDelete}`,
        {
          headers: {
            Authorization: chapterData.token,
          },
        }
      );

      return response.data.chapter;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const chapterSlice = createSlice({
  name: "chapter",
  initialState: {
    chapters: [],
    formChapter: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getChapterData(state, action) {
      state.chapters = action.payload;
    },
    addChapterData(state, action) {
      state.formChapter = [...state.formChapter, action.payload];
    },
    editChapterData(state, action) {
      state.formChapter = [...state.formChapter, action.payload];
    },
    removeChapterData(state, action) {
      state.chapters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapterData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchChapterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chapters = action.payload;
      })
      .addCase(fetchChapterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createChapterData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createChapterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formChapter = action.payload;
      })
      .addCase(createChapterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteChapterData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteChapterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formChapter = action.payload;
      })
      .addCase(deleteChapterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateChapterData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateChapterData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formChapter = action.payload;
      })
      .addCase(updateChapterData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  getChapterData,
  addChapterData,
  removeChapterData,
  editChapterData,
} = chapterSlice.actions;
export default chapterSlice.reducer;
