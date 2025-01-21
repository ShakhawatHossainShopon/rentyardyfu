import {
  useAppDispatch,
  useGetApplicationFeeSelector,
  useGetPropertyByIdPublicViewSelector,
  useGetUserSelector,
  useScrollToTop,
} from "@/hooks";
import { getApplicationFee } from "@/services/applicationFee/applicationFee";
import { getPropertyByIdPublicView } from "@/services/property/property";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  About,
  Amenities,
  FloorPlan,
  Hero,
  Map,
  Navigator,
  PetPolicy,
  Reviews,
  Schools,
  Title,
  TransportationSystem,
} from "./sections";
const ProjectDetails = () => {
  useScrollToTop();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { loading, data } = useGetPropertyByIdPublicViewSelector();
  const fee = useGetApplicationFeeSelector();
  const user = useGetUserSelector();

  useEffect(() => {
    dispatch(getPropertyByIdPublicView(params.id));
    if (data.propertyId) {
      dispatch(getApplicationFee(data.propertyId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data.propertyId) {
      dispatch(getApplicationFee(data.propertyId));
    }
  }, [data]);

  const {
    about_property,
    address,
    arial_videos,
    apartments,
    city,
    community_amenities,
    contact_email,
    contact_number,
    country,
    cover_image,
    custom_policy,
    document,
    guest_parking,
    late_fee,
    lease_term,
    listing_image,
    manager_name,
    name,
    onetime_monthly,
    parking,
    payment,
    pet_policy,
    propertyId,
    property_images,
    property_videos,
    published,
    reviews,
    rating,
    schools,
    state,
    statement,
    tour_videos,
    transportation,
    unit,
    userId,
    utilities,
    website,
    zip,
    office_working_days,
    tour_accept_hours,
    working_hours,
  } = data;
  if (loading || Object.keys(data).length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-[90vh] max-w-[1440px]">
        <ClipLoader size={100} color="blue" />
      </div>
    );
  } else if (
    !loading ||
    Object.keys(data).length > 0 ||
    params.id === propertyId
  ) {
    return (
      <div className="flex justify-center items-center pb-10">
        <div className="max-w-[1440px] w-full">
          <Hero
            cover_image={cover_image}
            property_images={property_images}
            property_videos={property_videos}
            tour_videos={tour_videos}
            arial_videos={arial_videos}
          />
          <Title
            name={name}
            address={address}
            contact_email={contact_email}
            city={city}
            state={state}
            country={country}
            contact_number={contact_number}
            website={website}
            rating={rating}
            zip={zip}
          />
          <hr className="border-black my-2 dark:border-gray-300" />
          <Navigator />
          <div className="">
            <FloorPlan
              fee={fee}
              apartments={apartments ? apartments : []}
              name={name}
              location={address}
              city={city}
              state={state}
              country={country}
              rating={rating}
              office_working_days={office_working_days}
              tour_accept_hours={tour_accept_hours}
              working_hours={working_hours}
              document={document}
              zip={zip}
            />
            <Amenities community_amenities={community_amenities} />
            <Schools schools={schools} />
            <PetPolicy pet_policy={pet_policy} parking={parking} />
            <TransportationSystem transportation={transportation} />
            <Map location={`${address}, ${city}, ${state}, ${zip}`} />
            <About
              about_property={about_property}
              unit={unit}
              manager_name={manager_name}
            />
            <Reviews
              rating={rating}
              propertyId={propertyId}
              reviews={reviews}
              user={user}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectDetails;
