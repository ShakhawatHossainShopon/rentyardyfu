import { config } from "@/config";
import { Icons } from "@/utils";
export const RenterBanner = () => {
  return (
    <div className="flex justify-center items-center px-2 md:px-0 pt-16 pb-20 md:py-24">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:gap-24 items-center justify-center">
        <img
          src={`${config.url.ASSET_URL}assets/BannerImage.png`}
          className="w-10/12 xl:justify-self-end"
          alt="Renterbanner"
        />
        <div className="space-y-2">
          <h3 className="md:text-xl text-base tracking-wider uppercase">
            Benefits for Students
          </h3>
          <div className="space-y-5">
            <h3 className="md:text-4xl text-2xl font-semibold leading-tight">
              WHY STUDENTS LOVE <br /> RENTYARD
            </h3>
            <p className="md:text-base sm:text-sm text-xs md:leading-7">
              RentYard’s competitive advantage lies in its focus on students
              seeking housing near universities, offering a tailored solution
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Convenient Housing Options
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Easy Application Process{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Apartment Within Walking Distance
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  User-Friendly App
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  24/7 Support Team{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Saves Both Time and Money{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
