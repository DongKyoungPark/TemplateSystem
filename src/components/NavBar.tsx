import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                Template System
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Template
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
