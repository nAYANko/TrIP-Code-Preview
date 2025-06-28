
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message || "Login failed");
    } else {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name);
    
    if (error) {
      toast.error(error.message || "Signup failed");
    } else {
      toast.success("Account created successfully! Please check your email to confirm your account.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-trip-dark flex">
      {/* Left Side - Image Grid */}
      <div className="min-h-screen bg-trip-dark flex justify-start items-center ml-32 pl-8">
          {/* Left Side - Centered Image */}
          <div className="w-[700px] h-[700px] opacity-90">
            <img 
              src="/more-uploads/Group 7.png" 
              alt="Travel Collage" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      {/* Right Side - Login Form */}
      <div className="w-96 ml-40 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/75 backdrop-blur-sm border border-gray-500/20 shadow-xl rounded-2xl">
            <div className="text-center pb-2 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
              <p className="text-gray-300">Plan Ahead. Travel Smart.</p>
            </div>
            <div className="pt-4 p-6">
              <div className="w-full mb-6">
                <div className="grid w-full grid-cols-2 bg-gray-700/50 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                      activeTab === "login"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab("signup")}
                    className={`text-sm font-medium py-2 px-4 rounded-md transition-colors ${
                      activeTab === "signup"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              
              {activeTab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-white text-sm font-medium">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="block text-white text-sm font-medium">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" className="w-full trip-button" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="block text-white text-sm font-medium">Full Name</label>
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="block text-white text-sm font-medium">Email</label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="block text-white text-sm font-medium">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" className="w-full trip-button" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
