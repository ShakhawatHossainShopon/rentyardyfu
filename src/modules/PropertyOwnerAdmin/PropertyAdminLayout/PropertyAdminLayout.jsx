import { Sidebar } from "@/components";
import {
  useAppDispatch,
  useGetAllWorkOrderByPOSelector,
  useGetApplicationListForPOSelector,
  useGetTourForPOSelector,
  useGetUserSelector,
} from "@/hooks";
import { getApplicationListForPO } from "@/services/application/application";
import { getTourListForPO } from "@/services/tour/tour";
import { getUser } from "@/services/user/user";
import { getAllWorkOrderByPO } from "@/services/workOrder/workOrder";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { menus } from "./data";

const PropertyDashboardRoute = lazy(() =>
  import("../pages/PropertyDashboard/PropertyDashboard")
);
const TransactionRoute = lazy(() => import("../pages/Transaction/Transaction"));
const NotFoundRoute = lazy(() =>
  import("@/modules/UserClient/pages/NotFound/NotFound")
);
const ApplicationsRoute = lazy(() =>
  import("../pages/Applications/Applications")
);
const ResidentsRoute = lazy(() => import("../pages/Residents/Residents"));
const AllPropertyRoute = lazy(() => import("../pages/AllProperty/AllProperty"));
const AddApartmentRoute = lazy(() =>
  import("../pages/AddApartment/AddApartment")
);
const PropertyRulesRoute = lazy(() =>
  import("../pages/PropertyRules/PropertyRules")
);
const PropertyWorkOrderRoute = lazy(() =>
  import("../pages/PropertyWorkOrder/PropertyWorkOrder")
);
const TourRequestRoute = lazy(() => import("../pages/TourRequest/TourRequest"));
const EmployeeListRoute = lazy(() =>
  import("../pages/EmployeeList/EmployeeList")
);
const InvoicesRoute = lazy(() => import("../pages/Invoices/Invoices"));
const PropertyPaymentSettingsRoute = lazy(() =>
  import("../pages/PropertyPaymentSettings/PropertyPaymentSettings")
);
const SubscriptionRoute = lazy(() =>
  import("../pages/Subscription/Subscription")
);
const PropertyAccountSettingsRoute = lazy(() =>
  import("../pages/PropertyAccountSettings/PropertyAccountSettings")
);
const PaidParkingRoute = lazy(() => import("../pages/PaidParking/PaidParking"));
const SingleHousePropertyRoute = lazy(() =>
  import("../pages/SingleHouseProperty/SingleHouseProperty")
);
const AssetManagementRoute = lazy(() =>
  import("../pages/AssetManagement/AssetManagement")
);
const StatementRoute = lazy(() => import("../pages/Statements/Statements"));
const DepositsRoute = lazy(() => import("../pages/Deposits/Deposits"));
const CustomInvoiceRoute = lazy(() =>
  import("../pages/CustomInvoice/CustomInvoice")
);
const NoticeRoute = lazy(() => import("../pages/Notice/Notice"));
const CarRoute = lazy(() => import("../pages/AllCars/AllCars"));
const PetRoute = lazy(() => import("../pages/AllPets/AllPets"));
const RealtorsRoute = lazy(() => import("../pages/Realtors/Realtors"));
const MaintenanceProviderRoute = lazy(() =>
  import("../pages/MaintenanceProvider/MaintenanceProvider")
);

const PropertyAdminLayout = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetUserSelector();

  const response = useGetApplicationListForPOSelector();
  const workOrder = useGetAllWorkOrderByPOSelector();
  const tourResponse = useGetTourForPOSelector();

  const workOrderData = workOrder.data.filter(
    (item) => item.status === "Pending"
  );

  const tourData =
    tourResponse.data &&
    tourResponse.data.filter(
      (tour) => tour.status === "Pending" || tour.status === "Confirmed"
    );

  const showData =
    response.data &&
    response.data.filter(
      (item) => item.status === "Under Review" || item.status === "Approved"
    );
  const showNotMovedIn =
    response.data &&
    response.data.filter(
      (item) =>
        item.status === "Resident (Not Moved-In)" ||
        item.notif_renew === true ||
        item.notif_move_out === true
    );

  useEffect(() => {
    dispatch(getUser());
    dispatch(getTourListForPO());
    dispatch(getApplicationListForPO());
    dispatch(getAllWorkOrderByPO());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar
        menus={menus}
        first_name={data.first_name}
        middle_name={data.middle_name}
        last_name={data.last_name}
        email={data.email}
        applicationTotal={showData && showData.length}
        tourTotal={tourData && tourData.length}
        notMovedInTotal={showNotMovedIn && showNotMovedIn.length}
        workOrderTotal={workOrderData && workOrderData.length}
      />
      <div className="w-full lg:w-[80%]">
        <Outlet />
        <Suspense
          fallback={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
        >
          <Routes>
            <Route path="/dashboard" element={<PropertyDashboardRoute />} />
            <Route path="/notice" element={<NoticeRoute />} />
            <Route path="/realtors" element={<RealtorsRoute />} />
            <Route path="/provider" element={<MaintenanceProviderRoute />} />
            <Route path="/vehicles" element={<CarRoute />} />
            <Route path="/pets" element={<PetRoute />} />
            <Route path="/custom" element={<CustomInvoiceRoute />} />
            <Route path="/statements" element={<StatementRoute />} />
            <Route
              path="/singlehouseproperty"
              element={<SingleHousePropertyRoute />}
            />
            <Route path="/parking" element={<PaidParkingRoute />} />
            <Route path="/transactions" element={<TransactionRoute />} />
            <Route path="/deposit" element={<DepositsRoute />} />
            <Route path="/applications" element={<ApplicationsRoute />} />
            <Route path="/residents" element={<ResidentsRoute />} />
            <Route path="/allproperty" element={<AllPropertyRoute />} />
            <Route path="/allapartment" element={<AddApartmentRoute />} />
            <Route path="/propertyrules" element={<PropertyRulesRoute />} />
            <Route path="/workorder" element={<PropertyWorkOrderRoute />} />
            <Route path="/tour" element={<TourRequestRoute />} />
            <Route path="/employeelist" element={<EmployeeListRoute />} />
            <Route path="/invoices" element={<InvoicesRoute />} />
            <Route path="/asset" element={<AssetManagementRoute />} />
            <Route path="/payment" element={<PropertyPaymentSettingsRoute />} />
            <Route path="/subscription" element={<SubscriptionRoute />} />
            <Route path="/account" element={<PropertyAccountSettingsRoute />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PropertyAdminLayout;
