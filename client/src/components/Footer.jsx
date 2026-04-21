export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div>
          <h2 className="text-xl font-bold text-indigo-400">📚 BookStore</h2>
          <p className="mt-3 text-sm text-slate-400">
            A modern online bookstore built with React, Node.js, and MySQL.
            Discover, read, and order your favorite books easily.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">Home</li>
            <li className="hover:text-indigo-400 cursor-pointer">Books</li>
            <li className="hover:text-indigo-400 cursor-pointer">Cart</li>
            <li className="hover:text-indigo-400 cursor-pointer">My Orders</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm text-slate-400">Email: support@bookstore.com</p>
          <p className="text-sm text-slate-400">Phone: +880 123 456 789</p>
          <p className="text-sm text-slate-400">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}
