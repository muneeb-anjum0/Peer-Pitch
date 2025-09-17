import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} PeerPitch</div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <Link to="/trending" className="hover:text-gray-900">Trending</Link>
          <Link to="/new" className="hover:text-gray-900">Newest</Link>
          <Link to="/post" className="hover:text-gray-900">Post</Link>
        </nav>
      </div>
    </footer>
  );
}
