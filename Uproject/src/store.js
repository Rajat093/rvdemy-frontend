import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slice/testSlice";
import sectionReducer from "./slice/sectionSlice";
import chapterReducer from "./slice/chapterSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    section: sectionReducer,
    chapter: chapterReducer,
  },
});
