import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateChapterData,
  updateChapterPreview,
} from "../../slice/chapterSlice";
import { useAuth } from "../../../context/auth";
import { Checkbox } from "@material-tailwind/react";

const EditChapter = () => {
  const chapters = useSelector((state) => state.chapter.chapters);
  const course = useSelector((state) => state.course.current);
  const courseId = course?._id;
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const chapter = chapters?.find((chapter) => chapter?._id === id);
  const SectionId = chapter?.SectionId;
  const dispatch = useDispatch();
  const [name, setName] = useState(chapter?.Name);
  const [order, setOrder] = useState(chapter?.order);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(chapter?.VideoUrl);
  const [videoData, setVideoData] = useState(null);
  const [IsPreview, setIsPreview] = useState(false);
  console.log(id, chapters);
  console.log(chapter);
  useEffect(() => {
    // Fetch the video data when the component mounts or when chapter changes
    if (chapter?.VideoUrl) {
      fetchVideoData(chapter.VideoUrl);
    }
  }, [chapter]);

  useEffect(() => {
    if (chapter && Object.keys(chapter).length) {
      setIsPreview(chapter?.IsPreview);
    }
  }, [chapter]);

  const fetchVideoData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      setVideoData(data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);

      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleChapterUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!video) {
        console.log("please upload video");
      }
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("SectionId", SectionId);
      formData.append("order", order);
      if (video !== chapter?.video) {
        formData.append("video", video);
      }

      const payload = {};

      for (let [key, value] of formData.entries()) {
        console.log("---------------------");
        console.log(key, value);

        payload[key] = value;
      }

      dispatch(updateChapterData({ formData, id: id, token: auth.token }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = () => {
    // setPublished((prev) => !prev);
    if (auth.token && IsPreview != undefined) {
      dispatch(
        updateChapterPreview({ id, IsPreview: !IsPreview, token: auth.token })
      );
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
                Update Chapter
              </h2>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label>Chapter Name</label>
                  <input
                    type="text"
                    className="resize-none border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Chapter Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    className="resize-none border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                    onChange={handleVideoChange}
                    required
                  ></input>
                  {videoData && (
                    <video
                      src={URL.createObjectURL(videoData)}
                      controls
                      className="mt-4 w-full h-auto"
                    />
                  )}
                </div>
                <div>
                  <Checkbox
                    label="Allow Preview"
                    onChange={handleCheckboxChange}
                  />
                </div>
                {/* <button
                  disabled={name.length === 0 || !video}
                  type="submit"
                  className={`w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                    name.length === 0 || !video
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {"Edit Chapter->"}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="w-1/3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    {"Cancel x"}
                  </button>
                  <button
                    onClick={handleChapterUpdate}
                    disabled={name?.length === 0 || !video}
                    type="submit"
                    className={`w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                      name?.length === 0 || !video
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {"Edit Chapter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChapter;
