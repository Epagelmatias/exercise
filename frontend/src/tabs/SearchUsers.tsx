import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axiosInstance";
import { setUsers } from "../redux/appState";
import UsersCardList from "../components/UsersCardList";
import { User } from "../utils/types";

interface SearchUsersProps {}

const SearchUsers: React.FC<SearchUsersProps> = () => {
  const dispatch = useDispatch();

  const [gender, setGender] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<number | "">("");
  const [yearTo, setYearTo] = useState<number | "">("");

  const fetchUsers = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post<User[]>("/users/search", {
        ...(username && { username }),
        ...(gender && { gender }),
        ...(yearFrom !== "" && { yearFrom }),
        ...(yearTo !== "" && { yearTo }),
      });
      dispatch(setUsers(result.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => () => dispatch(setUsers([])), [dispatch]);

  return (
    <>
      <form
        onSubmit={fetchUsers}
        className="max-w-xs mx-auto my-8 grid grid-cols-1"
      >
        <label className="label">
          <span className="label-text">Gender:</span>
        </label>
        <select
          className="select select-primary mb-4"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>N/A</option>
        </select>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username:</span>
          </label>
          <input
            type="text"
            placeholder="Type a username here"
            className="input input-bordered w-full input-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label className="label mb-2">
          <span className="label-text">Birthdate between:</span>
        </label>
        <div className="form-control grid grid-cols-3 gap-2 items-center">
          <input
            type="number"
            min={1900}
            placeholder="From"
            className="input input-bordered col-span-1 input-primary"
            value={yearFrom}
            onChange={(e) => setYearFrom(parseInt(e.target.value))}
          />
          <span className="col-span-1 text-center">and</span>
          <input
            type="number"
            min={1900}
            placeholder="To"
            className="input input-bordered col-span-1 input-primary"
            value={yearTo}
            onChange={(e) => setYearTo(parseInt(e.target.value))}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <UsersCardList />
    </>
  );
};

export default SearchUsers;
