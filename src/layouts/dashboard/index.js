/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Line } from "react-chartjs-2";
import Axios from "axios/Axios";
import { useState, useEffect } from "react";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [humidityData, setHumidityData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [phData, setPhData] = useState([]);

  const humidity_data = {
    labels: humidityData && humidityData.map(humidity => humidity._id),
    datasets: [
      {
        label: "Humidity",
        data: humidityData && humidityData.map(humidity => humidity.changeAmount),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const temp_data = {
    labels: tempData && tempData.map(humidity => humidity._id),
    datasets: [
      {
        label: "Temperature (Celcius)",
        data: tempData && tempData.map(humidity => humidity.changeAmount),
        fill: true,
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,1)"
      }
    ]
  };

  const ph_data = {
    labels: phData && phData.map(humidity => humidity._id),
    datasets: [
      {
        label: "pH",
        data: phData && phData.map(humidity => humidity.changeAmount),
        fill: true,
        backgroundColor: "rgba(128,0,0,0.2)",
        borderColor: "rgba(128,0,0,1)"
      }
    ]
  };

  const humidityHandler = () => {
    Axios.get(`splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`)
      .then(response => {
        setHumidityData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const tempHandler = () => {
    Axios.get(`splTransfers?account=FCgYUwNW3Dts3dteLQjQWwz5E6gytJgLDVcCqYXB7u4k`)
      .then(response => {
        setTempData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

  const phHandler = () => {
    Axios.get(`splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`)
      .then(response => {
        setPhData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

  useEffect(() => {
    humidityHandler();
    tempHandler();
    phHandler();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <Line data={humidity_data} />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <Line data={temp_data} />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <Line data={ph_data} />
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
