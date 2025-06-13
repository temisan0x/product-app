export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-lg text-gray-600">{message}</span>
    </div>
  )
}