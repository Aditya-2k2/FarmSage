import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { getPredictedFertilizer } from "../services/api"; // 🚨 Update API call

// 🧾 Define all the required fields
const sections = {
  "Crop Information": ["Crop"],
  "Macronutrients": [
    "N (kg/ha) (Lower)",
    "N (kg/ha) (Upper)",
    "P (kg/ha) (Lower)",
    "P (kg/ha) (Upper)",
    "K (kg/ha) (Lower)",
    "K (kg/ha) (Upper)",
  ],
  "Secondary Nutrients": [
    "Ca (kg/ha) (Lower)",
    "Ca (kg/ha) (Upper)",
    "Mg (kg/ha) (Lower)",
    "Mg (kg/ha) (Upper)",
    "S (kg/ha) (Lower)",
    "S (kg/ha) (Upper)",
  ],
  Micronutrients: [
    "Fe (kg/ha) (Lower)",
    "Fe (kg/ha) (Upper)",
    "Mn (kg/ha) (Lower)",
    "Mn (kg/ha) (Upper)",
    "Cu (kg/ha) (Lower)",
    "Cu (kg/ha) (Upper)",
    "B (kg/ha) (Lower)",
    "B (kg/ha) (Upper)",
    "Mo (kg/ha) (Lower)",
    "Mo (kg/ha) (Upper)",
    "Zn (kg/ha) (Lower)",
    "Zn (kg/ha) (Upper)",
  ],
  "Environmental Factors": [
    "Soil pH (Lower)",
    "Soil pH (Upper)",
    "Rainfall (cm) (Lower)",
    "Rainfall (cm) (Upper)",
    "Humidity (%) (Lower)",
    "Humidity (%) (Upper)",
    "Soil Moisture (%) (Lower)",
    "Soil Moisture (%) (Upper)",
    "Water Holding Capacity (%) (Lower)",
    "Water Holding Capacity (%) (Upper)",
  ],
};

const FertilizerForm = () => {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      Object.values(sections)
        .flat()
        .map((key) => [key, ""])
    )
  );

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setResult("");

  try {
    // Convert number fields from string to actual number
    const formattedData = {};
    for (const key in formData) {
      // If it's the Crop field, keep as string; otherwise parse number
      formattedData[key] =
        key === "Crop" ? formData[key] : parseFloat(formData[key]);
    }

    const response = await getPredictedFertilizer(formattedData);
    console.log("🧪 Fertilizer Prediction Response:", response.recommended_fertilizer);

    setResult(response.recommended_fertilizer || "No recommendation");

    // ✅ Clear form fields after prediction
    setFormData(
      Object.fromEntries(
        Object.values(sections)
          .flat()
          .map((key) => [key, ""])
      )
    );

    
  } catch (err) {
    setResult("");
    setError(err.response?.data?.error || "Something went wrong!");
  }
};


  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Boruna, serif",
            color: "green",
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          🌿 Fertilizer Predictor
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {Object.entries(sections).map(([heading, fields]) => (
            <Box key={heading} mb={4}>
              <Typography
                variant="h6"
                color="green"
                fontWeight="bold"
                gutterBottom
              >
                {heading}
              </Typography>
              <Grid container spacing={2}>
                {fields.map((key) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      fullWidth
                      label={key}
                      type={key === "Crop" ? "text" : "number"}
                      variant="outlined"
                      required
                      value={formData[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Box mt={3}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Predict Fertilizer
            </Button>
          </Box>
        </Box>

        {error && (
          <Box mt={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {result && (
          <Box mt={5}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#e8f5e9" }}>
              <Typography variant="h6" gutterBottom color="green">
                🧪 Recommended Fertilizer:
              </Typography>
              <Typography fontWeight="bold" fontSize="1.1rem">
                {result}
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FertilizerForm;
