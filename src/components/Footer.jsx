import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/profile")) return null;

  return (
    <div className="flex items-end justify-center h-[120px] p-2 mb-12" >
      <p>Made by Monsster</p>
    </div>
  );
};

export default Footer;