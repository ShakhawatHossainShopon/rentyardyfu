import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { getUser } from "@/services/user/user";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const PrintAddressProof = () => {
  const { loading, data } = useGetUserSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[90vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="space-y-10">
          <div className="w-full flex justify-center">
            <button
              onClick={() => window.print()}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 no-print"
            >
              Print Now
            </button>
          </div>
          <div className="w-full text-center">
            <span className="text-xl font-semibold border border-gray-600 p-4 w-fit">
              {" "}
              Address Proof{" "}
            </span>
          </div>
          <div className="space-y-10">
            <div className="w-full grid grid-cols-2 gap-20">
              <div>
                <h4 className="text-xl font-bold mb-2">Occupant Details:</h4>
                <p>
                  <span className="font-medium">Name:</span> {data?.first_name}{" "}
                  {data?.middle_name} {data?.last_name}{" "}
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {data?.date_of_birth_formatted}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {data?.contact_number}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {data?.email}
                </p>
                <p>
                  <span className="font-medium">Residing From:</span>{" "}
                  {data?.apartment?.move_in_date}
                </p>
                <p>
                  <span className="font-medium">Resident type:</span> Primary
                  Applicant
                </p>
              </div>
              {data?.occupants?.length > 0 &&
                data?.occupants.map((item) => {
                  return (
                    <div>
                      <h4 className="text-xl font-bold mb-2">
                        Occupant Details:
                      </h4>
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {item?.first_name} {item?.middle_name} {item?.last_name}{" "}
                      </p>
                      {item?.date_of_birth && (
                        <p>
                          <span className="font-medium">Date of Birth:</span>{" "}
                          {item?.date_of_birth}
                        </p>
                      )}
                      {item?.contact_number && (
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {item?.contact_number}
                        </p>
                      )}
                      {item?.email && (
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {item?.email}
                        </p>
                      )}
                      {/* <p>
                          <span className="font-medium">Residing From:</span>{" "}
                          {data?.apartment?.move_in_date}
                        </p> */}
                      <p className="">
                        <span className="font-medium">Resident type:</span>{" "}
                        {item?.type}
                      </p>
                    </div>
                  );
                })}
            </div>
            {data?.apartment?.address && (
              <div>
                <h4 className="text-xl font-bold mb-2">Mailing Address:</h4>
                <p className="font-semibold">
                  {" "}
                  {data?.apartment?.address
                    ? data?.apartment?.address
                    : data?.property?.address}
                  , {data?.apartment?.type} {data?.apartment?.unit_number},
                </p>
                <p className="font-semibold">
                  {data?.property?.city} {data?.property?.state}{" "}
                  {data?.property?.zip}
                </p>
              </div>
            )}
            {data?.singleProperty?.address && (
              <div>
                <h4 className="text-xl font-bold mb-2">Mailing Address:</h4>
                <p className="font-semibold">
                  {" "}
                  {data?.singleProperty?.address}
                </p>
                <p className="font-semibold">
                  {data?.singleProperty?.city} {data?.singleProperty?.state}{" "}
                  {data?.singleProperty?.zip}
                </p>
              </div>
            )}
            {data?.property?.manager_name && (
              <div>
                <h4 className="text-xl font-bold mb-2">Property Manager:</h4>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {data?.property?.manager_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {data?.property?.contact_email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {data?.property?.contact_number}
                </p>
              </div>
            )}
            {data?.singleProperty?.manager_name && (
              <div>
                <h4 className="text-xl font-bold mb-2">Property Manager:</h4>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {data?.singleProperty?.manager_name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {data?.singleProperty?.contact_email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {data?.singleProperty?.contact_number}
                </p>
              </div>
            )}
          </div>
          <p className="text-center">
            Address proof is auto-generated by{" "}
            <a
              className="text-blue-600 underline"
              target="_blank"
              href="https://rentyard.net/"
            >
              RentYard.net
            </a>
            . To verify contact with RentYard.
          </p>
        </div>
      )}
    </>
  );
};

export default PrintAddressProof;
