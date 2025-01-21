import NewsPageBanner from "@/assets/NewsPageBanner.png";
import { useScrollToTop } from "@/hooks";
import { newsArrays } from "./newsArray";

const News = () => {
  useScrollToTop();
  return (
    <div>
      {/* hero section */}
      <div
        className="h-[300px] md:h-[360px] flex items-center justify-center "
        style={{
          backgroundImage: `url(${NewsPageBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center space-y-5">
          <h1 className="text-3xl text-white font-bold md:text-5xl">
            News & Press
          </h1>
          <p className="text-white text-sm md:text-lg px-4 md:px-0 font-light">
            Discover our latest news, stories, and announcements in one place.
            <br /> Stay updated on our journey and milestones!
          </p>
        </div>
      </div>
      {/* hero section */}
      {/* Stories section */}
      <div className="pb-16 space-y-8">
        <div className="pt-9">
          <h2 className="pb-4 text-xl text-black font-light dark:text-white px-6 md:text-3xl">
            Featured Stories
          </h2>
          <hr className="" />
        </div>

        <div className="md:grid md:grid-cols-12 gap-4">
          {newsArrays.map((item) => {
            return (
              <div className="col-span-6 bg-gray-50 p-7 rounded-lg shadow-custom-light dark:shadow-none dark:bg-dark-light">
                <div className="h-[400px] w-full overflow-hidden rounded-lg flex items-center justify-center">
                  <img
                    src={item.img}
                    className="h-full w-full object-cover object-top"
                    alt=""
                  />
                </div>

                <h3 className="pt-6 pb-3 text-2xl font-medium darkText">
                  {item.title}
                </h3>
                <p className="text-black  text-lg font-light darkText">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Stories section */}
    </div>
  );
};

export default News;
