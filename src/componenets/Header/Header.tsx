import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative flex flex-row items-center justify-between px-4 py-4 border-b-4 bg-[#09112b] border-yellow-700">
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden transition-transform duration-300"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <span className="text-white"><FontAwesomeIcon icon={faXmark} /></span> : <span className="text-white"><FontAwesomeIcon icon={faBars} /></span>}
      </button>

      <nav
        aria-hidden={!isMenuOpen}
        className={`absolute top-16 left-0 w-full shadow-lg transform transition-all duration-500 ease-in-out z-10 bg-[#fff] md:bg-[#09112b] md:relative md:flex md:flex-row md:shadow-none md:top-0 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } md:max-h-full md:opacity-100 md:visible md:flex md:items-center`}
      >
        <NavLink
          to="/home"
          className="block py-4 px-6 border-b text-lg text-yellow-700 hover:bg-yellow-700 hover:text-white md:text-white md:border-0 md:hover:text-yellow-700 md:hover:bg-transparent"
        >
          Home
        </NavLink>
        <NavLink
          to="/training"
          className="block py-4 px-6 border-b text-lg text-yellow-700 hover:bg-yellow-700 hover:text-white md:text-white md:border-0 md:hover:text-yellow-700 md:hover:bg-transparent"
        >
          Training
        </NavLink>
        <NavLink to="/users" className="block py-4 px-6 border-b text-lg text-yellow-700 hover:bg-yellow-700 hover:text-white md:text-white md:border-0 md:hover:text-yellow-700 md:hover:bg-transparent">
          Users
        </NavLink>
        <NavLink to="/contact" className="block py-4 px-6 border-b text-lg text-yellow-700 hover:bg-yellow-700 hover:text-white md:text-white md:border-0 md:hover:text-yellow-700 md:hover:bg-transparent">
          Contact Us
        </NavLink>
      </nav>

      <Menu as="div" className="relative inline-block text-left">
        <MenuButton>
          <div
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2"
            id="menu-button"
          >
            <img
              src={user?.image}
              alt="User"
              className="w-9 h-9 mr-2 border object-cover rounded-lg hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500"

            />
          </div>
        </MenuButton>

        <MenuItems
          className="absolute right-4 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition "
          aria-labelledby="menu-button"
        >
          <MenuItem as="div">
            <NavLink
              to="/admin"
              className="block px-4 py-2 text-base rounded w-full text-yellow-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none hover:bg-yellow-700 hover:text-white"
            >
              View
            </NavLink>
          </MenuItem>
          <MenuItem>
            <button
              onClick={logOut}
              className="text-red-500 px-4 py-2 text-base rounded w-full text-left hover:bg-red-500 hover:text-white"
            >
              Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </header>
  );
};

export default Header;
