import React, { useEffect, useState } from "react";
import Partition from "../partition/partition";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

const Cage = ({ cage }) => {
  const [alertActive, setAlert] = useState(false);
  const [eggData, setEggData] = useState({});

  useEffect(() => {
  }, []);

  const handleEggChange = (partitionIndex, rowIndex, colIndex, value) => {
    setEggData((prevData) => ({
      ...prevData,
      [`${partitionIndex}-${rowIndex}-${colIndex}`]: value,
    }));
  };

  const groupPartitions = (partitions) => {
    return partitions.map((partition, partitionIndex) => {
      return {
        ...partition,
        rows: Array.from({ length: 4 }, (_, rowIndex) => {
          return {
            columns: Array.from({ length: 4 }, (_, colIndex) => {
              return {
                id: `${partitionIndex}-${rowIndex}-${colIndex}`,
                chickens: partition.chickens[rowIndex * 4 + colIndex] || 0,
              };
            }),
          };
        }),
      };
    });
  };

  const handleSubmit = async () => {
    const submissionData = {
      cageId: cage.id,
      partitions: cage.partitions.map((partition, partitionIndex) => ({
        partitionIndex: partitionIndex + 1,
        eggsCollected: Object.entries(eggData)
          .filter(([key]) => key.startsWith(`${partitionIndex}-`))
          .map(([key, value]) => ({ key, value })),
        comments: partition.comments,
      })),
    };

    try {
      const response = await fetch("/api/submit-cage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        alert("Cage data submitted successfully!");
      } else {
        setAlert(true);
        alert("Failed to submit cage data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  return (
    <Box p={3}>
      {alertActive && (
        <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
          This is an outlined success alert.
        </Alert>
      )}
      <Typography variant="h4" gutterBottom>
        Cage {cage.id}
      </Typography>
      {["Front Partition", "Back Partition"].map(
        (partitionLabel, partitionIdx) => (
          <Box key={partitionIdx} mt={4}>
            <Typography variant="h5" gutterBottom>
              {partitionLabel}
            </Typography>
            <Grid container spacing={2}>
              {groupPartitions(
                cage.partitions.slice(partitionIdx, partitionIdx + 1)
              ).map((partition, partitionIndex) => (
                <Grid item xs={12} key={partitionIndex}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6">
                        Partition {partitionIndex + 1}
                      </Typography>
                      {partition.rows.map((row, rowIndex) => (
                        <Box
                          key={rowIndex}
                          display="flex"
                          justifyContent="space-around"
                          mb={2}
                        >
                          {row.columns.map((col, colIndex) => (
                            <Box
                              key={col.id}
                              p={1}
                              border={1}
                              borderRadius={2}
                              textAlign="center"
                              sx={{backgroundColor:"blue"}}
                            >
                              {/* <Typography>{col.chickens}Chickens</Typography> */}
                              <Typography>4 Chickens</Typography>
                              <TextField
                                type="number"
                                label="Eggs"
                                variant="outlined"
                                size="small"
                                value={
                                  eggData[
                                    `${partitionIndex}-${rowIndex}-${colIndex}`
                                  ] || ""
                                }
                                onChange={(e) =>
                                  handleEggChange(
                                    partitionIndex,
                                    rowIndex,
                                    colIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </Box>
                          ))}
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      )}
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Cage {cage.id}
        </Button>
      </Box>
    </Box>
  );
};

export default Cage;
