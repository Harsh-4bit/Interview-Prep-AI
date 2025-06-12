import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import {validateEmail} from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; 
import {UserContext} from "../../context/UserContext"

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {updateUser} = useContext(UserContext);
  async function handleLogin(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      console.log("Sending login request to", API_PATHS.AUTH.LOGIN);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login success:", response.data);
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);
        setError(error.response.data.message || "Login failed. Try again.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Check your internet or CORS.");
      } else {
        console.error("Request setup error:", error.message);
        setError("Unexpected error: " + error.message);
      }
    }
  }

  return (
    <div className="w-[90vw] md:w-[35vw] h-[25vw] py-7 px-11 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
      
      <form onSubmit={handleLogin} className="flex flex-col items-evenly gap-3">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="abc@gmail.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="min 8 characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="w-full bg-black text-white h-[35px] hover:bg-orange-200 hover:text-black cursor-pointer rounded-lg mt-3">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button className="font-medium text-orange-400 underline cursor-pointer" onClick={() => setCurrentPage('signup')}>
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
