export const About = ({ about_property, unit, manager_name }) => {
  return (
    <div className="px-4" id="about">
      <div>
        <div>
          <h2 className="md:text-2xl font-semibold py-2 text-xl">About</h2>
        </div>

        <div>
          <p className="md:text-base text-sm font-semibold py-1">
            Managed By: {manager_name}
            {"  "} | {"  "} Total Units: {unit}
          </p>
        </div>
        <div>
          <p className="md:text-base text-sm">{about_property}</p>
        </div>
      </div>
    </div>
  );
};
