import { AdminHeader } from "@/components";
import {
  useAppDispatch,
  useGetActiveSubsSelector,
  useGetSubsPricingSelector,
  useScrollToTop,
} from "@/hooks";
import { getActiveSubs } from "@/services/subscription/subscription";
import { useEffect } from "react";
import { CheckPricingForm, SubscriptionCard } from "./components";

const Subscription = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetSubsPricingSelector();
  const activeSubs = useGetActiveSubsSelector();

  useEffect(() => {
    dispatch(getActiveSubs());
  }, []);

  return (
    <div className="w-full">
      <AdminHeader title={"Subscription"} />
      <div className="w-full md:p-4 p-2 md:space-y-10 space-y-8">
        <div className="lg:grid lg:grid-cols-3 w-full space-y-5 lg:space-y-0 gap-6">
          {activeSubs &&
            activeSubs.data &&
            activeSubs.data.map((item) => {
              return <SubscriptionCard active={true} data={item} />;
            })}
        </div>
        <CheckPricingForm />
        <div className="sm:grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:space-y-0 space-y-8">
          {!loading && Object.keys(data).length > 0 && (
            <SubscriptionCard active={false} data={data && data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
