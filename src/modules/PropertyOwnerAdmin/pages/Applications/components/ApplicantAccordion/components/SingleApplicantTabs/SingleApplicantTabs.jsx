import { config } from "@/config";
import {
  ApplicationInfo,
  InvoiceInfo,
} from "@/modules/PropertyOwnerAdmin/components";
import { Icons } from "@/utils";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { Docs } from "./Docs";

function Icon({ id, open }) {
  return <>{id === open ? <Icons.Minus /> : <Icons.Plus />}</>;
}

export const SingleApplicantTabs = ({ item, history }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="bg-white space-y-2 dark:bg-darkMode">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm dark:bg-dark-primary darkText"
          onClick={() => handleOpen(1)}
        >
          Primary Applicant- {item.user.first_name}
        </AccordionHeader>
        <AccordionBody>
          <ApplicationInfo
            history={history}
            lease_term={item.lease_term}
            move_in_date={item.move_in_date}
            move_out_date={item.expected_move_out_date}
            apartment={item.apartment}
            user={item.user && item.user}
            vehicles={item.vehicles}
            pets={item.pets}
            isBtn={true}
          />
        </AccordionBody>
      </Accordion>
      {item.user.occupants &&
        item.user.occupants.length > 0 &&
        item.user.occupants.map((elem, index) => {
          return (
            <Accordion
              open={open === index + 2}
              icon={<Icon id={index + 2} open={open} />}
            >
              <AccordionHeader
                className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm dark:bg-dark-primary darkText"
                onClick={() => handleOpen(index + 2)}
              >
                {elem.type}- {elem.first_name} {elem.last_name}
              </AccordionHeader>
              <AccordionBody>
                <ApplicationInfo
                  user={elem && elem}
                  isBtn={true}
                  history={history}
                />
              </AccordionBody>
            </Accordion>
          );
        })}
      <Accordion
        open={open === (item.user.occupants && item.user.occupants.length + 2)}
        icon={
          <Icon
            id={item.user.occupants && item.user.occupants.length + 2}
            open={open}
          />
        }
      >
        <AccordionHeader
          className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm dark:bg-dark-primary darkText"
          onClick={() =>
            handleOpen(item.user.occupants && item.user.occupants.length + 2)
          }
        >
          Documents
        </AccordionHeader>
        <AccordionBody>
          <div className="space-y-5 px-4">
            <div>
              <h2 className="md:text-lg text-base font-semibold">
                Document List
              </h2>
              <hr />
            </div>
            <ul className="list-disc px-4">
              {item?.documents?.map((elem, index) => {
                return (
                  <li key={elem.index} className="text-blue-600 underline">
                    <a
                      href={`${config.url.ASSET_URL}${elem.link}`}
                      target="_blank"
                    >
                      {elem.filename}
                    </a>
                  </li>
                );
              })}
            </ul>
            <Docs
              applicationId={item.applicationId}
              propertyId={item.propertyId}
              singlePropertyId={item.singlePropertyId}
            />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === (item.user.occupants && item.user.occupants.length + 3)}
        icon={
          <Icon
            id={item.user.occupants && item.user.occupants.length + 3}
            open={open}
          />
        }
      >
        <AccordionHeader
          className="bg-blue-600 text-white md:px-4 px-2  hover:text-white text-sm dark:bg-dark-primary darkText"
          onClick={() =>
            handleOpen(item.user.occupants && item.user.occupants.length + 3)
          }
        >
          Invoicing - Total: ${item.invoice_total}
        </AccordionHeader>
        <AccordionBody>
          <InvoiceInfo
            history={history}
            applicationId={item.applicationId}
            userId={item.userId}
            invoice={item.invoice}
            total={item.invoice_total}
            first_name={item.user.first_name}
            last_name={item.user.last_name}
            apartment={item.apartment}
            status={item.status}
            move_in_date={item.move_in_date}
            property_name={item.property.name}
            invoiceDetails={item.invoiceDetails}
          />
        </AccordionBody>
      </Accordion>
    </div>
  );
};
