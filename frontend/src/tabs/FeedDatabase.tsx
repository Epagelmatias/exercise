import React, { useState } from "react";
import axios from "../utils/axiosInstance";

interface FeedDatabaseProps {}

const FeedDatabase: React.FC<FeedDatabaseProps> = () => {
  const [fedMessage, setFedMessage] = useState<string>(
    "Click to feed the database, if not already fed."
  );

  const feedDb = async () => {
    try {
      setFedMessage("Attempting to feed");
      await axios.post("/feedDb");
      setFedMessage("Successfully fed");
    } catch (err) {
      console.error(err);
      setFedMessage("Probably already fed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md mt-4">
      <button className="btn btn-primary w-full mb-4" onClick={feedDb}>
        Feed
      </button>
      <h1 className="text-xl font-semibold text-center">{fedMessage}</h1>
    </div>
  );
};

export default FeedDatabase;
