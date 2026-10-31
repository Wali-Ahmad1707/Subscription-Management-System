function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <h1 className="text-2xl font-bold text-white">
        Subscript<span className="text-blue-500">Flow</span>
      </h1>

      <div className="hidden gap-8 text-sm text-gray-300 md:flex">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#about" className="hover:text-white">About</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </div>

      <div className="flex gap-3">
        <button className="rounded-lg px-4 py-2 text-white hover:bg-white/10">
          Login
        </button>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar