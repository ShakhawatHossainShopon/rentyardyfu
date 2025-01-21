import { AdminHeader } from "@/components";
import { config } from "@/config";
import {
  useAppDispatch,
  useGetUserDashboardSelector,
  useScrollToTop,
} from "@/hooks";
import { getUserDashboard } from "@/services/user/user";
import { toPng } from "html-to-image";
import { useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { ClipLoader } from "react-spinners";

const PropertyDashboard = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetUserDashboardSelector();
  const qrRef = useRef([]);

  useEffect(() => {
    dispatch(getUserDashboard());
  }, [dispatch]);

  // Function to download the QR code
  const handleDownload = async (index) => {
    const qrElement = qrRef.current[index];
    if (qrElement) {
      // Ensure higher quality by increasing the pixel density
      const dataUrl = await toPng(qrElement, {
        pixelRatio: 10, // Increase pixel ratio for better resolution
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `property-${index}-qr-code.png`;
      link.click();
    }
  };

  return (
    <div className="w-full">
      <AdminHeader title={"Dashboard"} />
      <div className="w-full p-4 space-y-3">
        <div>
          <h2 className="min-w-max md:text-lg text-base lg:py-0 py-4 font-semibold">
            All Property
          </h2>
          <hr />
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center h-[90vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={index} className="space-y-3">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <div>
                      <div
                        ref={(el) => (qrRef.current[index] = el)}
                        className="w-fit flex justify-center items-center"
                      >
                        <QRCode
                          value={`${config.url.CLIENT_URL}/property/${item.slug}`}
                          size={100}
                          fgColor="#000000"
                          bgColor="#ffffff"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleDownload(index)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Download QR Code
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDashboard;
