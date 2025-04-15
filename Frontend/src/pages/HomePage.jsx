import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Container maxWidth="sm" disableGutters>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 5 },
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Box mb={2}>
            <AgricultureIcon sx={{ fontSize: 60, color: "green" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.4rem",
              fontWeight: 500,
            }}
          >
            <span>Welcome to</span>
            <span
              style={{
                fontFamily: "Florisha, cursive",
                fontSize: "1.8rem",
                color: "green",
              }}
            >
              FarmSage
            </span>
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Your smart assistant for predicting the best crops to grow based on
            soil and climate.
          </Typography>

          <Box mt={4}>
            <Button
              variant="contained"
              color="success"
              size="large"
              component={Link}
              to="/predictor"
            >
              Go to Crop Predictor
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default HomePage;
