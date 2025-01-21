import { config } from "@/config";
import { Icons } from "@/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
export const Card = ({ item }) => {
  const {
    propertyId,
    slug,
    address,
    city,
    country,
    listing_image,
    name,
    state,
    zip,
    apartment_rent_range,
    apartment_type_range,
    discounted_apt,
    schools,
  } = item;
  return (
    <div className="bg-white shadow-custom-light rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-2 cursor-pointer md:my-4 my-2 dark:shadow-custom-dark dark:bg-darkMode darkText relative">
      {discounted_apt && (
        <span className="absolute top-3 right-3">
          <Icons.Offer className="text-4xl text-red-600" />
        </span>
      )}
      <Link to={`/property/${slug && slug}`}>
        <LazyLoadImage
          className="w-full lg:h-[280px] h-[200px] rounded-t-lg border-b object-cover"
          src={`${config.url.ASSET_URL}${listing_image.link}`}
          alt="Sunset in the mountains"
          loading="lazy"
        />
        <div className="py-4 px-4 space-y-1">
          <h3 className="lg:text-2xl pb-2 font-semibold"> {name} </h3>
          <div className="flex justify-start items-start space-x-2">
            <p className="text-gray-700 text-base pt-1 darkText">
              <Icons.Location className="text-black darkText" />{" "}
            </p>
            <p className="text-black text-base flex flex-col items-start justify-center">
              <span className="lg:text-base text-xs darkText">{address},</span>
              <span className="lg:text-base text-xs darkText">
                {city}, {state}, {zip}, {country}
              </span>
            </p>
          </div>
          {apartment_rent_range && apartment_type_range && (
            <p className="flex items-center space-x-2 text-base">
              <Icons.Bed className="lg:text-lg darkText" />
              <span className="lg:text-base text-xs">
                {apartment_type_range} ({apartment_rent_range})
              </span>
            </p>
          )}
          {schools.length > 0 &&
            schools?.slice(0, 1).map((item, index) => {
              return (
                <p
                  className="flex items-center space-x-2 text-base"
                  key={index}
                >
                  <Icons.University className="lg:text-lg darkText" />
                  <span className="lg:text-base text-xs">{item.name}</span>
                </p>
              );
            })}
        </div>
      </Link>
    </div>
  );
};
