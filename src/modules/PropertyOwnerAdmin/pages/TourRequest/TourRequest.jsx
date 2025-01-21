import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetTourForPOSelector,
  useScrollToTop,
} from "@/hooks";
import { getTourListForPO } from "@/services/tour/tour";
import { useEffect, useState } from "react";
import { TourRequestHistory } from "./Components";
import { TourRequestComp } from "./Components/TourRequestComp";

const TourRequest = () => {
  useScrollToTop();
  const [open, setOpen] = useState(0);

  const dispatch = useAppDispatch();

  const { loading, data } = useGetTourForPOSelector();

  useEffect(() => {
    dispatch(getTourListForPO());
  }, [dispatch]);

  const showData =
    data &&
    data.filter(
      (tour) => tour.status === "Pending" || tour.status === "Confirmed"
    );

  const historyData =
    data &&
    data.filter(
      (tour) =>
        tour.status === "Done" ||
        tour.status === "Canceled" ||
        tour.status === "Canceled by Requester"
    );

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="w-full">
      <AdminHeader title={"Tour Request"} />
      <div className="w-full md:p-4 p-2">
        <h2 className="md:text-xl pt-4 md:pt-0 text-base font-semibold">
          New tour request
        </h2>
        <hr className="mt-5 mb-8 border-gray-500" />
        <div>
          <TourRequestComp data={showData} loading={loading} />
        </div>
      </div>

      <div className="w-full md:p-4 p-2">
        <div className="md:flex justify-start items-center md:space-x-5 md:pt-8 pt-4">
          <h3 className="font-semibold text-lg min-w-max">Tour History</h3>
        </div>
        <hr className="mt-5 mb-8 border-gray-500" />
        <div>
          <TourRequestHistory data={historyData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TourRequest;
