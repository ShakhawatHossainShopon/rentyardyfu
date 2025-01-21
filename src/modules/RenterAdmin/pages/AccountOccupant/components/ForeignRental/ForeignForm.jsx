import { Datepicker, FileUpload, Select } from "@/components";
import { useAppDispatch, useGetAllAssetSelector } from "@/hooks";
import { getAllAsset } from "@/services/asset/asset";
import { formatDate } from "@/utils";
import { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
export const ForeignForm = ({
  mapPreview,
  mapPreview2,
  setMapPreview,
  setMapPreview2,
  errors,
  touched,
  setFieldValue,
  values,
}) => {
  const dispatch = useAppDispatch();
  const { countries } = useCountries();
  const [isOpenUnitMap, setIsOpenUnitMap] = useState(false);
  const { loading, data } = useGetAllAssetSelector();
  useEffect(() => {
    dispatch(getAllAsset());
  }, [dispatch]);
  const countryOptions = countries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => {
      return { label: country.name, value: country.name };
    });
  const handleOpenUnitMap = () => {
    setIsOpenUnitMap(true);
  };
  const handleCloseUnitMap = () => {
    setIsOpenUnitMap(false);
  };
  return (
    <div className="space-y-5">
      <div className="w-full md:flex justify-center items-center md:space-x-6 space-y-5 md:space-y-0">
        <Select
          name={"destination_country"}
          required={"true"}
          label={
            values.living_country === "Planning for Abroad"
              ? "Destination Country for Rent"
              : "Residence Country"
          }
          options={[
            {
              label: "Select Country",
              value: "",
            },
            ...countryOptions,
          ]}
          className={"w-full px-2 py-2"}
          parentClassName={"w-full px-0 py-0"}
        />
        <Select
          name={"moving_reason"}
          required={true}
          label={"Moving Reason"}
          options={[
            {
              label: "Select Reason",
              value: "",
            },
            {
              label: "Work",
              value: "Work",
            },
            {
              label: "Study",
              value: "Study",
            },
            {
              label: "Immigration",
              value: "Immigration",
            },
          ]}
          className={"w-full px-2 py-2"}
          parentClassName={"w-full px-0 py-0"}
        />
        <Datepicker
          required={true}
          parentClassName={"w-full px-0 py-0 bg-gray-100"}
          label={
            values.living_country === "Planning for Abroad"
              ? "Estimated Arrival Date"
              : "Arrival Date"
          }
          name={"estimate_arrival_date"}
          className={"py-2 px-2 border w-full bg-white"}
          value={values.estimate_arrival_date}
          onChange={(e) => {
            const date = formatDate(e);
            setFieldValue("estimate_arrival_date", date);
          }}
          setFieldValue={setFieldValue}
          touched={touched.estimate_arrival_date}
          errors={errors.estimate_arrival_date}
          maxDate={new Date()}
        />
      </div>
      <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
        <FileUpload
          required={true}
          label={"Upload Passport Bio/Info Page"}
          placeholder={mapPreview ? "1 File Uploaded" : "Upload File"}
          name="passport_bio_page"
          data={data}
          loading={loading}
          touched={touched.passport_bio_page}
          errors={errors.passport_bio_page}
          id={"passport_bio_page"}
          accept={"image/jpeg, image/png, image/jpg, image/webp"}
          setPreview={setMapPreview}
          setFieldValue={setFieldValue}
          parentClassName={"w-fit"}
          className={"w-fit pr-5"}
        />
        {/* {mapPreview && (
          <div className="mt-4">
            <Button type="button" onClick={handleOpenUnitMap}>
              View All
            </Button>
          </div>
        )}
        {mapPreview && (
          <Modal
            title="Uploaded Unit Map"
            isOpen={isOpenUnitMap}
            onClose={handleCloseUnitMap}
            width="w-full"
            height="md:h-screen"
          >
            <div className="rounded-lg max-w-96 overflow-hidden border relative">
              <LazyLoadImage
                className="w-full rounded-lg object-cover"
                src={`${config.url.ASSET_URL}${mapPreview.link}`}
                alt={`Preview`}
                loading="lazy"
              />
              <button
                onClick={() => {
                  setMapPreview(null);
                  setFieldValue("unit_image", null);
                }}
                className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
              >
                <Icons.Close />
              </button>
            </div>
          </Modal>
        )} */}
      </div>
      <div className="md:flex justify-start items-end md:space-x-4 space-y-5 md:space-y-0">
        <FileUpload
          required={true}
          label={"Upload Study/Work/immigration Proof"}
          placeholder={mapPreview2 ? "1 File Uploaded" : "Upload File"}
          name="study_work_proof"
          data={data}
          loading={loading}
          touched={touched.study_work_proof}
          errors={errors.study_work_proof}
          id={"study_work_proof"}
          accept={"image/jpeg, image/png, image/jpg, image/webp"}
          setPreview={setMapPreview2}
          setFieldValue={setFieldValue}
          parentClassName={"w-fit"}
          className={"w-fit pr-5"}
        />
        {/* {mapPreview2 && (
          <div className="mt-4">
            <Button type="button" onClick={handleOpenUnitMap}>
              View All
            </Button>
          </div>
        )}
        {mapPreview2 && (
          <Modal
            title="Uploaded Unit Map"
            isOpen={isOpenUnitMap}
            onClose={handleCloseUnitMap}
            width="w-full"
            height="md:h-screen"
          >
            <div className="rounded-lg max-w-96 overflow-hidden border relative">
              <LazyLoadImage
                className="w-full rounded-lg object-cover"
                src={`${config.url.ASSET_URL}${mapPreview2.link}`}
                alt={`Preview`}
                loading="lazy"
              />
              <button
                onClick={() => {
                  setMapPreview(null);
                  setFieldValue("unit_image", null);
                }}
                className="absolute right-1 top-1 bg-white rounded-full p-1 text-black"
              >
                <Icons.Close />
              </button>
            </div>
          </Modal>
        )} */}
      </div>
    </div>
  );
};
