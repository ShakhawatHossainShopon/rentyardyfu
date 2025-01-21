import { AdminHeader, Searchbar } from "@/components";
import {
  useAppDispatch,
  useGetApplicationListForPOSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationListForPO } from "@/services/application/application";
import { getAllAsset } from "@/services/asset/asset";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ApplicantAccordion } from "../Applications/components";

const Residents = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getApplicationListForPO());
  }, [dispatch]);
  const { loading, data } = useGetApplicationListForPOSelector();

  const showData =
    data &&
    data.filter(
      (item) =>
        item.status === "Resident (Not Moved-In)" ||
        item.status === "Resident" ||
        item.status === "Resident (Renewed)" ||
        item.status === "Resident (Move-Out Accepted)"
    );

  const historyData =
    data && data.filter((item) => item.status === "Moved-Out");

  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);

  return (
    <div className="w-full">
      <AdminHeader title={"Residents"} />
      <div className="md:p-4 p-2 w-full">
        <div className="lg:flex justify-between items-center gap-0 md:gap-52 w-full">
          <h2 className="min-w-max md:text-lg text-base lg:py-0 py-4 font-medium">
            Resident List
          </h2>
          <Formik>
            <Form className="w-full">
              <Searchbar
                query={"a"}
                placeholder={"Search here.."}
                className={"w-full"}
                isShowButton={true}
              />
            </Form>
          </Formik>
        </div>
        <hr className="my-5" />
        <div className="space-y-10">
          <ApplicantAccordion data={showData} />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Resident History</h3>
            <hr />
          </div>
          <ApplicantAccordion data={historyData} history={true} />
        </div>
      </div>
    </div>
  );
};

export default Residents;
