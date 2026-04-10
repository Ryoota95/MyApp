export default function RightPanel() {
  return (
    <div className="w-80 p-4">
      <div className="bg-gray-900 p-4 rounded-xl">
        <p className="font-bold mb-2">My Profile</p>

        <div className="bg-gradient-to-r from-green-400 to-yellow-300 h-16 rounded-lg mb-3"></div>

        <p className="font-semibold">Stella Audhina ✨</p>
        <p className="text-sm text-gray-400">
          picked over by the worms...
        </p>

        <button className="mt-3 border border-gray-700 px-3 py-1 rounded-full text-sm">
          Edit Profile
        </button>
      </div>
    </div>
  );
}