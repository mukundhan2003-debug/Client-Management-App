import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* Inline SVG icons */
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(147,197,253,0.45)', pointerEvents: 'none' }}>
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(147,197,253,0.45)', pointerEvents: 'none' }}>
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

/* City skyline building shapes for background */
const CitySkyline = () => (
    <svg className="city-skyline" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
            <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(30,58,138,0.6)" />
                <stop offset="100%" stopColor="rgba(15,23,42,0.9)" />
            </linearGradient>
            <linearGradient id="buildingGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(17,24,39,0.7)" />
                <stop offset="100%" stopColor="rgba(3,7,18,0.95)" />
            </linearGradient>
        </defs>

        {/* Background buildings */}
        <rect x="0" y="160" width="80" height="160" fill="url(#buildingGrad2)" />
        <rect x="70" y="120" width="60" height="200" fill="url(#buildingGrad2)" />
        <rect x="120" y="80" width="90" height="240" fill="url(#buildingGrad)" />
        <rect x="200" y="140" width="50" height="180" fill="url(#buildingGrad2)" />
        <rect x="240" y="60" width="70" height="260" fill="url(#buildingGrad)" />
        <rect x="300" y="100" width="100" height="220" fill="url(#buildingGrad2)" />
        <rect x="390" y="150" width="60" height="170" fill="url(#buildingGrad2)" />
        <rect x="440" y="40" width="80" height="280" fill="url(#buildingGrad)" />
        <rect x="510" y="110" width="90" height="210" fill="url(#buildingGrad2)" />
        <rect x="590" y="70" width="60" height="250" fill="url(#buildingGrad)" />
        <rect x="640" y="130" width="110" height="190" fill="url(#buildingGrad2)" />
        <rect x="740" y="50" width="70" height="270" fill="url(#buildingGrad)" />
        <rect x="800" y="120" width="80" height="200" fill="url(#buildingGrad2)" />
        <rect x="870" y="90" width="100" height="230" fill="url(#buildingGrad)" />
        <rect x="960" y="150" width="55" height="170" fill="url(#buildingGrad2)" />
        <rect x="1005" y="60" width="85" height="260" fill="url(#buildingGrad)" />
        <rect x="1080" y="110" width="70" height="210" fill="url(#buildingGrad2)" />
        <rect x="1140" y="80" width="90" height="240" fill="url(#buildingGrad)" />
        <rect x="1220" y="130" width="60" height="190" fill="url(#buildingGrad2)" />
        <rect x="1270" y="100" width="80" height="220" fill="url(#buildingGrad)" />
        <rect x="1340" y="140" width="100" height="180" fill="url(#buildingGrad2)" />

        {/* Building windows — glowing dots */}
        {[
            [130, 100], [140, 100], [150, 100], [160, 100],
            [130, 115], [140, 115], [150, 115], [160, 115],
            [130, 130], [150, 130], [160, 130],
            [250, 80], [260, 80], [270, 80], [280, 80],
            [250, 95], [260, 95], [280, 95],
            [250, 110], [260, 110], [270, 110],
            [450, 60], [460, 60], [470, 60], [480, 60], [490, 60],
            [450, 75], [460, 75], [480, 75], [490, 75],
            [450, 90], [460, 90], [470, 90],
            [596, 85], [606, 85], [616, 85],
            [596, 100], [606, 100], [616, 100],
            [748, 68], [758, 68], [768, 68],
            [748, 83], [758, 83],
            [875, 106], [885, 106], [895, 106], [905, 106],
            [875, 121], [885, 121], [905, 121],
            [875, 136], [885, 136], [895, 136],
            [1010, 76], [1020, 76], [1030, 76], [1040, 76], [1050, 76], [1060, 76],
            [1010, 91], [1020, 91], [1040, 91], [1050, 91], [1060, 91],
            [1010, 106], [1020, 106], [1030, 106], [1040, 106],
            [1146, 96], [1156, 96], [1166, 96], [1176, 96],
            [1146, 111], [1156, 111], [1176, 111],
            [1146, 126], [1166, 126],
        ].map(([cx, cy], i) => (
            <rect
                key={i}
                x={cx} y={cy}
                width="6" height="4"
                rx="1"
                fill={i % 4 === 0
                    ? "rgba(251,191,36,0.85)"
                    : i % 3 === 0
                        ? "rgba(147,197,253,0.9)"
                        : "rgba(96,165,250,0.7)"}
            />
        ))}

        {/* Ground / base fill */}
        <rect x="0" y="300" width="1440" height="20" fill="rgba(3,7,18,1)" />
    </svg>
);

function Login() {
    const [data, setData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!data.username || !data.password) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://127.0.0.1:5000/login", data);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch {
            setError("Invalid username or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <>
            {/* Live background */}
            <div className="page-bg">
                <div className="stars" />
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
                <CitySkyline />
            </div>

            <div className="container">
                <div className="card">
                    {/* Brand logo */}
                    <div className="brand-logo">
                        <ShieldIcon />
                    </div>

                    <h2>Welcome Back</h2>
                    <p className="card-subtitle">Sign in to access your client dashboard</p>

                    {/* Error alert */}
                    {error && <div className="alert alert-error">{error}</div>}

                    {/* Username field */}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div style={{ position: 'relative' }}>
                            <UserIcon />
                            <input
                                id="username"
                                className="input"
                                placeholder="Enter your username"
                                style={{ paddingLeft: '40px' }}
                                autoComplete="username"
                                onChange={e => setData({ ...data, username: e.target.value })}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <LockIcon />
                            <input
                                id="password"
                                className="input"
                                type="password"
                                placeholder="Enter your password"
                                style={{ paddingLeft: '40px' }}
                                autoComplete="current-password"
                                onChange={e => setData({ ...data, password: e.target.value })}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {/* Login button */}
                    <button
                        className="button"
                        onClick={handleLogin}
                        disabled={loading}
                        style={{ opacity: loading ? 0.75 : 1 }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Footer link */}
                    <p className="link" onClick={() => navigate("/signup")}>
                        Don't have an account?{" "}
                        <span>Create one</span>
                    </p>

                    {/* Security note */}
                    <p style={{ marginTop: 20, fontSize: 11, color: 'rgba(147,197,253,0.3)', lineHeight: 1.5 }}>
                        🔒 Your data is encrypted and protected
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;