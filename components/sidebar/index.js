import React, { useRef, useState } from "react";
import { BiCode } from "react-icons/bi";
import { FaGlobeAfrica, FaUsersCog } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import {
  MdDashboard,
  MdOutlineKeyboardArrowRight,
  MdOutlinePayments,
} from "react-icons/md";
import { RiGitPullRequestLine } from "react-icons/ri";
import { useRouter } from "next/router";

const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: () => <MdDashboard />,
    routing: "/dashboard",
  },
  {
    id: 2,
    name: "Request",
    icon: () => <RiGitPullRequestLine />,
    items: [
      { name: "Request Infra", routing: "/req-infra" },
      { name: "List Infra", routing: "/list-request" },
    ],
  },
  {
    id: 3,
    name: "Services",
    icon: () => <BiCode />,
    items: [{ name: "Compute", routing: "/compute" }],
  },
  {
    id: 4,
    name: "Monitoring",
    icon: () => <FiMonitor />,
    items: [{ name: "Manage", routing: "/monitoring" }],
  },
  {
    id: 5,
    name: "Billings",
    icon: () => <MdOutlinePayments />,
    items: [
      { name: "Billing", routing: "/billing" },
      { name: "History", routing: "/topup-history" },
    ],
  },
  {
    id: 6,
    name: "Reverse Proxy",
    icon: () => <FaGlobeAfrica />,
    items: [{ name: "Domain", routing: "/waf" }],
  },
  {
    id: 7,
    name: "Manage User",
    icon: () => <FaUsersCog />,
    routing: "/manage",
  },
];

const Icon = ({ icon, isActive }) => (
  <span className={`material-symbols-outlined ${isActive && "text-white"}`}>
    {icon}
  </span>
);

const NavHeader = () => (
  <header className="sidebar-header shadow-sm">
    <button className=""></button>
    <span className="font-semibold tracking-tighter">Seterah</span>
  </header>
);

const NavButton = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
  router,
  routing,
}) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          onClick(name);
          routing && router.push(routing);
        }}
        className={`${isActive ? "active " : ""}`}
      >
        {icon && <Icon icon={icon} isActive={isActive} />}
        <span>{name}</span>
        {hasSubNav && (
          <MdOutlineKeyboardArrowRight
            className={`${
              isActive
                ? "rotate-90 duration-300 text-white"
                : "rotate-0 duration-300"
            }`}
          />
        )}
      </button>
      {isActive ? (
        <div className="absolute h-full w-1 top-0 -right-4 rounded-tl-md rounded-bl-md bg-black" />
      ) : (
        <></>
      )}
    </div>
  );
};

const SubMenu = ({ item, activeItem, handleClick, router }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) => {
    return items.some((i) => i.name === activeItem) || item === activeItem;
  };

  return (
    <div
      className={`sub-nav `}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem) => (
          <NavButton
            router={router}
            routing={subItem.routing}
            onClick={handleClick}
            name={subItem.name}
            isActive={activeItem === subItem.name}
          />
        ))}
      </div>
    </div>
  );
};

const NewSidebar = () => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <div className="relative font-poppins">
      <aside className="sidebar flex flex-col gap-2">
        <NavHeader />
        <div className="px-4">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              {!item.items && (
                <NavButton
                  onClick={handleClick}
                  name={item.name}
                  icon={item.icon()}
                  isActive={activeItem === item.name}
                  hasSubNav={!!item.items}
                  router={router}
                  routing={item.routing}
                />
              )}
              {item.items && (
                <>
                  <NavButton
                    onClick={handleClick}
                    name={item.name}
                    icon={item.icon()}
                    isActive={activeItem === item.name}
                    hasSubNav={!!item.items}
                  />
                  <SubMenu
                    activeItem={activeItem}
                    handleClick={handleClick}
                    item={item}
                    router={router}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default NewSidebar;
