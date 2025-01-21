import { config } from "@/config";

export const SingleImage = ({ src, altText = "Image", className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {src ? (
        <img
          src={`${config.url.ASSET_URL}${src.link}`}
          alt={altText}
          className="h-full max-h-[60vh] md:max-h-[70vh] object-fit"
          loading="lazy"
        />
      ) : (
        <div className="h-[50vh] w-full flex justify-center items-center darkText">
          {" "}
          No Image Available...{" "}
        </div>
      )}
    </div>
  );
};
