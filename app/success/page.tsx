export default function Success() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 
      </h1>
      <p className="text-gray-500 mt-2">
        Thanks for your order
      </p>
    </div>
  );
}