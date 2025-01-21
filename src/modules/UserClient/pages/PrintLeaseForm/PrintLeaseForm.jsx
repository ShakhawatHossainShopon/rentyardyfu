import { config } from "@/config";
import { useAppDispatch, useGetUserSelector } from "@/hooks";
import { getUser } from "@/services/user/user";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
const PrintLeaseForm = () => {
  const dispatch = useAppDispatch();

  const { loading, data } = useGetUserSelector();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <button
          onClick={() => window.print()}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 no-print"
        >
          Print Now
        </button>
      </div>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[90vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="p-6 w-full space-y-6">
            {/* heading Section */}
            <div className="relative w-full">
              <img
                src={`${config.url.ASSET_URL}assets/FormLogo.jpg`}
                className="absolute w-56"
                alt="Form Logo"
              />
              <div className="flex justify-center">
                <div className="text-start space-y-2">
                  <p className="text-sm font-medium px-4 py-2 bg-gray-200 rounded-sm ">
                    This Lease is valid only if filled out before January 1,
                    2026
                  </p>
                  <h4 className="text-2xl font-bold">
                    Residential Lease Contract
                  </h4>
                  <p className="font-bold">
                    This is a binding contract. Read carefully before signing.
                  </p>
                </div>
              </div>
              <p className="font-bold pt-5">
                This Lease Contract (“Lease”) is between you, the resident(s) as
                listed below and us. The terms “you” and “your” refer to all
                residents.
              </p>
              <p className="font-semibold">
                The terms “we,” “us,” and “our” refer to the owner listed below
              </p>
            </div>
            {/* heading Section ends */}

            {/* Parteies Section Starts*/}
            <div>
              <h5 className="font-bold text-lg text-red-600">PARTIES</h5>
              <div className="grid grid-cols-2 gap-10">
                {/* Residents */}
                <div className="pt-4 flex gap-3">
                  <p className="font-bold text-lg">Residents:</p>
                  <div className="w-full space-y-5 text-start">
                    <p className="font-bold w-full border-b border-black px-4">
                      {data?.first_name} {data?.middle_name}
                      {data?.last_name}
                    </p>
                    {data?.occupants?.map((item) => {
                      return (
                        <p className="font-bold w-full border-b border-black px-4">
                          {item?.first_name} {item?.middle_name}
                          {item?.last_name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                {/* Residents */}
                {/* Owners And occupant */}
                <div>
                  <div className="pt-4 flex gap-3">
                    <p className="font-bold">Owner</p>
                    <div className="w-full space-y-5 text-start">
                      <p className="font-bold w-full border-b border-black px-4">
                        Shakhawat Hossain
                      </p>
                      <p className="font-bold w-full border-b border-black px-4">
                        John Doe
                      </p>
                    </div>
                  </div>
                  <div className="pt-8 flex gap-3">
                    <p className="font-bold">Occupant</p>
                    <div className="w-full space-y-5 text-start">
                      <p className="font-bold w-full border-b border-black px-4">
                        {data?.first_name} {data?.middle_name}
                        {data?.last_name}
                      </p>
                      {data?.occupants?.map((item) => {
                        return (
                          <p className="font-bold w-full border-b border-black px-4">
                            {item?.first_name} {item?.middle_name}
                            {item?.last_name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Owners And occupant */}
              </div>
            </div>
            {/* Parteies Section Ends*/}

            {/* Lease details start*/}
            <div>
              <h4 className="font-bold text-red-600 pb-2">LEASE DETAILS</h4>
              {/* Dwelling (Par. 2) */}
              <div className="border-2 border-red-600">
                <div className="border border-red-600 p-6">
                  <div className="flex gap-3">
                    <p className="font-bold text-lg">A. Dwelling (Par. 2) </p>
                    <div className="flex-1 space-y-5">
                      <ul className="w-full list-square flex gap-8 px-8 font-semibold">
                        <li> {data?.apartment?.type} </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <p className="font-bold text-lg">Street Address:</p>
                    <div className="space-y-5 flex-1 text-start">
                      <p className="font-bold border-b border-black">
                        {data?.apartment?.address
                          ? data?.apartment?.address
                          : data?.property?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="pt-4 flex w-full gap-3">
                      <p className="font-bold text-lg">City:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          {data?.property?.city}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-bold text-lg">State:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          {data?.property?.state}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-bold text-lg">Zip:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          {data?.property?.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dwelling (Par. 2) */}
                <div className="border border-red-600 p-6">
                  <div className="flex gap-3 items-center">
                    <p className="font-bold text-lg">
                      B. Initial Lease Term{" "}
                      <span className="font-medium text-base">Begins</span>
                    </p>

                    <div className="flex-1 text-start">
                      <p className="font-bold border-b border-black">
                        {data?.apartment?.move_in_date}
                      </p>
                    </div>

                    <span className="font-medium text-base">
                      Ends at 11:59 on{" "}
                    </span>

                    <div className="flex-1 text-start">
                      <p className="font-bold border-b border-black">
                        {data?.apartment?.expected_move_out_date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* C. Monthly Base Rent (Par. 3) */}
                <div className="grid grid-cols-3">
                  <div>
                    <div className="p-5 border border-red-600">
                      <p className="text-lg font-bold">
                        C. Monthly Base Rent (Par. 3)
                      </p>
                      <div className="flex pt-5">
                        <p className="font-semibold">$</p>
                        <div className="flex-1 text-start">
                          <p className="font-bold border-b border-black">50</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 border border-red-600">
                      <p className="text-lg font-bold">D. Prorated Rent</p>
                      <div className="flex pt-5">
                        <p className="font-semibold">$</p>
                        <div className="flex-1 text-start">
                          <p className="font-bold border-b border-black">100</p>
                        </div>
                      </div>
                      <div className="px-5 flex-1 pt-5 space-y-5">
                        <ul className="list-square font-semibold">
                          <li>due for the remainder of 1st month or </li>
                          <li>for 2nd month</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 border border-red-600 h-full">
                      <p className="text-lg font-bold">
                        E. Security Deposit (Par. 5)
                      </p>
                      <div className="flex pt-5">
                        <p className="font-semibold">$</p>
                        <div className="flex-1 text-start">
                          <p className="font-bold border-b border-black">100</p>
                        </div>
                      </div>
                      <p className="pt-5 font-bold">
                        Note that this amount does not include any Animal
                        Deposit, which would be reflected in an Animal Addendum
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="p-4 border border-red-600 h-full">
                      {" "}
                      <p className="text-lg font-bold">
                        F. Notice of Termination or Intent to Move Out (Par. 4)
                      </p>
                      <div className="flex pt-5">
                        <p className="font-semibold">$</p>
                        <div className="flex-1 text-start">
                          <p className="font-bold border-b border-black">
                            1234567890 1234567890 1234567890 1234567890
                          </p>
                        </div>
                      </div>
                      <p className="pt-5 font-semibold">
                        A minimum of{" "}
                        <span className="px-10 border-b border-black">
                          400$
                        </span>{" "}
                        days’ written notice of termination or intent to move
                        out required at end of initial Lease term or during
                        renewal period
                      </p>
                      <p className="pt-5 font-bold">
                        If the number of days isn’t filled in, notice of at
                        least 30 days is required.
                      </p>
                    </div>
                  </div>
                </div>
                {/* G. Late Fees (Par. 3.3) */}
                <div className="p-5 w-full">
                  <p className="font-bold text-lg">G. Late Fees (Par. 3.3)</p>
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <p className="font-bold py-5 text-lg">
                        Initial Late Fee{" "}
                      </p>
                      <div className="px-5 flex-1 ">
                        <ul className="list-square font-semibold space-y-5">
                          <li>
                            <span className="px-10 border-b border-black">
                              88
                            </span>
                            % of one month’s monthly base rent or{" "}
                          </li>
                          <li>
                            <span className="px-14 border-b border-black">
                              88
                            </span>
                            $
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <p className="font-bold py-5 text-lg">Daily Late Fee</p>
                      <div className="px-5 flex-1">
                        <ul className="list-square font-semibold  space-y-5">
                          <li>
                            <span className="px-12 border-b border-black">
                              55
                            </span>
                            % of one month’s monthly base rent for
                            <span className="px-6 border-b border-black">
                              15
                            </span>
                            days or
                          </li>
                          <li>
                            $
                            <span className="px-12 border-b border-black">
                              60
                            </span>
                            for
                            <span className="px-6 border-b border-black">
                              6
                            </span>
                            days
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold pt-5">
                    Due if rent unpaid by 11:59 p.m. on the
                    <span className="px-14 border-b border-black">
                      100
                    </span>{" "}
                    (3rd or greater) day of the month
                  </p>
                </div>
                {/* H. Returned Check or Rejected Payment Fee (Par. 3.4) */}
                <div>
                  <div className="grid grid-cols-3">
                    <div className="border border-red-600 space-y-5">
                      <div className="border-b border-red-600 p-5">
                        <p className="font-bold text-lg">
                          H. Returned Check or Rejected Payment Fee (Par. 3.4)
                        </p>
                        <p>
                          ${" "}
                          <span className="px-14 border-b border-black font-bold">
                            100
                          </span>
                        </p>
                      </div>
                      <p className="font-bold px-5 text-lg">
                        I. Reletting Charge (Par. 7.1)
                      </p>
                      <p className="font-bold px-5 pb-5">
                        A reletting charge of ${" "}
                        <span className="px-10 border-b border-black">99</span>{" "}
                        (not to exceed 85% of the highest monthly Rent during
                        the Lease term) may be charged in certain default
                        situations
                      </p>
                    </div>
                    <div className="p-5 border border-red-600">
                      <p className="font-bold text-lg">
                        J. Early Termination Fee Option (Par. 7.2)
                      </p>
                      <div className="pt-4 flex gap-3">
                        <p className="font-bold">$</p>
                        <div className="w-full space-y-5 text-start">
                          <p className="font-bold w-full border-b border-black">
                            100
                          </p>
                        </div>
                      </div>
                      <p className="pt-5 font-semibold">
                        Notice of{" "}
                        <span className="px-10 border-b border-black">
                          john doe
                        </span>{" "}
                        days is required.
                      </p>
                      <p className="font-bold pt-5">
                        You are not eligible for early termination if you are in
                        default.{" "}
                      </p>
                      <p className="pt-5 font-semibold">
                        Fee must be paid no later than{" "}
                        <span className="px-10 border-b border-black">15</span>{" "}
                        days after you give us notice
                      </p>
                      <p className="pt-5 font-semibold">
                        If any values or number of days are blank or “0,” then
                        this section does not apply.
                      </p>
                    </div>
                    <div className="p-5 border border-red-600">
                      <p className="text-lg font-bold">K. Violation Charges</p>
                      <p className="pt-5 font-bold text-lg">
                        Animal Violation (Par. 12.2)
                      </p>
                      <p className="font-semibold pt-2">
                        nitial charge of ${" "}
                        <span className="px-14 border-b border-black">100</span>{" "}
                        per animal (not to exceed $100 per animal) and
                      </p>
                      <p className="font-semibold pt-2">
                        A daily charge of ${" "}
                        <span className="px-14 border-b border-black">10</span>{" "}
                        per animal (not to exceed $10 per day per animal)
                      </p>
                      <p className="font-bold pt-2">
                        Insurance Violation (Master Lease Addendum or other
                        separate addendum)
                      </p>
                      <div className="pt-4 flex gap-3">
                        <p className="font-bold">$</p>
                        <div className="w-full space-y-5 text-start">
                          <p className="font-bold w-full border-b border-black">
                            100
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* L. Additional Rent - Monthly Recurring Fixed Charges*/}
                <div className="border border-red-600 p-5 space-y-5">
                  <p className="text-lg font-semibold">
                    <span className="font-bold">
                      L. Additional Rent - Monthly Recurring Fixed Charges.
                    </span>{" "}
                    You will pay separately for these items as outlined below
                    and/or in separate addenda, Special Provisions or an
                    amendment to this Lease.{" "}
                  </p>
                  <div className="flex gap-3">
                    <div className="pt-4 flex w-full gap-3">
                      <p className="font-semibold text-lg">Animal rent $</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">
                        Cable/satellite ${" "}
                      </p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          satelite
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">Internet $ </p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          txu energy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="pt-4 flex w-full gap-3">
                      <p className="font-semibold text-lg">Package service $</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">Pest control $</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          satelite
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">
                        Stormwater/drainage $
                      </p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          txu energy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {" "}
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">Trash service $</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          satelite
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 w-full flex gap-3">
                      <p className="font-semibold text-lg">Washer/Dryer $</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          txu energy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex pt-4 gap-3">
                    <div className=" flex w-full gap-3">
                      <p className="font-semibold text-lg">Other:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          Internet
                        </p>
                      </div>
                    </div>
                    <div className=" w-full flex gap-3">
                      <p className="font-semibold text-lg">$</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex w-full gap-3">
                      <p className="font-semibold text-lg">Other:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          Internet
                        </p>
                      </div>
                    </div>
                    <div className=" w-full flex gap-3">
                      <p className="font-semibold text-lg">$</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex w-full gap-3">
                      <p className="font-semibold text-lg">Other:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          Internet
                        </p>
                      </div>
                    </div>
                    <div className=" w-full flex gap-3">
                      <p className="font-semibold text-lg">$</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex w-full gap-3">
                      <p className="font-semibold text-lg">Other:</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">
                          Internet
                        </p>
                      </div>
                    </div>
                    <div className=" w-full flex gap-3">
                      <p className="font-semibold text-lg">$</p>
                      <div className="space-y-5 flex-1 text-start">
                        <p className="font-bold border-b border-black">100</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* M. Utilities and Other Variable Charges. Y*/}
                <div className="border border-red-600 p-5 ">
                  <p className="font-semibold">
                    <span className="text-lg font-bold">
                      M. Utilities and Other Variable Charges.
                    </span>
                    You will pay separately for gas, water, wastewater,
                    electricity, trash/recycling, utility billing fees and other
                    items as outlined in separate addenda, Special Provisions or
                    an amendment to this Lease
                  </p>
                  <p className="font-semibold flex">
                    If not checked above, outside trash receptacles initially
                    provided will be paid for by:{" "}
                    <div className="flex-1 ">
                      <ul className="w-full list-square flex gap-8 ml-6 font-semibold">
                        <li>House</li>
                        <li>duplex</li>
                      </ul>
                    </div>{" "}
                    other
                    <span className="px-14 border-b border-black">
                      Anything
                    </span>{" "}
                    If we pay for receptacles initially and they are broken or
                    missing,
                    <div className="flex-1 ">
                      <ul className="w-full list-square flex gap-8 ml-6 font-semibold">
                        <li>You</li>
                        <li>We</li>
                      </ul>
                    </div>{" "}
                    we will replace or repair them.
                  </p>
                  <p className="pt-4 font-semibold">
                    <span className="font-blod font-bold">
                      Utility Connection Charge or Transfer Fee:
                    </span>{" "}
                    $ <span className="px-14 border-b border-black">100</span>
                    (not to exceed $50) to be paid within 5 days of written
                    notice (Par. 3.5)
                  </p>
                </div>
                {/* N. Other Charges and Requirements.  */}
                <div className="border border-red-600 p-5 ">
                  <p>
                    <span className="font-bold">
                      N. Other Charges and Requirements.
                    </span>
                    You will pay separately for these items or comply with these
                    requirements as outlined in a Master Lease Addendum,
                    separate addenda or Special Provisions.
                  </p>
                  <p className="font-semibold">
                    Initial Access Device: $${" "}
                    <span className="px-6 border-b border-black"></span>
                  </p>

                  <p className="font-semibold">
                    Additional or Replacement Access Devices: ${" "}
                    <span className="px-6 border-b border-black"></span>
                    Required Insurance Liability Limit (per occurrence): $
                    <span className="px-6 border-b border-black">100</span>{" "}
                    Other Fee ${" "}
                    <span className="px-6 border-b border-black">100</span>{" "}
                    Description:
                    <span className="px-6 border-b border-black">
                      This is depscription
                    </span>
                  </p>
                </div>

                <div className="border border-red-600 p-5 ">
                  <p className="font-semibold">
                    <span className="font-bold">Special Provisions. </span> See
                    Par. 32 or additional addenda attached. The Lease cannot be
                    changed unless in writing and signed by you and us.
                  </p>
                </div>

                {/* LEASE TERMS AND CONDITIONS */}
                <div className="grid grid-cols-1 gap-8 p-5">
                  <div className="text-lg font-semibold">
                    <div className="bg-red-600 text-white p-2 mb-4">
                      LEASE TERMS AND CONDITIONS
                    </div>
                    <span className="font-bold">1. Definitions.</span> The
                    following terms are commonly used in this Lease: <br />{" "}
                    <span className="font-bold">1.1. “Residents”</span> are
                    those listed in “Residents” above who sign the Lease and are
                    authorized to live in the dwelling. <br />{" "}
                    <span className="font-bold">1.2. “Occupants”</span> are
                    those listed in this Lease who are also authorized to live
                    in the dwelling, but who do not sign the Lease. <br />{" "}
                    <span className="font-bold">1.3. “Owner”</span> may be
                    identified by an assumed name and is the owner only and not
                    property managers or anyone else. <br />{" "}
                    <span className="font-bold">1.4. “Including” </span> in this
                    Lease means “including but not limited to.” <br />
                    <span className="font-bold">1.5. “Community Policies”</span>
                    are the written rules and policies, including property
                    signage and instructions for care of our property and
                    amenities, with which you, your occupants, and your guests
                    must comply. <br />{" "}
                    <span className="font-bold">1.6. “Rent” </span> is monthly
                    base rent plus additional monthly recurring fixed charges.{" "}
                    <br /> <span className="font-bold">1.7. “Lease”</span>{" "}
                    includes this document, any addenda and attachments,
                    Community Policies and Special Provisions. <br /> <br />
                    <span className="text-lg font-bold">2. Dwelling. </span> You
                    are renting the dwelling listed above for use as a private
                    residence only. <br />{" "}
                    <span className="font-bold">2.1. Access. </span> In
                    accordance with our Community Policies, you’ll receive
                    access information or devices for your dwelling and mailbox,
                    and other access devices including:{" "}
                    <span className="px-6 border-b border-black font-semibold">
                      Anything
                    </span>{" "}
                    <br />
                    <span className="font-bold">2.2. Measurements.</span> Any
                    dimensions and sizes provided to you relating to the
                    dwelling are only approximations or estimates; actual
                    dimensions and sizes may vary. <br />
                    <span className="font-bold">
                      2.3. Representations.{" "}
                    </span>{" "}
                    You agree that designations or accreditations associated
                    with the property are subject to change. <br /> <br />
                    <span className="text-lg font-bold">
                      3. Rent. You must pay your Rent on or before the 1st day
                      of each month (due date) without demand. There are no
                      exceptions regarding the payment of Rent, and you agree
                      not paying Rent on or before the 1st of each month is a
                      material breach of this Lease.
                    </span>{" "}
                    <br /> <span className="font-bold">3.1. Payments.</span> You
                    will pay your Rent by any method, manner and place we
                    specify in accordance with our Community Policies. Cash is
                    not acceptable without our prior written permission. You
                    cannot withhold or offset Rent unless authorized by law. We
                    may, at our option, require at any time that you pay Rent
                    and other sums due in one single payment by any method we
                    specify. <br />{" "}
                    <span className="font-bold">
                      3.2. Application of Payments.
                    </span>{" "}
                    Payment of each sum due is an independent covenant, which
                    means payments are due regardless of our performance. When
                    we receive money, other than water and wastewater payments
                    subject to government regulation, we may apply it at our
                    option and without notice first to any of your unpaid
                    obligations, then to accrued rent. We may do so regardless
                    of notations on checks or money orders and regardless of
                    when the obligations arose. All sums other than Rent and
                    late fees are due upon our demand. After the due date, we do
                    not have to accept any payments. <br />{" "}
                    <span className="font-bold">3.3. Late Fees. </span> If we
                    don’t receive your monthly base rent in full when it’s due,
                    you must pay late fees as outlined in Lease Details. <br />{" "}
                    <span className="font-bold">
                      3.4. Returned Payment Fee.
                    </span>
                    You’ll pay the fee listed in Lease Details for each returned
                    check or rejected electronic payment, plus initial and daily
                    late fees if applicable, until we receive full payment in an
                    acceptable method. <br />{" "}
                    <span className="font-bold">
                      3.5. Utilities and Services.
                    </span>{" "}
                    You’ll pay for all utilities and services, related deposits,
                    and any charges or fees when they are due and as outlined in
                    this Lease. If your electricity is interrupted, you must use
                    only batteryoperated lighting (no flames). You must not
                    allow any utilities (other than cable or Internet) to be cut
                    off or switched for any reason—including disconnection for
                    not paying your bills— until the Lease term or renewal
                    period ends. If a utility is individually metered, it must
                    be connected in your name and you must notify the provider
                    of your move-out date. If you delay getting service turned
                    on in your name by the Lease’s start date or cause it to be
                    transferred back into our name before you surrender or
                    abandon the dwelling, you’ll be liable for the charge listed
                    above (not to exceed $50 per billing period), plus the
                    actual or estimated cost of the utilities used while the
                    utility should have been billed to you. If your dwelling is
                    individually metered and you change your retail electric
                    provider, you must give us written notice. You must pay all
                    applicable provider fees, including any fees to change
                    service back into our name after you move out. <br />{" "}
                    <span className="font-bold">
                      3.6. Pools and Yard Maintenance.
                    </span>{" "}
                    Unless otherwise noted in the Lease, you will be responsible
                    for and pay for the following items: pool service and
                    maintenance (if applicable); mowing and edging the lawn and
                    maintaining all plants, trees, shrubs, etc.; watering the
                    lawn and other vegetation; keeping the lawn, flowerbeds,
                    sidewalks, porches and driveways free of trash and debris;
                    and fertilizing lawn and plants. You must promptly report
                    infestations or dying vegetation to us. You may not modify
                    the existing landscape, change any plants, or plant a garden
                    without our prior written approval. <br />{" "}
                    <span className="font-bold">
                      {" "}
                      3.7. Interior Pest Control.
                    </span>
                    Unless otherwise noted in the Lease, we‘ll arrange and pay
                    for extermination services for all pests within the
                    dwelling, as needed in our reasonable judgment. <br />{" "}
                    <span className="font-bold">3.8. Lease Changes.</span> Lease
                    changes are only allowed during the Lease term or renewal
                    period if governed by Par. 10, specified in Special
                    Provisions in Par. 32, or by a written addendum or amendment
                    signed by you and us. At or after the end of the initial
                    Lease term, Rent increases will become effective with at
                    least 5 days plus the number of days’ advance notice
                    contained in Box F on page 1 in writing from us to you. Your
                    new Lease, which may include increased Rent or Lease
                    changes, will begin on the date stated in any advance notice
                    we provide (without needing your signature) unless you give
                    us written move-out notice under Par. 25, which applies only
                    to the end of the current Lease term or renewal period.
                  </div>
                  <div className="text-lg font-semibold">
                    <span className="font-bold text-lg">
                      4. Automatic Lease Renewal and Notice of Termination.
                    </span>{" "}
                    This Lease will automatically renew month-to-month unless
                    either party gives written notice of termination or intent
                    to move out as required by Par. 25 and specified on page 1.{" "}
                    <span className="text-lg font-bold">
                      If the number of days isn’t filled in, notice of at least
                      30 days is required.{" "}
                    </span>
                    <br /> <br />
                    <span className="font-bold text-lg">
                      5. Security Deposit.
                    </span>{" "}
                    The total security deposit for all residents is due on or
                    before the date this Lease is signed. Any animal deposit
                    will be designated in an animal addendum. Security deposits
                    may not be applied to Rent without our prior written
                    consent. <br />{" "}
                    <span className="font-bold">
                      5.1. Refunds and Deductions.
                    </span>{" "}
                    <span className="font-bold underline">
                      You must give us your advance notice of move out as
                      provided by Par. 25 and forwarding address in writing to
                      receive a written description and itemized list of charges
                      or refund. In accordance with our Community Policies and
                      as allowed by law, we may deduct from your security
                      deposit any amounts due under the Lease. If you move out
                      early or in response to a notice to vacate, you’ll be
                      liable for rekeying charges.{" "}
                    </span>{" "}
                    Upon receipt of your move-out date and forwarding address in
                    writing, the security deposit will be returned (less lawful
                    deductions) with an itemized accounting of any deductions,
                    no later than 30 days after surrender or abandonment, unless
                    laws provide otherwise. Any refund may be by one payment
                    jointly payable to all residents and distributed to any one
                    resident we choose, or distributed equally among all
                    residents. <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      6. Insurance. Our insurance doesn’t cover the loss of or
                      damage to your personal property.{" "}
                    </span>{" "}
                    You will be required to have liability insurance as
                    specified in our Community Policies or Lease addenda unless
                    otherwise prohibited by law. If you have insurance covering
                    the dwelling or your personal belongings at the time you or
                    we suffer or allege a loss, you agree to require your
                    insurance carrier to waive any insurance subrogation rights.
                    Even if not required, we urge you to obtain your own
                    insurance for losses due to theft, fire, flood, water, pipe
                    leaks and similar occurrences. Most renter’s insurance
                    policies don’t cover losses due to a flood. <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      7. Reletting and Early
                    </span>
                    Lease Termination. This Lease may not be terminated early
                    except as provided in this Lease. <br />{" "}
                    <span className="font-bold">7.1. Reletting Charge.</span>{" "}
                    You’ll be liable for a reletting charge as listed in Lease
                    Details, (not to exceed 85% of the highest monthly Rent
                    during the Lease term) if you: (A) fail to move in, or fail
                    to give written move-out notice as required in Par. 25; (B)
                    move out without paying Rent in full for the entire Lease
                    term or renewal period; (C) move out at our demand because
                    of your default; or (D) are judicially evicted. The
                    reletting charge is not a termination, cancellation or
                    buyout fee and does not release you from your obligations
                    under this Lease, including liability for future or past-due
                    Rent, charges for damages or other sums due. The reletting
                    charge is a liquidated amount covering only part of our
                    damages—for our time, effort, and expense in finding and
                    processing a replacement resident. These damages are
                    uncertain and hard to ascertain—particularly those relating
                    to inconvenience, paperwork, advertising, showing
                    apartments, utilities for showing, checking prospects,
                    overhead, marketing costs, and locator-service fees. You
                    agree that the reletting charge is a reasonable estimate of
                    our damages and that the charge is due whether or not our
                    reletting attempts succeed. <br />
                    <span className="font-bold">
                      7.2. Early Lease Termination Option Procedure.{" "}
                    </span>
                    In addition to your termination rights referred to in 7.3 or
                    8.1 below, if this pro vision applies under Lease Details,
                    you may opt to terminate this Lease prior to the end of the
                    Lease term
                    <span className="font-bold">
                      {" "}
                      if all of the following occur:
                    </span>
                    (a) as outlined in Lease Details, you give us written notice
                    of early termination, pay the Early Termination Option fee
                    in full and specify the date by which you’ll move out; (b)
                    you are not in default at any time and do not hold over; and
                    (c) you repay all rent concessions, credits or discounts you
                    received during the Lease term. If you are in default, the
                    Lease remedies apply. <br />{" "}
                    <span className="font-bold">
                      7.3. Special Termination Rights. You may have the right
                      under Texas law to terminate the Lease early in certain
                      situations involving military deployment or transfer,
                      family violence, certain sexual offenses, stalking or
                      death of a sole resident.
                    </span>{" "}
                    <br />{" "}
                    <span className="font-bold">8. Delay of Occupancy.</span> We
                    are not responsible for any delay of your occupancy caused
                    by construction, repairs, cleaning, or a previous resident’s
                    holding over. This Lease will remain in force subject to (1)
                    abatement of Rent on a daily basis during delay, and (2)
                    your right to terminate the lease in writing as set forth
                    below. Rent abatement and Lease termination do not apply if
                    the delay is for cleaning or repairs that don’t prevent you
                    from moving into the dwelling. <br /> <br />{" "}
                    <span className="font-bold text-lg">8.1. Termination.</span>{" "}
                    If we give written notice to you of a delay in occupancy
                    when or after the Lease begins, you may terminate the Lease
                    within 3 days after you receive written notice. If we give
                    you written notice before the date the Lease begins and the
                    notice states that a construction or other delay is expected
                    and that the dwelling will be ready for you to occupy on a
                    specific date, you may terminate the Lease within 7 days
                    after receiving written notice. After proper termination,
                    you are entitled only to refund of any deposit(s) and any
                    Rent you paid. Care of Unit and Damages. You must promptly
                    pay or reimburse us for loss, damage, consequential damages,
                    government fines or charges, or cost of repairs or service
                    because of a Lease or Community Policies violation; improper
                    use, negligence, or other conduct by you, your invitees,
                    your occupants, or your guests; or, as allowed by law, any
                    other cause not due to our negligence or fault, except for
                    damages by acts of God to the extent they couldn’t be
                    mitigated by your action or inaction. Unless damage or
                    wastewater stoppage is due to our negligence, we’re not
                    liable for—and you must pay for—repairs and replacements if
                    occurring during the Lease term or renewal period: (A)
                    damage from wastewater stoppages caused by improper objects
                    in lines exclusively serving your dwelling; (B) damage to
                    doors, windows, or screens; and (C) damage from windows or
                    doors left open. <br /> <br />{" "}
                    <span className="font-bold">
                      9. Care of Unit and Damages.{" "}
                    </span>{" "}
                    You must promptly pay or reimburse us for loss, damage,
                    consequential damages, government fines or charges, or cost
                    of repairs or service because of a Lease or Community
                    Policies violation; improper use, negligence, or other
                    conduct by you, your invitees, your occupants, or your
                    guests; or, as allowed by law, any other cause not due to
                    our negligence or fault, except for damages by acts of God
                    to the extent they couldn’t be mitigated by your action or
                    inaction. <br />{" "}
                    <span className="font-bold">
                      {" "}
                      Unless damage or wastewater stoppage is due to our
                      negligence, we’re not liable for—and you must pay
                      for—repairs and replacements if occurring during the Lease
                      term or renewal period: (A) damage from wastewater
                      stoppages caused by improper objects in lines exclusively
                      serving your dwelling; (B) damage to doors, windows, or
                      screens; and (C) damage from windows or doors left open.{" "}
                    </span>
                    <div className="bg-red-600 text-white p-2 mt-10 mb-5">
                      RESIDENT LIFE
                    </div>
                    <span className="font-bold text-lg">
                      10. Community Policies. Community Policies become part of
                      the Lease and must be followed.{" "}
                    </span>{" "}
                    We may make changes, including additions, to our written
                    Community Policies, and those changes can become effective
                    immediately if the Community Policies are distributed and do
                    not change the dollar amounts owed under this Lease. <br />
                    <span className="font-bold">
                      10.1. Photo/Video Release.
                    </span>{" "}
                    You give us permission to use any photograph, likeness,
                    image or video taken of you while you are using property
                    common areas or participating in any event sponsored by us.{" "}
                    <br />
                    <span className="font-bold">
                      10.2. Disclosure of Information.
                    </span>{" "}
                    At our sole option, we may, but are not obligated to, share
                    and use information related to this Lease for
                    law-enforcement, governmental, or business purposes. At our
                    request, you authorize any utility provider to give us
                    information about pending or actual connections or
                    disconnections of utility service to your dwelling. <br />{" "}
                    <span className="font-bold">10.3. Guests.</span> We may
                    exclude from the dwelling any guests or others who, in our
                    sole judgment, have been violating the law, violating this
                    Lease or our Community Policies, or disturbing other
                    residents, neighbors, visitors, or owner representatives. We
                    may also exclude from any outside area or common area anyone
                    who refuses to show photo identification or refuses to
                    identify himself or herself as a resident, an authorized
                    occupant, or a guest of a specific resident. Anyone not
                    listed in this Lease cannot stay in the dwelling for more
                    than <span className="px-6 border-b border-black">7</span>{" "}
                    days in one week without our prior written consent, and no
                    more than twice that many days in any one month. If the
                    previous space isn’t filled in, 2 days total per week will
                    be the limit. <br />{" "}
                    <span className="font-bold">
                      10.4. Notice of Convictions and Registration.
                    </span>{" "}
                    You must notify us within 15 days if you or any of your
                    occupants: (A) are convicted of any felony, (B) are
                    convicted of any misdemeanor involving a controlled
                    substance, violence to another person, or destruction of
                    property, or (C) register as a sex offender. Informing us of
                    a criminal conviction or sex-offender registration doesn’t
                    waive any rights we may have against you. <br />{" "}
                    <span className="font-bold">
                      10.5. Odors, Noise and Construction.
                    </span>{" "}
                    You agree that odors and smells (including those related to
                    cooking), everyday noises or sounds related to repair,
                    renovation, improvement or construction in or around the
                    property are all a normal part of a rental living
                    environment and that it is impractical for us to prevent
                    them from penetrating your dwelling. <br /> <br />{" "}
                    <span className="font-bold">11. Conduct.</span> You agree to
                    communicate and conduct yourself in a lawful, courteous and
                    reasonable manner at all times when interacting with us, our
                    representatives and other residents or occupants. Any acts
                    of unlawful, discourteous or unreasonable communication or
                    conduct by you, your occupants or guests is a breach of this
                    Lease. You must use customary diligence in maintaining the
                    dwelling, keeping it in a sanitary condition and not
                    damaging or littering the common areas. Trash must be
                    disposed of at least weekly, in accordance with our
                    Community Policies. You will use your dwelling and all other
                    areas, including any balconies, with reasonable care. We may
                    regulate the use of passageways, patios, balconies, and
                    porches, and activities in common areas. <br /> <br />
                    <span className="font-bold">
                      11.1. Prohibited Conduct.
                    </span>{" "}
                    <br />
                    You, your occupants, and your guests will not engage in
                    certain prohibited conduct, including the following
                    activities: <br /> <br />
                    (a) criminal conduct; manufacturing, delivering, or
                    possessing a controlled substance or drug parapher- nalia;
                    engaging in or threatening violence; possessing a weapon
                    prohibited by state law; discharging a fire arm in the
                    dwelling or outside area; or, except when allowed by law,
                    displaying or possessing a gun, knife, or other weapon in a
                    way that may alarm others; <br /> (b) behaving in a loud,
                    obnoxious or dangerous manner; <br /> (c) disturbing or
                    threatening the rights, comfort, health, safety, or
                    convenience of others, including us, our agents, or our
                    representatives; <br /> (d) disrupting our business
                    operations; <br /> (e) storing anything in closets
                    containing water heaters or gas appliances; <br /> (f)
                    tampering with utilities or telecommunication equipment;{" "}
                    <br /> (g) bringing hazardous materials into the dwelling;{" "}
                    <br />
                    (h) using windows for entry or exit; <br /> (i) heating the
                    dwelling with gas-operated appliances; <br /> (j) making
                    bad-faith or false allegations against us or our agents to
                    others; <br /> (k) smoking of any kind, that is not in
                    accordance with this Lease; <br /> (l) using glass
                    containers in or near pools; <br /> (m) conducting any kind
                    of business (including child-care services) in your
                    dwelling—except for any lawful business conducted “at home”
                    by computer, mail, or telephone if customers, clients,
                    patients, employees or other business associates do not come
                    to your dwelling for business purposes; or <br /> (n)
                    violating any recorded or applicable Homeowner’s or Property
                    Owner’s Association rules or regulations. <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      12. Animals. No living creatures of any kind are allowed,
                      even temporarily, anywhere in the dwelling unless we’ve
                      given written permission.{" "}
                    </span>{" "}
                    If we allow an animal, you must sign a separate Animal
                    Addendum and, except as set forth in the addendum, pay an
                    animal deposit and applicable fees and additional monthly
                    rent, as applicable. An animal deposit is considered a
                    general security deposit. You represent that any requests,
                    statements and representations you make, including those for
                    an assistance or support animal, are true, accurate and made
                    in good faith. Feeding stray, feral or wild animals is a
                    breach of this Lease. <br />{" "}
                    <span className="font-bold">
                      12.1. Removal of Unauthorized Animal.
                    </span>{" "}
                    We may remove an unauthorized animal by (1) leaving, in a
                    conspicuous place in the dwelling, a written notice of our
                    intent to remove the animal within 24 hours; and (2)
                    following the procedures of Par. 14. We may: keep or kennel
                    the animal; turn the animal over to a humane society, local
                    authority or rescue organization; or return the animal to
                    you if we consent to your request to keep the animal and you
                    have completed and signed an Animal Addendum and paid all
                    fees. When keeping or kenneling an animal, we won’t be
                    liable for loss, harm, sickness, or death of the animal
                    unless due to our negligence. You must pay for the animal’s
                    reasonable care and kenneling charges. <br />{" "}
                    <span className="font-bold">
                      12.2. Violations of Animal Policies and Charges.
                    </span>{" "}
                    If you or any guest or occupant violates the animal
                    restrictions of this Lease or our Community Policies, you’ll
                    be subject to charges, damages, eviction, and other remedies
                    provided in this Lease, including animal violation charges
                    listed in Lease Details from the date the animal was brought
                    into your dwelling until it is removed. If an animal has
                    been in the dwelling at any time during your term of
                    occupancy (with or without our consent), we’ll charge you
                    for all cleaning and repair costs, including defleaing,
                    deodorizing, and shampooing. Initial and daily
                    animal-violation charges and animal-removal charges are
                    liquidated damages for our time, inconvenience, and overhead
                    in enforcing animal restrictions and Community Policies.{" "}
                    <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      13. Parking. You may not be guaranteed parking.
                    </span>{" "}
                    We may regulate the time, manner, and place of parking of
                    all motorized vehicles and other modes of transportation,
                    including bicycles and scooters, in our Community Policies.
                    In addition to other rights we have to tow or boot vehicles
                    under state law, we also have the right to remove, at the
                    expense of the vehicle owner or operator, any vehicle that
                    is not in compliance with our Community Policies. <br />{" "}
                    <br />
                    <span className="font-bold text-lg">
                      14. When We May Enter.
                    </span>{" "}
                    If you or any other resident, guest or occupant is present,
                    then repair or service persons, contractors, law officers,
                    government representatives, lenders, appraisers, prospective
                    residents or buyers, insurance agents, persons authorized to
                    enter under your rental application, or our representatives
                    may peacefully enter the dwelling at reasonable times for
                    reasonable business purposes. If nobody is in the dwelling,
                    then any such person may enter peacefully and at reasonable
                    times (by breaking a window or other means when necessary)
                    for reasonable business purposes if written notice of the
                    entry is left in a conspicuous place in the dwelling
                    immediately after the entry. We are under no obligation to
                    enter only when you are present, and we may, but are not
                    obligated to, give prior notice or make appointments. <br />{" "}
                    <br />{" "}
                    <span className="font-bold text-lg">
                      15. Requests, Repairs and Malfunctions.
                    </span>{" "}
                    <br />
                    <span className="font-bold">
                      15.1. Written Requests Required. If you or any occupant
                      needs to send a request—for example, for repairs,
                      installations, services, ownership disclosure, or
                      security-related matters— it must be written and delivered
                      to our designated representative in accordance with our
                      Community Policies{" "}
                    </span>{" "}
                    (except for fair-housing accommodation or modification
                    requests or situations involving imminent danger or threats
                    to health or safety, such as fire, smoke, gas, explosion, or
                    crime in progress). Our written notes regarding your oral
                    request do not constitute a written request from you. Our
                    complying with or responding to any oral request doesn’t
                    waive the strict requirement for written notices under this
                    Lease. A request for maintenance or repair by anyone
                    residing in your dwelling constitutes a request from all
                    residents. The time, manner, method and means of performing
                    maintenance and repairs, including vendor selection, are
                    within our sole discretion. <br />{" "}
                    <span className="font-bold">
                      15.2. Your Requirement to Notify.
                    </span>{" "}
                    You must promptly notify us in writing of air conditioning
                    or heating problems, water leaks or moisture, mold,
                    electrical problems, malfunctioning lights, broken or
                    missing locks or latches, or any other condition that poses
                    a hazard or threat to property, health, or safety. Unless we
                    instruct otherwise, you are required to replace filters and
                    keep the dwelling cooled or heated according to our
                    Community Policies. Air conditioning problems are normally
                    not emergencies. <br />{" "}
                    <span className="font-bold">15.3. Utilities.</span> We may
                    change or install utility lines or equipment serving the
                    dwelling if the work is done reasonably without
                    substantially increasing your utility costs. We may turn off
                    equipment and interrupt utilities as needed to perform work
                    or to avoid property damage or other emergencies. If
                    utilities malfunction or are damaged by fire, water, or
                    similar cause, you must notify our representative
                    immediately. <br />
                    <span className="font-bold">15.4. Your Remedies. </span>
                    We’ll act with customary diligence to make repairs and
                    reconnections within a reasonable time, taking into
                    consideration when casualty-insurance proceeds are received.
                    Unless required by statute after a casualty loss, or during
                    equipment repair, your Rent will not abate in whole or in
                    part. “Reasonable time” accounts for the severity and nature
                    of the problem and the reasonable availability of materials,
                    labor, and utilities.{" "}
                    <span className="font-bold">
                      {" "}
                      If we fail to timely repair a condition that materially
                      affects the physical health or safety of an ordinary
                      resident as required by the Texas Property Code, you may
                      be entitled to exercise remedies under § 92.056 and §
                      92.0561 of the Texas Property Code. If you follow the
                      procedures under those sections, the following remedies,
                      among others, may be available to you: <br /> <br /> (1)
                      termination of the Lease and an appropriate refund under
                      92.056(f); <br /> (2) have the condition repaired or
                      remedied according to § 92.0561; <br /> (3) deduct from
                      the Rent the cost of the repair or remedy according to §
                      92.0561; and <br /> 4) judicial remedies according to §
                      92.0563.{" "}
                    </span>{" "}
                    <br /> <span className="font-bold">
                      15.5. No Waiver.
                    </span>{" "}
                    We may require payment at any time, including advance
                    payment to repair damage that you are liable for. Delay in
                    demanding sums you owe is not a waiver. <br /> <br />
                    <span className="font-bold text-lg">
                      16. Our Right to Terminate for Dwelling Damage or Closure.
                    </span>{" "}
                    If, in our sole judgment, damages to the dwelling are
                    significant or performance of needed repairs poses a danger
                    to you, we may terminate this Lease and your right to
                    possession by giving you at least 7 days’ written notice. If
                    termination occurs, you agree we’ll refund only prorated
                    rent and all deposits, minus lawful deductions. We may
                    remove and dispose of your personal property if, in our sole
                    judgment, it causes a health or safety hazard or impedes our
                    ability to make repairs. <br />{" "}
                    <span className="font-bold">16.1. Property Closure.</span>{" "}
                    We also have the right to terminate this Lease and your
                    right to possession by giving you at least 30 days’ written
                    notice of termination if we are demolishing your dwelling or
                    closing it and it will no longer be used for residential
                    purposes for at least 6 months, or if any part of the
                    property becomes subject to an eminent domain proceeding.{" "}
                    <br /> <br />
                    <span className="font-bold text-lg">
                      17. Assignments and Subletting.
                    </span>{" "}
                    You may not assign this Lease or sublet your dwelling. You
                    agree that you won‘t rent, offer to rent or license all or
                    any part of your dwelling to anyone else unless otherwise
                    agreed to in advance by us in writing. You agree that you
                    won‘t accept anything of value from anyone else for the use
                    of any part of your dwelling. You agree not to list any part
                    of your dwelling on any lodging or short-term rental website
                    or with any person or service that advertises dwellings for
                    rent. <br /> <br />
                    <span className="font-bold text-lg">
                      18. Security and Safety Devices. We’ll pay for missing
                      security devices that are required by law. You’ll pay for:{" "}
                      <br /> <br /> (A) rekeying that you request (unless we
                      failed to rekey after the previous resident moved out);
                      and (B) repairs or replacements because of misuse or
                      damage by you or your family, your occupants, or your
                      guests.{" "}
                    </span>{" "}
                    You must pay immediately after the work is done unless state
                    law authorizes advance payment. You must also pay in advance
                    for any additional or changed security devices you request.{" "}
                    <span className="font-bold">
                      {" "}
                      Texas Property Code secs. 92.151, 92.153, and 92.154
                      require, with some exceptions, that we provide at no cost
                      to you when occupancy begins: <br /> <br /> (A) a window
                      latch on each window; <br /> (B) a doorviewer (peephole or
                      window) on each exterior door; <br /> (C) a pin lock on
                      each sliding door; <br /> (D) either a door-handle latch
                      or a security bar on each sliding door; <br /> (E) a
                      keyless bolting device (deadbolt) on each exterior door;
                      and <br /> (F) either a keyed doorknob lock or a keyed
                      deadbolt lock on one entry door. Keyed locks will be
                      rekeyed after the prior resident moves out. The rekeying
                      will be done either before you move in or within 7 days
                      after you move in, as required by law. If we fail to
                      install or rekey security devices as required by law, you
                      have the right to do so and deduct the reasonable cost
                      from your next Rent payment under Texas Property Code sec.
                      92.165(1). We may deactivate or not install keyless
                      bolting devices on your doors if (A) you or an occupant in
                      the dwelling is over 55 or disabled, and (B) the
                      requirements of Texas Property Code sec. 92.153(e) or (f)
                      are satisfied.{" "}
                    </span>
                    <br />
                    <span className="font-bold">
                      18.1. Smoke Alarms and Detection Devices.
                    </span>{" "}
                    We’ll furnish smoke alarms or other detection devices
                    required by law or city ordinance. We may install additional
                    detectors not so required. We’ll test them and provide
                    working batteries when you first take possession of your
                    dwelling. Upon request, we’ll provide, as required by law, a
                    smoke alarm capable of alerting a person with a hearing
                    impairment. You must pay for and replace batteries as
                    needed, unless the law provides otherwise. We may replace
                    dead or missing batteries at your expense, without prior
                    notice to you. Neither you nor your guests or occupants may
                    disable alarms or detectors.{" "}
                    <span className="font-bold">
                      {" "}
                      If you damage or disable the smoke alarm or remove a
                      battery without replacing it with a working battery, you
                      may be liable to us under Texas Property Code sec. 92.2611
                      for $100 plus one month’s Rent, actual damages, and
                      attorney’s fees.
                    </span>{" "}
                    <br />{" "}
                    <span className="font-bold">
                      18.2. Duty to Report.{" "}
                    </span>{" "}
                    You must immediately report to us any missing,
                    malfunctioning or defective security devices, smoke alarms
                    or detectors. You’ll be liable if you fail to report
                    malfunctions, or fail to report any loss, damage, or fines
                    resulting from fire, smoke, or water. <br /> <br />{" "}
                    <span className="font-bold">
                      19. Resident Safety and Loss. Unless otherwise required by
                      law, none of us, our employees, agents, or management
                      companies are liable to you, your guests or occupants for
                      any damage, personal injury, loss to personal property, or
                      loss of business or personal income, from any cause,
                      including but not limited to: negligent or intentional
                      acts of residents, occupants, or guests; or theft,
                      burglary, assault, vandalism or other crimes; fire, flood,
                      water leaks, rain, hail, ice, snow, smoke, lightning,
                      wind, explosions, interruption of utilities, pipe leaks or
                      other occurrences unless such damage, injury or loss is
                      caused exclusively by our negligence. We do not warrant
                      security of any kind.{" "}
                    </span>{" "}
                    You agree that you will not rely upon any security measures
                    taken by us for personal security, and that you will call
                    911 and local law enforcement authorities if any security
                    needs arise. You acknowledge that we are not equipped or
                    trained to provide personal security services to you, your
                    guests or occupants. You recognize that we are not required
                    to provide any private security services and that no
                    security devices or measures on the property are fail-safe.
                    You further acknowledge that, even if an alarm or gate
                    amenities are provided, they are mechanical devices that can
                    malfunction. Any charges resulting from the use of an
                    intrusion alarm will be charged to you, including, but not
                    limited to, any false alarms with police/fire/ambulance
                    response or other required city charges.
                    <br /> <br />
                    <span className="font-bold text-lg">
                      20. Condition of the Premises and Alterations.
                    </span>{" "}
                    <br />{" "}
                    <span className="font-bold">
                      20.1. As-Is. We disclaim all implied warranties.
                    </span>{" "}
                    You accept the dwelling, fixtures, and furniture as is,
                    except for conditions materially affecting the health or
                    safety of ordinary persons. You’ll be given an Inventory and
                    Condition Form at or before move-in. You agree that after
                    completion of the form or{" "}
                    <span className="font-bold"> within 48 hours</span>
                    after move-in, whichever comes first, you must note on the
                    form all defects or damage, sign the form, and return it to
                    usthe form accurately reflects the condition of the premises
                    for purposes of determining any refund due to you when you
                    move out. Otherwise, everything will be considered to be in
                    a clean, safe, and good working condition. You must still
                    send a separate request for any repairs needed as provided
                    by Par. 15.1. <br />{" "}
                    <span className="font-bold">
                      20.2. Standards and Improvements.{" "}
                    </span>{" "}
                    Unless authorized by law or by us in writing, you must not
                    perform any repairs, painting, wallpapering, carpeting,
                    electrical changes, or otherwise alter our property. No
                    holes or stickers are allowed inside or outside the
                    dwelling. Unless our Community Policies state otherwise,
                    we’ll permit a reasonable number of small nail holes for
                    hanging pictures on sheetrock walls and in grooves of
                    woodpaneled walls. No water furniture, washing machines,
                    dryers, extra phone or television outlets, alarm systems,
                    cameras, two-way talk device, video or other doorbells, or
                    lock changes, additions, or rekeying is permitted unless
                    required by law or we’ve consented in writing. You may
                    install a satellite dish or antenna, but only if you sign
                    our satellitedish or antenna lease addendum, which complies
                    with reasonable restrictions allowed by federal law. You
                    must not alter, damage, or remove our property, including
                    alarm systems, detection devices, appliances, furniture,
                    telephone and television wiring, screens, locks, or security
                    devices. When you move in, we’ll supply light bulbs for
                    fixtures we furnish, including exterior fixtures operated
                    from inside the dwelling; after that, you’ll replace them at
                    your expense with bulbs of the same type and wattage. Your
                    improvements to the dwelling (made with or without our
                    consent) become ours unless we agree otherwise in writing.
                    <br />
                    <br />
                    <span className="text-lg font-bold">21. Notices.</span>{" "}
                    Written notice to or from our employees, agents, or
                    management companies constitutes notice to or from us.
                    Notices to you or any other resident of the dwelling
                    constitute notice to all residents. Notices and requests
                    from any resident constitute notice from all residents. Only
                    residents can give notice of Lease termination and intent to
                    move out under Par. 7.3. All notices and documents will be
                    in English and, at our option, in any other language that
                    you read or speak. <br />{" "}
                    <span className="font-bold">21.1. Electronic Notice.</span>
                    Notice may be given electronically{" "}
                    <span className="font-bold">by us to you</span> if allowed
                    by law. If allowed by law and in accordance with this Lease,
                    electronic notice{" "}
                    <span className="font-bold">from you to us</span> must be
                    sent to the email address and/or portal specified in this
                    Lease. Notice may also be given by phone call or to a
                    physical address if allowed in this Lease. You represent
                    that you have provided your current email address to us, and
                    that you will notify us in the event your email address
                    changes
                    <div className="bg-red-600 text-white p-2 mt-10 mb-5"></div>
                    <span className="font-bold"> 22. Liability.</span> Each
                    resident is jointly and severally liable for all Lease
                    obligations. If you or any guest or occupant violates the
                    Lease or our Community Policies, all residents are
                    considered to have violated the Lease.{" "}
                    <span className="font-bold">
                      22.1. Indemnification by You. You’ll defend, indemnify and
                      hold us and our employees, agents, and management company
                      harmless from all liability arising from your conduct or
                      requests to our representatives and from the conduct of or
                      requests by your invitees, occupants or guests.{" "}
                    </span>{" "}
                    <br />
                    <br />
                    <span className="font-bold text-lg">
                      23. Default by Resident.
                    </span>
                    <span className="font-bold">23.1. Acts of Default.</span>
                    You’ll be in default if: <br /> (A) you don’t timely pay
                    Rent, including monthly recurring charges, or other amounts
                    you owe;
                    <br /> (B) you or any guest or occupant violates this Lease,
                    our Community Policies, or fire, safety, health, criminal or
                    other laws, regardless of whether or where arrest or
                    conviction occurs; <br /> (C) you give incorrect,
                    incomplete, or false answers in a rental application or in
                    this Lease; or <br /> (D) you or any occupant is arrested,
                    charged, detained, convicted, or given deferred adjudication
                    or pretrial diversion for <br /> (1) an offense involving
                    actual or potential physical harm to a person, or involving
                    the manufacture or delivery of a controlled substance,
                    marijuana, or drug paraphernalia as defined in the Texas
                    Controlled Substances Act, or <br /> (2) any sexrelated
                    crime, including a misdemeanor. <br />{" "}
                    <span className="font-bold">
                      23.2. Eviction. If you default, including holding over, we
                      may end your right of occupancy by giving you at least a
                      24- hour written notice to vacate.{" "}
                    </span>{" "}
                    Termination of your possession rights doesn’t release you
                    from liability for future Rent or other Lease obligations.{" "}
                    <span className="font-bold">
                      {" "}
                      After giving notice to vacate or filing an eviction suit,
                      we may still accept Rent or other sums due; the filing or
                      acceptance doesn’t waive or diminish our right of eviction
                      or any other contractual or statutory right.{" "}
                    </span>{" "}
                    Accepting money at any time doesn’t waive our right to
                    damages, to past or future Rent or other sums, or to our
                    continuing with eviction proceedings. In an eviction, Rent
                    is owed for the full rental period and will not be prorated.{" "}
                    <br />{" "}
                    <span className="font-bold">23.3. Acceleration. </span>{" "}
                    Unless we elect not to accelerate Rent, all monthly Rent for
                    the rest of the Lease term or renewal period will be
                    accelerated automatically without notice or demand (before
                    or after acceleration) and will be immediately due if,
                    without our written consent: <br /> (A) you move out, remove
                    property in preparing to move out, or you or any occupant
                    gives oral or written notice of intent to move out before
                    the Lease term or renewal period ends; and <br /> (B) you
                    haven’t paid all Rent for the entire Lease term or renewal
                    period. Remaining Rent will also be accelerated if you’re
                    judicially evicted or move out when we demand because you’ve
                    defaulted. If you don’t pay the first month’s Rent when or
                    before the Lease begins, all future Rent for the Lease term
                    will be automatically accelerated without notice and become
                    immediately due. We also may end your right of occupancy and
                    recover damages, future Rent, attorney’s fees, court costs,
                    and other lawful charges. 23.4. Holdover. You and all
                    occupants must vacate and surrender the apartment by or
                    before the date contained in: <br /> (1) your move-out
                    notice,
                    <br /> (2) our notice to vacate,
                    <br /> (3) our notice of non-renewal, or <br /> (4) a
                    written agreement specifying a different move-out date. If a
                    holdover occurs, then you’ll be liable to us for all Rent
                    for the full term of the previously signed lease of a new
                    resident who can’t occupy because of the holdover, and at
                    our option, we may extend the Lease term and/or increase the
                    Rent by 25% by delivering written notice to you or your
                    dwelling while you continue to hold over. <br />{" "}
                    <span className="font-bold">
                      23.5. Other Remedies.
                    </span>{" "}
                    23.5. Other Remedies. We may report unpaid amounts to credit
                    agencies as allowed by law. If we or our debt collector
                    tries to collect any money you owe us, you agree that we or
                    the debt collector may contact you by any legal means. If
                    you default, you will pay us, in addition to other sums due,
                    any rental discounts or concessions agreed to in writing
                    that have been applied to your account. We may recover
                    attorney’s fees in connection with enforcing our rights
                    under this Lease. All unpaid amounts you owe bear interest
                    at the rate provided by Texas Finance Code Section
                    304.003(c) from the due date. You must pay all
                    collectionagency fees if you fail to pay sums due within 10
                    days after we mail you a letter demanding payment and
                    stating that collection-agency fees will be added if you
                    don’t pay all sums by that deadline. You are also liable for
                    a charge (not to exceed $150) to cover our time, cost and
                    expense for any eviction proceeding against you, plus our
                    attorney’s fees and expenses, court costs, and filing fees
                    actually paid. <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      {" "}
                      24. Representatives’ Authority and Waivers. Our
                      representatives (including management personnel,
                      employees, and agents) have no authority to waive, amend,
                      or terminate this Lease or any part of it unless in
                      writing, and no authority to make promises,
                      representations, or agreements that impose security duties
                      or other obligations on us or our representatives, unless
                      in writing.{" "}
                    </span>{" "}
                    No action or omission by us will be considered a waiver of
                    our rights or of any subsequent violation, default, or time
                    or place of performance.{" "}
                    <span className="font-bold">
                      Our choice to enforce, not enforce or delay enforcement of
                      written-notice requirements, rental due dates,
                      acceleration, liens, or any other rights isn’t a waiver
                      under any circumstances.{" "}
                    </span>{" "}
                    Delay in demanding sums you owe is not a waiver. Except when
                    notice or demand is required by law, you waive any notice
                    and demand for performance from us if you default. Nothing
                    in this Lease constitutes a waiver of our remedies for a
                    breach under your prior lease that occurred before the Lease
                    term begins. Your Lease is subordinate to existing and
                    future recorded mortgages, unless the owner’s lender chooses
                    otherwise. <br /> All remedies are cumulative. Exercising
                    one remedy won’t constitute an election or waiver of other
                    remedies. All provisions regarding our nonliability or
                    nonduty apply to our employees, agents, and management
                    companies. No employee, agent, or management company is
                    personally liable for any of our contractual, statutory, or
                    other obligations merely by virtue of acting on our behalf.
                    <div className="bg-red-600 text-white p-2 mt-10 mb-5"></div>
                    <span className="text-lg font-bold">
                      25. Move-Out Notice.
                    </span>
                    Before moving out, you must give our representative advance
                    written move-out notice as stated in Par. 4, even if the
                    Lease has become a month-to-month lease. The move-out date
                    can’t be changed unless we and you both agree in writing.{" "}
                    <br /> Your move-out notice must comply with each of the
                    following: <br /> (a) Unless we require more than 30 days’
                    notice, if you give notice on the first day of the month you
                    intend to move out, move out will be on the last day of that
                    month. <br /> (b) Your move-out notice must not terminate
                    the Lease before the end of the Lease term or renewal
                    period. <br /> (c) If we require you to give us more than 30
                    days’ written notice to move out before the end of the Lease
                    term, we will give you 1 written reminder not less than 5
                    days nor more than 90 days before your deadline for giving
                    us your written move-out notice. If we fail to give a
                    reminder notice, 30 days’ written notice to move out is
                    required. <br /> (d) You must get from us a written
                    acknowledgment of your notice. <br />
                    <br />{" "}
                    <span className="font-bold text-lg">
                      26. Move-Out Procedures.{" "}
                    </span>{" "}
                    <br />
                    <span className="font-bold">26. 1. Cleaning.</span> You must
                    thoroughly clean the dwelling, including doors, windows,
                    furniture, bathrooms, kitchen appliances, patios, balconies,
                    garages, carports, and storage rooms. You must follow
                    move-out cleaning instructions if they have been provided.
                    If you don’t clean adequately, you’ll be liable for
                    reasonable cleaning charges—including charges for cleaning
                    carpets, draperies, furniture, walls, etc. that are soiled
                    beyond normal wear (that is, wear or soiling that occurs
                    without negligence, carelessness, accident, or abuse).{" "}
                    <br />{" "}
                    <span className="font-bold">
                      26.2. Move-Out Inspection.
                    </span>
                    We may, but are not obligated to, provide a joint move-out
                    inspection. Our representatives have no authority to bind or
                    limit us regarding deductions for repairs, damages, or
                    charges. Any statements or estimates by us or our
                    representative are subject to our correction, modification,
                    or disapproval before final accounting or refunding. <br />
                    <br />{" "}
                    <span className="font-bold">
                      27. Surrender and Abandonment.
                    </span>{" "}
                    You have <span className="font-bold">surrendered</span> the
                    dwelling when: <br /> (A) the move-out date has passed and
                    no one is living in the dwelling in our reasonable judgment;
                    or <br /> (B) dwelling keys and access devices listed in
                    Par. 2.1 have been turned in to us—whichever happens first.
                    You have
                    <span className="font-bold">abandoned</span> the dwelling
                    when all of the following have occurred: <br /> (A) everyone
                    appears to have moved out in our reasonable judgment; <br />{" "}
                    (B) you’ve been in default for nonpayment of Rent for 5
                    consecutive days, or water, gas, or electric service for the
                    dwelling not connected in our name has been terminated or
                    transferred; and <br /> (C) you’ve not responded for 2 days
                    to our notice left on the inside of the main entry door
                    stating that we consider the dwelling abandoned. An dwelling
                    is also considered abandoned 10 days after the death of a
                    sole resident. <br />{" "}
                    <span className="font-bold">
                      27.1. The Ending of Your Rights.
                    </span>{" "}
                    Surrender, abandonment, or judicial eviction ends your right
                    of possession for all purposes and gives us the immediate
                    right to clean up, make repairs in, and relet the dwelling;
                    determine any security-deposit deductions; and remove or
                    store property left in the dwelling. <br />{" "}
                    <span className="font-bold">
                      27.2. Removal and Storage of Property.
                    </span>{" "}
                    We, or law officers, may— but have no duty to—remove or
                    store all property that in our sole judgment belongs to you
                    and remains in the dwelling or in common areas (including
                    any vehicles you or any occupant or guest owns or uses)
                    after you’re judicially evicted or if you surrender or
                    abandon the dwelling. <br />
                    <span className="font-bold">
                      {" "}
                      We’re not liable for casualty, loss, damage, or theft.{" "}
                    </span>{" "}
                    You must pay reasonable charges for our packing, removing
                    and storing any property. <br /> Except for animals, we may
                    throw away or give to a charitable organization all personal
                    property that is: <br /> (1) left in the dwelling after
                    surrender or abandonment; or <br /> (2) left outside more
                    than 1 hour after writ of possession is executed, following
                    judicial eviction. An animal removed after surrender,
                    abandonment, or eviction may be kenneled or turned over to a
                    local authority, humane society, or rescue Organization{" "}
                    <br /> <br />{" "}
                    <span className="text-lg font-bold">
                      28. TAA Membership.
                    </span>
                    We, the management company representing us, or any locator
                    service that you used confirms membership in good standing
                    of both the Texas Apartment Association and the affiliated
                    local apartment association for the area where the dwelling
                    is located at the time of signing this Lease. If not, the
                    following applies: <br /> (A) this Lease is voidable at your
                    option and is unenforceable by us (except for property
                    damages); and <br /> (B) we may not recover past or future
                    rent or other charges. The above remedies also apply if both
                    of the following occur: <br /> (1) the Lease is
                    automatically renewed on a month-to-month basis more than
                    once after membership in TAA and the local association has
                    lapsed; and <br /> (2) neither the owner nor the management
                    company is a member of TAA and the local association during
                    the third automatic renewal. A signed affidavit from the
                    affiliated local apartment association attesting to
                    nonmembership when the Lease or renewal was signed will be
                    conclusive evidence of nonmembership. Governmental entities
                    may use TAA forms if TAA agrees in writing. Name, address
                    and telephone number of locator service (if applicable):
                    <br />
                    <span className="border-b border-black w-full font-bold">
                      something
                    </span>
                    <br />
                    <span className="border-b border-black w-full font-bold">
                      something
                    </span>
                    <br />
                    <br />{" "}
                    <span className="font-bold text-lg">
                      29. Severability and Survivability.
                    </span>{" "}
                    If any provision of this Lease is invalid or unenforceable
                    under applicable law, it won’t invalidate the remainder of
                    the Lease or change the intent of the parties.{" "}
                    <span className="font-bold">
                      {" "}
                      Paragraphs 10.1, 10.2, 16, 22.1, 27, 30 and 31 shall
                      survive the termination of this Lease.
                    </span>
                    This Lease binds subsequent owners. <br /> <br />{" "}
                    <span className="font-bold text-lg">
                      30. Controlling Law.
                    </span>
                    Texas law governs this Lease. All litigation arising under
                    this Lease and all Lease obligations must be brought in the
                    county, and precinct if applicable, where the dwelling is
                    located. <br /> <br />{" "}
                    <span className="font-bold text-lg">31. Waivers.</span> By
                    signing this Lease, you agree to the following: <br />{" "}
                    <span className="font-bold">
                      31.1. Class Action Waiver.
                    </span>
                    You agree that you will not participate in any class action
                    claims against us or our employees, agents, or management
                    company. You must file any claim against us individually,{" "}
                    <span className="font-bold">
                      {" "}
                      and{" "}
                      <span className="font-bold">
                        {" "}
                        you expressly waive your right to bring, represent, join
                        or otherwise maintain a class action, collective action
                        or similar proceeding against us in any forum.{" "}
                      </span>
                    </span>
                    <br />
                    <span className="font-bold">
                      YOU UNDERSTAND THAT, WITHOUT THIS WAIVER, YOU COULD BE A
                      PARTY IN A CLASS ACTION LAWSUIT. BY SIGNING THIS LEASE,
                      YOU ACCEPT THIS WAIVER AND CHOOSE TO HAVE ANY CLAIMS
                      DECIDED INDIVIDUALLY. THE PROVISIONS OF THIS PARAGRAPH
                      SHALL SURVIVE THE TERMINATION OR EXPIRATION OF THIS LEASE.
                    </span>
                    <br /> <br />
                    <span className="font-bold">31.2. Force Majeure.</span> If
                    we are prevented from completing substantial performance of
                    any obligation under this Lease by occurrences that are
                    beyond our control, including but not limited to, an act of
                    God, strikes, epidemics, war, acts of terrorism, riots,
                    flood, fire, hurricane, tornado, sabotage or governmental
                    regulation, then we shall be excused from any further
                    performance of obligations to the fullest extent allowed by
                    law. <br /> <br />
                    <span className="text-lg font-bold">
                      32. Special Provisions.
                    </span>
                    The following or attached special provisions and any addenda
                    or Community Policies provided to you are part of this Lease
                    and supersede any conflicting provisions in this Lease.
                    <br />
                    <br />
                    <br />
                    <div className="w-full border-b border-black"></div>
                    <br />
                    <div className="w-full border-b border-black"></div>
                    <br />
                    <div className="w-full border-b border-black"></div>
                    <br />
                    <div className="w-full border-b border-black"></div>
                    <br />
                    <div className="w-full border-b border-black"></div>
                    <br />
                    <br />
                    <span className="font-bold">
                      Before submitting a rental application or signing this
                      Lease, you should review the documents and may consult an
                      attorney. You are bound by this Lease when it is signed.
                      An electronic signature is binding. This Lease, including
                      all addenda, is the entire agreement between you and us.
                      You are NOT relying on any oral representations.
                    </span>
                    <br />
                    <br />
                    <span className="font-bold">
                      Resident or Residents (all sign below)
                    </span>
                    <br />
                    <br />
                    <div>
                      <div className="w-full py-2 flex justify-between p-2">
                        <span>Shopon</span>
                        <span>9/19/2024</span>
                      </div>
                      <div className="border-t border-black flex justify-between p-2">
                        <span>(Name of Resident) </span>
                        <span>Date signed</span>
                      </div>
                    </div>
                    <br />
                    <div>
                      <div className="w-full py-2 flex justify-between p-2">
                        <span>Shopon</span>
                        <span>9/19/2024</span>
                      </div>
                      <div className="border-t border-black flex justify-between p-2">
                        <span>(Name of Resident) </span>
                        <span>Date signed</span>
                      </div>
                    </div>
                    <br />
                    <div>
                      <div className="w-full py-2 flex justify-between p-2">
                        <span>Shopon</span>
                        <span>9/19/2024</span>
                      </div>
                      <div className="border-t border-black flex justify-between p-2">
                        <span>(Name of Resident) </span>
                        <span>Date signed</span>
                      </div>
                    </div>
                    <br />
                    <div>
                      <div className="w-full py-2 flex justify-between p-2">
                        <span>Shopon</span>
                        <span>9/19/2024</span>
                      </div>
                      <div className="border-t border-black flex justify-between p-2">
                        <span>(Name of Resident) </span>
                        <span>Date signed</span>
                      </div>
                    </div>
                    <br />
                    <div>
                      <div className="w-full py-2 flex justify-between p-2">
                        <span>Shopon</span>
                        <span>9/19/2024</span>
                      </div>
                      <div className="border-t border-black flex justify-between p-2">
                        <span>(Name of Resident) </span>
                        <span>Date signed</span>
                      </div>
                    </div>
                    <br />
                    <span className="font-bold">
                      Owner or Owner’s Representative (signing on behalf of
                      owner)
                    </span>
                    <div className="w-full border-b border-black mt-6">
                      hello
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrintLeaseForm;
