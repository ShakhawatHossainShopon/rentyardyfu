import { Sidebar } from "@/components";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { getUser } from "@/services/user/user";
import { lazy, memo, Suspense, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { menus } from "./data";

const DashboardRoute = lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFoundRoute = lazy(() =>
  import("@/modules/UserClient/pages/NotFound/NotFound")
);
const UtilityBillsRoute = lazy(() =>
  import("../pages/UtilityBills/UtilityBills")
);
const WorkOrderRoute = lazy(() => import("../pages/WorkOrder/WorkOrder"));
const MailPackegesRoute = lazy(() =>
  import("../pages/MailPackeges/MailPackeges")
);
const PetManageRoute = lazy(() => import("../pages/PetManage/PetManage"));
const VehiclesManagerRoute = lazy(() =>
  import("../pages/VehiclesManager/VehiclesManager")
);
const TourScheduleRoute = lazy(() =>
  import("../pages/TourSchedule/TourSchedule")
);
const ApplicationCenterRoute = lazy(() =>
  import("../pages/ApplicationCenter/ApplicationCenter")
);
const PaymentSettingRoute = lazy(() =>
  import("../pages/PaymentSetting/PaymentSetting")
);
const AccountOccupantRoute = lazy(() =>
  import("../pages/AccountOccupant/AccountOccupant")
);
const InsuranceDocsRoute = lazy(() =>
  import("../pages/InsuranceDocs/InsuranceDocs")
);
const AssetManagementRoute = lazy(() =>
  import("../pages/AssetManagement/AssetManagement")
);
const MyRentRoute = lazy(() => import("../pages/MyRent/MyRent"));
const RenterTransactionRoute = lazy(() =>
  import("../pages/Transaction/Transaction")
);

const Layout = memo(() => {
  const dispatch = useAppDispatch();
  const { loading, data } = useGetUserSelector();

  const filteredMenus = menus.filter((menu) => {
    if (!data.residentOf && !data.singlePropertyId) {
      return (
        menu.path !== "/renteradmin/workorder" &&
        menu.path !== "/renteradmin/rent" &&
        menu.path !== "/renteradmin/insurance"
      );
    }
    if (
      data.apartment.status === "Resident (Not Moved-In)" ||
      data.singleApplication.status === "Resident (Not Moved-In)"
    ) {
      return (
        menu.path !== "/renteradmin/workorder" &&
        menu.path !== "/renteradmin/rent"
      );
    }
    return menu;
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="flex max-w-[1440px]">
      <Sidebar
        menus={filteredMenus}
        profile_percentage={data.profile_completion && data.profile_completion}
        first_name={data.first_name}
        middle_name={data.middle_name}
        last_name={data.last_name}
        email={data.email}
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
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/utility" element={<UtilityBillsRoute />} />
            <Route path="/transactions" element={<RenterTransactionRoute />} />
            <Route path="/workorder" element={<WorkOrderRoute />} />
            <Route path="/packeges" element={<MailPackegesRoute />} />
            <Route path="/pet" element={<PetManageRoute />} />
            <Route path="/asset" element={<AssetManagementRoute />} />
            <Route path="/vehicles" element={<VehiclesManagerRoute />} />
            <Route path="/tour" element={<TourScheduleRoute />} />
            <Route path="/application" element={<ApplicationCenterRoute />} />
            <Route path="/payment" element={<PaymentSettingRoute />} />
            <Route path="/account" element={<AccountOccupantRoute />} />
            <Route path="/insurance" element={<InsuranceDocsRoute />} />
            <Route path="/rent" element={<MyRentRoute />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
});

export default Layout;
