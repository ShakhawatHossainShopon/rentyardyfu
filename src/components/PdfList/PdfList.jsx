import { config } from "@/config";
import { useAppDispatch } from "@/hooks";

export const PdfList = ({ data, loading }) => {
  const dispatch = useAppDispatch();
  const filteredPdf = data.filter((pdf) => pdf.type === "pdf");
  return (
    <div className="space-y-3">
      <h2 className="font-medium">Pdf List</h2>
      <ul
        className={`max-h-[150px] overflow-y-scroll no-scrollbar flex flex-col justify-start list-disc pl-5 ${
          filteredPdf.length > 0 ? "items-start" : "items-center"
        } `}
      >
        {!loading && filteredPdf.length > 0 ? (
          filteredPdf.map((item) => (
            <li className="" key={item.assetId}>
              <a
                className="text-blue-500 underline underline-offset-2"
                href={`${config.url.ASSET_URL}${item.link}`}
                target="_blank"
              >
                {item.filename}
              </a>
            </li>
          ))
        ) : (
          <div className="w-full text-center">
            <p className="">No Pdf found...</p>
          </div>
        )}
      </ul>
    </div>
  );
};
