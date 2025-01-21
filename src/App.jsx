import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { BackToTop } from "./components";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import PropertyRequireAuth from "./components/PropertyRequireAuth/PropertyRequireAuth";
import RentRequireAuth from "./components/RentRequireAuth/RentRequireAuth";
import { useAppDispatch } from "./hooks";
import PropertyAdminLayout from "./modules/PropertyOwnerAdmin/PropertyAdminLayout/PropertyAdminLayout";
import { getUser } from "./services/user/user";

const HomeRoute = lazy(() => import("./modules/UserClient/pages/Home/Home"));
const NotFoundRoute = lazy(() =>
  import("./modules/UserClient/pages/NotFound/NotFound")
);
const PrintAddressProofRoute = lazy(() =>
  import("./modules/RenterAdmin/pages/PrintAddressProof/PrintAddressProof")
);
const AboutUsRoute = lazy(() =>
  import("./modules/UserClient/pages/AboutUs/AboutUs")
);
const ServiceProviderRoute = lazy(() =>
  import("./modules/UserClient/pages/ServiceProvider/ServiceProvider")
);
const PrintApplicantRoute = lazy(() =>
  import(
    "./modules/PropertyOwnerAdmin/pages/PrintApplicantDetails/PrintApplicantDetails"
  )
);
const HelpRoute = lazy(() => import("./modules/UserClient/pages/Help/Help"));
const PrintInvoiceRoute = lazy(() =>
  import("./modules/PropertyOwnerAdmin/components/PrintInvoice/PrintInvoice")
);
const PrintExtraInvoiceRoute = lazy(() =>
  import(
    "./modules/PropertyOwnerAdmin/pages/Invoices/PrintExtraInvoice/PrintExtraInvoice"
  )
);
const TermsRoute = lazy(() => import("./modules/UserClient/pages/Terms/Terms"));
const AccessibilityRoute = lazy(() =>
  import("./modules/UserClient/pages/Accessibility/Accessibility")
);
const PolicyRoute = lazy(() =>
  import("./modules/UserClient/pages/Policy/Policy")
);
const SearchRoute = lazy(() =>
  import("./modules/UserClient/pages/Search/Search")
);
const PropertyDetailsRoute = lazy(() =>
  import("./modules/UserClient/pages/ProjectDetails/ProjectDetails")
);
const RenterLayout = lazy(() => import("./modules/RenterAdmin/layout/Layout"));
const PrintLeaseForm = lazy(() =>
  import("./modules/UserClient/pages/PrintLeaseForm/PrintLeaseForm")
);

const RenterInvoice = lazy(() =>
  import(
    "./modules/RenterAdmin/pages/Dashboard/components/RenterInvoice/RenterInvoice"
  )
);
const NewsRoute = lazy(() => import("./modules/UserClient/pages/News/News"));
const ContactRoute = lazy(() =>
  import("./modules/UserClient/pages/Contact/Contact")
);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const darkMode = useSelector((state) => state.darkMode.value);

  const location = useLocation();
  const darkModeClass =
    darkMode &&
    ![
      "/RenterInvoice",
      "/print-application",
      "/print-extra-invoice",
      "/print-invoice",
    ].includes(location.pathname)
      ? "dark"
      : "";

  return (
    <div className={darkModeClass}>
      <div className="flex justify-center items-center dark:bg-darkMode darkText">
        <BackToTop />
        <div className="max-w-[1440px]">
          <main>
            <Suspense
              fallback={
                <div className="w-full flex justify-center items-center h-[90vh]">
                  <ClipLoader size={100} color="blue" />
                </div>
              }
            >
              <Navbar />
              <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/contact" element={<ContactRoute />} />
                <Route path="/RenterInvoice" element={<RenterInvoice />} />
                <Route path="/news" element={<NewsRoute />} />
                <Route path="/about" element={<AboutUsRoute />} />
                <Route
                  path="/print-address"
                  element={<PrintAddressProofRoute />}
                />
                <Route path="/print-lease" element={<PrintLeaseForm />} />
                <Route
                  path="/serviceprovider"
                  element={<ServiceProviderRoute />}
                />
                <Route path="/print-invoice" element={<PrintInvoiceRoute />} />
                <Route
                  path="/print-extra-invoice"
                  element={<PrintExtraInvoiceRoute />}
                />
                <Route
                  path="/print-application"
                  element={<PrintApplicantRoute />}
                />
                <Route path="/help" element={<HelpRoute />} />
                <Route path="/policy" element={<PolicyRoute />} />
                <Route path="/terms" element={<TermsRoute />} />
                <Route path="/accessibility" element={<AccessibilityRoute />} />
                <Route path="/search" element={<SearchRoute />} />
                <Route
                  path="/property/:id"
                  element={<PropertyDetailsRoute />}
                />
                <Route
                  path="/renteradmin/*"
                  element={
                    <RentRequireAuth>
                      <RenterLayout />
                    </RentRequireAuth>
                  }
                />
                <Route
                  path="/propertyadmin/*"
                  element={
                    <PropertyRequireAuth>
                      <PropertyAdminLayout />
                    </PropertyRequireAuth>
                  }
                />
                <Route path="*" element={<NotFoundRoute />} />
              </Routes>
              <Footer />
            </Suspense>
          </main>
        </div>
        <ToastContainer theme="dark" />
      </div>
    </div>
  );
}

export default App;
