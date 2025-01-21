import { TabCom } from "../TabComp";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePassword } from "./ChangePassword";

export const UpdateLoginInfo = () => {
  return (
    <TabCom
      defaultValue={"Change Password"}
      data={[
        {
          value: "Change Password",
          label: "Change Password",
          component: <ChangePassword />,
        },
        {
          value: "Change Email",
          label: "Change Email",
          component: <ChangeEmail />,
        },
      ]}
    />
  );
};
