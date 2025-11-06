import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="p-5">
      <div className="flex gap-10 items-center">
        <Searchbar />
        <Link 
        className="p-2 bg-stone-800 rounded-full"
        to="/profile/iliesse_ns">
          <FaUser className="text-xl cursor-pointer hover:text-blue-700 transition-colors" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
