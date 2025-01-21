import { Modal } from "@/components/Modal";
import { config } from "@/config";
import { loginVerifier, tempRole } from "@/features/auth/loginSlice/loginSlice";
import { signUpVerifier } from "@/features/auth/signUpSlice/signUpSlice";
import { toggleDarkMode } from "@/features/darkMode/darkModeSlice";
import {
  useAppDispatch,
  useAuth,
  useGetAdminNoticeSelector,
  useLoginSelector,
} from "@/hooks";
import { getAdminNotice } from "@/services/adminNotice/adminNotice";
import { logout } from "@/services/auth/auth";
import { Icons } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../Auth/Auth";
import { menus } from "./navData";

export const Navbar = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const DarkModeDispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isPropertyOwner, isRenter, tempRenter, tempPo } =
    useLoginSelector();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (tempRenter) {
        navigate("/renteradmin/dashboard");
        dispatch(tempRole());
      } else if (tempPo) {
        navigate("/propertyadmin/dashboard");
        dispatch(tempRole());
      }
    }
  }, [isAuthenticated, isRenter, isPropertyOwner, navigate]);

  useAuth();

  useEffect(() => {
    const [navigationEntry] = performance.getEntriesByType("navigation");
    if (navigationEntry && navigationEntry.type === "reload") {
      dispatch(signUpVerifier());
      dispatch(loginVerifier());
    }
    dispatch(getAdminNotice());
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(signUpVerifier());
    dispatch(loginVerifier());
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const location = useLocation();
  const { data } = useGetAdminNoticeSelector();

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white md:px-0 px-4 mx-auto transition-shadow duration-300 dark:bg-darkMode ${
        (location.pathname === "/print-application" && "hidden") ||
        (location.pathname === "/RenterInvoice" && "hidden") ||
        (location.pathname === "/print-extra-invoice" && "hidden") ||
        (location.pathname === "/print-address" && "hidden") ||
        (location.pathname === "/print-lease" && "hidden") ||
        (location.pathname === "/print-invoice" && "hidden")
      }  ${isScrolled ? "shadow-custom-light dark:shadow-custom-dark" : ""}`}
    >
      {data && (
        <p className="bg-red-500 py-2 w-full text-center text-white text-sm">
          {data}
        </p>
      )}
      <nav
        aria-label="main-nav"
        className="mx-auto max-w-[1440px] md:px-6 flex justify-between items-center z-[99999999]  py-5"
      >
        <div>
          {darkMode ? (
            <NavLink to="/" className="">
              <img
                src={`${config.url.ASSET_URL}assets/LogoDarkVersion.png`}
                className="md:max-w-40 max-w-32"
                alt="Logo"
              />
            </NavLink>
          ) : (
            <NavLink to="/" className="">
              <img
                src={`${config.url.ASSET_URL}assets/RentyardLogo.png`}
                className="md:max-w-40 max-w-32"
                alt="Logo"
              />
            </NavLink>
          )}
        </div>
        <div className="hidden xl:flex items-center space-x-8">
          {menus.map((menu) => {
            if (
              !isAuthenticated &&
              (menu.link === "/renteradmin/dashboard" ||
                menu.link === "/propertyadmin/dashboard" ||
                menu.link === "/propertyadmin/allproperty")
            ) {
              return null;
            }
            if (!isAuthenticated && menu.link === "/help") {
              return (
                <button
                  onClick={openModal}
                  className="text-lg font-medium hover:text-blue-700"
                >
                  Help Portal
                </button>
              );
            }
            if (isRenter && menu.link === "/propertyadmin/allproperty") {
              return null;
            }
            if (isRenter && menu.link === "/propertyadmin/dashboard") {
              return null;
            }
            if (isPropertyOwner && menu.link === "/renteradmin/dashboard") {
              return null;
            }
            return (
              <NavLink
                key={menu.name}
                to={menu.link}
                className="text-lg font-medium hover:text-blue-700"
              >
                {menu.name}
              </NavLink>
            );
          })}
          {!isAuthenticated && (
            <button
              onClick={openModal}
              className="text-lg font-medium hover:text-blue-700"
            >
              Add Property
            </button>
          )}
          <NavLink
            to={"/contact"}
            className="text-lg font-medium hover:text-blue-700"
          >
            Contact Us
          </NavLink>
        </div>
        <div className="flex items-center gap-6">
          {!isAuthenticated && (
            <>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Welcome to RentYard"}
                width={"w-full max-w-5xl"}
              >
                <Auth closeSignUpPopUp={closeModal} />
              </Modal>
              <div className="flex items-center gap-6">
                <div className="sm:flex items-center space-x-4 hidden">
                  <Icons.Sun
                    className={`dark:text-white text-lg transition-transform dark:opacity-50 opacity-100`}
                  />
                  <label
                    htmlFor="dark-mode-toggle"
                    className="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      id="dark-mode-toggle"
                      type="checkbox"
                      className="sr-only"
                      onChange={() => DarkModeDispatch(toggleDarkMode())}
                    />
                    <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner"></div>
                    <span
                      className={`absolute left-0 top-0 w-6 h-6 bg-white translate-x-0 dark:translate-x-full dark:bg-gray-900 rounded-full shadow transform transition-transform`}
                    ></span>
                  </label>
                  <Icons.Moon
                    className={`text-gray-800 text-lg transition-transform dark:opacity-100 dark:text-white opacity-50`}
                  />
                </div>
                <button
                  onClick={openModal}
                  className="md:text-base text-sm font-bold py-2.5 px-5 rounded bg-primary-color text-white
              transition-all duration-300 hover:bg-blue-500 hover:shadow-lg dark:bg-blue-900 dark:hover:bg-blue-800 darkText"
                >
                  Login/Signup
                </button>
              </div>
            </>
          )}
          {isAuthenticated && (
            <div className="flex items-center gap-6">
              <div className="sm:flex items-center space-x-4 hidden">
                <Icons.Sun
                  className={`dark:text-white text-lg transition-transform dark:opacity-50 opacity-100`}
                />
                <label
                  htmlFor="dark-mode-toggle"
                  className="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    id="dark-mode-toggle"
                    type="checkbox"
                    className="sr-only"
                    onChange={() => DarkModeDispatch(toggleDarkMode())}
                  />
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner"></div>
                  <span
                    className={`absolute left-0 top-0 w-6 h-6 bg-white translate-x-0 dark:translate-x-full dark:bg-gray-900 rounded-full shadow transform transition-transform`}
                  ></span>
                </label>
                <Icons.Moon
                  className={`text-gray-800 text-lg transition-transform dark:opacity-100 dark:text-white opacity-50`}
                />
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="md:text-base text-sm  font-bold md:py-2.5 py-2 px-4 rounded bg-primary-color text-white
            transition-all duration-300 hover:bg-blue-500 hover:shadow-lg dark:bg-blue-900 dark:hover:bg-blue-800 darkText"
              >
                Logout
              </button>
            </div>
          )}
          <div className="xl:hidden">
            <button
              aria-label="menu"
              onClick={toggleMobileMenu}
              className="hover:text-blue-700"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <nav
        aria-label="phone-nav"
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:hidden h-screen overflow-hidden bg-white absolute top-0 left-0 right-0 transition-transform duration-500 ease-in-out dark:bg-darkMode`}
      >
        <div className="w-full flex justify-end items-center pr-5 pt-5">
          <button
            className="text-5xl"
            aria-label="Close"
            onClick={toggleMobileMenu}
          >
            <Icons.Close className="text-4xl" />
          </button>
        </div>
        <div className="flex flex-col xl:items-center h-full pl-8 space-y-4 bg-white py-4 dark:bg-darkMode">
          {menus.map((menu) => {
            if (
              !isAuthenticated &&
              (menu.link === "/renteradmin/dashboard" ||
                menu.link === "/propertyadmin/dashboard" ||
                menu.link === "/propertyadmin/allproperty")
            ) {
              return null;
            }
            if (isRenter && menu.link === "/propertyadmin/dashboard") {
              return null;
            }
            if (isPropertyOwner && menu.link === "/renteradmin/dashboard") {
              return null;
            }
            return (
              <div key={menu.name}>
                <NavLink
                  key={menu.name}
                  to={menu.link}
                  className="text-lg font-medium hover:text-blue-700"
                  onClick={toggleMobileMenu}
                >
                  {menu.name}
                </NavLink>
                <hr />
              </div>
            );
          })}
          {!isAuthenticated && (
            <>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Welcome to RentYard"}
                width={"w-full max-w-5xl"}
                closeOnOutsideClick={true}
              >
                <Auth />
              </Modal>
              <button
                onClick={openModal}
                className="text-lg font-medium hover:text-blue-700 text-start"
              >
                Login/Signup
              </button>
            </>
          )}
          <div className="flex items-center space-x-4">
            <Icons.Sun
              className={`dark:text-white text-lg transition-transform dark:opacity-50 opacity-100`}
            />
            <label
              htmlFor="dark-mode-toggle"
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                id="dark-mode-toggle"
                type="checkbox"
                className="sr-only"
                onChange={() => DarkModeDispatch(toggleDarkMode())}
              />
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner"></div>
              <span
                className={`absolute left-0 top-0 w-6 h-6 bg-white translate-x-0 dark:translate-x-full dark:bg-gray-900 rounded-full shadow transform transition-transform`}
              ></span>
            </label>
            <Icons.Moon
              className={`text-gray-800 text-lg transition-transform dark:opacity-100 dark:text-white opacity-50`}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
