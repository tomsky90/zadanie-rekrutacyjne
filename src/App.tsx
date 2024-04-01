import TableComponent from "./components/table/Table";
import { useDispatch } from "react-redux";
import useFetch from "./hooks/useFetch";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./App.css";
import { useEffect } from "react";
import { setData } from "./redux/tagsSlice";

function App() {
  const dispatch = useDispatch();

  const { data, loading, error } = useFetch(
    `/2.3/tags?order=desc&sort=popular&site=stackoverflow`
  );

  useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          style={{ fontSize: "32px", textAlign: "center" }}
          sx={{ my: "40px" }}
        >
          Zadanie Rekrutacyjne
        </Typography>
        <TableComponent loading={loading} error={error} />
      </Container>
    </>
  );
}

export default App;
