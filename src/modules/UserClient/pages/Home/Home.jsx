import {
  useAppDispatch,
  useGetPropertyPublicViewSelector,
  useScrollToTop,
} from "@/hooks";
import { getPropertyPublicView } from "@/services/property/property";
import { useEffect } from "react";
import {
  BlogSection,
  CardSection,
  Hero,
  MobileCard,
  PropertyOwnerBanner,
  RenterBanner,
} from "./sections";
const Home = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const { loading, data } = useGetPropertyPublicViewSelector();
  useEffect(() => {
    dispatch(
      getPropertyPublicView({
        query: "",
        bed: "",
        bath: "",
      })
    );
  }, [dispatch]);
  return (
    <>
      <Hero />
      <div className="max-w-[1440px] px-2 md:px-6 mx-auto">
        <div className="">
          <MobileCard />
          <CardSection
            loading={loading}
            data={data}
            title={"Popular Properties"}
          />
          <RenterBanner />
          <PropertyOwnerBanner />
          <BlogSection />
        </div>
      </div>
    </>
  );
};

export default Home;
