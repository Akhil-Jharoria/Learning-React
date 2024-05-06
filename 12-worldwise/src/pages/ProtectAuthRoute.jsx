import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectAuthRoute({ children }) {
  const { isAuthentciated } = useAuth();
  const naviagate = useNavigate();

  useEffect(
    function () {
      if (isAuthentciated === false) naviagate("/");
    },
    [isAuthentciated, naviagate]
  );
  return children;
}
export default ProtectAuthRoute;
