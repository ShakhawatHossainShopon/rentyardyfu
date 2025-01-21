import { useEffect, useRef, useState } from "react";
import { navigatorData } from "./NavigatorData";

export const Navigator = () => {
  const navigatorHeight = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    navigatorHeight.current = document.querySelector("nav").offsetHeight;
    navigatorData.map((item) => {
      document.querySelectorAll(item.hash).forEach((section) => {
        section.style.paddingTop = `${navigatorHeight.current}px`;
      });
    });
  }, []);

  const handleScroll = (event, sectionId) => {
    event.preventDefault();
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    const sectionPosition = section.offsetTop - navigatorHeight.current;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  };

  return (
    <nav className="px-4 sticky top-16 bg-white py-5 border-b z-30 hidden md:block dark:bg-darkMode">
      <ul className="flex flex-wrap justify-start items-center md:space-x-5 font-medium">
        {navigatorData.map((item) => {
          return (
            <li
              className="lg:text-base text-sm ml-2 mt-2"
              key={item.hash}
              id={item.hash}
            >
              <a
                className={`${
                  activeSection === item.hash.slice(1)
                    ? "text-blue-600 underline underline-offset-8"
                    : ""
                }`}
                href={item.hash}
                onClick={(e) => handleScroll(e, item.hash.slice(1))}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
