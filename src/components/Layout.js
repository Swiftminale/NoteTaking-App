import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = 240;

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        elevation={0} // Use elevation property correctly
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: "#FFFFFF", // Set AppBar background color
        }}
      >
        <Toolbar>
          <Typography sx={{ color: "#000000", flexGrow:'1'}}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography sx={{ color: "#000000" }}> Mario</Typography>
          <Avatar src="/mario-av.png" sx={{marginLeft:2}}/>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#f4f4f4", // Optional: set a background for the drawer
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
          <Typography variant="h6" component="h3" sx={{ padding: 2 }}>
            Notes
          </Typography>
        </Box>

        {/* List of Links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#e8dce7" : null,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Content Area */}
      <Box
        sx={{
          background: "#f9f9f9",
          width: "100%",
          padding: 3,
          mt: 8, // Margin top to ensure content doesn't go under the AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
