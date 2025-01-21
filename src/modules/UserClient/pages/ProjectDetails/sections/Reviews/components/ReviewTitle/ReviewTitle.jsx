import { RatingStars } from "@/components";

export const ReviewTitle = ({ rating, total }) => {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="md:text-xl text-base font-bold">Reviews</h2>
        <div className="md:flex justify-start items-center md:space-x-2">
          <div className="flex justify-start items-center space-x-1 text-yellow-400">
            <RatingStars rating={rating ? rating : 0} />
          </div>
          <p className="font-bold text-sm">
            {rating} out of 5 (Total {total} Renter Reviews)
          </p>
        </div>
      </div>
      {/* <div>
        <Button>Write Review</Button>
      </div> */}
    </div>
  );
};
