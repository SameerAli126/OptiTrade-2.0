// src/components/dashboard/new-dashboard/components/Sidebar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Sidebar = () => {
  // Get sidebarColor specifically for styling this component
  const { setCategory, setTitle, sidebarColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // Revert link styles to remove dark: variants for text
  // Use a text color that works well with sidebarColor (e.g., white)
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2'; // Keep text white for active
  // Use fixed text colors, not dark variants. Choose appropriate default (e.g., gray-700 or maybe a lighter gray if sidebar is dark)
  // For simplicity, let's assume a light text color works generally, adjust if needed based on sidebarColor range
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-200 hover:text-white hover:bg-white/10 m-2'; // Example: Light text, subtle hover

  const handleLinkClick = (category, title) => {
    setCategory(category);
    setTitle(title);
  };

  return (
      // Apply sidebarColor using inline style for background
      // Remove Tailwind background classes (bg-white dark:bg-...)
      <div
          className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10"
          style={{ backgroundColor: sidebarColor }} // Apply sidebarColor directly
      >
        {activeMenu && (
            <>
              <div className="flex justify-between items-center">
                {/* Use fixed text color, remove dark: variant */}
                <Link to="/" onClick={handleCloseSideBar}
                      className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-white"> {/* Fixed text color */}
                  <SiShopware/> <span>OptiTrade</span>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                      type="button"
                      onClick={() => setActiveMenu(!activeMenu)}
                      // Use sidebarColor for the button icon color? Or a fixed contrast color? Let's use white for simplicity.
                      style={{ color: 'white' }}
                      className="text-xl rounded-full p-3 hover:bg-white/20 mt-4 block md:hidden" // Hover with transparency
                  >
                    <MdOutlineCancel/>
                  </button>
                </TooltipComponent>
              </div>
              <div className="mt-10">
                {links.map((link) => (
                    <NavLink
                        to={`/dashboard/${link.name}`}
                        key={link.name}
                        onClick={() => {
                          handleLinkClick(link.category, link.title);
                          handleCloseSideBar();
                        }}
                        // Apply active background color using inline style (e.g., slightly lighter/darker version of sidebarColor or white/black)
                        style={({ isActive }) => ({
                          // Example: subtle background change on active
                          backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {/* Ensure icons have a contrasting color if needed, default text color should apply */}
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                ))}
              </div>
            </>
        )}
      </div>
  );
};

export default Sidebar;