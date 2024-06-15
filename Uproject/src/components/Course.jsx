import { useEffect, useState } from "react";
import { deleteSectionData, fetchSectionData } from "../slice/sectionSlice";
import {
  deleteCourseData,
  fetchCourseData,
  updatePublishData,
} from "../slice/testSlice";
import { deleteChapterData, fetchChapterData } from "../slice/chapterSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useAuth } from "../../context/auth";
import Login from "../../auth/Login";
import ReactMarkdown from "react-markdown";
import DeleteModal from "./DeleteModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Course = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [chapterIdToDelete, setChapterIdToDelete] = useState(null);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);
  const sections = useSelector((state) => state.section.sections);
  const course = useSelector((state) => state.course.current);
  const chapters = useSelector((state) => state.chapter.chapters);
  const navigate = useNavigate();
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchCourseData({ id, token: auth.token }));
      dispatch(fetchSectionData(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
      dispatch(fetchChapterData());
    }
  }, [id, auth]);
  useEffect(() => {
    if (course && Object.keys(course).length) {
      setPublished(course?.published);
    }
  }, [course]);

  const [openAccordion, setOpenAccordion] = useState(null); // State to manage open accordion
  const [videoSrc, setVideoSrc] = useState(
    chapters.length ? chapters[0].VideoUrl : null
  );

  useEffect(() => {
    if (sections.length > 0) {
      setVideoSrc(chapters[0]?.VideoUrl);
    }
  }, [sections]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index); // Toggle accordion
  };

  // Function to set video source
  const handleVideoClick = (VideoUrl) => {
    setVideoSrc(VideoUrl);
  };

  //toggle

  const handleCheckboxChange = () => {
    // setPublished((prev) => !prev);
    if (auth.token && published != undefined) {
      dispatch(
        updatePublishData({ id, published: !published, token: auth.token })
      );
    }
  };

  const handleOpenModal = (sectionId, chapterId, courseId) => {
    setSectionIdToDelete(sectionId);
    setChapterIdToDelete(chapterId);
    setCourseIdToDelete(courseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSectionIdToDelete(null);
    setChapterIdToDelete(null);
    setCourseIdToDelete(null);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    if (sectionIdToDelete) {
      dispatch(deleteSectionData({ sectionIdToDelete, token: auth.token }))
        .then(() => {
          console.log("Section deleted successfully");
          dispatch(fetchSectionData(id));
        })
        .catch((error) => {
          console.error("Error deleting section:", error);
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }
    if (chapterIdToDelete) {
      dispatch(deleteChapterData({ chapterIdToDelete, token: auth.token }))
        .then(() => {
          console.log("Chapter deleted successfully");
          dispatch(fetchSectionData(id));
        })
        .catch((error) => {
          console.error("Error deleting chapter:", error);
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }
    if (courseIdToDelete) {
      dispatch(deleteCourseData({ courseIdToDelete, token: auth.token }))
        .then(() => {
          navigate("/");
          console.log("Course deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    }
  };

  return (
    <>
      {auth.user ? (
        <>
          {loading ? (
            <div className="flex items-center justify-center w-screen h-ety">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <span>Loading...</span>
            </div>
          ) : (
            <div className="main flex flex-wrap w-screen">
              <div className="left-container w-3/4 h-full">
                <div className="video-container h-3/5 mt-0">
                  <ReactPlayer
                    controls
                    url={videoSrc}
                    width="100%"
                    className="video-player"
                  />
                </div>
                <div className="about-container ml-5">
                  <h3 className="text-2xl font-bold dark:text-white">
                    {" "}
                    About this course
                  </h3>
                  <hr />
                  {course && <ReactMarkdown children={course.description} />}
                </div>
              </div>
              <div className="course-content md:w-1/4 w-full px-5 md:px-0 md:shadow-md mt-4 ">
                {auth.user?.id == course?.createdBy && (
                  <div className="flex justify-around">
                    <Link to={`/add-section/${id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">
                        Add Section
                      </button>
                    </Link>
                    <>
                      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
                        <input
                          type="checkbox"
                          name="autoSaver"
                          className="sr-only"
                          checked={published}
                          onChange={handleCheckboxChange}
                        />
                        <span
                          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                            published ? "bg-blue-400" : "bg-[#CCCCCE]"
                          }`}
                        >
                          <span
                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                              published ? "translate-x-6" : ""
                            }`}
                          ></span>
                        </span>
                        <span className="label flex items-center text-sm font-medium text-black">
                          <span className="pl-1">
                            {" "}
                            {published ? "Published" : "Publish"}{" "}
                          </span>
                        </span>
                      </label>
                      <span className="mt-4 text-blue-600 hover:text-blue-700">
                        <Link
                          to={{
                            pathname: `/update-course/${course._id}`,
                          }}
                        >
                          <EditOutlinedIcon />
                        </Link>
                      </span>
                      <span className="mt-4 text-red-600 hover:text-red-700 justify-end cursor-pointer ">
                        <DeleteOutlineIcon
                          title="Delete Course"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(null, null, course._id);
                          }}
                        />
                      </span>
                    </>
                  </div>
                )}

                <h4 className="p-3 text-2xl font-bold dark:text-white flex justify-center">
                  Course Content
                </h4>

                {sections.length > 0 ? (
                  sections?.map((section, index) => (
                    <div key={index}>
                      <div
                        id={`accordion-collapse-${index}`}
                        data-accordion="collapse"
                      >
                        <h2 id={`accordion-collapse-heading-${index}`}>
                          <button
                            type="button"
                            className="flex items-center justify-between w-full p-5 font-medium bg-zinc-100 text-gray-500 border border-x-0  border-gray-300  dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 aria-expanded:border-b-0"
                            aria-expanded={
                              openAccordion === index ? "true" : "false"
                            }
                            aria-controls={`accordion-collapse-body-${index}`}
                            onClick={() => {
                              toggleAccordion(index);
                              // Reset video source when accordion is clicked
                            }}
                          >
                            <span className="w-full text-left">
                              {section.name}
                            </span>
                            {auth.user?.id == course?.createdBy && (
                              <>
                                <span className="mr-2 text-blue-600 hover:text-blue-700">
                                  <Link
                                    to={{
                                      pathname: `/edit-section/${section._id}`,
                                      state: { name: section.name },
                                    }}
                                  >
                                    <EditOutlinedIcon />
                                  </Link>
                                </span>
                                <span className=" text-red-600 hover:text-red-700">
                                  <DeleteOutlineIcon
                                    className="mr-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenModal(section._id, null, null);
                                    }}
                                  />
                                </span>
                              </>
                            )}

                            <svg
                              data-accordion-icon
                              className={`w-3 h-3 rotate-${
                                openAccordion === index ? "0" : "180"
                              } shrink-0`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5 5 1 1 5"
                              />
                            </svg>
                          </button>
                        </h2>
                        <div
                          id={`accordion-collapse-body-${index}`}
                          className={`${
                            openAccordion === index ? "block" : "hidden"
                          }`}
                          aria-labelledby={`accordion-collapse-heading-${index}`}
                        >
                          <div className=" bg-white border border-t-0 border-x-0  border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full">
                            {section.chapters?.map((item, idx) => (
                              <p
                                key={idx}
                                className="px-5 p-3 text-gray-500 dark:text-gray-400 hover:bg-slate-300 w-full"
                              >
                                <span className="flex">
                                  {item.IsPreview ? (
                                    <>
                                      <span className="w-full flex justify-between cursor-pointer mr-1">
                                        <span
                                          className="text-left underline text-blue-600 "
                                          onClick={() =>
                                            handleVideoClick(item.VideoUrl)
                                          }
                                        >
                                          {item.Name}
                                        </span>
                                        <span className="underline text-blue-600">
                                          Preview
                                        </span>
                                      </span>
                                    </>
                                  ) : auth.user?.id != course?.createdBy ? (
                                    <>
                                      <span
                                        className="w-full text-left disabled: cursor-default"
                                        disabled
                                      >
                                        {item.Name}{" "}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        className="w-full text-left cursor-pointer"
                                        onClick={() =>
                                          handleVideoClick(item.VideoUrl)
                                        }
                                      >
                                        {item.Name}{" "}
                                      </span>
                                    </>
                                  )}

                                  {auth.user?.id == course?.createdBy && (
                                    <>
                                      <span className=" text-blue-600 hover:text-blue-700 justify-end">
                                        <Link to={`/edit-chapter/${item._id}`}>
                                          <EditOutlinedIcon />
                                        </Link>
                                      </span>
                                      <span className=" text-red-600 hover:text-red-700 justify-end">
                                        <DeleteOutlineIcon
                                          className="mr-2"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenModal(
                                              null,
                                              item._id,
                                              null
                                            );
                                          }}
                                        />
                                      </span>
                                    </>
                                  )}
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No Data</div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <DeleteModal
        show={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Course;
