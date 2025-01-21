import {
  getAdminNoticeForRenterReducer,
  getAdminNoticeReducer,
} from "@/features/adminNotice";
import {
  addApartmentReducer,
  deleteApartmentReducer,
  getAllApartmentReducer,
  getApartmentByIdReducer,
  updateApartmentByIdReducer,
} from "@/features/apartment";
import {
  addApplicationReducer,
  deleteApplicationReducer,
  getApplicationForRenterReducer,
  getApplicationListForPOReducer,
  getApprovedApplicationsReducer,
  updateApplicationByPOReducer,
} from "@/features/application";
import { getApplicationFeeReducer } from "@/features/applicationFee/getApplicationFeeSlice";
import {
  addAssetReducer,
  deleteAssetReducer,
  getAllAssetReducer,
} from "@/features/asset";
import {
  changeTabReducer,
  loginReducer,
  logoutReducer,
  otpReducer,
  signUpReducer,
} from "@/features/auth";
import {
  sendEmailPasswordReducer,
  sendNewEmailOtpReducer,
  sendOldEmailOtpReducer,
} from "@/features/changeEmail";
import {
  checkEmailForCustomInvoiceReducer,
  getCustomInvoicesReducer,
} from "@/features/customInvoice";
import darkModeReducer from "@/features/darkMode/darkModeSlice";
import { getAllDepositReducer, updateDepositReducer } from "@/features/deposit";
import {
  addEmployeeReducer,
  deleteEmployeeReducer,
  getAllEmployeeReducer,
  updateEmployeeReducer,
} from "@/features/employee";
import {
  addExtraInvoiceReducer,
  getExtraInvoiceReducer,
} from "@/features/extraInvoice";
import {
  sendEmailReducer,
  sendOtpReducer,
  setNewPassReducer,
} from "@/features/forgotPassword";
import {
  addInsuranceReducer,
  getInsuranceReducer,
  updateInsuranceReducer,
} from "@/features/insurance";
import {
  addInvoiceReducer,
  deleteInvoiceReducer,
  getAllInvoiceByPOForRenterReducer,
  updateInvoiceReducer,
} from "@/features/invoice";
import {
  addNoticeReducer,
  deleteNoticeReducer,
  getAllNoticeByPOReducer,
  getAllNoticeByRenterReducer,
  updateNoticeReducer,
  UpdateNoticeVisibilityReducer,
} from "@/features/notice";
import {
  addOccupantReducer,
  deleteOccupantReducer,
  getAllOccupantReducer,
  updateOccupantReducer,
} from "@/features/occupant";
import {
  addPackageReducer,
  deletePackageReducer,
  getAllPackageReducer,
  updatePackageReducer,
} from "@/features/packages";
import {
  addPaidParkingReducer,
  deletePaidParkingReducer,
  getPaidParkingForPOReducer,
  getPaidParkingForRenterReducer,
} from "@/features/paidParking";
import {
  addPaymentMethodReducer,
  addWithdrawReducer,
  deletePaymentMethodReducer,
  getAllPaymentMethodsReducer,
  getAllTransactionForRenterReducer,
  getAllTransactionReducer,
  getAllWithdrawnListReducer,
  updatePaymentMethodReducer,
} from "@/features/paymentMethods";
import {
  addPetReducer,
  deletePetReducer,
  getAllPetForPoReducer,
  getAllPetReducer,
  getPetInfoReducer,
  updatePetReducer,
} from "@/features/pet";
import { getAllPostReducer, getPostReducer } from "@/features/post";
import {
  addPropertyReducer,
  addPropertyReviewReducer,
  deletePropertyReducer,
  getAllPropertyReducer,
  getPropertyByIdPublicViewReducer,
  getPropertyByIdReducer,
  getPropertyListNameIdReducer,
  getPropertyPublicViewReducer,
  replyPropertyReviewReducer,
  updatePropertyByIdReducer,
} from "@/features/property";
import { getRenewOrMoveOutReducer } from "@/features/renewOrMoveOut";
import { searchReducer } from "@/features/search";
import { getAllSinglePropertyReducer } from "@/features/singleProperty";
import { getStaffReducer } from "@/features/staff";
import {
  getStatementsReducer,
  updateStatementReducer,
} from "@/features/statements";
import {
  addSubscriptionReducer,
  getActiveSubsReducer,
  getSubsPricingReducer,
} from "@/features/subscription";
import sidebarReducer from "@/features/toggleSidebar/toggleSidebarSlice";
import {
  addTourReducer,
  deleteTourByRenterReducer,
  getTourForPOReducer,
  getTourForRenterReducer,
  updateTourByPOReducer,
} from "@/features/tour";
import {
  addUserInfoReducer,
  getUserDashboardReducer,
  getUserReducer,
} from "@/features/user";
import {
  addVehicleReducer,
  deleteVehicleReducer,
  getAllVehicleForPoReducer,
  getAllVehicleReducer,
  updateVehicleReducer,
} from "@/features/vehicle";
import {
  addWorkOrderReducer,
  getAllWorkOrderByPOReducer,
  getAllWorkOrderReducer,
  updateWordOrderReducer,
} from "@/features/workOrder";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  signUp: signUpReducer,
  login: loginReducer,
  logout: logoutReducer,
  addProperty: addPropertyReducer,
  getAllProperty: getAllPropertyReducer,
  deleteProperty: deletePropertyReducer,
  deleteAsset: deleteAssetReducer,
  getAllAsset: getAllAssetReducer,
  addAsset: addAssetReducer,
  getPropertyById: getPropertyByIdReducer,
  updatePropertyById: updatePropertyByIdReducer,
  getAllApartment: getAllApartmentReducer,
  deleteApartment: deleteApartmentReducer,
  addApartment: addApartmentReducer,
  updateApartment: updateApartmentByIdReducer,
  getApartmentById: getApartmentByIdReducer,
  getPropertyPublicView: getPropertyPublicViewReducer,
  getPropertyByIdPublicView: getPropertyByIdPublicViewReducer,
  addPropertyReview: addPropertyReviewReducer,
  replyPropertyReview: replyPropertyReviewReducer,
  otp: otpReducer,
  addUserInfo: addUserInfoReducer,
  getUser: getUserReducer,
  addTour: addTourReducer,
  deleteTourBy: deleteTourByRenterReducer,
  getTourForPO: getTourForPOReducer,
  getTourForRenter: getTourForRenterReducer,
  updateTourByPO: updateTourByPOReducer,
  search: searchReducer,
  addApplication: addApplicationReducer,
  deleteApplication: deleteApplicationReducer,
  getApplicationForRenter: getApplicationForRenterReducer,
  getApplicationListForPO: getApplicationListForPOReducer,
  updateApplicationByPO: updateApplicationByPOReducer,
  getApprovedApplications: getApprovedApplicationsReducer,
  addInvoice: addInvoiceReducer,
  deleteInvoice: deleteInvoiceReducer,
  updateInvoiceReducer: updateInvoiceReducer,
  getAllInvoiceByPOForRenter: getAllInvoiceByPOForRenterReducer,
  addOccupant: addOccupantReducer,
  getAllOccupant: getAllOccupantReducer,
  updateOccupant: updateOccupantReducer,
  deleteOccupant: deleteOccupantReducer,
  addPaymentMethod: addPaymentMethodReducer,
  deletePaymentMethod: deletePaymentMethodReducer,
  getAllPaymentMethods: getAllPaymentMethodsReducer,
  updatePaymentMethod: updatePaymentMethodReducer,
  addPet: addPetReducer,
  deletePet: deletePetReducer,
  getAllPet: getAllPetReducer,
  updatePet: updatePetReducer,
  addVehicle: addVehicleReducer,
  deleteVehicle: deleteVehicleReducer,
  getAllVehicle: getAllVehicleReducer,
  updateVehicle: updateVehicleReducer,
  getApplicationFee: getApplicationFeeReducer,
  addPackage: addPackageReducer,
  deletePackage: deletePackageReducer,
  getAllPackage: getAllPackageReducer,
  updatePackage: updatePackageReducer,
  changeTab: changeTabReducer,
  addWorkOrder: addWorkOrderReducer,
  getAllWorkOrderByPO: getAllWorkOrderByPOReducer,
  getAllWorkOrder: getAllWorkOrderReducer,
  updateWordOrder: updateWordOrderReducer,
  getRenewOrMoveOut: getRenewOrMoveOutReducer,
  addEmployee: addEmployeeReducer,
  deleteEmployee: deleteEmployeeReducer,
  getAllEmployee: getAllEmployeeReducer,
  updateEmployee: updateEmployeeReducer,
  addInsurance: addInsuranceReducer,
  getInsurance: getInsuranceReducer,
  updateInsurance: updateInsuranceReducer,
  sendEmail: sendEmailReducer,
  sendOtp: sendOtpReducer,
  setNewPass: setNewPassReducer,
  sendEmailPassword: sendEmailPasswordReducer,
  sendNewEmailOtp: sendNewEmailOtpReducer,
  sendOldEmailOtp: sendOldEmailOtpReducer,
  getExtraInvoice: getExtraInvoiceReducer,
  addExtraInvoice: addExtraInvoiceReducer,
  addPaidParking: addPaidParkingReducer,
  deletePaidParking: deletePaidParkingReducer,
  getPaidParkingForPO: getPaidParkingForPOReducer,
  getPaidParkingForRenter: getPaidParkingForRenterReducer,
  getAllWithdrawnList: getAllWithdrawnListReducer,
  getAllTransaction: getAllTransactionReducer,
  addSubscription: addSubscriptionReducer,
  getActiveSubs: getActiveSubsReducer,
  getSubsPricing: getSubsPricingReducer,
  getPropertyListNameId: getPropertyListNameIdReducer,
  getUserDashboard: getUserDashboardReducer,
  addNotice: addNoticeReducer,
  deleteNotice: deleteNoticeReducer,
  getAllNoticeByPO: getAllNoticeByPOReducer,
  getAllNoticeByRenter: getAllNoticeByRenterReducer,
  updateNotice: updateNoticeReducer,
  UpdateNoticeVisibility: UpdateNoticeVisibilityReducer,
  getPetInfo: getPetInfoReducer,
  getStatements: getStatementsReducer,
  updateStatement: updateStatementReducer,
  getAllDeposit: getAllDepositReducer,
  updateDeposit: updateDepositReducer,
  getAllTransactionForRenter: getAllTransactionForRenterReducer,
  getCustomInvoices: getCustomInvoicesReducer,
  checkEmailForCustomInvoice: checkEmailForCustomInvoiceReducer,
  addWithdraw: addWithdrawReducer,
  getAllVehicleForPo: getAllVehicleForPoReducer,
  getAllPetForPo: getAllPetForPoReducer,
  getPost: getPostReducer,
  getAllPost: getAllPostReducer,
  getAdminNotice: getAdminNoticeReducer,
  getAdminNoticeForRenter: getAdminNoticeForRenterReducer,
  getAllSingleProperty: getAllSinglePropertyReducer,
  getStaff: getStaffReducer,
  darkMode: darkModeReducer,
  sidebar: sidebarReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "getStaff",
    "getAllSingleProperty",
    "getAdminNotice",
    "getAdminNoticeForRenter",
    "getPost",
    "getAllPost",
    "getAllPetForPo",
    "getAllVehicleForPo",
    "addWithdraw",
    "getCustomInvoices",
    "checkEmailForCustomInvoice",
    "getAllTransactionForRenter",
    "getAllDeposit",
    "getStatements",
    "getPetInfo",
    "getAllNoticeByPO",
    "getAllNoticeByRenter",
    "sidebar",
    "getUserDashboard",
    "getPropertyListNameId",
    "getSubsPricing",
    "getActiveSubs",
    "getAllTransaction",
    "getAllWithdrawnList",
    "getPaidParkingForRenter",
    "getPaidParkingForPO",
    "getExtraInvoice",
    "sendEmailPassword",
    "sendNewEmailOtp",
    "sendOldEmailOtp",
    "sendEmail",
    "sendOtp",
    "setNewPass",
    "getInsurance",
    "getAllEmployee",
    "getPropertyPublicView",
    "getPropertyByIdPublicView",
    "getAllWorkOrder",
    "getAllWorkOrderByPO",
    "changeTab",
    "getAllProperty",
    "getAllApartment",
    "getAllAsset",
    "getPropertyByIdPublicView",
    "getUser",
    "getTourForPO",
    "getTourForRenter",
    "getApplicationForRenter",
    "getApplicationListForPO",
    "getApprovedApplications",
    "getAllInvoiceByPOForRenter",
    "getAllOccupant",
    "getAllPaymentMethods",
    "getAllPet",
    "getAllVehicle",
    "getApplicationFee",
    "getAllPackage",
    "getRenewOrMoveOut",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

const persistor = persistStore(store);

export { persistConfig, persistor, store };
