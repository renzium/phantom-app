import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import ClipLoader from "react-spinners/ClipLoader";

// Images
import bgSignIn from "assets/images/signUpImage.png";
import { db } from "firebase";
import { ref, set } from "firebase/database";
import { TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase";
import axios from "axios";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [loading, setLoading] = useState(false);
  function writeUserData(userId, name, email, password) {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      password: password,
    });
    setLoading(false);
    history.push("/login");
  }
  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgSignIn}
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Name
              </VuiTypography>
            </VuiBox>
            <TextField
              fullWidth
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              variant="outlined"
            />
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
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
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
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
                 axios
                   .post("https://phantom-app.herokuapp.com/api/users", {
                     name:user.name,
                     email: user.email,
                     password: user.password,
                   })
                   .then((res) => {
                     localStorage.setItem("phantom_user", JSON.stringify(res.data));
                   })
                   .catch((err) => {
                     alert(err);
                     setLoading(false);
                   });
              }}
              color="info"
              fullWidth
            >
              <ClipLoader loading={loading} size={25} />
              <b> </b> SIGN UP
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Already have an account?{" "}
              <VuiTypography
                component={Link}
                to="/login"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignIn;
