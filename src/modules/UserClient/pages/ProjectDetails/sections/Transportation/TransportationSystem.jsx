export const TransportationSystem = ({ transportation }) => {
  return (
    <div className="px-4" id="transportation">
      <div>
        <h2 className="md:text-2xl font-semibold py-5 text-xl">
          Transportation
        </h2>
      </div>

      <ul className="list-disc px-5">
        {transportation.map((value, index) => {
          return (
            <li className="md:text-base text:sm font-semibold" key={index}>
              {value.type}: {value.stoppage} {value.transportation}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
