import { useEffect, useMemo, useState } from "react";

// react-router components
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Vision UI Dashboard React components

// Vision UI Dashboard React example components
import Configurator from "examples/Configurator";
import Sidenav from "examples/Sidenav";

// Vision UI Dashboard React themes
import theme from "assets/theme";

// RTL plugins
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

// Vision UI Dashboard React routes
import routes from "routes";
import publicRoutes from "public.routes";

// Vision UI Dashboard React contexts
import { setMiniSidenav, setOpenConfigurator, useVisionUIController } from "context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "firebase";

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    // document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      // if (route.collapse) {
      //   return getRoutes(route.collapse);
      // }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  let history = useHistory();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // history.push("/");
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="VISION UI FREE"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}
      <Switch>{getRoutes(publicRoutes)}</Switch>
    </ThemeProvider>
  );
}
