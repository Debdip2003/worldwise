import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Tab, Tabs, Toolbar } from "@mui/material";
import { Link } from "react-router";
import { Button } from "@mui/material";

const PageNav = () => {
  return (
    <>
      <AppBar>
        <Toolbar sx={{ background: "black" }}>
          <Typography
            sx={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "25px",
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            WorldWise
          </Typography>
          <Tabs sx={{ marginLeft: "center" }} textColor="inherite">
            <Tab label="Home" component={Link} to="/"></Tab>
            <Tab label="Product" component={Link} to="/product"></Tab>
            <Tab label="Pricing" component={Link} to="/pricing"></Tab>
          </Tabs>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="success"
            sx={{ marginLeft: "auto" }}
          >
            Log In
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            sx={{ marginLeft: "5px" }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PageNav;
