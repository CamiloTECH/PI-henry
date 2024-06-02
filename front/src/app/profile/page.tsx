import React from "react";

import ProfileUser from "@/components/Profile";

const Profile: React.FC = () => {
  return (
    <div className="px-8 bg-gray-100 flex flex-col items-center min-h-96 py-14">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto">
          <svg
            className="w-24 h-24 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <ProfileUser />
      </div>
    </div>
  );
};

export default Profile;
