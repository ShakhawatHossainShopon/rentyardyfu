export const Chip = ({ label }) => {
  return (
    <div
      className={`px-3 py-3  text-black border-2 border-blue-70"
       min-w-max flex justify-center items-center`}
    >
      <p className="text-lg font-semibold darkText">{label}</p>
    </div>
  );
};
