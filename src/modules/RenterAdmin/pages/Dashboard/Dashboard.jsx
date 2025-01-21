import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetAdminNoticeForRenterSelector,
  useGetApplicationForRenterSelector,
  useGetApprovedApplicationsSelector,
  useGetTourForRenterSelector,
  useGetUserDashboardSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getAdminNoticeForRenter } from "@/services/adminNotice/adminNotice";
import {
  getApplicationForRenter,
  getApprovedApplications,
} from "@/services/application/application";
import { hideNotice } from "@/services/notice/notice";
import { getTourForRenter } from "@/services/tour/tour";
import { getUser, getUserDashboard } from "@/services/user/user";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import {
  ApprovalMessage,
  BillCard,
  CheckList,
  DashboardMessage,
  InfoCard,
  RentApplicationStatusCard,
  TourSceduleCard,
} from "../../components";
import { HeaderContent } from "./components";

function Icon({ id, open, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const Dashboard = () => {
  const [showData, setShowData] = useState([]);
  const [showApplications, setShowApplications] = useState([]);
  useScrollToTop();
  const dispatch = useAppDispatch();
  const approvedApplications = useGetApprovedApplicationsSelector();
  const userDashboard = useGetUserDashboardSelector();
  const res = useGetUserSelector();
  const { data, loading } = useGetTourForRenterSelector();

  const applications = useGetApplicationForRenterSelector();
  const adminNotice = useGetAdminNoticeForRenterSelector();

  useEffect(() => {
    if (data && data.length > 0) {
      const temp =
        data &&
        data.filter(
          (tour) => tour.status === "Pending" || tour.status === "Confirmed"
        );
      setShowData(temp);
    }
    if (applications && applications.data && applications.data.length > 0) {
      const temp = applications.data.filter(
        (item) => item.status === "Under Review"
      );
      setShowApplications(temp);
    }
  }, [data, applications]);

  useEffect(() => {
    dispatch(getApprovedApplications());
    dispatch(getTourForRenter());
    dispatch(getApplicationForRenter());
    dispatch(getUser());
    dispatch(getAdminNoticeForRenter());
  }, []);

  useEffect(() => {
    if (res?.data?.applicationId) {
      dispatch(getUserDashboard(res?.data?.applicationId));
    } else if (res?.data?.singleApplication?.singleApplicationId) {
      dispatch(
        getUserDashboard(res?.data?.singleApplication?.singleApplicationId)
      );
    }
  }, [res]);

  const {
    residentOf,
    profile_completion,
    first_name,
    middle_name,
    last_name,
    move_in_deposit,
    apartment,
    property,
    hid_announcement,
    secondApartment,
    secondProperty,
    secondApplicationId,
    secondResidentOf,
    secondResidentOfApt,
  } = res.data;

  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="w-full">
      <AdminHeader renterAdmin={true} title={"Dashboard"} />
      <div className="p-4 space-y-3">
        {adminNotice?.data && (
          <p className="bg-red-500 py-2 w-full text-center text-white text-sm">
            {adminNotice?.data}
          </p>
        )}
        {profile_completion < 80 && (
          <DashboardMessage
            name={`${first_name} ${
              middle_name ? middle_name : ""
            } ${last_name}`}
          />
        )}
        {profile_completion > 80 &&
          !apartment.status &&
          !res?.data?.singleApplication?.status &&
          showApplications.length === 0 &&
          approvedApplications.data.length === 0 && (
            <div className="bg-blue-500 dark:bg-blue-900 px-4 py-4 text-gray-100 dark:text-gray-300">
              <p>
                You are ready to book apartment tour and you can apply for rent
                as well.
              </p>
              <Link to={"/"} className="underline">
                {" "}
                Search Apartment/Flat{" "}
              </Link>
            </div>
          )}
        {showData.length > 0 && (
          <TourSceduleCard
            key={showData[0].tourId && showData[0].tourId}
            title={showData[0].property.name && showData[0].property.name}
            status={showData[0].status && showData[0].status}
            tourId={showData[0].tourId && showData[0].tourId}
            address={
              showData[0].property.address && showData[0].property.address
            }
            city={showData[0].property.city && showData[0].property.city}
            state={showData[0].property.state && showData[0].property.state}
            country={
              showData[0].property.country && showData[0].property.country
            }
            zip={showData[0].property.zip && showData[0].property.zip}
            type={showData[0].apartment.type && showData[0].apartment.type}
            unit_number={
              showData[0].apartment.unit_number &&
              showData[0].apartment.unit_number
            }
            date={showData[0].date && showData[0].date}
            time={showData[0].time && showData[0].time}
            note={showData[0].note && showData[0].note}
            tourType={showData[0].type && showData[0].type}
            link={showData[0].link && showData[0].link}
            isDashboard={true}
          />
        )}
        {approvedApplications.data &&
          approvedApplications.data.length > 0 &&
          approvedApplications.data.map((item) => {
            return <ApprovalMessage key={item.applicationId} item={item} />;
          })}
        {showApplications.length > 0 && (
          <RentApplicationStatusCard
            isDashboard={true}
            key={
              showApplications[0].apartmentId && showApplications[0].apartmentId
            }
            applicationId={
              showApplications[0].applicationId &&
              showApplications[0].applicationId
            }
            createdOn={showApplications[0]?.createdAt}
            title={
              showApplications[0].property &&
              showApplications[0].property.name &&
              showApplications[0].property.name
            }
            status={showApplications[0].status && showApplications[0].status}
            address={
              showApplications[0].property &&
              showApplications[0].property.address &&
              showApplications[0].property.address
            }
            city={
              showApplications[0].property &&
              showApplications[0].property.city &&
              showApplications[0].property.city
            }
            state={
              showApplications[0].property &&
              showApplications[0].property.state &&
              showApplications[0].property.state
            }
            country={
              showApplications[0].property &&
              showApplications[0].property.country &&
              showApplications[0].property.country
            }
            zip={
              showApplications[0].property &&
              showApplications[0].property.zip &&
              showApplications[0].property.zip
            }
            type={
              showApplications[0].apartment &&
              showApplications[0].apartment.type &&
              showApplications[0].apartment.type
            }
            lease_term={
              showApplications[0].lease_term && showApplications[0].lease_term
            }
            unit_number={
              showApplications[0].apartment &&
              showApplications[0].apartment.unit_number &&
              showApplications[0].apartment.unit_number
            }
            date={
              showApplications[0].move_in_date &&
              showApplications[0].move_in_date
            }
            note={showApplications[0].note && showApplications[0].note}
            total={
              showApplications[0].monthly_rent &&
              showApplications[0].monthly_rent
            }
            invoice={showApplications[0].invoice && showApplications[0].invoice}
            invoice_total={
              showApplications[0].invoice_total &&
              showApplications[0].invoice_total
            }
            expected_move_out_date={
              showApplications[0].expected_move_out_date &&
              showApplications[0].expected_move_out_date
            }
            prorated_rent={
              showApplications[0].prorated_rent &&
              showApplications[0].prorated_rent
            }
            pet_rent={
              showApplications[0].pet_rent && showApplications[0].pet_rent
            }
            apartmentAddress={showApplications[0]?.apartment?.address}
          />
        )}
        {!loading ? (
          <div className="space-y-5">
            {(res?.data?.apartment?.status ||
              res?.data?.singleApplication?.status) && (
              <Accordion open={open === 1}>
                <AccordionHeader className="bg-blue-700 py-0 text-white hover:text-white text-sm dark:bg-dark-primary darkText">
                  <div className="flex justify-start items-center w-full">
                    <div
                      onClick={() => handleOpen(1)}
                      className="flex-1 py-4 bg-red flex justify-between items-center px-2"
                    >
                      <div>Current Residence</div>
                      <div className="flex justify-start items-center space-x-3 mt-3 md:mt-0">
                        <Icon
                          onClick={() => handleOpen(1)}
                          id={1}
                          open={open}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody
                  className={
                    "md:p-4 p-2 w-full md:border md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode dark:border-dark-primary"
                  }
                >
                  <div className="w-full p-1 md:p-4 px-2 space-y-10">
                    {(residentOf || res?.data?.singlePropertyId) && (
                      <>
                        {(apartment?.status ===
                          "Resident (Move-Out Accepted)" ||
                          res?.data?.singleApplication?.status ===
                            "Resident (Move-Out Accepted)") && (
                          <p className="bg-yellow-500 px-4 py-2 dark:bg-[#360000] darkText">
                            Your Expected Move-Out Date:{" "}
                            <span className="font-semibold">
                              {apartment.expected_move_out_date
                                ? apartment.expected_move_out_date
                                : res?.data?.singleApplication
                                    ?.expected_move_out_date}
                            </span>
                          </p>
                        )}
                        <HeaderContent
                          apartment={apartment?.address && apartment}
                          property={
                            property?.address
                              ? property
                              : res?.data?.singleProperty
                          }
                        />
                      </>
                    )}

                    {!hid_announcement &&
                      (res?.data?.apartment?.status === "Resident" ||
                        res?.data?.apartment?.status === "Resident (Renewed)" ||
                        res?.data?.apartment?.status ===
                          "Resident (Move-Out Accepted)") &&
                      property?.announcements?.length > 0 && (
                        <div className="space-y-3 bg-yellow-600 dark:bg-[#360000] darkText px-4 py-4">
                          <div className="w-full">
                            <div className="w-full flex justify-between items-center">
                              <h3 className="md:text-lg text-base font-semibold flex justify-start items-center space-x-2">
                                <Icons.Announce />
                                <span>Announcements</span>
                              </h3>
                              <button
                                aria-label="delete"
                                type="button"
                                className="text-xl border rounded-full border-gray-900"
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are You Sure?",
                                    showDenyButton: true,
                                    confirmButtonText: "Ok",
                                    denyButtonText: `Cancel`,
                                  }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                      dispatch(hideNotice());
                                    }
                                  });
                                }}
                              >
                                {" "}
                                <Icons.Close />{" "}
                              </button>
                            </div>
                            <hr className="border-gray-600" />
                          </div>
                          <div className="space-y-3">
                            {property?.announcements?.map((notice, index) => {
                              return (
                                <div key={index}>
                                  <h4 className="text-lg font-semibold">
                                    {notice.subject}
                                  </h4>
                                  <p className="text-sm">{notice.msg}</p>
                                  {notice.date && (
                                    <p className="text-sm">
                                      Valid till: {notice.date}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    {apartment &&
                      apartment.status === "Resident (Not Moved-In)" && (
                        <CheckList
                          apartment={apartment && apartment}
                          property={property && property}
                        />
                      )}
                    {(res?.data?.apartment?.status === "Resident" ||
                      res?.data?.apartment?.status === "Resident (Renewed)" ||
                      res?.data?.apartment?.status ===
                        "Resident (Move-Out Accepted)" ||
                      res?.data?.singleApplication?.status === "Resident" ||
                      res?.data?.singleApplication?.status ===
                        "Resident (Renewed)" ||
                      res?.data?.singleApplication?.status ===
                        "Resident (Move-Out Accepted)") && (
                      <div className="md:grid sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-5 md:justify-start md:items-start md:space-y-0 space-y-10 w-full h-full">
                        {userDashboard?.data && (
                          <BillCard
                            title={"Account Balance"}
                            billInfo={userDashboard?.data?.billing}
                            autoPay={res?.data?.autopay}
                          />
                        )}
                        {(res?.data?.apartment?.status === "Resident" ||
                          res?.data?.apartment?.status ===
                            "Resident (Renewed)" ||
                          res?.data?.apartment?.status ===
                            "Resident (Move-Out Accepted)" ||
                          res?.data?.singleApplication?.status === "Resident" ||
                          res?.data?.singleApplication?.status ===
                            "Resident (Renewed)" ||
                          res?.data?.singleApplication?.status ===
                            "Resident (Move-Out Accepted)") && (
                          <InfoCard
                            title={"Maintenance Requests"}
                            className={
                              "flex flex-col justify-center items-center h-full px-4 space-y-3"
                            }
                          >
                            <div className="flex flex-col justify-center items-center">
                              {userDashboard.data &&
                              userDashboard.data.workOrders &&
                              userDashboard.data.workOrders > 0 ? (
                                <h3 className="text-xl text-blue-600 font-bold darkText">
                                  {" "}
                                  Open Orders: {
                                    userDashboard.data.workOrders
                                  }{" "}
                                </h3>
                              ) : (
                                <div className="xl:text-base text-xs">
                                  No Open Order
                                </div>
                              )}
                            </div>
                            <div className="text-xs w-full text-end text-blue-600">
                              <Link
                                to={"/renteradmin/workorder"}
                                className="underline"
                              >
                                {" "}
                                View Details{" "}
                              </Link>
                            </div>
                          </InfoCard>
                        )}
                        <InfoCard
                          title={"Vehicles"}
                          className={
                            "flex flex-col justify-center items-center px-4"
                          }
                        >
                          <ul className="list-disc xl:text-base text-xs">
                            {userDashboard.data &&
                            userDashboard.data.vehicles &&
                            userDashboard.data.vehicles.length > 0 ? (
                              userDashboard.data.vehicles.map((item, index) => {
                                return (
                                  <li key={index}>
                                    {item.model} - {item.plate}{" "}
                                    {item.owner === "Guest" && (
                                      <span className="text-red-500">
                                        ({item.owner})
                                      </span>
                                    )}
                                  </li>
                                );
                              })
                            ) : (
                              <p className="text-red-500 font-medium ">
                                Please add vehicle to avoid towing
                              </p>
                            )}
                          </ul>
                          <div className="text-xs w-full text-end text-blue-600">
                            {userDashboard.data &&
                            userDashboard.data.vehicles &&
                            userDashboard.data.vehicles.length === 0 ? (
                              <Link
                                to={"/renteradmin/vehicles"}
                                className="underline"
                              >
                                {" "}
                                Add Vehicle{" "}
                              </Link>
                            ) : (
                              <Link
                                to={"/renteradmin/vehicles"}
                                className="underline"
                              >
                                {" "}
                                View Details{" "}
                              </Link>
                            )}
                          </div>
                        </InfoCard>

                        <InfoCard
                          title={"Pets"}
                          className={
                            "flex flex-col justify-center items-center px-4"
                          }
                        >
                          {userDashboard.data &&
                          userDashboard.data.pets &&
                          userDashboard.data.pets > 0 ? (
                            <h3 className="text-xl text-blue-600 font-bold darkText">
                              {" "}
                              Total Pets: {userDashboard.data.pets}{" "}
                            </h3>
                          ) : (
                            <p className="xl:text-base text-xs">
                              {" "}
                              No pet added{" "}
                            </p>
                          )}
                          <div className="text-xs w-full text-end text-blue-600">
                            {userDashboard.data &&
                            userDashboard.data.pets &&
                            userDashboard.data.pets > 0 ? (
                              <Link
                                to={"/renteradmin/pet"}
                                className="underline"
                              >
                                {" "}
                                View Details{" "}
                              </Link>
                            ) : (
                              <Link
                                to={"/renteradmin/pet"}
                                className="underline"
                              >
                                {" "}
                                Add Pet{" "}
                              </Link>
                            )}
                          </div>
                        </InfoCard>
                      </div>
                    )}
                  </div>
                </AccordionBody>
              </Accordion>
            )}
            {res?.data?.secondApartment?.status ===
              "Resident (Not Moved-In)" && (
              <Accordion open={open === 2}>
                <AccordionHeader className="bg-blue-700 py-0 text-white hover:text-white text-sm dark:bg-dark-primary darkText">
                  <div className="flex justify-start items-center w-full">
                    <div
                      onClick={() => handleOpen(2)}
                      className="flex-1 py-4 bg-red flex justify-between items-center px-2"
                    >
                      <div>Upcoming Residence</div>
                      <div className="flex justify-start items-center space-x-3 mt-3 md:mt-0">
                        <Icon
                          onClick={() => handleOpen(2)}
                          id={2}
                          open={open}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody
                  className={
                    "md:p-4 p-2 w-full md:border md:border-blue-500 bg-gray-50 border-t-0 dark:bg-darkMode dark:border-dark-primary"
                  }
                >
                  <div className="w-full p-1 md:p-4 px-2 space-y-10">
                    {secondResidentOf && (
                      <>
                        {secondApartment?.status ===
                          "Resident (Move-Out Accepted)" && (
                          <p className="bg-yellow-500 px-4 py-2 dark:bg-[#360000] darkText">
                            Your Expected Move-Out Date:{" "}
                            <span className="font-semibold">
                              {secondApartment?.expected_move_out_date}
                            </span>
                          </p>
                        )}
                        <HeaderContent
                          apartment={secondApartment && secondApartment}
                          property={secondProperty && secondProperty}
                        />
                      </>
                    )}

                    {!hid_announcement &&
                      (res?.data?.secondApartment?.status === "Resident" ||
                        res?.data?.secondApartment?.status ===
                          "Resident (Renewed)" ||
                        res?.data?.secondApartment?.status ===
                          "Resident (Move-Out Accepted)") &&
                      secondProperty?.announcements?.length > 0 && (
                        <div className="space-y-3 bg-yellow-600 dark:bg-[#360000] darkText px-4 py-4">
                          <div className="w-full">
                            <div className="w-full flex justify-between items-center">
                              <h3 className="md:text-lg text-base font-semibold flex justify-start items-center space-x-2">
                                <Icons.Announce />
                                <span>Announcements</span>
                              </h3>
                              <button
                                type="button"
                                className="text-xl border rounded-full border-gray-900"
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are You Sure?",
                                    showDenyButton: true,
                                    confirmButtonText: "Ok",
                                    denyButtonText: `Cancel`,
                                  }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                      dispatch(hideNotice());
                                    }
                                  });
                                }}
                              >
                                {" "}
                                <Icons.Close />{" "}
                              </button>
                            </div>
                            <hr className="border-gray-600" />
                          </div>
                          <div className="space-y-3">
                            {secondProperty?.announcements?.map(
                              (notice, index) => {
                                return (
                                  <div key={index}>
                                    <h4 className="text-lg font-semibold">
                                      {notice.subject}
                                    </h4>
                                    <p className="text-sm">{notice.msg}</p>
                                    {notice.date && (
                                      <p className="text-sm">
                                        Valid till: {notice.date}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    {secondApartment &&
                      secondApartment?.status === "Resident (Not Moved-In)" && (
                        <CheckList
                          apartment={secondApartment && secondApartment}
                          property={secondProperty && secondProperty}
                        />
                      )}

                    {secondApartment?.status === "Resident" ||
                      (secondApartment?.status ===
                        "Resident (Move-Out Accepted)" && (
                        <div className="md:grid sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-5 md:justify-start md:items-start md:space-y-0 space-y-10 w-full h-full">
                          {userDashboard.data && (
                            <BillCard
                              title={"Account Balance"}
                              billInfo={userDashboard.data.billing}
                              autoPay={res?.data?.autopay}
                            />
                          )}
                          {secondApartment?.status === "Resident" ||
                            (secondApartment?.status ===
                              "Resident (Move-Out Accepted)" && (
                              <InfoCard
                                title={"Maintenance Requests"}
                                className={
                                  "flex flex-col justify-center items-center h-full px-4 space-y-3"
                                }
                              >
                                <div className="flex flex-col justify-center items-center">
                                  {userDashboard.data &&
                                  userDashboard.data.workOrders &&
                                  userDashboard.data.workOrders > 0 ? (
                                    <h3 className="text-xl text-blue-600 font-bold darkText">
                                      {" "}
                                      Open Orders:{" "}
                                      {userDashboard.data.workOrders}{" "}
                                    </h3>
                                  ) : (
                                    <div className="xl:text-base text-xs">
                                      No Open Order
                                    </div>
                                  )}
                                </div>
                                <div className="text-xs w-full text-end text-blue-600">
                                  <Link
                                    to={"/renteradmin/workorder"}
                                    className="underline"
                                  >
                                    {" "}
                                    View Details{" "}
                                  </Link>
                                </div>
                              </InfoCard>
                            ))}
                          <InfoCard
                            title={"Vehicles"}
                            className={
                              "flex flex-col justify-center items-center px-4"
                            }
                          >
                            <ul className="list-disc xl:text-base text-xs">
                              {userDashboard.data &&
                              userDashboard.data.vehicles &&
                              userDashboard.data.vehicles.length > 0 ? (
                                userDashboard.data.vehicles.map(
                                  (item, index) => {
                                    return (
                                      <li key={index}>
                                        {item.model} - {item.plate}{" "}
                                        {item.owner === "Guest" && (
                                          <span className="text-red-500">
                                            ({item.owner})
                                          </span>
                                        )}
                                      </li>
                                    );
                                  }
                                )
                              ) : (
                                <p className="text-red-500 font-medium ">
                                  Please add vehicle to avoid towing
                                </p>
                              )}
                            </ul>
                            <div className="text-xs w-full text-end text-blue-600">
                              {userDashboard.data &&
                              userDashboard.data.vehicles &&
                              userDashboard.data.vehicles.length === 0 ? (
                                <Link
                                  to={"/renteradmin/vehicles"}
                                  className="underline"
                                >
                                  {" "}
                                  Add Vehicle{" "}
                                </Link>
                              ) : (
                                <Link
                                  to={"/renteradmin/vehicles"}
                                  className="underline"
                                >
                                  {" "}
                                  View Details{" "}
                                </Link>
                              )}
                            </div>
                          </InfoCard>

                          <InfoCard
                            title={"Pets"}
                            className={
                              "flex flex-col justify-center items-center px-4"
                            }
                          >
                            {userDashboard.data &&
                            userDashboard.data.pets &&
                            userDashboard.data.pets > 0 ? (
                              <h3 className="text-xl text-blue-600 font-bold darkText">
                                {" "}
                                Total Pets: {userDashboard.data.pets}{" "}
                              </h3>
                            ) : (
                              <p className="xl:text-base text-xs">
                                {" "}
                                No pet added{" "}
                              </p>
                            )}
                            <div className="text-xs w-full text-end text-blue-600">
                              {userDashboard.data &&
                              userDashboard.data.pets &&
                              userDashboard.data.pets > 0 ? (
                                <Link
                                  to={"/renteradmin/pet"}
                                  className="underline"
                                >
                                  {" "}
                                  View Details{" "}
                                </Link>
                              ) : (
                                <Link
                                  to={"/renteradmin/pet"}
                                  className="underline"
                                >
                                  {" "}
                                  Add Pet{" "}
                                </Link>
                              )}
                            </div>
                          </InfoCard>
                        </div>
                      ))}
                  </div>
                </AccordionBody>
              </Accordion>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[90vh]">
            <ClipLoader size={100} color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
