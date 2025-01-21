import { Icons } from "@/utils";

export const menus = [
  {
    label: "Dashboard",
    path: "/renteradmin/dashboard",
    icon: (
      <span>
        <Icons.dashboard className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Maintenance Request",
    path: "/renteradmin/workorder",
    icon: (
      <span>
        <Icons.work className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Pet Manager",
    path: "/renteradmin/pet",
    icon: (
      <span>
        <Icons.pets className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Vehicles & Parking",
    path: "/renteradmin/vehicles",
    icon: (
      <span>
        <Icons.cars className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Tour Schedule",
    path: "/renteradmin/tour",
    icon: (
      <span>
        <Icons.tour className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "My Application",
    path: "/renteradmin/application",
    icon: (
      <span>
        <Icons.application className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Payment Setting",
    path: "/renteradmin/payment",
    icon: (
      <span>
        <Icons.paymentSetting className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Transactions",
    path: "/renteradmin/transactions",
    icon: (
      <span>
        <Icons.Money className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Profile & Occupant",
    path: "/renteradmin/account",
    icon: (
      <span>
        <Icons.account className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Insurance & Docs",
    path: "/renteradmin/insurance",
    icon: (
      <span>
        <Icons.docs className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "My Rent/Lease",
    path: "/renteradmin/rent",
    icon: (
      <span>
        <Icons.check className="w-5 h-5" />
      </span>
    ),
  },
  {
    label: "Asset Manager",
    path: "/renteradmin/asset",
    icon: (
      <span>
        <Icons.asset className="w-5 h-5" />
      </span>
    ),
  },
];
