import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && isAuthenticated != authentication) {
      navigate("/login");
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [isAuthenticated, authentication, navigate]);
  return <div>{loading ? "Loading..." : children}</div>;
}
