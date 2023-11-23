import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { RootState } from "../redux/store";
import { User } from "../utils/types";

const UsersMessagedList: React.FC = () => {
  const { usersMessaged }: { usersMessaged: User[] } = useSelector(
    (state: RootState) => state.appState
  );

  return usersMessaged.length ? <UserCard users={usersMessaged} /> : <></>;
};

export default UsersMessagedList;
