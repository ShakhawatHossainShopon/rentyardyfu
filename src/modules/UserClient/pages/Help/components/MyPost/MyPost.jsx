import { Button } from "@/components";
import { useAppDispatch, useGetPostSelector } from "@/hooks";
import { deletePost, getPost } from "@/services/post/post";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

export const MyPost = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useGetPostSelector();

  useEffect(() => {
    dispatch(
      getPost({
        query: "",
      })
    );
  }, []);

  return (
    <div className="space-y-5">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[20vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : data?.length === 0 ? (
        <div className="w-full h-[20vh] flex justify-center items-center">
          No Post Available...
        </div>
      ) : (
        data?.map((item) => {
          return (
            <div
              key={item.postId}
              className="space-y-2 border-t border-gray-300 py-2"
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm">
                  {item.author} | {item.createdAt} | {item.city}, {item.zip}
                </p>
                {/* <hr className="border-gray-400" /> */}
              </div>
              <div>
                <p>{item.msg}</p>
              </div>
              <div className="w-full text-end">
                <Button
                  onClick={() => {
                    Swal.fire({
                      title: "Are You Sure?",
                      showDenyButton: true,
                      confirmButtonText: "Ok",
                      denyButtonText: `Cancel`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deletePost(item.postId));
                      }
                    });
                  }}
                  className={
                    "bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300"
                  }
                >
                  Delete Post
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
