import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetApplicationForRenterSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationForRenter } from "@/services/application/application";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { RentApplicationStatusCard } from "../../components";

const ApplicationCenter = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetApplicationForRenterSelector();

  const showData = data.filter(
    (item) => item.status === "Under Review" || item.status === "Approved"
  );

  const historyData = data.filter(
    (item) =>
      item.status === "Canceled by Applicant" ||
      item.status === "Declined by Renter" ||
      item.status === "Declined" ||
      item.status === "Moved-Out" ||
      item.status === "Expired"
  );

  const resident =
    data.length > 0 &&
    (data.find(
      (item) =>
        item.status === "Resident" ||
        item.status === "Resident (Renewed)" ||
        item.status === "Resident (Move-Out Accepted)"
    ) ||
      data.find((item) => item.status === "Resident (Not Moved-In)"));

  useEffect(() => {
    dispatch(getApplicationForRenter());
  }, [dispatch]);

  return (
    <Formik className={"w-full"}>
      <Form className="w-full">
        <AdminHeader renterAdmin={true} title={"My Application"} />
        <div className={"w-full p-2 md:p-4 space-y-5"}>
          {/* <ApprovalMessage
            status={true}
            Message={"Application Approved(22 July 2024)"}
          /> */}

          {loading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : (
            <>
              {!loading && showData && showData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {showData.map((item) => {
                    return (
                      <RentApplicationStatusCard
                        key={item.apartmentId && item.apartmentId}
                        apartmentAddress={item?.apartment?.address}
                        createdOn={item?.createdAt}
                        applicationId={item.applicationId && item.applicationId}
                        title={
                          item.property &&
                          item.property.name &&
                          item.property.name
                        }
                        status={item.status && item.status}
                        address={item?.property?.address}
                        city={
                          item.property &&
                          item.property.city &&
                          item.property.city
                        }
                        state={
                          item.property &&
                          item.property.state &&
                          item.property.state
                        }
                        country={
                          item.property &&
                          item.property.country &&
                          item.property.country
                        }
                        zip={
                          item.property &&
                          item.property.zip &&
                          item.property.zip
                        }
                        type={
                          item.apartment &&
                          item.apartment.type &&
                          item.apartment.type
                        }
                        lease_term={item.lease_term && item.lease_term}
                        unit_number={
                          item.apartment &&
                          item.apartment.unit_number &&
                          item.apartment.unit_number
                        }
                        date={item.move_in_date && item.move_in_date}
                        note={item.note && item.note}
                        total={item.monthly_rent && item.monthly_rent}
                        invoice={item.invoice && item.invoice}
                        invoice_total={item.invoice_total && item.invoice_total}
                        prorated_rent={item.prorated_rent && item.prorated_rent}
                        isBtn={true}
                        pet_rent={item.pet_rent && item.pet_rent}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center items-center h-[40vh] darkText">
                  {" "}
                  No Application Available...{" "}
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Application History</h2>
            <hr className="" />
          </div>
          {resident && (
            <RentApplicationStatusCard
              key={resident && resident.apartmentId && resident.apartmentId}
              myRent={true}
              pet_rent={resident.pet_rent && resident.pet_rent}
              apartmentAddress={resident?.apartment?.address}
              applicationId={
                resident && resident.applicationId && resident.applicationId
              }
              expected_move_out_date={
                resident &&
                resident.expected_move_out_date &&
                resident.expected_move_out_date
              }
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
              prorated_rent={resident.prorated_rent && resident.prorated_rent}
              isBtn={false}
              isActive={true}
            />
          )}
          <div className="md:flex space-y-5 md:space-y-0 gap-7">
            <>
              {historyData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
                  {historyData.map((item) => {
                    return (
                      <RentApplicationStatusCard
                        key={item.apartmentId && item.apartmentId}
                        pet_rent={item.pet_rent && item.pet_rent}
                        apartmentAddress={item?.apartment?.address}
                        createdOn={item?.createdAt}
                        applicationId={item.applicationId && item.applicationId}
                        title={
                          item.property &&
                          item.property.name &&
                          item.property.name
                        }
                        status={item.status && item.status}
                        address={
                          item.property &&
                          item.property.address &&
                          item.property.address
                        }
                        city={
                          item.property &&
                          item.property.city &&
                          item.property.city
                        }
                        state={
                          item.property &&
                          item.property.state &&
                          item.property.state
                        }
                        country={
                          item.property &&
                          item.property.country &&
                          item.property.country
                        }
                        zip={
                          item.property &&
                          item.property.zip &&
                          item.property.zip
                        }
                        type={
                          item.apartment &&
                          item.apartment.type &&
                          item.apartment.type
                        }
                        lease_term={item.lease_term && item.lease_term}
                        unit_number={
                          item.apartment &&
                          item.apartment.unit_number &&
                          item.apartment.unit_number
                        }
                        date={item.move_in_date && item.move_in_date}
                        total={item.monthly_rent && item.monthly_rent}
                        invoice={item.invoice && item.invoice}
                        note={item.note && item.note}
                        invoice_total={item.invoice_total && item.invoice_total}
                        moved_out_date={
                          item.moved_out_date_formatted &&
                          item.moved_out_date_formatted
                        }
                        prorated_rent={item.prorated_rent && item.prorated_rent}
                        isBtn={false}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center items-center h-[40vh] darkText">
                  {" "}
                  No History Available...{" "}
                </div>
              )}
            </>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ApplicationCenter;
