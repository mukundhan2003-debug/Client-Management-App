import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* City skyline for dashboard background */
const CitySkyline = () => (
    <svg className="city-skyline" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
            <linearGradient id="bgD1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(30,58,138,0.4)" />
                <stop offset="100%" stopColor="rgba(15,23,42,0.8)" />
            </linearGradient>
            <linearGradient id="bgD2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(17,24,39,0.5)" />
                <stop offset="100%" stopColor="rgba(3,7,18,0.9)" />
            </linearGradient>
        </defs>
        <rect x="0" y="160" width="80" height="160" fill="url(#bgD2)" />
        <rect x="70" y="120" width="60" height="200" fill="url(#bgD2)" />
        <rect x="120" y="80" width="90" height="240" fill="url(#bgD1)" />
        <rect x="200" y="140" width="50" height="180" fill="url(#bgD2)" />
        <rect x="240" y="60" width="70" height="260" fill="url(#bgD1)" />
        <rect x="300" y="100" width="100" height="220" fill="url(#bgD2)" />
        <rect x="390" y="150" width="60" height="170" fill="url(#bgD2)" />
        <rect x="440" y="40" width="80" height="280" fill="url(#bgD1)" />
        <rect x="510" y="110" width="90" height="210" fill="url(#bgD2)" />
        <rect x="590" y="70" width="60" height="250" fill="url(#bgD1)" />
        <rect x="640" y="130" width="110" height="190" fill="url(#bgD2)" />
        <rect x="740" y="50" width="70" height="270" fill="url(#bgD1)" />
        <rect x="800" y="120" width="80" height="200" fill="url(#bgD2)" />
        <rect x="870" y="90" width="100" height="230" fill="url(#bgD1)" />
        <rect x="960" y="150" width="55" height="170" fill="url(#bgD2)" />
        <rect x="1005" y="60" width="85" height="260" fill="url(#bgD1)" />
        <rect x="1080" y="110" width="70" height="210" fill="url(#bgD2)" />
        <rect x="1140" y="80" width="90" height="240" fill="url(#bgD1)" />
        <rect x="1220" y="130" width="60" height="190" fill="url(#bgD2)" />
        <rect x="1270" y="100" width="80" height="220" fill="url(#bgD1)" />
        <rect x="1340" y="140" width="100" height="180" fill="url(#bgD2)" />
        {[
            [130, 100], [145, 100], [160, 100], [130, 115], [160, 115], [130, 130], [145, 130],
            [250, 80], [265, 80], [280, 80], [250, 95], [280, 95], [250, 110], [265, 110],
            [450, 60], [465, 60], [480, 60], [450, 75], [465, 75], [480, 75], [450, 90], [465, 90],
            [596, 85], [611, 85], [596, 100], [611, 100],
            [748, 68], [763, 68], [778, 68], [748, 83], [763, 83],
            [875, 106], [890, 106], [905, 106], [875, 121], [905, 121], [875, 136], [890, 136],
            [1010, 76], [1025, 76], [1040, 76], [1055, 76], [1010, 91], [1025, 91], [1055, 91], [1010, 106], [1040, 106],
            [1146, 96], [1161, 96], [1176, 96], [1146, 111], [1176, 111],
        ].map(([cx, cy], i) => (
            <rect key={i} x={cx} y={cy} width="6" height="4" rx="1"
                fill={i % 4 === 0 ? "rgba(251,191,36,0.7)" : i % 3 === 0 ? "rgba(147,197,253,0.7)" : "rgba(96,165,250,0.5)"} />
        ))}
        <rect x="0" y="300" width="1440" height="20" fill="rgba(3,7,18,1)" />
    </svg>
);

/* Shield icon for navbar */
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 18, height: 18 }}>
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
    </svg>
);

