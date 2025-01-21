import { AdminHeader, PdfList, ShowImages, ShowVideos } from "@/components";
import {
  useAppDispatch,
  useGetAllAssetSelector,
  useScrollToTop,
} from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { ImagesUpload, PdfUpload, VideoUpload } from "./components";

const AssetManagement = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  return (
    <div className="w-full">
      <AdminHeader title={"Asset Manager"} />
      <div className="w-full p-4 space-y-10">
        <div className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Upload Assets</h2>
            <hr className="border-gray-400" />
          </div>
          <div className="space-y-10">
            <ImagesUpload />
            <VideoUpload />
            <PdfUpload />
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold">Assets</h3>
            <hr className="border-gray-400" />
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="w-full flex justify-center items-center h-[50vh]">
                <ClipLoader size={100} color="blue" />
              </div>
            ) : (
              <>
                <ShowImages data={data} loading={loading} />
                <ShowVideos data={data} loading={loading} />
                <PdfList data={data} loading={loading} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;
