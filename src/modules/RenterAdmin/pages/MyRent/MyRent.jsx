import { AdminHeader, Button, TabCom } from "@/components";
import {
  useAppDispatch,
  useGetApplicationForRenterSelector,
  useGetRenewOrMoveOutSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationForRenter } from "@/services/application/application";
import {
  deleteRenewOrMoveOut,
  getRenewOrMoveOut,
} from "@/services/renewOrMoveOut/renewOrMoveOut";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { RentApplicationStatusCard } from "../../components";
import { MoveOut, Renew, RentHistory } from "./components";

const MyRent = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const response = useGetApplicationForRenterSelector();
  const [isShowTab, setIsShowTab] = useState(false);
  const [convertedOptions, setConvertedOptions] = useState([]);
  const { data } = useGetUserSelector();
  const res = useGetRenewOrMoveOutSelector();

  useEffect(() => {
    if (data?.apartment?.rent_and_lease) {
      setConvertedOptions([
        { value: "", label: "Select One" },
        ...data?.apartment?.rent_and_lease?.map((option) => {
          return {
            value: option.lease_term,
            label: `${option.lease_term}`,
          };
        }),
      ]);
    }

    if (data?.singleProperty?.rent_and_lease) {
      setConvertedOptions([
        { value: "", label: "Select One" },
        ...data?.singleProperty?.rent_and_lease?.map((option) => {
          return {
            value: option.lease_term,
            label: `${option.lease_term}`,
          };
        }),
      ]);
    }
  }, [data]);

  const historyData =
    response &&
    response.data.filter(
      (item) =>
        item.status === "Canceled by Applicant" ||
        item.status === "Declined by Renter" ||
        item.status === "Declined" ||
        item.status === "Moved-Out" ||
        item.status === "Expired"
    );

  const resident =
    response &&
    response.data.length > 0 &&
    response.data.find(
      (item) =>
        item.status === "Resident" ||
        item.status === "Resident (Move-Out Accepted)" ||
        item.status === "Resident (Renewed)"
    );

  useEffect(() => {
    dispatch(getRenewOrMoveOut());
    dispatch(getApplicationForRenter());
  }, []);

  useEffect(() => {
    if (res && res.data && Object.keys(res.data).length > 0) {
      setIsShowTab(false);
    }
  }, [res]);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"My Rent/Lease"} />
      <div className="w-full p-4 space-y-10">
        {resident && (
          <div className="bg-gray-100 border border-blue-500 space-y-5 dark:bg-dark-light">
            <RentApplicationStatusCard
              key={resident && resident.apartmentId && resident.apartmentId}
              pet_rent={resident.pet_rent && resident.pet_rent}
              apartmentAddress={resident?.apartment?.address}
              applicationId={
                resident && resident.applicationId && resident.applicationId
              }
              myRent={true}
              title={
                resident &&
                resident.property &&
                resident.property.name &&
                resident.property.name
              }
              status={resident && resident.status && resident.status}
              address={
                resident &&
                resident.property &&
                resident.property.address &&
                resident.property.address
              }
              city={
                resident &&
                resident.property &&
                resident.property.city &&
                resident.property.city
              }
              state={
                resident &&
                resident.property &&
                resident.property.state &&
                resident.property.state
              }
              country={
                resident &&
                resident.property &&
                resident.property.country &&
                resident.property.country
              }
              zip={
                resident &&
                resident.property &&
                resident.property.zip &&
                resident.property.zip
              }
              type={
                resident &&
                resident.apartment &&
                resident.apartment.type &&
                resident.apartment.type
              }
              lease_term={
                resident && resident.lease_term && resident.lease_term
              }
              unit_number={
                resident &&
                resident.apartment &&
                resident.apartment.unit_number &&
                resident.apartment.unit_number
              }
              date={resident && resident.move_in_date && resident.move_in_date}
              note={resident.note && resident.note}
              total={resident.monthly_rent && resident.monthly_rent}
              invoice={resident.invoice && resident.invoice}
              invoice_total={resident.invoice_total && resident.invoice_total}
              isBtn={false}
              isActive={true}
              expected_move_out_date={
                resident &&
                resident.expected_move_out_date &&
                resident.expected_move_out_date
              }
            />
            {resident &&
              resident.status &&
              resident.status !== "Resident (Move-Out Accepted)" && (
                <div className="p-4 space-y-10">
                  <Button
                    className={`md:text-sm text-xs ${
                      res && res.data && Object.keys(res.data).length > 0
                        ? "bg-blue-300 cursor-not-allowed hover:bg-blue-300"
                        : ""
                    } `}
                    disabled={
                      res && res.data && Object.keys(res.data).length > 0
                        ? true
                        : false
                    }
                    onClick={() => setIsShowTab((prev) => !prev)}
                  >
                    {isShowTab ? "Close Tab" : "Move-out / Renew Request"}
                  </Button>
                  {isShowTab && (
                    <TabCom
                      defaultValue={"Renew Request"}
                      data={[
                        {
                          value: "Renew Request",
                          label: "Renew Request",
                          component: (
                            <Renew
                              convertedOptions={convertedOptions}
                              applicationId={
                                data.applicationId
                                  ? data.applicationId
                                  : data.singleApplication.singleApplicationId
                              }
                              formatted_date={
                                data?.apartment?.expected_move_out_date
                                  ? data.apartment.expected_move_out_date
                                  : data.singleApplication
                                      .expected_move_out_date
                              }
                            />
                          ),
                        },
                        {
                          value: "Move-out Request",
                          label: "Move-out Request",
                          component: (
                            <MoveOut
                              applicationId={
                                data.applicationId
                                  ? data.applicationId
                                  : data.singleApplication.singleApplicationId
                              }
                              date={
                                data?.apartment?.expected_move_out_date_raw
                                  ? data.apartment.expected_move_out_date_raw
                                  : data.singleApplication
                                      .expected_move_out_date_raw
                              }
                              formatted_date={
                                data?.apartment?.expected_move_out_date
                                  ? data.apartment.expected_move_out_date
                                  : data.singleApplication
                                      .expected_move_out_date
                              }
                            />
                          ),
                        },
                      ]}
                    />
                  )}
                </div>
              )}
            {resident &&
              resident.status &&
              resident.status === "Resident (Move-Out Accepted)" && (
                <div className="p-4 dark:text-gray-100 font-bold">
                  If you change your mind and want to renew the lease, please
                  contact to your manager
                </div>
              )}
          </div>
        )}
        {res && res.data && Object.keys(res.data).length > 0 && (
          <div className="border border-red-500 px-4 py-4 space-y-3 z-50">
            {res.data.type === "Renew" && (
              <h3 className="text-xl font-semibold">
                {" "}
                You have requested for Lease Renewal{" "}
              </h3>
            )}
            {res.data.type === "Move Out" && (
              <h3 className="text-xl font-semibold">
                {" "}
                You have requested for Move Out{" "}
              </h3>
            )}

            {res.data.requested_lease_term && (
              <p>Selected Lease Term: {res.data.requested_lease_term} </p>
            )}
            {res.data.move_out_date && (
              <p>Selected Move-out Date: {res.data.move_out_date} </p>
            )}
            <Button
              onClick={() => {
                Swal.fire({
                  title: "Are You Sure?",
                  showDenyButton: true,
                  confirmButtonText: "Ok",
                  denyButtonText: `Cancel`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(
                      deleteRenewOrMoveOut({
                        applicationId: data.applicationId,
                        type: res.data.type,
                      })
                    );
                  }
                });
              }}
              className={"bg-red-600"}
            >
              {" "}
              Cancel{" "}
            </Button>
          </div>
        )}
        <RentHistory historyData={historyData} />
      </div>
    </div>
  );
};

export default MyRent;
