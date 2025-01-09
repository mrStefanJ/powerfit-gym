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
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden transition-transform duration-300"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Navigation Links */}
      <nav
        className={`absolute top-16 left-0 w-full bg-white shadow-lg transform transition-all duration-500 ease-in-out md:relative md:flex md:flex-row md:shadow-none md:top-0 ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } md:max-h-full md:opacity-100 md:visible md:flex md:items-center`}
        aria-hidden={!isMenuOpen}
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

      {/* User Profile and Log Out */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton>
            <button
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <img
                src={user?.image}
                alt="User"
                className="w-9 h-9 mr-2 rounded-full border"
              />
            </button>
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <NavLink
                to="/admin"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                View
              </NavLink>
            </MenuItem>
          </div>
          <div className="py-1">
            <MenuItem>
              <button
                onClick={logOut}
                className="text-red-500 px-4 py-2 rounded"
              >
                Log Out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </header>
  );
};

export default Header;
