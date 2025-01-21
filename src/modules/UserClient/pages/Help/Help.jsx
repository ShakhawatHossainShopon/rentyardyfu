import { Button, TabCom } from "@/components";
import { useScrollToTop } from "@/hooks";
import { useState } from "react";
import { CommunityPost, CreatePost, MyPost } from "./components";

const Help = () => {
  useScrollToTop();
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="w-full">
      <div className="p-2 md:p-4 space-y-5">
        <div className="space-y-2">
          <h2 className="md:text-3xl text-lg font-semibold">Help Portal</h2>
          <hr className="" />
        </div>
        <div>
          <Button
            className={"my-4"}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : "Add Help Post"}
          </Button>
          {showForm ? <CreatePost setShowForm={setShowForm} /> : null}
        </div>
        <div>
          <TabCom
            data={[
              {
                label: "Community Post",
                value: "Community Post",
                component: <CommunityPost />,
              },
              { label: "My Post", value: "My Post", component: <MyPost /> },
            ]}
            defaultValue={"Community Post"}
          />
        </div>
      </div>
    </div>
  );
};

export default Help;
