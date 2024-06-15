import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { addSectionData, deleteSectionData } from "../../slice/sectionSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { createChapterData } from "../../slice/chapterSlice";

const AddSection = () => {
  const formSection = useSelector((state) => state.section.formSection);
  const Sections = useSelector((state) => state.section.sections);
  const [Name, setName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [order, setOrder] = useState(
    Sections?.length ? Sections.length + 1 : 1
  );
  const [chapterOrder, setChapterOrder] = useState(
    formSection?.chapters?.length ? formSection?.chapter?.length + 1 : 1
  );
  const [chapterName, setChapterName] = useState("");
  const [video, setVideo] = useState(null);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [auth] = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();

  const SectionId = formSection?._id;

  const navigate = useNavigate();

  //add Section
  const handleAddSection = async (e) => {
    e.preventDefault();
    setOrder((prev) => prev + 1);
    setIsButtonClicked(true);
    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("CourseId", id);
      formData.append("chapters", chapters);
      formData.append("order", order);
      dispatch(addSectionData({ formData, token: auth.token }));
    } catch (error) {
      console.log(error, "while creating course");
    }
  };

  const handleAddChapter = async (e) => {
    e.preventDefault();
    setChapterOrder((prev) => prev + 1);

    setIsButtonClicked(true);
    try {
      if (!video) {
        console.log("Video is necessary");
        return;
      }

      const formData = new FormData();
      formData.append("Name", chapterName);
      formData.append("SectionId", SectionId);
      formData.append("order", chapterOrder);
      formData.append("video", video);

      dispatch(createChapterData({ formData, token: auth.token }));
    } catch (error) {
      console.log(error, "while creating course");
    } finally {
      setChapterName(""), setVideo(null);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteSectionData({ SectionId, token: auth.token }))
      .then(() => {
        navigate(`/course/${id}`);
        console.log("Section deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting section:", error);
      });
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
                Create Section
              </h2>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                {/* Textarea */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Section Name
                  </label>
                  <input
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    disabled={isButtonClicked}
                    required
                  />
                </div>
                {!isButtonClicked ? (
                  <>
                    <button
                      onClick={handleAddSection}
                      disabled={Name.length === 0}
                      type="submit"
                      className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                        Name.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {"Create Section->"}
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label>Chapter Name</label>
                      <input
                        type="text"
                        className="resize-none border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label>Chapter Video</label>
                      <input
                        type="file"
                        accept="video/*"
                        className="resize-none border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
                        onChange={(e) => setVideo(e.target.files[0])}
                      ></input>
                    </div>
                    <button
                      disabled={chapterName.length === 0 || !video}
                      onClick={handleAddChapter}
                      type="submit"
                      className={`w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        chapterName.length === 0 || !video
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {"Add another Chapter->"}
                    </button>
                    <div className="flex justify-between">
                      <button
                        onClick={handleDelete}
                        type="submit"
                        className="w-1/3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        {"Cancel x"}
                      </button>
                      <button
                        disabled={chapterName.length === 0 || !video}
                        onClick={() => navigate(`/course/${courseid}`)}
                        className={`w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                          chapterName.length === 0 || !video
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {"Create->"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSection;
