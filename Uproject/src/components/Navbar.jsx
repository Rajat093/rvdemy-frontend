import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseData } from "../slice/testSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  let course = useSelector((state) => state.course.current);

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex w-full justify-between">
              <div className="flex-shrink-0 flex items-center">
                <div className="text-white font-bold  tracking-wider text-2xl">
                  <NavLink to="/">RvDemy</NavLink>
                </div>
                {location.pathname == `/course/${course?._id}` && (
                  <div className="text-white font-bold text-2xl mx-6 font-mono  cursor-pointer ">
                    |
                    <span className="hover:text-green-300">
                      <div className="hidden">" "</div> {course?.Name}
                    </span>
                  </div>
                )}
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {auth?.user?.role == "admin" ? (
                  <>
                    {location.pathname === "/" ? (
                      <Link to="/add-course">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3">
                          Add Course
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700"
                >
                  Home
                </Link>

                {!auth.user ? (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700"
                    >
                      SignUp
                    </Link>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 text-white focus:outline-none focus:border-indigo-700"
                      onClick={handleLogout}
                      to="/login"
                    >
                      LogOut
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:bg-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={`${isOpen ? "hidden" : "inline-flex"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                  <path
                    className={`${isOpen ? "inline-flex" : "hidden"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="px-2 pt-2 pb-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
            >
              Home
            </Link>
            {!auth.user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  className="block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  onClick={handleLogout}
                  to="/login"
                >
                  LogOut
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
