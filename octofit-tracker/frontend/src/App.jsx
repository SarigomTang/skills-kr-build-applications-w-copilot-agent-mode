import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="container py-4">
      <header className="d-flex align-items-center gap-3 mb-4">
        <img src={octofitLogo} alt="OctoFit Tracker" width="48" height="48" />
        <div>
          <h1 className="h3 mb-0">OctoFit Tracker</h1>
          <p className="text-secondary mb-0">Your activity, your team, your progress.</p>
        </div>
      </header>

      <nav className="navbar navbar-expand bg-body-tertiary rounded mb-4" aria-label="Main navigation">
        <div className="container-fluid flex-wrap gap-2">
          {navigation.map(({ to, label }) => (
            <NavLink
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
              }
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p className="alert alert-warning">Page not found.</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
