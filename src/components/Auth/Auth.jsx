import { setTabValue } from "@/features/auth/changeTabSlice/changeTabSlice";
import { useAppDispatch, useChangeTabSelector } from "@/hooks";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { Login } from "./Login/Login";
import { Signup } from "./Signup/Signup";

export function Auth({ closeSignUpPopUp }) {
  const dispatch = useAppDispatch();
  const { tabValue } = useChangeTabSelector();
  const data = [
    {
      label: "Login",
      value: "login",
      component: <Login />,
    },
    {
      label: "Signup",
      value: "signup",
      component: <Signup closeSignUpPopUp={closeSignUpPopUp} />,
    },
  ];

  return (
    <Tabs
      id="custom-animation"
      value={tabValue}
      key={tabValue}
      className={"pb-8"}
    >
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => dispatch(setTabValue(value))} // This updates the tabValue in Redux
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value} className="dark:bg-dark-light">
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
