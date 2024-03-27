import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        style={{ fontSize: "32px", textAlign: "center" }}
        sx={{ my: "40px" }}
      >
        Zadanie Rekrutacyjne
      </Typography>
    </Container>
  );
}

export default App;
