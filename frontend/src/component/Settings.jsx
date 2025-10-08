export default function Settings() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-300 via-ornge to-orange-100 text-gray-900 p-6">
      <div className="w-full max-w-2xl bg-orange-100 shadow-lg rounded-2xl p-6 border border-orange-200">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          ⚙️ Settings
        </h1>

        {/* Colony Info */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-orange-600 mb-4">
            🏘 About Colony
          </h2>
          <p className="mb-2">
            <strong>Colony Name:</strong> Shiv Vihar
          </p>
          <p className="mb-2">
            <strong>president:</strong> Aditya Kumawat
          </p>
          <p className="mb-2">
            <strong>Established:</strong> 2025
          </p>
          <p className="mb-2">
            <strong>Location:</strong> Jaipur, Rajasthan
          </p>
          <p className="mb-2">
            <strong>Population:</strong> 10,000
          </p>
          <p className="mb-2">
            <strong>Contact:</strong> 9358252866
          </p>
        </div>
      </div>
    </div>
  );
}
