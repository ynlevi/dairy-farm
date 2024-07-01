export default function SubmitButton({ loading, error, children, className }) {
  return (
    <button
      className={`p-2 mt-2 capitalize ${
        loading ? "bg-zinc-400" : error ? "bg-red-500" : "bg-blue-500"
      } ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
}
