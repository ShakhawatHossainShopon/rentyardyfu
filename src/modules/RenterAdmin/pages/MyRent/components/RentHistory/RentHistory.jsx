import { RentApplicationStatusCard } from "@/modules/RenterAdmin/components";
import { Form, Formik } from "formik";

export const RentHistory = ({ historyData }) => {
  return (
    <Formik>
      <Form className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Rent History</h2>
          <hr className="" />
        </div>

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
                        item.property && item.property.zip && item.property.zip
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
                      isBtn={false}
                      moved_out_date={
                        item &&
                        item.moved_out_date_formatted &&
                        item.moved_out_date_formatted
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center h-[40vh]">
                {" "}
                No History Available...{" "}
              </div>
            )}
          </>
        </div>
      </Form>
    </Formik>
  );
};
