import { Link } from "react-router-dom";
export const BlogCard = ({ title, image, link, date }) => {
  return (
    <div className="overflow-hidden md:my-2 my-2 shadow-md rounded-lg">
      <img
        src={image}
        alt=""
        className="w-full lg:h-[280px] h-[200px] object-cover"
        loading="lazy"
      />
      <div className="px-4 pb-4 pt-2">
        <div className="w-full flex justify-between items-center">
          <h3 className="md:text-lg text-sm font-light pt-2">
            RentYard | {date}
          </h3>
        </div>

        <h3 className=" md:text-xl tracking-wider text-base font-semibold md:pt-3 md:pb-6 py-3 ">
          {title}
        </h3>
        <div className="w-full text-end">
          <Link
            target="_blank"
            to={link}
            className={
              "bg-transparent text-primary-color md:px-4 md:py-2 mt-2 md:mt-0 md:text-base border-2  hover:text-white hover:bg-primary-color border-primary-color dark:border-blue-800 dark:hover:bg-blue-900"
            }
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
