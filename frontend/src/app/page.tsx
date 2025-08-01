export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="mb-6 animate-fade-in text-5xl font-bold sm:text-6xl lg:text-7xl">
            <span className="gradient-text">Arketic AI</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-secondary-600 sm:text-2xl">
            AI-Powered Compliance Platform for Modern Organizations
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-secondary-500">
            Your intelligent solution for compliance management, knowledge
            automation, and regulatory excellence.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="btn-primary rounded-xl px-8 py-3 text-lg">
              Get Started
            </button>
            <button className="btn-secondary rounded-xl px-8 py-3 text-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="glass card-hover rounded-2xl p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
              <div className="h-6 w-6 rounded bg-primary-500"></div>
            </div>
            <h3 className="mb-4 text-xl font-semibold">AI-Driven Insights</h3>
            <p className="text-secondary-600">
              Leverage advanced AI to automatically analyze compliance
              requirements and provide actionable insights.
            </p>
          </div>

          <div className="glass card-hover rounded-2xl p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100">
              <div className="h-6 w-6 rounded bg-accent-500"></div>
            </div>
            <h3 className="mb-4 text-xl font-semibold">Smart Automation</h3>
            <p className="text-secondary-600">
              Automate repetitive compliance tasks and streamline your
              regulatory workflows with intelligent automation.
            </p>
          </div>

          <div className="glass card-hover rounded-2xl p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-success-100">
              <div className="h-6 w-6 rounded bg-success-500"></div>
            </div>
            <h3 className="mb-4 text-xl font-semibold">Real-time Monitoring</h3>
            <p className="text-secondary-600">
              Monitor compliance status in real-time with comprehensive
              dashboards and intelligent alerting systems.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-secondary-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-secondary-500">
            <p>&copy; 2024 Arketic AI. Built with Next.js 15 and TypeScript.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
