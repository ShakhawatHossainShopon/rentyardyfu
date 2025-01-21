import { config } from "@/config";
import { Icons } from "@/utils";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Button } from "../ui";

export const Card = ({ item }) => {
  const [favorite, setFavorite] = useState(false);
  return (
    <div className="max-w-sm rounded-t-xl overflow-hidden shadow-lg relative py-2">
      <Link to={`/property/${item && item.slug && item.slug}`}>
        <LazyLoadImage
          className="w-full h-[250px] object-cover rounded-t-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          src={`${config.url.ASSET_URL}${
            item &&
            item.listing_image &&
            item.listing_image.link &&
            item.listing_image.link
          }`}
          alt="Sunset in the mountains"
          loading="lazy"
        />
      </Link>
      <div className="px-4 py-4 border-t space-y-2">
        <div className="font-bold text-xl mb-2">
          {" "}
          {item && item.name && item.name}{" "}
        </div>
        <div className="flex justify-start items-start space-x-2">
          <p className="text-gray-700 text-base pt-0.5">
            <Icons.Location className="text-blue-700" />{" "}
          </p>
          <p className="text-gray-700 text-base flex flex-col items-start justify-center">
            <span className="text-sm">
              {" "}
              {item && item.address && item.address},
            </span>
            <span className="text-sm">
              {" "}
              {item && item.city && item.city},{" "}
              {item && item.state && item.state},{" "}
              {item && item.country && item.country},{" "}
              {item && item.zip && item.zip}{" "}
            </span>
          </p>
        </div>
        {item && item.apartment_rent_range && item.apartment_type_range && (
          <p className="text-gray-700 text-base flex items-center gap-x-1.5">
            <Icons.Bed className="text-blue-700" />
            <span className="text-sm">
              {" "}
              {item.apartment_type_range} ({item.apartment_rent_range})
            </span>
          </p>
        )}
      </div>
      {favorite ? (
        <button onClick={() => setFavorite(false)}>
          <Icons.Heart className="text-red-700 text-3xl absolute top-3 right-3 cursor-pointer" />
        </button>
      ) : (
        <button onClick={() => setFavorite(true)}>
          <Icons.FilledHeart className="text-blue-700 text-3xl absolute top-3 right-3 cursor-pointer" />
        </button>
      )}
      <div className="w-full text-end px-4">
        <Link to={`/property/${item && item.slug && item.slug}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
};
