import { ApplicationInfo } from "@/modules/PropertyOwnerAdmin/components";
import { useEffect, useState } from "react";
const PrintApplicantDetails = () => {
  const [occupants, setOccupants] = useState([]);
  const [details, setDetails] = useState({
    user: {},
    lease_term: "",
    move_in_date: "",
    apartment: {},
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const serializedOccupants = queryParams.get("occupants");
    const user = queryParams.get("user");
    const leaseTerm = queryParams.get("lease_term");
    const moveInDate = queryParams.get("move_in_date");
    const apartment = queryParams.get("apartment");
    if (serializedOccupants) {
      setOccupants(JSON.parse(decodeURIComponent(serializedOccupants)));
    }
    setDetails({
      user: user ? JSON.parse(decodeURIComponent(user)) : {},
      lease_term: leaseTerm ? decodeURIComponent(leaseTerm) : "",
      move_in_date: moveInDate ? decodeURIComponent(moveInDate) : "",
      apartment: apartment ? JSON.parse(decodeURIComponent(apartment)) : {},
    });
  }, []);
  return (
    <div className="p-5 space-y-10 dark:bg-darkMode min-h-screen darkText">
      <div className="w-full flex justify-center">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 no-print"
        >
          Print Now
        </button>
      </div>
      <div>
        <h2 className="px-4 text-xl font-bold">Primary Applicant Details</h2>
        <hr className="my-3" />
        <ApplicationInfo
          user={details.user}
          lease_term={details.lease_term}
          move_in_date={details.move_in_date}
          apartment={details.apartment}
          isImage={true}
          isPrint={true}
        />
      </div>
      {occupants.map((elem) => {
        return (
          <div key={elem.occupantId}>
            <h2 className="px-4 text-xl font-bold">{elem.type} Details</h2>
            <hr className="my-3" />
            <ApplicationInfo user={elem} isImage={true} isPrint={true} />
          </div>
        );
      })}
    </div>
  );
};
export default PrintApplicantDetails;
