import { Button, Input, Modal, TextArea } from "@/components";
import { useAppDispatch, useGetAllPostSelector } from "@/hooks";
import {
  addPostReply,
  getAllPost,
  reportPost,
  savePost,
} from "@/services/post/post";
import { Form, Formik } from "formik";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

const initialValues = {
  search: "",
};

const initialValues2 = {
  msg: "",
};
const validationSchema = Yup.object({
  msg: Yup.string().required("Required!"),
});

export const CommunityPost = () => {
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllPostSelector();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState();

  const openModal = (id) => {
    data?.map((item) => {
      if (item.postId === id) {
        console.log(item.postId);
        setIsModalOpen(true);
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const debouncedSubmit = useCallback(
    debounce((values) => {
      dispatch(
        getAllPost({
          query: values.search,
        })
      );
      console.log(values);
    }, 1000),
    []
  );

  const onSubmit = (values) => {
    debouncedSubmit(values);
  };

  const onSubmit2 = (values) => {
    dispatch(addPostReply({ postId: postId, msg: values.msg }));
    closeModal();
  };

  useEffect(() => {
    dispatch(
      getAllPost({
        query: "",
      })
    );
  }, []);

  return (
    <div className="space-y-5 text-gray-900">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, submitForm }) => {
          return (
            <Form className="md:grid md:grid-cols-4 w-full md:gap-6 space-y-6 md:space-y-0 mt-4 md:mt-0">
              <Input
                label={"Search"}
                placeholder={"Search By City or Zip"}
                name={"search"}
                className={"py-2 px-2"}
                onChange={(e) => {
                  handleChange(e);
                  submitForm();
                }}
              />
            </Form>
          );
        }}
      </Formik>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[20vh]">
          <ClipLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="space-y-5">
          {data?.length === 0 ? (
            <div className="w-full h-[20vh] flex justify-center items-center">
              No Post Available...
            </div>
          ) : (
            data?.map((item) => {
              return (
                <>
                  {postId === item.postId && (
                    <Modal
                      title={"Reply"}
                      onClose={closeModal}
                      isOpen={isModalOpen}
                      width={"lg:w-1/2 w-full"}
                    >
                      <Formik
                        initialValues={initialValues2}
                        onSubmit={onSubmit2}
                        validationSchema={validationSchema}
                      >
                        {({
                          setFieldValue,
                          values,
                          setValues,
                          errors,
                          touched,
                        }) => {
                          return (
                            <Form className="space-y-5 py-2 w-full">
                              <div className="w-full">
                                <TextArea
                                  row={10}
                                  placeholder="Short Message"
                                  name="msg"
                                  required={true}
                                  label={"Reply"}
                                />
                              </div>
                              <Button type={"submit"}>Submit</Button>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Modal>
                  )}
                  <div
                    key={item.postId}
                    className="space-y-2 border-t border-gray-300 py-2"
                  >
                    <div>
                      <h3 className="text-lg font-semibold tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-sm">
                        {item.author} | {item.createdAt} | {item.city},{" "}
                        {item.zip}
                      </p>
                      {/* <hr className="border-gray-400" /> */}
                    </div>
                    <div>
                      <p>{item.msg}</p>
                    </div>
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        className={`${
                          item.saved
                            ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
                            : "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                        }`}
                        onClick={() => {
                          dispatch(savePost({ postId: item.postId }));
                        }}
                      >
                        {" "}
                        {item.saved ? "Unsave Post" : "Save Post"}{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          openModal(item.postId);
                          setPostId(item.postId);
                        }}
                      >
                        Reply & Help
                      </Button>
                      <Button
                        className={`bg-red-500 hover:bg-red-600 focus:ring-red-300`}
                        onClick={() => {
                          dispatch(reportPost({ postId: item.postId }));
                        }}
                      >
                        Report
                      </Button>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
