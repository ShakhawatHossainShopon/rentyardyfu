import { useAppDispatch, useGetAllWorkOrderSelector } from "@/hooks";
import { getAllWorkOrder } from "@/services/workOrder/workOrder";
import { Form, Formik } from "formik";
import { useEffect } from "react";

export const WorkOrderHistory = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetAllWorkOrderSelector();

  useEffect(() => {
    dispatch(getAllWorkOrder());
  }, []);

  return (
    <Formik>
      <Form>
        <div className="space-y-2">
          <h3 className="font-semibold">Maintenance History</h3>
          <hr className="" />
        </div>

        <ul className="list-disc pl-5">
          {data && data.length > 0 ? (
            data.map((item) => {
              return (
                <li className="md:text-base text-sm" key={item.workOrderId}>
                  Order#{item.requestId} on{" "}
                  <span className="font-medium">{item.createdAt} - </span>
                  {item.area.map((elem) => (
                    <span>{elem}, </span>
                  ))}{" "}
                  -{" "}
                  <span
                    className={`text-blue-500  ${
                      item.status === "Resolved"
                        ? "text-green-500"
                        : item.status === "Canceled"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    <span className="font-medium">{item.status}.</span>
                    {item.status !== "Resolved" &&
                      item.status !== "Work in Progress" &&
                      item.status !== "Canceled" &&
                      item.working_time &&
                      item.working_date && (
                        <span>
                          {" "}
                          Expected Starting Time: {item.working_time} on{" "}
                          {item.working_date}
                        </span>
                      )}
                    {item.fixer && <span> Note: {item.fixer}</span>}
                  </span>{" "}
                </li>
              );
            })
          ) : (
            <div className="w-full flex justify-center items-center h-[20vh]">
              {" "}
              No History Available...{" "}
            </div>
          )}
        </ul>
      </Form>
    </Formik>
  );
};
