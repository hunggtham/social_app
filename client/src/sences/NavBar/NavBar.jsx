import {
  DarkMode,
  LightMode,
  Message,
  // Message,
  Search,
  //   Message,
  //   LightMode,
  // NotificationsIcon,
  Help,
  Close,
} from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FlexBetween from "../../components/FlexBetween";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "../../state/index.js";
import { useState } from "react";

export const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const theme = useTheme();

  const neutralLight = theme.palette.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Soicalpedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
        {/* Destop Nav */}

        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispath(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <NotificationsIcon sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            {/* <FormControl variant="standard" value={fullName}> */}
            <FormControl variant="standard" value="222">
              <Select
                value="111"
                // value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSngIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-selection:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                {/* <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography> */}
                <MenuItem value="UserNameTest">
                  <Typography>UserNameTest</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispath(setLogout)}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            UserNameTest
          </IconButton>
        )}
      </FlexBetween>

      {/* mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          maxHeight="300px"
          backgroundColor={background}
        >
          <Box dislay="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* menu item: same with above*/}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <IconButton onClick={() => dispath(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <NotificationsIcon sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            {/* <FormControl variant="standard" value={fullName}> */}
            <FormControl variant="standard" value="222">
              <Select
                value="111"
                // value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSngIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-selection:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                {/* <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography> */}
                <MenuItem value="UserNameTest">
                  <Typography>UserNameTest</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispath(setLogout)}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};
