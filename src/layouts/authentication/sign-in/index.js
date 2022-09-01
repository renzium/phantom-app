import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import VuiTypography from "components/VuiTypography";
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";
import { TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase";
import ClipLoader from "react-spinners/ClipLoader";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  let history = useHistory();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <CoverLayout
      title="Nice to see you!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
            }}
          >
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
            <TextField
              fullWidth
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              variant="outlined"
            />
          </div>
        </VuiBox>
        <VuiBox mb={2}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
            }}
          >
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
            <TextField
              fullWidth
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              variant="outlined"
            />
          </div>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton
            onClick={() => {
              setLoading(true);
              signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                  setLoading(false);
                  alert("Login Successfully");
                  history.push("/dashboard");
                })
                .catch((err) => {
                  setLoading(false);
                  alert("Invalid Credentials");
                });
            }}
            color="info"
            fullWidth
          >
            <ClipLoader loading={loading} /> SIGN IN
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <>
            Don&apos;t have an account?{" "}
            <Link
              style={{
                color: "white",
                fontWeight: "bold",
              }}
              to="/registration"
            >
              Sign up
            </Link>
          </>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
