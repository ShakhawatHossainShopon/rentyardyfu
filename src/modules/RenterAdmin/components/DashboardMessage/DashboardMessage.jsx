import { Link } from "react-router-dom";
import { links } from "./DashboardMessageData";

export const DashboardMessage = ({ name }) => {
  return (
    <>
      <div className="p-5 md:p-10 bg-[#DFEAFF] dark:bg-dark-primary">
        <h2 className="md:text-xl text-lg font-semibold mb-2">Hi, {name}!</h2>
        <p className="md:text-base text-sm py-4">
          Welcome to RentYard! Your profile is incomplete. To tour, apply and
          rent an apartment, please complete your profile and add any additional
          occupants you may have. Once you
          <Link to={"/renteradmin/account"} className="text-blue-700 underline">
            {" "}
            Complete your profile{" "}
          </Link>
          , you can apply for rent anywhere. You can pay rent, utilities, add
          vehicles, and much more!
        </p>
        <p>
          Before applying, make sure your profile is complete. Add your job and
          occupant list. Once the application is submitted, the property manager
          will check your background. You will be notified once it is approved.
          RentYard is a platform to assist you; however, we do not take
          liability. Thanks.
        </p>

        <ul className="list-disc md:flex gap-8 ml-5 my-4">
          {links.map((value, index) => {
            return (
              <li className="md:text-lg text-base font-semibold" key={index}>
                <a href="#">{value.link}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
