import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

function RequireAuth({ children, allowedRoles }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    const payload = parseJwt(token);

    if (!payload || payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem(`cart_${payload?.email}`)
      navigate("/", { replace: true });
      return;
    }

    if (allowedRoles && !allowedRoles.includes(payload.role)) {
      navigate("/unauthorized", { replace: true });
      return;
    }

    // All checks passed
    setIsAuthorized(true);
  }, [navigate, allowedRoles]);

  // While checking, don't render anything (you can add a spinner if you like)
  if (isAuthorized === null) return null;

  // Once verified
  return children;
}

export default RequireAuth;