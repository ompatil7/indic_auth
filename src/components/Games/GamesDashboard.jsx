import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { UserIcon, GiftIcon, Trophy, Star, Crown } from 'lucide-react';
 // Import useNavigate for navigation
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const games = [
  {
    name: "Frog Jump",
    description: "Help the frog jump to the correct vowel platform!",
    route: "frog",
    image: "🐸",
  },
  {
    name: "Fill in the Blanks",
    description: "Complete the sentence by filling in the blanks!",
    route: "fillintheblanks",
    image: "📝",
  },
  {
    name: "Match the Pairs",
    description: "Find and match the correct pairs of cards!",
    route: "match",
    image: "🃏",
  },
  {
    name: "Avatar Actions",
    description: "Control the avatar and perform actions!",
    route: "home",
    image: "🧍",
  },
  {
    name: "Sentence Builder",
    description: "Arrange the words to build a meaningful sentence!",
    route: "sentence",
    image: "🔤",
  },
  {
    name: "Flipped Card",
    description: "Flip and match the cards!",
    route: "flippedcard",
    image: "🃏",
  },
];

const GamesDashboard = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isRewardsOpen, setIsRewardsOpen] = useState(false); // Initialize navigate function

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 via-purple-300 to-white p-8 flex items-center justify-center">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/home" className="-m-1.5 p-1.5">
              <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "WickedMouse, cursive" }}>
                INDIC
              </h1>
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/home" className="text-sm font-semibold text-gray-900">
              Home
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
            {/* Rewards Sheet */}
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
                    {/* Points Overview */}
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">Total Points</p>
                          <h3 className="text-3xl font-bold">2,450</h3>
                        </div>
                        <Trophy className="w-12 h-12 opacity-90" />
                      </div>
                    </div>

                    {/* Recent Achievements */}
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

                    {/* Available Rewards */}
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
                </div>
              </SheetContent>
            </Sheet>

            {/* Profile Sheet */}
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
                    {/* Profile Avatar */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">John Doe</h3>
                        <p className="text-sm text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-gray-500">Lessons</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">85%</div>
                        <div className="text-sm text-gray-500">Accuracy</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">24</div>
                        <div className="text-sm text-gray-500">Streak</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        {['Completed Lesson 3', 'Earned New Badge', 'Started Lesson 4'].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-white">{activity}</span>
                            <span className="text-xs text-gray-500">2h ago</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center w-full pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-transform transform hover:scale-110 cursor-pointer flex flex-col items-center text-center"
              onClick={() => navigate(`/${game.route}`)} // Navigate to the route on card click
            >
              <div className="flex items-center justify-center mb-4 text-7xl h-24 w-24 bg-purple-100 rounded-full">
                {game.image}
              </div>
              <h2 className="text-xl font-bold text-purple-700 mb-2">{game.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the parent card click event
                  navigate(`/${game.route}`);
                }}
                className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
              >
                Play Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesDashboard;