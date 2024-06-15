import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoursesData } from "../slice/testSlice";
import { useAuth } from "../../context/auth.jsx";

import ReactMarkdown from "react-markdown";

const Home = () => {
  const courses = useSelector((state) => state.course.data);
  const loading = useSelector((state) => state.course.loading);
  const [auth] = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoursesData(auth.token));
  }, [auth]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {loading ? (
          <div className="flex items-center justify-center w-screen h-screen">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {Array.isArray(courses) &&
              courses?.map((item) => (
                <div
                  className="w-full md:p-4 md:w-1/2 lg:w-1/4 "
                  key={item._id}
                >
                  <Link to={`/course/${item._id}`} title={item.Name}>
                    <div className="max-w-sm overflow-hidden m-4 shadow-md p-2">
                      <img
                        className="w-full border border-black h-40"
                        src={`http://localhost:8080/api/v1/course/get-thumbnail/${item._id}`}
                        alt={item.Name}
                      />

                      <div className="p-2">
                        <div className="font-bold text-lg mb-2">
                          {item.Name.substring(0, 20)}...
                        </div>

                        <div className="text-gray-700 text-base">
                          <ReactMarkdown>{`${item.description}`}</ReactMarkdown>
                        </div>

                        <button className="bg-purple-700 w-full px-4 py-2 rounded-md text-white block mx-auto mt-4">
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
