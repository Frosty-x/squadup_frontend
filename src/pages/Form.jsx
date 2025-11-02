import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  User,
  Trophy,
  Activity,
  MapPin,
  CheckCircle,
  Plus,
  X,
} from "lucide-react";

// ----------- CONSTANTS -----------
const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Physical Stats", icon: Activity },
  { id: 3, title: "Sports & Skills", icon: Trophy },
  { id: 4, title: "Location & Availability", icon: MapPin },
  { id: 5, title: "Review", icon: CheckCircle },
];

const SPORTS_LIST = [
  "Football",
  "Basketball",
  "Cricket",
  "Tennis",
  "Badminton",
  "Swimming",
  "Athletics",
  "Hockey",
  "Volleyball",
  "Table Tennis",
  "Rugby",
];

// ----------- INPUT COMPONENTS -----------
const Input = (props) => (
  <input
    {...props}
    className={`w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-500 ${props.className || ""}`}
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className={`w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-red-500 text-white ${props.className || ""}`}
  >
    {children}
  </select>
);

// ----------- STEP SIDEBAR -----------
const StepIndicator = ({ steps, step }) => (
  <div className="lg:w-64 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
    {steps.map(({ id, title, icon: Icon }) => {
      const active = step === id;
      const done = step > id;
      return (
        <div
          key={id}
          className={`flex items-center gap-3 p-3 rounded-lg transition-all shrink-0 
            ${active ? "bg-red-900/50 text-red-500 border border-red-800" 
            : done ? "text-gray-400 bg-gray-800/50" 
            : "text-gray-500 bg-gray-800/30"}`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${active ? "bg-red-600 text-white" 
            : done ? "bg-gray-700 text-gray-300" 
            : "bg-gray-800 text-gray-500"}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-sm ${active ? "font-semibold" : "font-medium"}`}>
            {title}
          </span>
        </div>
      );
    })}
  </div>
);

// ----------- SPORT FIELD COMPONENT -----------
const SportField = ({ sport, index, updateSport, removeSport }) => (
  <div className="bg-black/30 p-4 rounded-lg border border-gray-800 space-y-3 relative">
    <button
      onClick={() => removeSport(index)}
      className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all"
    >
      <X className="w-4 h-4" />
    </button>

    <Select
      value={sport.name}
      onChange={(e) => updateSport(index, "name", e.target.value)}
    >
      <option value="">Select Sport</option>
      {SPORTS_LIST.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </Select>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Input
        type="number"
        placeholder="Years of Experience"
        value={sport.experience}
        onChange={(e) => updateSport(index, "experience", e.target.value)}
      />
      <Select
        value={sport.level}
        onChange={(e) => updateSport(index, "level", e.target.value)}
      >
        <option value="">Skill Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="professional">Professional</option>
      </Select>
    </div>
  </div>
);

// ----------- MAIN FORM COMPONENT -----------
export default function SportsPlayerForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    height: "",
    weight: "",
    sports: [],
    city: "",
    state: "",
    country: "",
    availability: "",
    preferredTime: "",
  });

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  // ----------- HANDLERS -----------
  const update = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const next = () => step < STEPS.length && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);
  const addSport = () =>
    setData({ ...data, sports: [...data.sports, { name: "", experience: "", level: "" }] });
  const removeSport = (i) =>
    setData({ ...data, sports: data.sports.filter((_, idx) => idx !== i) });
  const updateSport = (i, field, value) => {
    const updated = [...data.sports];
    updated[i][field] = value;
    setData({ ...data, sports: updated });
  };
  const submit = () => console.log("Player Data:", data);

  // ----------- STEP CONTENT -----------
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input name="fullName" placeholder="Full Name" value={data.fullName} onChange={update} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" name="dob" value={data.dob} onChange={update} />
              <Select name="gender" value={data.gender} onChange={update}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <Input type="email" name="email" placeholder="Email" value={data.email} onChange={update} />
            <Input type="tel" name="phone" placeholder="Phone Number" value={data.phone} onChange={update} />
          </>
        );

      case 2:
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            {["height", "weight"].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-300 mb-2 capitalize">{field}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name={field}
                    placeholder={field === "height" ? "cm" : "kg"}
                    value={data[field]}
                    onChange={update}
                    className="flex-1"
                  />
                  <span className="flex items-center px-3 bg-gray-800 rounded-lg text-gray-400 text-sm border border-gray-700">
                    {field === "height" ? "cm" : "kg"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Your Sports</h3>
              <button
                onClick={addSport}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Sport
              </button>
            </div>

            {data.sports.length === 0 ? (
              <div className="text-center py-8 bg-black/30 rounded-lg border-2 border-dashed border-gray-700">
                <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">You can ADD more than one sport</p>
              </div>
            ) : (
              data.sports.map((sport, i) => (
                <SportField
                  key={i}
                  sport={sport}
                  index={i}
                  updateSport={updateSport}
                  removeSport={removeSport}
                />
              ))
            )}
          </div>
        );

      case 4:
        return (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="city" placeholder="City" value={data.city} onChange={update} />
              <Input name="state" placeholder="State" value={data.state} onChange={update} />
            </div>
            <Input name="country" placeholder="Country" value={data.country} onChange={update} />
            <Select name="availability" value={data.availability} onChange={update}>
              <option value="">Training Availability</option>
              <option value="weekdays">Weekdays Only</option>
              <option value="weekends">Weekends Only</option>
              <option value="both">Both</option>
              <option value="flexible">Flexible</option>
            </Select>
            <Select name="preferredTime" value={data.preferredTime} onChange={update}>
              <option value="">Preferred Training Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </Select>
          </>
        );

      case 5:
        return (
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/50 rounded-full mb-4 border-2 border-red-600">
              <Star className="w-10 h-10 text-red-500" fill="currentColor" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Registration Complete!</h3>
            <p className="text-gray-400 text-sm">Review your information in console</p>
          </div>
        );
      default:
        return null;
    }
  };

  // ----------- RENDER -----------
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-red-950 to-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl p-6 border border-red-900">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-red-700 rotate-45"></div>
          <span className="text-2xl badscript tracking-wider text-white font-sans">
            SquadUp
          </span>
        </div>
          </div>
          <div className="text-sm text-gray-400">Character Building</div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join The Team</h1>
          <p className="text-gray-400 badscript text-sm">Complete your Character profile</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-end mb-2 text-red-500 text-sm font-medium">
            {progress.toFixed(0)}%
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-red-600 to-red-800 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8">
          <StepIndicator steps={STEPS} step={step} />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {STEPS[step - 1].title}
            </h2>
            <div className="space-y-4 mb-6">{renderContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                onClick={prev}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg 
                ${step === 1 ? "bg-gray-800 text-gray-600 cursor-not-allowed" : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"}`}
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>

              <button
                onClick={step === STEPS.length ? submit : next}
                className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-red-600 to-red-800 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-900 shadow-lg"
              >
                {step === STEPS.length ? "Complete" : "Next"}
                {step < STEPS.length && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
