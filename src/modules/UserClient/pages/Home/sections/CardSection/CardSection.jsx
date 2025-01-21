import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Card } from "../../Components";
export const CardSection = ({ loading, data, title }) => {
  const location = useLocation();
  return (
    <>
      <div className="lg:px-0 px-2 md:px-6">
        {title && (
          <>
            <h2 className="md:text-3xl text-lg font-bold tracking-wider pb-4 pt-8">
              {title}
            </h2>
            <hr />
          </>
        )}
        {loading ? (
          <div className="w-full flex justify-center items-center h-[40vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : !loading && data && data.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 py-6">
            {location.pathname === "/"
              ? data.slice(0, 9).map((item) => {
                  return (
                    <Card
                      key={item && item.propertyId && item.propertyId}
                      item={item}
                    />
                  );
                })
              : data.map((item) => {
                  return (
                    <Card
                      key={item && item.propertyId && item.propertyId}
                      item={item}
                    />
                  );
                })}
          </div>
        ) : (
          <div className="w-full h-[40vh] flex justify-center items-center">
            {" "}
            No Property Available...{" "}
          </div>
        )}
      </div>
    </>
  );
};
