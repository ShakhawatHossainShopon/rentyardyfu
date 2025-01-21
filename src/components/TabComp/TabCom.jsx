import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
export const TabCom = ({ data, defaultValue }) => {
  return (
    <Tabs
      id="custom-animation"
      value={defaultValue}
      className={"overflow-visible"}
    >
      <TabsHeader className="">
        {data.map(({ label, value }) => (
          <Tab className="z-0" key={value} value={value}>
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
        className="overflow-visible border border-blue-500 bg-white dark:border-dark-primary"
      >
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value}>
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
