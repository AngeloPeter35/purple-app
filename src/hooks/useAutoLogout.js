import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = (timeout = 300000) => { // default: 5 minutes
  const navigate = useNavigate();

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll"];
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert("Logged out due to inactivity.");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminLoginTime");
        navigate("/admin/login");
      }, timeout);
    };

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // Start timer on load

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timer);
    };
  }, [navigate, timeout]);
};

export default useAutoLogout;
