import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-br from-orange-300 via-ornge to-orange-100 shadow-lg flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 text-2xl font-bold text-orange-600 border-b border-orange-300">
          Shiv Vihar Admin
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          <Link to="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            📊 Dashboard
          </Link>
          <Link to="/dashboard/members" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            👥 Members
          </Link>
          <Link to="/events" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            🎉 Event
          </Link>
          <Link to="/dashboard/profile" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            🙍‍♂️ Profile
          </Link>
          <Link to="/dashboard/settings" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            ⚙️ Settings
          </Link>
          <Link to="/dashboard/about" className="block px-4 py-2 rounded-lg hover:bg-orange-200">
            ℹ️ About
          </Link>
        </nav>
        

        {/* Logout Bottom */}
        <div className="p-4 border-t border-orange-300">
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg bg-red-500 text-white text-center font-semibold hover:bg-red-600"
          >
            🚪 Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="ml-64 p-6">
        {/* Your main dashboard content goes here */}
      </div>
    </>
  );
}
