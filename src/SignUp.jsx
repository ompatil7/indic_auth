import { useState } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const nativeLanguages = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "marathi", label: "Marathi" }
];

const learningLanguages = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" }
];

const CustomDropdown = ({ 
  options, 
  selectedValue, 
  onSelect, 
  placeholder,
  isOpen,
  toggleOpen 
}) => (
  <div className="relative w-full">
    <button 
      type="button"
      className="w-full border rounded p-2 flex justify-between items-center"
      onClick={toggleOpen}
    >
      {selectedValue 
        ? options.find(opt => opt.value === selectedValue)?.label 
        : placeholder}
      <span>▼</span>
    </button>
    {isOpen && (
      <div className="absolute z-10 w-full border rounded mt-1 bg-white shadow-lg">
        {options.map((option) => (
          <div
            key={option.value}
            className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            onClick={() => {
              onSelect(option.value);
              toggleOpen();
            }}
          >
            {option.label}
            {selectedValue === option.value && <span>✓</span>}
          </div>
        ))}
      </div>
    )}
  </div>
);

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

const CustomCheckbox = ({ 
  checked, 
  onChange, 
  label 
}) => (
  <div 
    className="flex items-center space-x-2 cursor-pointer"
    onClick={onChange}
  >
    <div 
      className={`w-5 h-5 border rounded ${
        checked ? 'bg-blue-500 text-white' : 'bg-white'
      } flex items-center justify-center`}
    >
      {checked && '✓'}
    </div>
    <label>{label}</label>
  </div>
);

CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const SignUp = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState(null);
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState(null);
  const [isSpeciallyAbled, setIsSpeciallyAbled] = useState(false);
  const [isNativeDropdownOpen, setIsNativeDropdownOpen] = useState(false);
  const [isLearningDropdownOpen, setIsLearningDropdownOpen] = useState(false);

  const palette = {
    lightestBlue: "#C5BAFF",
    lightBlue: "#C4D9FF",
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "WickedMouse, cursive" }}>
                INDIC
              </h1>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
          <div
            className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[-30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(25.9% 44.1%, 0% 61.6%, 2.5% 26.9%, 14.5% 0.1%, 19.3% 2%, 27.5% 32.5%, 39.8% 62.4%, 47.6% 68.1%, 52.5% 58.3%, 54.8% 34.5%, 72.5% 76.7%, 99.9% 64.9%, 82.1% 100%, 72.4% 76.8%, 23.9% 97.7%, 25.9% 44.1%)",
            }}
          />
        </div>

        <div className="flex justify-center items-center">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-[400px] bg-white p-6 rounded-xl shadow-md"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Personal Details</TabsTrigger>
              <TabsTrigger value="signup">Language Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="Choose a username" />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Enter your age" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" />
                </div>
                <Button 
                  className="w-full" 
                  style={{ backgroundColor: palette.lightestBlue }} 
                  onClick={() => setActiveTab("signup")}
                >
                  Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="signup">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="native-language">Native Language</Label>
                  <CustomDropdown 
                    options={nativeLanguages}
                    selectedValue={selectedNativeLanguage}
                    onSelect={setSelectedNativeLanguage}
                    placeholder="Select Native Language"
                    isOpen={isNativeDropdownOpen}
                    toggleOpen={() => setIsNativeDropdownOpen(!isNativeDropdownOpen)}
                  />
                </div>
                <div>
                  <Label htmlFor="learning-language">Learning Language</Label>
                  <CustomDropdown 
                    options={learningLanguages}
                    selectedValue={selectedLearningLanguage}
                    onSelect={setSelectedLearningLanguage}
                    placeholder="Select Learning Language"
                    isOpen={isLearningDropdownOpen}
                    toggleOpen={() => setIsLearningDropdownOpen(!isLearningDropdownOpen)}
                  />
                </div>
                <div>
                  <CustomCheckbox 
                    checked={isSpeciallyAbled}
                    onChange={() => setIsSpeciallyAbled(!isSpeciallyAbled)}
                    label="Specially Abled"
                  />
                </div>
                <Button  
                  className="w-full" 
                  style={{ backgroundColor: palette.lightBlue }}
                  onClick={() => navigate("/login")}
                >
                  Sign Up
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignUp;