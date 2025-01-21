export const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`full-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="orange"
            viewBox="0 0 24 24"
            stroke="yellow"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.715 5.295a1 1 0 00.95.69h5.545c.969 0 1.371 1.24.588 1.81l-4.506 3.28a1 1 0 00-.364 1.118l1.716 5.295c.3.921-.755 1.688-1.54 1.118l-4.506-3.28a1 1 0 00-1.176 0l-4.506 3.28c-.784.57-1.84-.197-1.54-1.118l1.716-5.295a1 1 0 00-.364-1.118l-4.506-3.28c-.784-.57-.381-1.81.588-1.81h5.545a1 1 0 00.95-.69l1.715-5.295z"
            />
          </svg>
        ))}
      {halfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="orange" />
              <stop offset="50%" stopColor="gray" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.715 5.295a1 1 0 00.95.69h5.545c.969 0 1.371 1.24.588 1.81l-4.506 3.28a1 1 0 00-.364 1.118l1.716 5.295c.3.921-.755 1.688-1.54 1.118l-4.506-3.28a1 1 0 00-1.176 0l-4.506 3.28c-.784.57-1.84-.197-1.54-1.118l1.716-5.295a1 1 0 00-.364-1.118l-4.506-3.28c-.784-.57-.381-1.81.588-1.81h5.545a1 1 0 00.95-.69l1.715-5.295z"
          />
        </svg>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="gray"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.715 5.295a1 1 0 00.95.69h5.545c.969 0 1.371 1.24.588 1.81l-4.506 3.28a1 1 0 00-.364 1.118l1.716 5.295c.3.921-.755 1.688-1.54 1.118l-4.506-3.28a1 1 0 00-1.176 0l-4.506 3.28c-.784.57-1.84-.197-1.54-1.118l1.716-5.295a1 1 0 00-.364-1.118l-4.506-3.28c-.784-.57-.381-1.81.588-1.81h5.545a1 1 0 00.95-.69l1.715-5.295z"
            />
          </svg>
        ))}
    </div>
  );
};
