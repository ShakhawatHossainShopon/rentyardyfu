import { Button, RatingStars } from "@/components";
import { useAppDispatch } from "@/hooks";
import { replyPropertyReview } from "@/services/property/property";
import { useState } from "react";

export const ReviewCard = ({ review, propertyId, user }) => {
  const dispatch = useAppDispatch();
  const [isShowInput, setIsShowInput] = useState(false);
  const [reply, setReply] = useState();

  const handleReplyOnChange = (e) => {
    e.preventDefault();
    setReply(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (reply) {
      dispatch(
        replyPropertyReview({
          propertyId: propertyId,
          reviewId: review.reviewId,
          reply: reply,
        })
      );
    }
  };

  return (
    <div className="border-2 border-blue-500 w-full p-4 space-y-3">
      <div className="flex justify-start items-center space-x-3">
        <p>{review.createdAt_formatted}</p>
        <p>{review.user_name}</p>
        <div className="flex justify-start items-center space-x-1 text-yellow-400">
          <RatingStars rating={review.total ? review.total : 0} />
        </div>
      </div>
      <div>
        <h6 className="font-semibold"> {review.title} </h6>
        <p className="text-sm md:text-base">{review.description}</p>
      </div>
      {review.reply && (
        <div className="flex justify-start items-center space-x-3">
          <span className="text-blue-600 md:text-lg text-base font-medium">
            Manager Reply:
          </span>
          <p> {review.reply} </p>
        </div>
      )}
      {user.data.role !== "Renter" && !review.reply && (
        <div className="space-y-2">
          <Button onClick={() => setIsShowInput(!isShowInput)}>
            {isShowInput ? "Cancel" : "Send a Reply"}
          </Button>
          {isShowInput && (
            <div className="space-y-2">
              <input
                onChange={handleReplyOnChange}
                className="border focus:ring-1 transition-all duration-200 focus:ring-blue-500 border-blue-500 p-2 w-full outline-none"
                placeholder="Write your reply here..."
              />
              <div className="w-full text-end">
                <Button onClick={onSubmit}>Submit Reply</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
