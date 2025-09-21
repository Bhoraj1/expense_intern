export default function Spinner({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="w-16 h-16 rounded-full border-5 border-b-transparent  border-secondary-yellow animate-spin"></div>
    </div>
  );
}
