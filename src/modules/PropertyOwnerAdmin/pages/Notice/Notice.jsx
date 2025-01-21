import { AdminHeader, Button, Pagination } from "@/components";
import {
  useAppDispatch,
  useGetAllNoticeByPOSelector,
  useScrollToTop,
} from "@/hooks";
import {
  deleteNotice,
  getAllNoticeByPO,
  updateNoticeVisibility,
} from "@/services/notice/notice";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { AddNotice } from "./components";
const Notice = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllNoticeByPOSelector();
  useEffect(() => {
    dispatch(getAllNoticeByPO());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedData = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      <AdminHeader title={"Announcements"} />
      <div className="w-full p-4 space-y-5">
        <div className="space-y-3">
          <Button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add New Announcement"}
          </Button>
          {showForm && <AddNotice />}
        </div>
        <div>
          <h2 className="md:text-lg text-base font-semibold">
            All Announcement
          </h2>
          <hr />
        </div>
        <div className="space-y-5">
          {loading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          ) : paginatedData?.length > 0 ? (
            paginatedData?.map((notice, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <h4 className="text-lg font-semibold">
                    {notice.property_name}
                  </h4>
                  <h4 className="font-medium">{notice.subject}</h4>
                  {notice.date_formatted && (
                    <p className="text-sm text-gray-600 darkText">
                      Valid till: {notice.date_formatted}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 darkText">{notice.msg}</p>
                <div className="flex justify-end items-center space-x-3 mb-2">
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Are You Sure?",
                        showDenyButton: true,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          dispatch(
                            updateNoticeVisibility({
                              announcementId: notice.announcementId,
                            })
                          );
                        }
                      });
                    }}
                  >
                    {notice.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Are You Sure?",
                        showDenyButton: true,
                        confirmButtonText: "Ok",
                        denyButtonText: `Cancel`,
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          dispatch(deleteNotice(notice.announcementId));
                        }
                      });
                    }}
                    className={"bg-red-600 hover:bg-red-700 focus:ring-red-300"}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="w-full h-[20vh] flex justify-center items-center">
              {" "}
              No Announcement Available...{" "}
            </div>
          )}
        </div>
        {data?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={data.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
export default Notice;
