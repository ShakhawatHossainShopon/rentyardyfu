export const CostBreakdownInfo = ({ fees, total }) => {
  return (
    <div>
      <div className="px-5">
        {fees.map((item, index) => (
          <ul className="list-disc" key={index}>
            <li className="text-base darkText">
              {item.title}: {item.payment === "Discount" ? "-" : null}$
              {item.amount}{" "}
              {item?.title?.includes("Pro-Rated Rent") ||
              item?.title?.includes("Reserved Parking on") ||
              item?.title?.includes("Pro-Rated Pet Rent")
                ? ""
                : `(${item?.type})`}
            </li>
          </ul>
        ))}
        <hr className="my-2" />
        <p className="font-semibold text-xl pb-6 darkText"> Total: ${total} </p>
      </div>
    </div>
  );
};
