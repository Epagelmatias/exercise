import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import FeedDatabase from "./tabs/FeedDatabase";
import SearchUsers from "./tabs/SearchUsers";
import MessagesBetweenUsers from "./tabs/MessagesBetweenUsers";
import UsersMessaged from "./tabs/UsersMessaged";

interface Tab {
  to: string;
  role: string;
  className: (args: { isActive: boolean }) => string;
  title: string;
}

interface TabClassNamesArgs {
  isActive: boolean;
}

function App(): JSX.Element {
  const defaultTabClasses: string = " tab mr-4";

  const tabClassNames = ({ isActive }: TabClassNamesArgs): string =>
    isActive ? "tab-active" + defaultTabClasses : defaultTabClasses;

  const tabs: Tab[] = [
    {
      to: "/feed-database",
      role: "tab",
      className: tabClassNames,
      title: "Feed Database",
    },
    {
      to: "/search-users",
      role: "tab",
      className: tabClassNames,
      title: "Search Users",
    },
    {
      to: "/messages-between-users",
      role: "tab",
      className: tabClassNames,
      title: "Messages between users",
    },
    {
      to: "/users-messaged",
      role: "tab",
      className: tabClassNames,
      title: "Users Messaged",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl">
      <div role="tablist" className="tabs tabs-boxed mt-4">
        {tabs.map((tab: Tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            role={tab.role}
            className={tab.className}
          >
            {tab.title}
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route path="*" element={<Navigate to="/feed-database" replace />} />
        <Route path="/feed-database" element={<FeedDatabase />} />
        <Route path="/search-users" element={<SearchUsers />} />
        <Route
          path="/messages-between-users"
          element={<MessagesBetweenUsers />}
        />
        <Route path="/users-messaged" element={<UsersMessaged />} />
      </Routes>
    </div>
  );
}

export default App;
