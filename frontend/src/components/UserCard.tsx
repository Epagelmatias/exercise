import React from "react";
import { formatDate } from "../utils/helpers";
import { User } from "../utils/types";

interface UserCardProps {
  users: User[];
}

const UserCard: React.FC<UserCardProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user: User, index: number) => (
        <div
          key={index}
          className={`${
            user.gender === "Female"
              ? "bg-pink-100"
              : user.gender === "Male"
              ? "bg-cyan-100"
              : "bg-gray-100"
          } rounded-md shadow-md p-4`}
        >
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div>
            <strong>First Name:</strong> {user.firstname}
          </div>
          <div>
            <strong>Last Name:</strong> {user.lastname}
          </div>
          <div>
            <strong>Birthdate:</strong> {user.birthdate}
          </div>
          <div>
            <strong>Gender:</strong> {user.gender}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          {user.latestMessageExchanged && (
            <div>
              <strong>Latest message:</strong>{" "}
              {formatDate(user.latestMessageExchanged)}
            </div>
          )}
          <div>
            <strong>Id:</strong> {user.id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
