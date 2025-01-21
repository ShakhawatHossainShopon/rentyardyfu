export const Amenities = ({ community_amenities }) => {
  return (
    <div className="px-4" id="amenities">
      <div>
        <h2 className="md:text-2xl text-xl font-semibold pb-5">Amenities</h2>
      </div>

      <div className="md:flex gap-20">
        <div>
          <h3 className="md:text-lg font-semibold pb-3 text-base">
            Community Amenities
          </h3>
          <ul className="list-disc px-5">
            {community_amenities.map((value, index) => {
              return (
                <li className="text-base" key={index}>
                  {value.name}
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div>
          <h3 className="text-lg font-semibold pb-3 mt-6 md:mt-0 ">
            Apartment Amenities
          </h3>
          <ul className="list-disc px-5">
            {apartmentAmenities.map((value, index) => {
              return (
                <li className="text-base" key={index}>
                  {value.apartmentAmenities}
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </div>
  );
};
