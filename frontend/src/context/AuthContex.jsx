import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import api from "../axios/axios.instance";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthentication = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/auth/check-auth");
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();

    return () => {
      setUser(null);
      setIsAuthenticated(false);
    };
  }, []);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error.message);
      setIsAuthenticated(false);
      return error.response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/auth/logout");
      if (response.status === 200) {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
