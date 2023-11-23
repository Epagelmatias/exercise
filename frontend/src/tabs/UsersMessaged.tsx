import React, { useState, useEffect, FormEvent } from "react";
import axios from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUsersMessaged } from "../redux/appState";
import UsersMessagedList from "../components/UsersMessagedList";
import { User } from "../utils/types";

interface MessagesBetweenUsersProps {}

const MessagesBetweenUsers: React.FC<MessagesBetweenUsersProps> = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<number | "">("");

  const fetchUsersMessaged = async (event: FormEvent) => {
    // todo: data validation

    event.preventDefault();
    try {
      const result = await axios.get<User[]>("/users/messaged-with/" + userId);
      dispatch(setUsersMessaged(result.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => () => dispatch(setUsersMessaged([])), [dispatch]);

  return (
    <>
      <form
        onSubmit={fetchUsersMessaged}
        className="max-w-xs mx-auto my-8 grid grid-cols-1 mt-4"
      >
        <label className="label mb-2">
          <span className="label-text">Insert User Id:</span>
        </label>
        <div className="form-control grid grid-cols-1 gap-2 items-center">
          <input
            required
            type="number"
            min={1}
            placeholder="User Id"
            className="input input-bordered col-span-1 input-primary"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <UsersMessagedList />
    </>
  );
};

export default MessagesBetweenUsers;
