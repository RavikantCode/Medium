import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      {/* Brand Section */}
      <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
        Hacker Gang
      </Link>

      {/* Publish Button and Avatar Section */}
      <div className="flex items-center space-x-4">
        {/* Publish Button */}
        <Link to={'/publish'}>
        
        {/* <button
          type="button"
          className="text-white bg-green-500 hover:bg-green-800 focus:outline-none
            font-medium rounded-full 
          text-sm px-5 py-2.5 text-center"
        >
          Publish
        </button> */}
        </Link>

        {/* Avatar */}
        <div className="flex items-center space-x-2">
          <Avatar size={6} name="ravikant" />
        </div>
      </div>
    </div>
  );
};
