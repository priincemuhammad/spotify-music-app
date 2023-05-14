import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

import { logoFull } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-green-400"
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col justify-start w-[240px] py-10 px-4 bg-[#161616]">
        <img src={logoFull} alt="logo" className="w-full " />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-10 h-10 text-white mr-2 cursor-pointer"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          />
        ) : (
          <HiOutlineMenu
            className="w-10 h-10 text-white mr-2 cursor-pointer"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-80 bg-black z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src={logoFull}
          alt="logo"
          className="max-w-2xl h-14 object-contain"
        />
        <NavLinks
          handleClick={() => {
            setMobileMenuOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default Sidebar;
