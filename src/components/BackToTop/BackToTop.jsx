import { useEffect, useState } from "react";
export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Show or hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For smooth scrolling
    });
  };
  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
};
