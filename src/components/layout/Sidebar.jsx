import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Users, Settings } from 'lucide-react'
import '../../css/Sidebar.css'

function HandshakeLogo() {
  return (
    <svg className="sidebar-logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14l4 2 2-4-3-2-3 4z" fill="#818cf8" />
      <path d="M8 20v6c0 1.5 1.2 2.5 2.5 2.5h4l2-5-2-3.5-6.5 0z" fill="#6366f1" />
      <path d="M30 14l-4 2-2-4 3-2 3 4z" fill="#6366f1" />
      <path d="M32 20v6c0 1.5-1.2 2.5-2.5 2.5h-4l-2-5 2-3.5 6.5 0z" fill="#4f46e5" />
      <path d="M18 16h4l2 6-2 4h-4l-2-6 2-4z" fill="#a5b4fc" />
    </svg>
  )
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <HandshakeLogo />
        <span className="sidebar-brand-name">FIRSTROUND</span>
      </div>
      <div className="sidebar-sep" />
      <p className="sidebar-section-label">MAIN</p>
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/jobs" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}>
          <Briefcase size={20} />
          <span>Jobs</span>
        </NavLink>
        <NavLink to="/candidates" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}>
          <Users size={20} />
          <span>Candidates</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  )
}
