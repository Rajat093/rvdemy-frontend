import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCoursesData,
  updateCourseData,
  fetchCourseData,
} from "../../slice/testSlice";
import { useAuth } from "../../../context/auth";

const UpdateCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [changed, setChanged] = useState(false);
  const { id } = useParams();
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.course.data);

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchCoursesData({ token: auth.token }));
    }
  }, [auth]);
  const course = courses?.find((course) => course._id == id);
  useEffect(() => {
    if (course) {
      setName(course.Name);
      setDescription(course.description);
      setThumbnail(course.thumbnail);
    }
  }, [courses, id, auth]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!thumbnail) {
        console.log("Upload thumbnail");
      }
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("description", description);
      if (thumbnail instanceof File) {
        formData.append("thumbnail", thumbnail);
      } else if (thumbnail?.data) {
        // Convert the object to a Blob
        const byteArray = new Uint8Array(thumbnail.data.data);
        const blob = new Blob([byteArray], { type: thumbnail.contentType });
        formData.append("thumbnail", blob);
      } else {
        // Handle the case where thumbnail is not a file (debugging purpose)
        console.warn("Thumbnail is not a file", thumbnail);
      }

      dispatch(updateCourseData({ formData, id: id, token: auth.token }));
      dispatch(fetchCourseData({ id, token: auth.token }));
      navigate(`/course/${id}`);
      console.log("hua kya");
    } catch (error) {
      console.log(error, "while updating course");
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg  dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Update Course
              </h2>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                {/* Textarea */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Course Name
                  </label>
                  <input
                    value={name || ""}
                    onChange={(e) => {
                      setName(e.target.value);
                      setChanged(true);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Course Description
                  </label>
                  <input
                    value={description || ""}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setChanged(true);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Course Thumbnail
                  </label>
                  <input
                    onChange={(e) => {
                      setThumbnail(e.target.value);
                      setChanged(true);
                    }}
                    type="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  disabled={
                    name.length === 0 ||
                    description.length === 0 ||
                    !thumbnail ||
                    !changed
                  }
                  onClick={handleUpdate}
                  type="submit"
                  className={`w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                    name.length === 0 ||
                    description.length === 0 ||
                    !thumbnail ||
                    !changed
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {"Update Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;
