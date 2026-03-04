import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = ({ mode, closeModel }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // login and register function from auth
  const { login, register } = useAuth();

  // navigate
  const navigate = useNavigate();

  // Jab mode change ho, toggle update ho
  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // extra safety

    setSubmitting(true);

    // login and register
    try {
      if (isLogin) {
        await login(email, password);
        closeModel();
        navigate("/dashboard");
      } else {
        await register(name, email, password);
        alert("Registration successful. Please login.");
        setIsLogin(true); // switch to login mode
        setPassword(""); // clear password
      }

      // after this close login page
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed  inset-0 z-50 flex items-center backdrop-blur-sm justify-center animate-fadeIn">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40  animate-fadeIn"
        onClick={closeModel}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-xl animate-scaleIn">
        {/* Close */}
        <button
          onClick={closeModel}
          className="cursor-pointer text-xl font-bold hover:text-red-500 transition-all duration-200 absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-900">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg"
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 text-white rounded-lg ${
              submitting ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900"
            }`}
          >
            {submitting ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer hover:underline ml-2 font-medium text-gray-900"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
