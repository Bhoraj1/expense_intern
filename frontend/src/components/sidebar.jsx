import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiUsers,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
const baseUrl = import.meta.env.VITE_API_IMG_URL;
const Sidebar = ({ isMinimized, setIsMinimized }) => {
  const { generalInfo, user } = useSelector((state) => state.authState);

  const [expandedItems, setExpandedItems] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: FiHome,
      link: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transaction ",
      icon: FaExchangeAlt,
      link: "/transaction-management",
    },
    ...(user?.role === 'admin' ? [{
      id: "users",
      label: "Users",
      icon: FiUsers,
      link: "/users",
    }] : []),
    {
      id: "profile",
      label: "Profile",
      link: "/profile",
      icon: FiUsers,
    },
  ];

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block bg-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 z-40 overflow-y-auto pb-7 ${
          isMinimized ? "w-18" : "w-64"
        }`}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isMinimized && (
              <h1 className="font-bold text-xl">Expense Tracker</h1>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.link ? (
                // Single item with direct link
                <Link
                  to={item.link}
                  className={`w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                    isActiveLink(item.link) ? "bg-gray-700" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 text-white" />
                  {!isMinimized && <span className="ml-3">{item.label}</span>}
                </Link>
              ) : (
                // Item with submenu
                <>
                  <button
                    onClick={() => {
                      if (expandedItems.includes(item.id)) {
                        setExpandedItems(
                          expandedItems.filter((id) => id !== item.id)
                        );
                      } else {
                        setExpandedItems([...expandedItems, item.id]);
                      }
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 flex-shrink-0 text-white" />
                      {!isMinimized && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </div>
                    {item.subItems &&
                      !isMinimized &&
                      (expandedItems.includes(item.id) ? (
                        <FiChevronUp className="h-4 w-4" />
                      ) : (
                        <FiChevronDown className="h-4 w-4" />
                      ))}
                  </button>

                  {item.subItems &&
                    !isMinimized &&
                    expandedItems.includes(item.id) && (
                      <div className="bg-gray-900">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.link}
                            className={`w-full ml-7 flex items-center px-8 py-2 hover:bg-gray-700 transition-colors ${
                              isActiveLink(subItem.link) ? "bg-gray-700" : ""
                            }`}
                          >
                            {subItem.icon && (
                              <subItem.icon className="h-4 w-4 flex-shrink-0" />
                            )}
                            <span
                              className={`text-sm ${
                                subItem.icon ? "ml-3" : ""
                              }`}
                            >
                              {subItem.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 "
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                {generalInfo?.logo && (
                  <img
                    src={`${baseUrl}/${generalInfo.logo}`}
                    alt={generalInfo.name || "OEC Consultancy"}
                    className="h-8 w-auto"
                  />
                )}
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-gray-700 rounded"
                >
                  <FiMenu className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="mt-4">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.link ? (
                    <Link
                      to={item.link}
                      onClick={() => setIsMobileOpen(false)}
                      className={`w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                        isActiveLink(item.link) ? "bg-gray-700" : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (expandedItems.includes(item.id)) {
                            setExpandedItems(
                              expandedItems.filter((id) => id !== item.id)
                            );
                          } else {
                            setExpandedItems([...expandedItems, item.id]);
                          }
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="ml-3">{item.label}</span>
                        </div>
                        {item.subItems &&
                          (expandedItems.includes(item.id) ? (
                            <FiChevronUp className="h-4 w-4" />
                          ) : (
                            <FiChevronDown className="h-4 w-4" />
                          ))}
                      </button>
                      {item.subItems && expandedItems.includes(item.id) && (
                        <div className="bg-gray-900">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.id}
                              to={subItem.link}
                              onClick={() => setIsMobileOpen(false)}
                              className={`w-full flex items-center px-8 py-2 hover:bg-gray-700 transition-colors ${
                                isActiveLink(subItem.link) ? "bg-gray-700" : ""
                              }`}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-4 w-4 flex-shrink-0" />
                              )}
                              <span
                                className={`text-sm ${
                                  subItem.icon ? "ml-3" : ""
                                }`}
                              >
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-40 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
      >
        <FiMenu className="h-6 w-6" />
      </button>
    </>
  );
};

export default Sidebar;
