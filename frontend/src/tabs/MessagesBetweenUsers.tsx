import React, { useState, useEffect, FormEvent } from "react";
import axios from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setMessagesBetween } from "../redux/appState";
import MessagesList from "../components/MessagesList";
import { Message } from "../utils/types";

interface MessagesBetweenUsersProps {}

const MessagesBetweenUsers: React.FC<MessagesBetweenUsersProps> = () => {
  const dispatch = useDispatch();

  const [user1, setUser1] = useState<number | "">("");
  const [user2, setUser2] = useState<number | "">("");

  const fetchMessages = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post<Message[]>("/messages/between", {
        user1,
        user2,
      });
      dispatch(setMessagesBetween(result.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => () => dispatch(setMessagesBetween([])), [dispatch]);

  return (
    <>
      <form
        onSubmit={fetchMessages}
        className="max-w-xs mx-auto my-8 grid grid-cols-1 mt-4"
      >
        <label className="label mb-2">
          <span className="label-text">Insert User Ids:</span>
        </label>
        <div className="form-control grid grid-cols-2 gap-2 items-center">
          <input
            required
            type="number"
            min={1}
            placeholder="User 1"
            className="input input-bordered col-span-1 input-primary"
            value={user1}
            onChange={(e) => setUser1(parseInt(e.target.value))}
          />
          <input
            required
            type="number"
            min={1}
            placeholder="User 2"
            className="input input-bordered col-span-1 input-primary"
            value={user2}
            onChange={(e) => setUser2(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <MessagesList />
    </>
  );
};

export default MessagesBetweenUsers;