/* Color map for client avatars */
const clientColors = [
    { bg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' },
    { bg: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
    { bg: 'linear-gradient(135deg, #059669, #34d399)' },
    { bg: 'linear-gradient(135deg, #d97706, #fbbf24)' },
    { bg: 'linear-gradient(135deg, #dc2626, #f87171)' },
];

const getInitials = (name) =>
    name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '?';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/projects")
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    /* Compute stats from project data */
    const totalRevenue = projects.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalClients = new Set(projects.map(p => p.client)).size;
    const latestDate = projects.length
        ? projects.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
        : null;

    return (
        <>
            {/* Background */}
            <div className="page-bg">
                <div className="stars" />
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <CitySkyline />
            </div>

            <div className="dashboard-wrapper">
                {/* Navbar */}
                <nav className="navbar">
                    <div className="navbar-brand">
                        <div className="navbar-logo">
                            <ShieldIcon />
                        </div>
                        <div>
                            <div className="navbar-title">ClientVault</div>
                            <div className="navbar-subtitle">Project Management System</div>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <div className="user-badge">
                            <div className="user-avatar">AD</div>
                            <span className="user-name">Admin</span>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                </nav>

                {/* Main content */}
                <main className="dashboard-content">
                    {/* Page header */}
                    <div className="page-header">
                        <h1>Project Overview</h1>
                        <p>Track and manage all client projects in one secure place.</p>
                    </div>

                    {/* Stats row */}
                    <div className="stats-row">
                        <div className="stat-card" style={{ '--accent': 'linear-gradient(90deg, #1d4ed8, #3b82f6)' }}>
                            <div className="stat-label">Total Projects</div>
                            <div className="stat-value">{projects.length}</div>
                            <div className="stat-sub">Active records</div>
                        </div>
                        <div className="stat-card" style={{ '--accent': 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}>
                            <div className="stat-label">Total Clients</div>
                            <div className="stat-value">{totalClients}</div>
                            <div className="stat-sub">Unique clients</div>
                        </div>
                        <div className="stat-card" style={{ '--accent': 'linear-gradient(90deg, #059669, #34d399)' }}>
                            <div className="stat-label">Total Revenue</div>
                            <div className="stat-value" style={{ fontSize: 20 }}>
                                {formatCurrency(totalRevenue)}
                            </div>
                            <div className="stat-sub">Combined value</div>
                        </div>
                        <div className="stat-card" style={{ '--accent': 'linear-gradient(90deg, #d97706, #fbbf24)' }}>
                            <div className="stat-label">Latest Update</div>
                            <div className="stat-value" style={{ fontSize: 18 }}>
                                {latestDate ? formatDate(latestDate) : '—'}
                            </div>
                            <div className="stat-sub">Most recent entry</div>
                        </div>
                    </div>

                    {/* Projects table */}
                    <div className="section-header">
                        <span className="section-title">Client Projects</span>
                        <span className="section-badge">{projects.length} Records</span>
                    </div>

                    <div className="table-container">
                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner" />
                                <p className="loading-text">Loading project records...</p>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="empty-state">
                                <p>No project records found.</p>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Client</th>
                                        <th>Project</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ color: 'rgba(147,197,253,0.4)', fontSize: 13 }}>
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td>
                                                <div className="client-cell">
                                                    <div
                                                        className="client-avatar"
                                                        style={{ background: clientColors[index % clientColors.length].bg }}
                                                    >
                                                        {getInitials(item.client)}
                                                    </div>
                                                    <span className="client-name">{item.client}</span>
                                                </div>
                                            </td>
                                            <td style={{ color: 'rgba(224,242,254,0.8)' }}>{item.project}</td>
                                            <td>
                                                <span className="amount-badge">{formatCurrency(item.amount)}</span>
                                            </td>
                                            <td className="date-cell">{formatDate(item.date)}</td>
                                            <td>
                                                <span className="status-pill status-active">
                                                    <span className="status-dot" />
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="dashboard-footer">
                    ClientVault &copy; {new Date().getFullYear()} &mdash; Secure Client Management System
                </footer>
            </div>
        </>
    );
}

export default Dashboard;