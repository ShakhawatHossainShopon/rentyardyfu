export const Schools = ({ schools }) => {
  return (
    <div className="px-4" id="schools">
      <div>
        <h2 className="md:text-2xl font-semibold py-5 text-xl">Schools</h2>
      </div>

      <ul className="list-disc px-5">
        {schools.map((value, index) => {
          return (
            <li className="md:text-base text:sm font-semibold" key={index}>
              {value.type}: {value.name}, Distance: {value.distance}.
            </li>
          );
        })}
      </ul>
    </div>
  );
};
