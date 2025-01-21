import { config } from "@/config";
import { NavLink } from "react-router-dom";
export const MobileCard = () => {
  return (
    <div className="md:pt-32 pt-72 flex justify-center items-center">
      <div className="px-10 max-w-[1000px] py-6 bg-[#F8F8F8] md:flex space-y-4 md:space-y-0 justify-between gap-10 items-center md:rounded-xl my-8 dark:bg-dark-light">
        <h2 className="md:text-2xl text-base text-center md:text-start font-bold darkText whitespace-nowrap">
          Get Our App For Android and iOS
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-1/2 cursor-pointer hover:scale-105 transition-all duration-300 ">
            <NavLink
              target="_blank"
              to={
                "https://play.google.com/store/apps/details?id=inc.rentyard&pcampaignid=web_share"
              }
            >
              <img
                className="rounded-xl"
                src={`${config.url.ASSET_URL}google-play.png`}
                alt="Google Play Store"
              />
            </NavLink>
          </div>
          <div className="w-1/2 cursor-pointer hover:scale-105 transition-all duration-300 ">
            <NavLink
              target="_blank"
              to={"https://apps.apple.com/us/app/rentyard/id6624293489"}
            >
              <img
                className="rounded-xl"
                src={`${config.url.ASSET_URL}app-store.png`}
                alt="Apple Store"
              />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
