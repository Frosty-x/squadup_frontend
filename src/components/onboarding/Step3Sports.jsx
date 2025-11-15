import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Trophy, ChevronRight, Edit3, Save } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"];

const POPULAR_SPORTS = [
  "Basketball",
  "Football",
  "Badminton",
  "Cricket",
  "Volleyball",
  "Table Tennis",
];

export default function Step3Sports() {
  const navigate = useNavigate();
  const { user, refreshUser ,updateProfile} = useContext(AuthContext);

  const [sports, setSports] = useState(user?.sports || []);
  const [newSportName, setNewSportName] = useState("");
  const [newSportSkill, setNewSportSkill] = useState("Beginner");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Add sport (either custom or from popular list)
  const handleAddSport = (sportName = newSportName) => {
    const trimmedName = sportName.trim();
    if (!trimmedName) return;

    if (
      sports.some((s) => s.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      setError("You already added this sport");
      return;
    }

    setSports([
      ...sports,
      {
        name: trimmedName,
        skillLevel: newSportSkill,
        averageRating: 0,
        totalRatings: 0,
        gamesPlayed: 0,
      },
    ]);

    setNewSportName("");
    setNewSportSkill("Beginner");
    setShowCustomInput(false);
    setError("");
  };

  const handleRemoveSport = (index) => {
    setSports(sports.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index, newLevel) => {
    const updated = [...sports];
    updated[index].skillLevel = newLevel;
    setSports(updated);
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const handleComplete = async () => {
    if (sports.length === 0) {
      setError("Please add at least one sport or skip this step");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateProfile( { sports });
      await refreshUser();
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Failed to update sports. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black mb-4">
          WHAT DO YOU <span className="text-red-600">PLAY?</span>
        </h1>
        <p className="text-gray-400 text-lg badscript">
          Add your sports and select your difficulty level
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Added Sports List */}
      {sports.length > 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="text-red-600" size={20} />
            Your Sports
          </h3>
          <div className="space-y-3">
            {sports.map((sport, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-black border border-neutral-800 rounded-lg p-4 hover:border-red-700 transition-colors duration-300"
              >
                <div className="flex-1">
                  <p className="font-bold text-white">{sport.name}</p>
                  {editingIndex === index ? (
                    <select
                      value={sport.skillLevel}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="mt-2 bg-neutral-900 border border-neutral-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-red-600"
                    >
                      {SKILL_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-gray-400 badscript">
                      {sport.skillLevel}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  {editingIndex === index ? (
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="text-green-500 hover:text-green-600 transition-colors"
                    >
                      <Save size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveSport(index)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Sport Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">Add a Sport</h3>

        {/* Popular Sports Grid */}
        {!showCustomInput && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {POPULAR_SPORTS.map((sport) => {
                const isAdded = sports.some(
                  (s) => s.name.toLowerCase() === sport.toLowerCase()
                );
                return (
                  <button
                    key={sport}
                    onClick={() => !isAdded && handleAddSport(sport)}
                    disabled={isAdded}
                    className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      isAdded
                        ? "bg-neutral-800 text-gray-500 cursor-not-allowed"
                        : "bg-black border border-neutral-800 text-white hover:border-red-700 hover:scale-105"
                    }`}
                  >
                    {sport}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full border-2 border-dashed border-neutral-800 hover:border-red-700 text-gray-400 hover:text-white font-semibold text-sm px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Custom Sport
            </button>
          </>
        )}

        {/* Custom Sport Input */}
        {showCustomInput && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Sport Name
              </label>
              <input
                type="text"
                value={newSportName}
                onChange={(e) => setNewSportName(e.target.value)}
                placeholder="Enter sport name"
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-700 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Skill Level
              </label>
              <select
                value={newSportSkill}
                onChange={(e) => setNewSportSkill(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-700 transition-colors duration-300"
              >
                {SKILL_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setNewSportName("");
                  setNewSportSkill("Beginner");
                }}
                className="flex-1 border border-neutral-800 hover:border-red-700 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddSport()}
                disabled={!newSportName.trim()}
                className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Sport
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSkip}
          className="flex-1 border border-neutral-800 hover:border-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
        >
          SKIP FOR NOW
        </button>
        <button
          onClick={handleComplete}
          disabled={loading}
          className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-red-900/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Completing...
            </>
          ) : (
            <>
              COMPLETE PROFILE
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
