import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const Login = () => {
  const theme = useTheme();
  const isNonMobieScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box width={"100%"} textAlign={"center"}>
      <Box
        width={"100%"}
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={"32px"} color={"primary"}>
          SocialPedia
        </Typography>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          width={isNonMobieScreens ? "50%" : "100%"}
          p="2rem"
          m="2rem , auto"
          borderRadius={"1.5rem"}
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to SocialPedia ,The Social media for sociopaths;
          </Typography>
          <Form />
        </Box>
      </div>
    </Box>
  );
};
export default Login;
