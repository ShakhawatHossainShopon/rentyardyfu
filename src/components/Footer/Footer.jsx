import { Link, NavLink, useLocation } from "react-router-dom";
import { companyLinks, GrowWithUs } from "./FooterLinks";
// App Images
import { config } from "@/config";
import { useSelector } from "react-redux";
import { socialLogos } from "./data";
export const Footer = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const location = useLocation();
  return (
    <footer
      className={`${
        (location.pathname === "/print-application" && "hidden") ||
        (location.pathname === "/print-extra-invoice" && "hidden") ||
        (location.pathname === "/RenterInvoice" && "hidden") ||
        (location.pathname === "/print-address" && "hidden") ||
        (location.pathname === "/print-lease" && "hidden") ||
        (location.pathname === "/print-invoice" && "hidden")
      } bg-secondary-color px-4 dark:bg-darkMode`}
    >
      <hr className="border border-gray-800 dark:block hidden" />
      <div className="w-full mx-auto  py-14 max-w-[1440px] m-auto">
        <div className="grid place-items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          <div className="sm:col-span-2 md:col-span-2 lg:w-10/12">
            <div className="mb-6 md:mb-0">
              {darkMode ? (
                <img
                  src={`${config.url.ASSET_URL}assets/LogoDarkVersion.png`}
                  className="h-12 me-3"
                  alt="Rentyard"
                />
              ) : (
                <img
                  src={`${config.url.ASSET_URL}assets/RentyardLogo.png`}
                  className="h-12 me-3"
                  alt="Rentyard"
                />
              )}
              <p className="text-base py-5 pe-5">
                RentYard’s competitive advantage lies in its focus on students
                seeking housing near universities, offering a tailored solution.
                We provide both apartment listings and full property management
                services, making us a one-stop shop.
              </p>
              If you are using a screen reader, or are having difficulty reading
              this website, please email{" "}
              <Link to="/contact" className="underline">
                Contact Here
              </Link>
              <p className="py-6 hidden md:block">
                © 2024 RentYard Inc. All rights reserved.
              </p>
            </div>
          </div>
          <div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900 darkText">
                Quick Links
              </h2>
              <ul className="text-black dark:text-gray-400 font-medium">
                {companyLinks.map((links) => (
                  <li key={links.name}>
                    <NavLink
                      to={links.link}
                      className="text-lg font-medium hover:text-blue-700"
                    >
                      {links.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Third grid item */}
          <div>
            {" "}
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900 darkText">
                Company
              </h2>
              <ul className="text-black dark:text-gray-400 font-medium">
                {GrowWithUs.map((links) => (
                  <li key={links.name}>
                    <NavLink
                      to={links.link}
                      target={
                        links.link === "https://blog.rentyard.net/"
                          ? "_blank"
                          : ""
                      }
                      className="text-lg font-medium hover:text-blue-700"
                    >
                      {links.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div className="md:w-48 w-28 cursor-pointer">
                <NavLink
                  target="_blank"
                  to={
                    "https://play.google.com/store/apps/details?id=inc.rentyard&pcampaignid=web_share"
                  }
                >
                  <img
                    src={`${config.url.ASSET_URL}google-play.png`}
                    className="md:w-48 w-28 pb-5"
                    alt="Google Play"
                  />
                </NavLink>
              </div>
              <div className="md:w-48 w-28 cursor-pointer">
                <NavLink
                  target="_blank"
                  to={"https://apps.apple.com/us/app/rentyard/id6624293489"}
                >
                  <img
                    className="rounded-xl w-full"
                    src={`${config.url.ASSET_URL}app-store.png`}
                    alt="Apple store"
                  />
                </NavLink>
              </div>
              <div className="flex items-center gap-4 pt-7">
                {socialLogos.map((logo, index) => {
                  return (
                    <a
                      key={index}
                      href={logo.link}
                      target="_blank"
                      aria-label={logo.label}
                    >
                      {logo.logo}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Add more grid items as needed */}
        </div>
        <p className="text-base py-6 block md:hidden">
          © 2024 RentYard LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
