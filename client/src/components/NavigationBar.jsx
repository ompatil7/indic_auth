// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { UserIcon, GiftIcon, Trophy, Star, Crown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State variables for sheets
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false); // Close the profile sheet if open
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">WickedMouse</span>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "WickedMouse, cursive" }}
            >
              INDIC
            </h1>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              /* Close Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Menu Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Navigation Links (Desktop) */}
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/home" className="text-sm font-semibold text-gray-900">
            Home
          </Link>
          <Link to="/games" className="text-sm font-semibold text-gray-900">
            Games
          </Link>
          <Link to="/stories" className="text-sm font-semibold text-gray-900">
            Stories
          </Link>
          <Link to="/learnings" className="text-sm font-semibold text-gray-900">
            Learnings
          </Link>
          <Link to="/ar" className="text-sm font-semibold text-gray-900">
            AR
          </Link>
          {/* <Link to="/about-us" className="text-sm font-semibold text-gray-900">
            About Us
          </Link> */}
        </div>
        {/* Authentication Links (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-6  ">
          {user ? (
            <>
              {/* Rewards Icon */}
              <Sheet open={isRewardsOpen} onOpenChange={setIsRewardsOpen}>
                <SheetTrigger asChild>
                  <button className="text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">
                    <GiftIcon className="w-6 h-6" aria-label="Rewards" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  {/* Rewards Sheet Content */}
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
                                <h5 className="font-medium text-gray-900">{achievement.title}</h5>
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
                              <h5 className="font-medium text-gray-900">{reward.name}</h5>
                              <p className="text-sm text-gray-500">{reward.points} points</p>
                              <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer">
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

              {/* Profile Icon / Username */}
              <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors cursor-pointer">
                    <span className="text-sm font-semibold text-gray-900">
                      Hello, {user.username}
                    </span>
                    <UserIcon className="w-6 h-6" aria-label="Profile" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  {/* Profile Sheet Content */}
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
                          <h3 className="text-lg font-medium">{user.fullname || user.username}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl text-gray-900 font-bold">12</div>
                          <div className="text-sm text-gray-500">Lessons</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl text-gray-900 font-bold">85%</div>
                          <div className="text-sm text-gray-500">Accuracy</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-2xl text-gray-900 font-bold">24</div>
                          <div className="text-sm text-gray-500">Streak</div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
                        <div className="space-y-3">
                          {['Completed Lesson 3', 'Earned New Badge', 'Started Lesson 4'].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-500">{activity}</span>
                              <span className="text-xs text-gray-500">2h ago</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Logout Button */}
                      <div className="pt-4 border-t">
                        <button
                          onClick={handleLogout}
                          className="w-full text-center text-red-600 hover:text-red-700 font-medium cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-gray-900">
                Log in
              </Link>
              <Link to="/signup" className="text-sm font-semibold text-gray-900">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-6 pt-2 pb-6">
            <div className="space-y-2">
              <Link
                to="/home"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/games"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                to="/stories"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Stories
              </Link>
              <Link
                to="/learnings"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learnings
              </Link>
              <Link
                to="/ar"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                AR
              </Link>
              {/* <Link
                to="/about-us"
                className="block text-base font-semibold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link> */}
            </div>
            <div className="mt-6">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setIsProfileOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-base font-semibold text-gray-900"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-2 block text-base font-semibold text-gray-900"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-base font-semibold text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-base font-semibold text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;