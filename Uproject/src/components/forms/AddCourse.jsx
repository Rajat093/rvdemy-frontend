import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourseData, createCourseData } from "../../slice/testSlice";

import axios from "axios";
import { useAuth } from "../../../context/auth";
const AddCourse = () => {
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [published] = useState(false);
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      if (!thumbnail) {
        console.log("please upload thumbnail");
      }
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("published", published);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/course/create-course",
        formData
      );
      dispatch(addCourseData({ data, token: auth.token }));
      navigate(`/course/${data.Course._id}`);
      console.log(data);
    } catch (error) {
      console.log(error, "while creating course");
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
                Create Course
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
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    className="resize-none border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter markdown here"
                    required
                  ></textarea>
                </div>
                {/* Rendered Markdown */}
                <div className="right-side p-2.5 border border-black min-h-8">
                  <ReactMarkdown>{`${description}`}</ReactMarkdown>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Course Thumbnail
                  </label>
                  <input
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    type="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  onClick={handleAddCourse}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {"Next->"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
