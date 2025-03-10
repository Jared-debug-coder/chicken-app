import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";

const SignIn = ({ onSignIn, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username && password) {
      onSignIn();
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Card elevation={3} sx={{ mt: 5, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome to EggTrack
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
              Log in
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?
          </Typography>

          <Button variant="text" color="secondary" onClick={onSignUp}>
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
