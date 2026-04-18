
export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-gray-500 animate-pulse">
          Loading products...
        </p>

      </div>
    </div>
  );
}