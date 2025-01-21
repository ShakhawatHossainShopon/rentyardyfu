export const Map = ({ location }) => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="w-full px-4" id="map">
      <h2 className="md:text-2xl font-semibold py-5 text-xl">Map</h2>
      <div className="h-[50vh] bg-gray-300">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="map"
          scrolling="no"
          src={mapSrc}
        ></iframe>
      </div>
    </div>
  );
};
