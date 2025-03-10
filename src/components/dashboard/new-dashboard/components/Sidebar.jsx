// Sidebar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx';

const Sidebar = () => {
  const { setCategory, setTitle, sidebarColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-${sidebarColor}`;
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const handleLinkClick = (category, title) => {
    setCategory(category);
    setTitle(title);
  };

  return (
      <div className={`ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10`} style={{ backgroundColor: sidebarColor }}>
        {activeMenu && (
            <>
              <div className="flex justify-between items-center">
                <Link to="/" onClick={handleCloseSideBar}
                      className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                  <SiShopware/> <span>OptiTrade</span>
                </Link>
                <TooltipComponent content="Menu" position="BottomCenter">
                  <button
                      type="button"
                      onClick={() => setActiveMenu(!activeMenu)}
                      style={{color: sidebarColor}}
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
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
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? sidebarColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
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
