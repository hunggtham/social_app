import { useState } from "react";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notification,
  Help,
  Menu,
  Close,
} from "@mui/icon-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const theme = useTheme();

  return <div>NavBar</div>;
};

export default NavBar;
