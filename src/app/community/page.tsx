// src/app/community/page.tsx
export default function CommunityPage() {
    return (
      <div className="h-full p-4">
        <h2 className="text-xl font-semibold mb-4">Community</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="ml-3">
                  <h3 className="font-medium">User Name</h3>
                  <p className="text-gray-600 text-sm">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800">Shared a new accessible route...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }