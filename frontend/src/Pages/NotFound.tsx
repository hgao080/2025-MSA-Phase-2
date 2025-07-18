export default function NotFound() {
  return (
    <div className="h-screen">
      <main className="place-items-center grid bg-white dark:bg-gray-900 px-6 lg:px-8 py-24 sm:py-32 min-h-full">
        <div className="text-center">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-base">404</p>
          <h1 className="mt-4 font-semibold text-gray-900 dark:text-gray-100 text-5xl sm:text-7xl text-balance tracking-tight">
            Page not found
          </h1>
          <p className="mt-6 font-medium text-gray-500 dark:text-gray-400 text-lg sm:text-xl/8 text-pretty">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex justify-center items-center gap-x-6 mt-10">
            <a
              href="/"
              className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 shadow-xs px-3.5 py-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400 focus-visible:outline-offset-2 font-semibold text-white text-sm"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
