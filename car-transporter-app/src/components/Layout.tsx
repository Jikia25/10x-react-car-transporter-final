import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      {/* Header / Navigation */}
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-lg font-bold">Transport App</h1>
        <nav className="flex gap-4">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="p-6">
        <Outlet /> 
        {/* აქ ავტომატურად ჩაიტვირთება child გვერდები */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        © {new Date().getFullYear()} Transport App. All rights reserved.
      </footer>
    </div>
  );
}
