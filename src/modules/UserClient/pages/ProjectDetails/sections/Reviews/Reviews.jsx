import { ProvideReview, ReviewCard, ReviewTitle } from "./components";

export const Reviews = ({ propertyId, reviews, rating, user }) => {
  return (
    <div className="px-4 space-y-5" id="reviews">
      <ReviewTitle rating={rating} total={reviews.length} />
      {user &&
        user.data &&
        user.data.residentOf &&
        user.data.property &&
        !user.data.property.reviewed &&
        user.data.residentOf === propertyId && (
          <ProvideReview propertyId={propertyId} user={user} />
        )}
      <div className="space-y-5">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard
              propertyId={propertyId}
              key={index}
              review={review}
              user={user}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-[10vh]">
            {" "}
            No Review Available...{" "}
          </div>
        )}
      </div>
    </div>
  );
};
