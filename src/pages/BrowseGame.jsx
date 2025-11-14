import React from 'react'

export default function BrowseGame() {
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Browse Games
        </h1>

        <div className="flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by sport or city..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white">
            <option value="">All Sports</option>
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
            <option value="badminton">Badminton</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white">
            <option value="">Any Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="full">Full</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}


