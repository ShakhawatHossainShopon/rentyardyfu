export const apiEndPoints = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    LOGIN: "/auth/signin",
    LOGOUT: "/auth/signout",
    OTP: "/auth/verify",
    CHANGE_PASSWORD: "/auth/changepassword",
    FORGOT_PASSWORD: "/auth/forgotpassword",
    FORGOT_PASS_OTP: "/auth/confirmpassotp",
    SET_NEW_PASS: "/auth/setnewpassword",
  },
  POST: {
    POST: "/post",
    POST_REPLY: "/post/reply",
    POST_ALL: "/post/all",
    POST_SAVE: "/post/save",
    POST_REPORT: "/post/report",
  },
  DEPOSIT: {
    DEPOSIT: "/deposit",
  },
  STATEMENTS: {
    STATEMENTS: "/statement",
  },
  NOTICE: {
    NOTICE: "/announcement",
    NOTICE_PROPERTY: "/announcement/property",
    NOTICE_VISIBILITY: "/announcement/visibility",
    NOTICE_HIDE: "/announcement/hide",
  },
  ADMIN_NOTICE: {
    ADMIN_NOTICE: "/view/notice",
    ADMIN_NOTICE_AUTH: "/view/notice/auth",
  },
  SUBSCRIPTION: {
    SUBSCRIPTION: "/subscription",
    SUBSCRIPTION_AUTO_RENEWAL: "/subscription/make-auto",
    SUBSCRIPTION_CHECK_PRICING: "/subscription/check-pricing",
  },
  PAID_PARKING: {
    PAID_PARKING: "/property/parking",
    RENTER_PAID_PARKING: "/vehicle/parking",
  },
  EXTRA_INVOICE: {
    EXTRA_INVOICE: "/extrainvoice",
  },
  INSURANCE: {
    INSURANCE: "/user/insurance",
  },
  EMPLOYEE: {
    EMPLOYEE: "/employee",
    CREDENTIAL: "/employee/credentials",
  },
  RENEW_OR_MOVE_OUT: {
    RENEW_OR_MOVE_OUT: "/application/request",
  },
  WORK_ORDER: {
    WORK_ORDER: "/workorder",
    ASSIGN_PROVIDER: "/workorder/assign",
    PROPERTY: "/workorder/property",
  },
  MAIL: {
    MAIL: "/mail",
  },
  APPLICATION_FEE: {
    APPLICATION_FEE: "/view/application-fee",
    APPLICATION_APPROVAL_PAYMENT: "/application/pay",
  },
  VEHICLE: {
    VEHICLE: "/vehicle",
  },
  PET: {
    PET: "/pet",
    PET_INFO: "/pet/property/info",
    ALL_PET: "/property/list/pets",
  },
  STAFF: {
    STAFF: "/staff",
  },
  PAYMENT: {
    PAYMENT: "/payment",
  },
  OCCUPANT: {
    OCCUPANT: "/occupant",
  },
  INVOICE: {
    INVOICE: "/invoice",
  },
  USER: {
    USER: "/user",
    USER_DASHBOARD: "/user/dashboard",
    USER_PO: "/user/property",
    CHANGE_EMAIL: "/user/change-email",
    USER_BILL: "/user/pay-bill",
    USER_AUTO_PAY: "/user/auto-pay",
  },
  APPLICATION: {
    APPLICATION: "/application",
    PROPERTY: "/application/property",
    APPROVED: "/application/approved",
    DOCS: "/application/document",
  },
  ASSET: {
    ASSET: "/asset",
    DELETE: "/asset",
  },
  PAYMENT: {
    PAYMENT: "/payment",
    PAYMENT_PO: "/payment/property",
    PAYMENT_WITHDRAW: "/withdraw",
    WITHDRAW_VERIFY: "/withdraw/verify",
    PAYMENT_WITHDRAW_LIST: "/withdraw/user",
    PAYMENT_DEFAULT: "/payment/make-default",
    TRANSACTION: "/transaction/property",
    TRANSACTION_RENTER: "/transaction/list",
  },
  PROPERTY: {
    PROPERTY: "/property",
    DELETE: "/property",
    REVIEW: "/property/review",
    PUBLIC: "/view/properties",
    PUBLISH: "/property/publish",
    PROPERTY_NAME_ID: "/property/list",
  },
  SINGLE_PROPERTY: {
    SINGLE_PROPERTY: "/singleproperty",
    PUBLISH: "/singleproperty/publish",
  },
  TOUR: {
    TOUR: "/tour",
    PROPERTY: "/tour/property",
  },
  VEHICLE: {
    VEHICLE: "/vehicle",
    VEHICLE_PARKING: "/vehicle/parking",
    ALL_VEHICLE: "/property/list/vehicles",
  },
  MAIL: {
    MAIL: "/mail",
  },
  APARTMENT: {
    APARTMENT: "/apartment",
    APARTMENT_CLONE: "/apartment/clone",
    PUBLISH: "/apartment/publish",
  },
  CONTACT: {
    CONTACT: "/info/contact",
  },
  CUSTOM_INVOICE: {
    CUSTOM_INVOICE: "/custominvoice",
    CUSTOM_INVOICE_CHECK_EMAIL: "/custominvoice/check-mail",
  },
};
