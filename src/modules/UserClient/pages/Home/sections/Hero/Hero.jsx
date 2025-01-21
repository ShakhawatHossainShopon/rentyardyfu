import { config } from "@/config";
import { Filters } from "../../Components";

export const Hero = () => {
  return (
    <div className="relative">
      <div className="md:max-h-[320px] max-h-[200px] w-full Home-background-div mx-auto relative">
        <div className="md:text-5xl text-2xl pt-8 md:pt-16 font-semibold text-white text-center darkText">
          <h1>Search Your Next Home</h1>
          <img
            className="absolute top-0 max-h-[320px] md:block hidden z-10"
            src={`${config.url.ASSET_URL}assets/Shape.png`}
            alt="Shape"
            loading="lazy"
          />
        </div>
        <div className="xl:max-w-[1100px] md:max-w-[700px] lg:max-w-[800px] py-8 shadow-custom-light bg-white mx-auto md:rounded-lg absolute top-8 md:top-20 dark:bg-darkMode dark:shadow-custom-dark">
          <div>
            <Filters className={"flex-col items-center space-y-5"} />
          </div>
        </div>
      </div>
    </div>
  );
};
