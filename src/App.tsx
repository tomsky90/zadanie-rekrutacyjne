import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const { data, loading, error } = useFetch(
    `/2.3/tags?order=desc&sort=popular&site=stackoverflow`
  );

  return (
    <>
      {console.log(data)}
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          style={{ fontSize: "32px", textAlign: "center" }}
          sx={{ my: "40px" }}
        >
          Zadanie Rekrutacyjne
        </Typography>
      </Container>
    </>
  );
}

export default App;
