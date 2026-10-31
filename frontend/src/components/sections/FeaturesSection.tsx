const features = [
  {
    number: "01",
    title: "Subscription Management",
    description:
      "Create, manage, renew, pause and close subscriptions from one place.",
    icon: "📦",
  },
  {
    number: "02",
    title: "Automated Billing",
    description:
      "Generate invoices automatically according to subscription billing cycles.",
    icon: "⚡",
  },
  {
    number: "03",
    title: "Invoice Management",
    description:
      "Track draft, confirmed, paid and overdue invoices easily.",
    icon: "🧾",
  },
  {
    number: "04",
    title: "Payment Tracking",
    description:
      "Monitor payments, outstanding balances and overdue transactions.",
    icon: "💳",
  },
  {
    number: "05",
    title: "Smart Discounts",
    description:
      "Apply fixed or percentage-based discounts using configurable rules.",
    icon: "🎯",
  },
  {
    number: "06",
    title: "Analytics Dashboard",
    description:
      "Understand revenue, active subscriptions and business performance.",
    icon: "📊",
  },
]

function FeaturesSection() {
  return (
    <section id="features" className="bg-[#0c1425] px-6 py-24">
      <div className="mx-auto max-w-6xl">

        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Platform Features
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            Everything You Need to
            <span className="text-blue-500"> Manage Subscriptions</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            One centralized platform to manage subscriptions, billing,
            invoices, payments and reporting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/50"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-3xl">{feature.icon}</span>
                <span className="text-sm text-gray-500">
                  {feature.number}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturesSection