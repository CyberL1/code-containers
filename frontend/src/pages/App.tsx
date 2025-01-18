import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  AppBar,
  Box,
  createTheme,
  Drawer,
  FormControlLabel,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import ErrorPage from "./Error";

interface Item {
  title: string;
  icon: keyof typeof Icons;
  href: string;
  page?: string;
}

const drawerWidth = 240;

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App({ error }: { error?: boolean }) {
  const params = useParams();

  const sidebarItems: Item[] = [
    { title: "Containers", icon: "Storage", href: "/" },
    {
      title: "Info",
      icon: "Info",
      href: `/containers/${params.name}`,
      page: "/containers",
    },
    {
      title: "Terminal",
      icon: "Terminal",
      href: `/containers/${params.name}/terminal`,
      page: "/containers",
    },
    {
      title: "Reinstall",
      icon: "Update",
      href: `/containers/${params.name}/reinstall`,
      page: "/containers",
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setOpen(!isOpen)}
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Icons.Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code containers
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked={mode === "system"} />}
            label="Automatic theme"
            labelPlacement="start"
            onChange={() => setMode(mode === "system" ? "light" : "system")}
          />
          {mode != "system" && (
            <IconButton
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              {mode === "dark" ? (
                <Icons.LightMode />
              ) : (
                <Icons.DarkMode htmlColor="#fff" />
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? drawerWidth : 56,
          "& .MuiDrawer-paper": {
            width: isOpen ? drawerWidth : 56,
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar />
        <List>
          {sidebarItems.map((item) => {
            if (!item.page) {
              item.page = "/";
            }

            console.log(location.pathname, item.page);
            if (location.pathname.startsWith(item.page)) {
              return (
                <Tooltip
                  key={item.title}
                  title={item.title}
                  placement="right"
                  arrow
                >
                  <ListItem
                    key={item.title}
                    component={Link}
                    to={item.href}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon component={Icons[item.icon]} />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              );
            }
          })}
        </List>
      </Drawer>
      <Toolbar />
      <Box
        component="main"
        sx={{ p: 2, marginLeft: isOpen ? "240px" : "56px" }}
      >
        {error && <ErrorPage />}
        <Outlet />
      </Box>
    </>
  );
}

export default function ToggleColorMode({ error }: { error?: boolean }) {
  return (
    <ThemeProvider theme={theme}>
      {error ? <App error /> : <App />}
    </ThemeProvider>
  );
}
