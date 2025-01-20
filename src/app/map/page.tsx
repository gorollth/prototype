// src/app/map/page.tsx
export default function MapPage() {
    return (
      <div className="h-full bg-gray-100 p-4">
        <div className="bg-white rounded-lg p-4 shadow mb-4">
          <input
            type="text"
            placeholder="Search for accessible places..."
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="bg-gray-200 h-4/5 rounded-lg flex items-center justify-center">
          <span className="text-gray-600">Map View</span>
        </div>
        <button className="fixed bottom-20 right-4 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg">
          SOS
        </button>
      </div>
    );
  }
  