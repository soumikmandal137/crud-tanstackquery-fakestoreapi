import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/main/productlist">
            <ListItemText primary="Product List" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/main/productadd">
            <ListItemText primary="Add Product" />
          </ListItemButton>
        </ListItem>



  <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/main/userlist">
            <ListItemText primary="users" />
          </ListItemButton>
        </ListItem>


 <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/main/useradd">
            <ListItemText primary="Add user" />
          </ListItemButton>
        </ListItem>




      </List>
    </Box>
  );
};

export default Sidebar;
