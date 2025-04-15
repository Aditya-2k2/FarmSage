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
import { getPredictedCrops } from "../services/api";

// ✅ Grouped sections for cleaner rendering
const sections = {
  "Macronutrients (Primary)": [
    "Nitrogen (N)",
    "Phosphorus (P₂O₅)",
    "Potassium (K₂O)",
  ],
  "Macronutrients (Secondary)": [
    "Sulfur (S)",
    "Calcium (Ca)",
    "Magnesium (Mg)",
  ],
  Micronutrients: [
    "Iron (Fe)",
    "Manganese (Mn)",
    "Copper (Cu)",
    "Boron (B)",
    "Molybdenum (Mo)",
    "Chlorine (Cl)",
    "Nickel (Ni)",
    "Zinc (Zn)",
  ],
  "Other Parameters": ["Water", "Organic Matter", "Temperature", "Rainfall"],
};

const CropForm = () => {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      Object.values(sections)
        .flat()
        .map((key) => [key, ""])
    )
  );
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await getPredictedCrops(formData);
      setResult(res.recommended_crops);
    } catch (err) {
      setResult([]);
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
          🌱 Crop Predictor
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
                      label={
                        key === "Temperature"
                          ? "Temperature (°C)"
                          : key === "Rainfall"
                          ? "Rainfall (cm)"
                          : key
                      }
                      type="number"
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

          <Typography variant="h7" color="green" fontWeight="bold" gutterBottom>
            All the nutrient values are to be entered in kg/m<sup>3</sup>
          </Typography>

          <Box mt={3}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Predict Crop
            </Button>
          </Box>
        </Box>

        {error && (
          <Box mt={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {result.length > 0 && (
          <Box mt={5}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#e8f5e9" }}>
              <Typography variant="h6" gutterBottom color="green">
                🌾 Recommended Crops:
              </Typography>
              <ul>
                {result.map((crop, i) => (
                  <li key={i}>
                    <Typography>{crop}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default CropForm;
