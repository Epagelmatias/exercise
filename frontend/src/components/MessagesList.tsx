import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { formatDate } from "../utils/helpers";
import { Message } from "../utils/types";

const MessagesList = (): JSX.Element => {
  const { messagesBetween } = useSelector((state: RootState) => state.appState);

  if (!messagesBetween.length) {
    return <></>;
  }

  const colouredUser: number = messagesBetween[0].sender;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-md shadow-md max-w-sm mx-auto">
        {messagesBetween.map((message: Message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === colouredUser
                ? "bg-blue-200 ml-auto"
                : "bg-gray-200 mr-auto"
            } p-3 rounded-md flex flex-col relative`}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-700">{message.content}</p>
              {message.seen && (
                <div className="flex items-center text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Seen
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {`User ${message.sender}`} - {formatDate(message.timestampSent)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
