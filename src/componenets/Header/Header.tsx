import { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative flex flex-row items-center justify-between px-4 py-4 border-b-4 border-indigo-500">
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden transition-transform duration-300"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <nav
        aria-hidden={!isMenuOpen}
        className={`absolute top-16 left-0 w-full bg-white shadow-lg transform transition-all duration-500 ease-in-out md:relative md:flex md:flex-row md:shadow-none md:top-0 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } md:max-h-full md:opacity-100 md:visible md:flex md:items-center`}
      >
        <NavLink
          to="/home"
          className="block py-4 px-6 border-b md:border-0 hover:bg-gray-100"
        >
          Home
        </NavLink>
        <NavLink
          to="/training"
          className="block py-4 px-6 border-b md:border-0 hover:bg-gray-100"
        >
          Training
        </NavLink>
        <NavLink to="/users" className="block py-4 px-6 hover:bg-gray-100">
          Users
        </NavLink>
        <NavLink to="/contact" className="block py-4 px-6 hover:bg-gray-100">
          Contact Us
        </NavLink>
      </nav>

      <Menu as="div" className="relative inline-block text-left">
        <MenuButton>
          <div
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2"
            id="menu-button"
          >
            <img
              src={user?.image}
              alt="User"
              className="w-9 h-9 mr-2 border object-cover rounded-lg"
            />
          </div>
        </MenuButton>

        <MenuItems
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          aria-labelledby="menu-button"
        >
          <MenuItem as="div">
            <NavLink
              to="/admin"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none hover:bg-gray-200"
            >
              View
            </NavLink>
          </MenuItem>
          <MenuItem>
            <button
              onClick={logOut}
              className="text-red-500 px-4 py-2 rounded w-full text-left hover:bg-gray-200"
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
