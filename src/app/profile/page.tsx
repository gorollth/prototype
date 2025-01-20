export default function ProfilePage() {
    return (
      <div className="h-full p-4">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">User Name</h2>
              <p className="text-gray-600">Wheelchair Type: Manual</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 border rounded-lg text-left">
              Edit Profile
            </button>
            <button className="w-full py-2 px-4 border rounded-lg text-left">
              My Routes
            </button>
            <button className="w-full py-2 px-4 border rounded-lg text-left">
              Settings
            </button>
          </div>
        </div>
      </div>
    );
  }