import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoursesData = createAsyncThunk(
  "course/fetchCoursesData",
  async (token, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/course/get-courses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(setLoading(false));
      return response.data.courses;
    } catch (error) {
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const setLoading = (loading) => {
  return {
    type: "course/setLoading",
    payload: loading,
  };
};

export const fetchCourseData = createAsyncThunk(
  "course/fetchCourseData",
  async (course) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/course/get-course/${course.id}`,
      {
        headers: {
          Authorization: course.token,
        },
      }
    );

    return response.data.course;
  }
);
export const addCourseData = createAsyncThunk(
  "course/addCourseData",
  async (add) => {
    const response = await axios.post(
      `http://localhost:8080/api/v1/course/create-course`,
      add.data.course,
      {
        headers: {
          Authorization: add.token,
        },
      }
    );

    return response.data;
  }
);

export const updatePublishData = createAsyncThunk(
  "course/updatePublishData",
  async (receive) => {
    const response = await axios.patch(
      `http://localhost:8080/api/v1/course/update-published/${receive.id}`,
      { published: receive.published },
      {
        headers: {
          Authorization: receive.token,
        },
      }
    );

    return response.data.course;
  }
);

export const updateCourseData = createAsyncThunk(
  "course/updateCourseData",
  async (receive) => {
    const response = await axios.put(
      `http://localhost:8080/api/v1/course/update-course/${receive.id}`,
      receive.formData,
      {
        headers: {
          Authorization: receive.token,
        },
      }
    );

    return response.data.course;
  }
);

export const deleteCourseData = createAsyncThunk(
  "course/deleteCourseData",
  async (receive) => {
    await axios.delete(
      `http://localhost:8080/api/v1/course/delete-course/${receive.courseIdToDelete}`,

      {
        headers: {
          Authorization: receive.token,
        },
      }
    );
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {
    getCoursesData(state, action) {
      state.data = action.payload;
    },
    getCourseData(state, action) {
      state.current = action.payload;
    },
    createCourseData(state, action) {
      state.current = action.payload;
    },
    changePublishData(state, action) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCoursesData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCoursesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCoursesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCourseData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCourseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(addCourseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePublishData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePublishData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(updatePublishData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  getCourseData,
  getCoursesData,
  createCourseData,
  changePublishData,
} = courseSlice.actions;
export default courseSlice.reducer;
