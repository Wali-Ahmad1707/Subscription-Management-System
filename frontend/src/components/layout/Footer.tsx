function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#080d1a] px-6 py-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">
            Subscript<span className="text-blue-500">Flow</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Simplifying subscription management.
          </p>
        </div>

        <p className="text-sm text-gray-500">
          © 2026 SubscriptFlow. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer