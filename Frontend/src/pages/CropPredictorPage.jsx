// src/pages/CropPredictorPage.jsx
import CropForm from "../components/CropForm";
import { Box } from "@mui/material";
import "./CropPredictorPage.css";

const CropPredictorPage = () => {
  return (
    <Box
      sx={{
        overflowY: "auto", // page-level scroll
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <CropForm />
    </Box>
  );
};

export default CropPredictorPage;
