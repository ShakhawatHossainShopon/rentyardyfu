import { config } from "@/config";
import { Icons } from "@/utils";
export const PropertyOwnerBanner = () => {
  return (
    <div className="flex justify-center items-center px-2 md:px-0 md:pt-16 md:pb-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 md:gap-24 items-center justify-center">
        <img
          src={`${config.url.ASSET_URL}assets/PropertyBanner.png`}
          className="w-10/12 lg:hidden block"
          alt="Renterbanner"
        />
        <div className="xl:pl-24 space-y-2">
          <h4 className="md:text-xl text-base tracking-wider">
            OWNER BENEFITS
          </h4>
          <div className="space-y-5">
            <h3 className="md:text-4xl text-2xl font-semibold leading-tight">
              EFFORTLESS PROPERTY <br /> MANAGEMENT
            </h3>
            <p className="md:text-base sm:text-sm text-xs md:leading-7">
              RentYard offers seamless property management with tools for
              managing leases, handling maintenance issues, and processing
              payments all in one place. Its intuitive design ensures efficient
              operations and enhanced communication between landlords and
              tenants.
            </p>

            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 text-lg md:text-2xl dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Property Listing & Rental Marketing
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 md:text-2xl text-lg dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Tenant Screening & Application Processing{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 md:text-2xl text-lg dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Apartment Tour Booking Management
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 md:text-2xl text-lg dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Renter’s Work Order Processing
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 md:text-2xl text-lg dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Invoicing and Employee Management{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Icons.Check className="text-blue-700 md:text-2xl text-lg dark:text-[#486581]" />{" "}
                <span className="md:text-base sm:text-sm text-xs">
                  Manage Leases, Tenants, and Vacancies
                </span>
              </p>
            </div>
          </div>
        </div>

        <img
          src={`${config.url.ASSET_URL}assets/PropertyBanner.png`}
          className="lg:w-10/12 w-full justify-self-center lg:block hidden"
          alt="Renterbanner"
        />
      </div>
    </div>
  );
};
