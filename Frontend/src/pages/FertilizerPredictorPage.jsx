// src/pages/CropPredictorPage.jsx
import FertilizerForm from "../components/FertilizerForm";
import { Box } from "@mui/material";
import "./CropPredictorPage.css";

const FertilizerPredictorPage = () => {
  return (
    <Box
      sx={{
        overflowY: "auto", // page-level scroll
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <FertilizerForm />
    </Box>
  );
};

export default FertilizerPredictorPage;
