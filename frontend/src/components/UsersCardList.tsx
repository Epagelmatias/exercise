import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { RootState } from "../redux/store";
import { User } from "../utils/types";

const UsersCardList: React.FC = () => {
  const { users }: { users: User[] } = useSelector(
    (state: RootState) => state.appState
  );

  return users.length ? <UserCard users={users} /> : <></>;
};

export default UsersCardList;
