import { Button, TabCom } from "@/components";
import { useAppDispatch, useGetAllOccupantSelector } from "@/hooks";
import { getAllOccupant } from "@/services/occupant/occupant";
import { memo, useEffect, useState } from "react";
import { AddCoApplicant } from "./AddCoApplicant";
import { AddDependent } from "./AddDependent";
import { OccupantInfo } from "./OccupantInfo";

export const AddOccupant = memo(() => {
  const [isShowTab, setIsShowTab] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useGetAllOccupantSelector();

  useEffect(() => {
    dispatch(getAllOccupant());
  }, []);

  return (
    <div className="w-full space-y-10">
      {data &&
        data.map((item) => {
          return <OccupantInfo key={item.occupantId} item={item} />;
        })}
      <Button
        className={"md:text-sm text-xs"}
        onClick={() => setIsShowTab((prev) => !prev)}
      >
        {isShowTab ? "Close Tab" : " Add Occupant or Co-Applicants"}
      </Button>
      {isShowTab && (
        <>
          <p className="font-medium md:text-base text-xs dark:text-gray-300">
            <span className="text-red-600">Note:</span> Types of
            'Family/Dependents' are considered your dependents; generally, they
            do not share rent. However, type of 'Co-Applicant' do share rent. A
            'Co-Applicant' must have an account on RentYard. The property
            manager also checks the background of 'Co-Applicants' if required.
          </p>
          <TabCom
            data={[
              {
                value: "Add Dependent",
                label: "Add Dependent",
                component: <AddDependent />,
              },
              {
                value: "Add Co-Applicant",
                label: "Add Co-Applicant",
                component: <AddCoApplicant />,
              },
            ]}
            defaultValue={"Add Dependent"}
          />
        </>
      )}
    </div>
  );
});
