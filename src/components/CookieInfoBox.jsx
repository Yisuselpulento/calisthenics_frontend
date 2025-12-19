import { useEffect, useState } from "react";

const CookieInfoBox = () => {
  const [cookieInfo, setCookieInfo] = useState(null);

  useEffect(() => {
    const fetchCookieInfo = async () => {
      try {
        const res = await axiosInstance.get("/check-cookie"); // tu endpoint en backend
        setCookieInfo(res.data);
      } catch (err) {
        setCookieInfo({ error: "No se pudo obtener info de cookie" });
      }
    };
    fetchCookieInfo();
  }, []);

  return (
    <div className="fixed bottom-16 left-2 border border-gray-300 p-3 rounded-lg z-50 text-xs max-w-xs shadow-md">
      <strong className="block mb-1">Cookie Info:</strong>
      <pre className="whitespace-pre-wrap break-words">{JSON.stringify(cookieInfo, null, 2)}</pre>
    </div>
  );
};

export default CookieInfoBox;
