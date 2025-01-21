export const PetPolicy = ({ pet_policy, parking }) => {
  return (
    <>
      <div className="px-4" id="pet-policy">
        <div>
          <h2 className="md:text-2xl md:mt-0 font-semibold py-5 text-xl">
            Pet Policy & Parking
          </h2>
        </div>

        <div className="md:flex gap-20">
          <div>
            <h3 className="text-lg font-semibold pb-3">Pet Policy</h3>
            <ul className="list-disc px-5">
              {pet_policy &&
                pet_policy.map((value, index) => {
                  return (
                    <li className="text-base font-semibold" key={index}>
                      {value.name}: ${value.amount}({value.refundable})(
                      {value.based_on_term})
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold pb-3 mt-5 md:mt-0">Parking</h3>
            <ul className="list-disc px-5">
              {parking.map((value, index) => {
                return (
                  <li className="text-base font-semibold" key={index}>
                    {value.name}: {value.free_paid}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
