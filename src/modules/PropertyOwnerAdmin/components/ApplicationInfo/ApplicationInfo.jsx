import { Button, Modal } from "@/components";
import { config } from "@/config";
import { memo, useState } from "react";
export const ApplicationInfo = memo(
  ({
    isBtn,
    isImage,
    user,
    lease_term,
    move_in_date,
    apartment,
    history,
    move_out_date,
    pets,
    vehicles,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const [isModalOpen6, setIsModalOpen6] = useState(false);
    const [petId, setPetId] = useState(null);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openModal2 = (id) => {
      setPetId(id);
      setIsModalOpen2(true);
    };

    const closeModal2 = () => {
      setIsModalOpen2(false);
    };
    const openModal3 = () => {
      setIsModalOpen3(true);
    };

    const closeModal3 = () => {
      setIsModalOpen3(false);
    };
    const openModal4 = () => {
      setIsModalOpen4(true);
    };

    const closeModal4 = () => {
      setIsModalOpen4(false);
    };
    const openModal5 = () => {
      setIsModalOpen5(true);
    };

    const closeModal5 = () => {
      setIsModalOpen5(false);
    };

    const openModal6 = () => {
      setIsModalOpen(true);
    };
    const closeModal6 = () => {
      setIsModalOpen6(false);
    };
    return (
      <>
        {user && (
          <div className="w-full dark:bg-darkMode dark:text-gray-400">
            <div className="md:grid md:grid-cols-2 md:gap-2 md:px-4 md:py-5 py-2">
              <div>
                {user && user.first_name && (
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {user && user.first_name && user.first_name}
                  </p>
                )}
                {user && user.date_of_birth && (
                  <p>
                    <span className="font-semibold">Date of Birth:</span>{" "}
                    {user && user.date_of_birth && user.date_of_birth}
                  </p>
                )}
                {user && user.sex && (
                  <p>
                    <span className="font-semibold">Sex:</span> {user.sex}
                  </p>
                )}
                {user && user.marital_status && (
                  <p>
                    <span className="font-semibold">Marital Status:</span>{" "}
                    {user.marital_status}
                  </p>
                )}
                {user && user.country_of_citizenship && (
                  <p>
                    <span className="font-semibold">Country of Citizen:</span>{" "}
                    {user.country_of_citizenship}
                  </p>
                )}
                <br />
                {user && user.present_address && (
                  <p>
                    <span className="font-semibold">Present Address: </span>
                    {user.present_address}
                  </p>
                )}
                {user && user.permanent_address && (
                  <p>
                    <span className="font-semibold">Permanent Address: </span>
                    {user.permanent_address}
                  </p>
                )}
                <br />
                {user && user.email && (
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                )}
                {user && user.contact_number && (
                  <p>
                    <span className="font-semibold">Contact Number:</span>{" "}
                    {user.contact_number}
                  </p>
                )}
                {user && user.govt_issued_id_type && (
                  <p>
                    <span className="font-semibold">Proof of Document: </span>{" "}
                    {user.govt_issued_id_type}
                  </p>
                )}
                {user && user.govt_issued_id_number && (
                  <p>
                    <span className="font-semibold">Document Number:</span>{" "}
                    {user.govt_issued_id_number}
                  </p>
                )}
                {user && user.issuing_city_state && (
                  <p>
                    <span className="font-semibold">Issuing Place: </span>{" "}
                    {user.issuing_city_state}
                  </p>
                )}
                {user && user.govt_id_photo && (
                  <p>
                    <span className="font-semibold">Document Photo: </span>
                    <span
                      onClick={openModal}
                      className="underline font-semibold cursor-pointer"
                    >
                      Click to Preview
                    </span>
                    {!isImage && (
                      <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={"Document Photo"}
                        width={"md:w-4/6 w-full"}
                      >
                        <div className="flex justify-center items-center w-full py-6">
                          <img
                            src={`${config.url.ASSET_URL}${
                              user &&
                              user.govt_id_photo &&
                              user.govt_id_photo.link &&
                              user.govt_id_photo.link
                            }`}
                            alt=""
                            className="object-cover max-h-96"
                          />
                        </div>
                      </Modal>
                    )}
                  </p>
                )}
                <br />
                <div>
                  {apartment && apartment.unit_number && apartment.type && (
                    <p>
                      <span className="text-blue-700 font-semibold darkText">
                        Unit/Apt #:
                      </span>{" "}
                      {apartment &&
                        apartment.unit_number &&
                        apartment.unit_number}{" "}
                      ({apartment && apartment.type && apartment.type})
                    </p>
                  )}
                  {lease_term && (
                    <p>
                      <span className="text-blue-700 font-semibold darkText">
                        Lease Term:
                      </span>{" "}
                      {lease_term}
                    </p>
                  )}

                  {move_in_date && (
                    <p>
                      <span className="text-blue-700 font-semibold darkText">
                        Move-In Date:
                      </span>{" "}
                      {move_in_date}
                    </p>
                  )}
                  {move_out_date && (
                    <p>
                      <span className="text-blue-700 font-semibold darkText">
                        Expected Move-Out Date:
                      </span>{" "}
                      {move_out_date}
                    </p>
                  )}
                </div>
              </div>
              <div>
                {user && user.position && (
                  <p>
                    <span className="font-semibold">Job Position:</span>{" "}
                    {user.position}
                  </p>
                )}
                {user && user.current_employer && (
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {user.current_employer}
                  </p>
                )}
                {user && user.starting_date && (
                  <p>
                    <span className="font-semibold">Starting Date: </span>{" "}
                    {user.starting_date}
                  </p>
                )}
                {user && user.office_institute_address && (
                  <p>
                    <span className="font-semibold">Office Address: </span>{" "}
                    {user.office_institute_address}
                  </p>
                )}

                {user && user.supervisor_name && (
                  <p>
                    <span className="font-semibold">Supervisor/Advisor: </span>{" "}
                    {user.supervisor_name}
                  </p>
                )}
                {user && user.supervisor_number && (
                  <p>
                    <span className="font-semibold">
                      Supervisor/Advisor Number:
                    </span>
                    {user.supervisor_number}
                  </p>
                )}
                <br />
                {pets && pets.length > 0 && (
                  <ul className="list-disc">
                    <h5 className="font-semibold"> Pets: </h5>
                    {pets.map((item) => {
                      return (
                        <li key={item.id} className="mx-5">
                          {item.type} - {item.breed} - {item.weight}
                          {item.asset && (
                            <>
                              {" "}
                              -{" "}
                              <span
                                onClick={() => openModal2(item.petId)}
                                className="underline font-semibold cursor-pointer"
                              >
                                Vaccine Proof
                              </span>
                            </>
                          )}
                          {petId === item.petId && !isImage && (
                            <Modal
                              isOpen={isModalOpen2}
                              onClose={closeModal2}
                              title={"Vaccine Proof"}
                              width={"md:w-4/6 w-full"}
                            >
                              <div className="flex justify-center items-center w-full py-6">
                                <img
                                  src={`${config.url.ASSET_URL}${
                                    item &&
                                    item.asset &&
                                    item.asset.link &&
                                    item.asset.link
                                  }`}
                                  alt=""
                                  className="object-cover max-h-96"
                                />
                              </div>
                            </Modal>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {vehicles && vehicles.length > 0 && (
                  <ul className="list-disc">
                    <h5 className="font-semibold"> Vehicles: </h5>
                    {vehicles.map((item) => {
                      return (
                        <li key={item.vehicleId} className="mx-5">
                          {item.company} - {item.model} - {item.year} -{" "}
                          {item.plate} - {item.color}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <br />
                {user &&
                  user.gross_monthly_income != 0 &&
                  user.gross_monthly_income !== null && (
                    <p>
                      <span className="font-semibold">Monthly Income:</span> $
                      {user.gross_monthly_income}
                    </p>
                  )}
                {user && user.bank_statement && (
                  <p>
                    <span className="font-semibold">
                      Bank Statement/Paystub:{" "}
                    </span>{" "}
                    <a
                      href={`${config.url.ASSET_URL}${user.bank_statement.link}`}
                      target="_blank"
                      className="underline font-semibold cursor-pointer"
                    >
                      Click to Preview
                    </a>
                  </p>
                )}

                {user && user.sponsor_guardian && (
                  <p>
                    <span className="font-semibold">Guarantee letter:</span>{" "}
                    <span
                      onClick={openModal3}
                      className="underline font-semibold cursor-pointer"
                    >
                      Click to Preview
                    </span>
                  </p>
                )}
                {!isImage && (
                  <Modal
                    isOpen={isModalOpen3}
                    onClose={closeModal3}
                    title={"Bank Statement"}
                    width={"md:w-4/6 w-full"}
                  >
                    {user.sponsor_guardian ? (
                      <div className="flex justify-center items-center w-full py-6">
                        <img
                          src={`${config.url.ASSET_URL}${user.sponsor_guardian.link}`}
                          alt=""
                          className="object-cover max-h-96"
                        />
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center text-xl font-semibold h-[40vh]">
                        {" "}
                        No photo available..{" "}
                      </div>
                    )}
                  </Modal>
                )}

                {user && user.living_country && (
                  <p>
                    <br />
                    <span className="font-semibold">
                      Foreigner:{" "}
                      {user.living_country === "I am in My Country"
                        ? "No"
                        : "Yes"}{" "}
                    </span>
                  </p>
                )}
                {user && user.estimate_arrival_date && (
                  <p>
                    <span className="font-semibold">
                      Arival Date: {user.estimate_arrival_date}
                    </span>
                  </p>
                )}
                {user && user.moving_reason && (
                  <p>
                    <span className="font-semibold">
                      Moving Reason: {user.moving_reason}{" "}
                    </span>
                  </p>
                )}
                {user && user.passport_bio_page && (
                  <p>
                    <span className="font-semibold">Passport Photo: </span>
                    <span
                      onClick={openModal}
                      className="underline font-semibold cursor-pointer"
                    >
                      Click to Preview
                    </span>
                  </p>
                )}

                {user && user.study_work_proof && (
                  <p>
                    <span className="font-semibold">
                      Study/Work/Immigration Proof:{" "}
                      <span
                        onClick={openModal}
                        className="underline font-semibold cursor-pointer"
                      >
                        Click to Preview
                      </span>
                    </span>
                  </p>
                )}

                {user && user.crime_comitted && user.crime_type && (
                  <p className="text-red-500 font-semibold mt-2 md:pb-2">
                    Crime Records: Yes, {user.crime_type}
                  </p>
                )}
                {!history && isBtn && (
                  <Button
                    className={
                      "text-center bg-[#075CF5] md:w-75 w-full  text-base mt-8 md:w-8/12"
                    }
                  >
                    Run Background Check
                  </Button>
                )}
              </div>
            </div>
            {isImage && (
              <div className="space-y-5 mt-0">
                <h4 className="text-lg font-semibold px-5">Document Images</h4>
                <div className="grid grid-cols-4 gap-4 px-5">
                  <img
                    src={`${config.url.ASSET_URL}${
                      user &&
                      user.govt_id_photo &&
                      user.govt_id_photo.link &&
                      user.govt_id_photo.link
                    }`}
                    alt=""
                    className="object-cover"
                  />
                  <img
                    src={`${config.url.ASSET_URL}${
                      user &&
                      user.bank_statement &&
                      user.bank_statement.link &&
                      user.bank_statement.link
                    }`}
                    alt=""
                    className="object-cover"
                  />
                  {user.sponsor_guardian ? (
                    <div className="flex justify-center items-center w-full">
                      <img
                        src={`${config.url.ASSET_URL}${
                          user &&
                          user.sponsor_guardian &&
                          user.sponsor_guardian.link &&
                          user.sponsor_guardian.link
                        }`}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center text-xl font-semibold">
                      {" "}
                      No photo available for sponsor proof..{" "}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
);
