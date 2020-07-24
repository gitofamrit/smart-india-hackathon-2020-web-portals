import React, { createContext } from "react";
import { makeStyles, useTheme, Snackbar } from "@material-ui/core";

export const GlobalStateContext = createContext();

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export const GlobalStateContextProvider = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toast, showToast] = React.useState("");

  React.useEffect(() => {
    if (toast) {
      setTimeout(() => {
        showToast("");
      }, 3000);
    }
  }, [toast]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        classes,
        theme,
        mobileOpen,
        handleDrawerToggle,
        showToast,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={toast}
        open={toast !== ""}
      />
    </GlobalStateContext.Provider>
  );
};
