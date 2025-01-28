import { useNavigate } from "react-router-dom";
import { levels } from "./levels";
import LevelCard from "./LevelCard";
import { Link } from "react-router-dom";
import { UserIcon, GiftIcon, Trophy, Star, Crown } from 'lucide-react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const HomePage = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  const handleLevelSelect = (level) => {
    navigate(`/lesson/${level.id}`, { state: { levelFile: level.file } });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}

      {/* <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "WickedMouse, cursive" }}>
                INDIC
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/games" className="text-sm font-semibold text-gray-900">
              Games
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Stories
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Learning
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              AR
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-9">
            
            <Sheet open={isRewardsOpen} onOpenChange={setIsRewardsOpen}>
              <SheetTrigger asChild>
                <button className="text-gray-900 hover:text-gray-600 transition-colors">
                  <GiftIcon className="w-6 h-6" aria-label="Rewards" />
                </button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] text-white">
                <SheetHeader>
                  <SheetTitle>Rewards & Achievements</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div className="space-y-6">
                    
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Total Points</p>
            <h3 className="text-3xl font-bold">2,450</h3>
          </div>
          <Trophy className="w-12 h-12 opacity-90" />
        </div>
      </div>


      <div>
        <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
        <div className="space-y-3">
          {[
            { title: 'Perfect Score', description: 'Complete a lesson with 100% accuracy', icon: Star },
            { title: 'Weekly Champion', description: 'Top performer of the week', icon: Crown },
            { title: '7-Day Streak', description: 'Practice for 7 days in a row', icon: Trophy }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 p-2 rounded-full">
                <achievement.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h5 className="font-medium text-white">{achievement.title}</h5>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div>
        <h4 className="text-sm font-medium mb-3">Available Rewards</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Premium Theme', points: 1000 },
            { name: 'Extra Lives', points: 500 },
            { name: 'Special Badge', points: 750 },
            { name: 'Power Boost', points: 300 }
          ].map((reward, index) => (
            <div key={index} className="p-4 border rounded-lg text-center">
              <h5 className="font-medium text-white">{reward.name}</h5>
              <p className="text-sm text-gray-500">{reward.points} points</p>
              <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700">
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
                </div >
              </SheetContent >
            </Sheet >

  <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
    <SheetTrigger asChild>
      <button className="text-gray-900 hover:text-gray-600 transition-colors">
        <UserIcon className="w-6 h-6" aria-label="Profile" />
      </button>
    </SheetTrigger>
    <SheetContent className="w-[400px] sm:w-[540px] text-white">
      <SheetHeader>
        <SheetTitle>Profile</SheetTitle>
      </SheetHeader>
      <div className="py-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">John Doe</h3>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl text-gray-500 font-bold">12</div>
              <div className="text-sm text-gray-500">Lessons</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl text-gray-500 font-bold">85%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl text-gray-500 font-bold">24</div>
              <div className="text-sm text-gray-500">Streak</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
            <div className="space-y-3 ">
              {['Completed Lesson 3', 'Earned New Badge', 'Started Lesson 4'].map((activity, index) => (
                <div key={index} className="flex  items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">{activity}</span>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
          </div >
            
        </nav >
      </header >/*}

      {/* Background Gradient */}
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
        </div>

        {/* Main Content */}
        <div className="flex min-h-screen items-center justify-center pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 max-w-6xl mx-auto justify-items-center">
            {levels.map((level, index) => (
              <div
                key={level.id}
                className={`w-80 h-80 bg-white rounded-lg shadow-md flex items-center justify-center ${index === levels.length - 1 && levels.length % 3 === 1
                  ? "lg:col-start-2"
                  : index === levels.length - 1 && levels.length % 3 === 2
                    ? "lg:col-start-2 lg:col-span-2"
                    : ""
                  }`}
              >
                <LevelCard level={level} onSelect={handleLevelSelect} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default HomePage;