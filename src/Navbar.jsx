// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// // SVG Icons
// // import GamesIcon from './assets/icons/game.svg'
// // import LearningsIcon from './assets/icons/good.svg'
// // import ARIcon from './assets/icons/AR.svg'
// // import StoriesIcon from './assets/icons/stories.svg'

// function Navbar() {
//   const navigate = useNavigate()

//   const navItems = [
//     { icon: GamesIcon, label: 'Games', path: '/games' },
//     { icon: LearningsIcon, label: 'Learnings', path: '/learnings' },
//     { icon: ARIcon, label: 'AR', path: '/ar' },
//     { icon: StoriesIcon, label: 'Stories', path: '/stories' }
//   ]

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-primary z-50 px-6 py-4 flex justify-between items-center">
//       {/* INDIC Name on Left */}
//       <div className="text-2xl font-wicked text-dark-gray">
//         INDIC
//       </div>

//       {/* Middle Navigation Buttons */}
//       <div className="flex space-x-6 items-center">
//         {navItems.map((item) => (
//           <button 
//             key={item.label}
//             onClick={() => navigate(item.path)}
//             className="flex flex-col items-center group"
//           >
//             😂
//           </button>
//         ))}
//       </div>

//       {/* Signup and Login Buttons */}
//       <div className="space-x-4">
//         <button 
//           onClick={() => navigate('/signup')}
//           className="bg-white text-dark-gray px-4 py-2 rounded-full 
//                      hover:translate-y-[-2px] hover:shadow-lg 
//                      transition duration-200 ease-in-out"
//         >
//           Sign Up
//         </button>
//         <button 
//           onClick={() => navigate('/login')}
//           className="bg-white text-dark-gray px-4 py-2 rounded-full 
//                      hover:translate-y-[-2px] hover:shadow-lg 
//                      transition duration-200 ease-in-out"
//         >
//           Log In
//         </button>
//       </div>
//     </nav>
//   )
// }

// export default Navbar