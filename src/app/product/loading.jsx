export default function Loading() {
  const skeletons = Array.from({ length: 8 });
  return (
    <div className="mx-auto container text-white px-2 sm:px-4 md:px-0 pb-16 md:pb-24">
      <div className="h-6 w-40 bg-gray-700 rounded mb-4" />
      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
        <div className="bg-gray-800 px-3 sm:px-4 rounded-lg w-full md:w-1/4 lg:w-1/5 xl:w-1/5 md:h-[90vh] h-auto mb-6 md:mb-0">
          <div className="py-4 space-y-4">
            <div className="h-5 w-32 bg-gray-700 rounded" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-48 bg-gray-700 rounded" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-4/5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full items-stretch">
            {skeletons.map((_, idx) => (
              <div key={idx} className="bg-[#1E1E1E] rounded-lg p-4 shadow-lg flex flex-col h-full animate-pulse">
                <div className="rounded-md overflow-hidden aspect-square sm:aspect-[4/5] bg-gray-800" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-1/2" />
                </div>
                <div className="mt-auto flex flex-col md:flex-row gap-2 pt-3">
                  <div className="h-9 bg-gray-700 rounded w-full" />
                  <div className="h-9 bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
