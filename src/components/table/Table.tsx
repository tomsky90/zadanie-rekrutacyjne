import { useState } from "react";
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import Spinner from "../spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import ErrorMessage from "../errorMessage.tsx/ErrorMessage";

interface Tag {
  name: string;
  count: number;
  [key: string]: unknown;
}

const TableComponent = () => {
  const { data, loading, error } = useFetch(
    `/2.3/tags?order=desc&sort=popular&site=stackoverflow`
  );

  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  const columns = [
    { id: "name", name: "Nazwa Tagu" },
    { id: "count", name: "Pole Count" },
  ];

  const handlechangepage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newpage: number
  ) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <ErrorMessage />}
      {data && (
        <Paper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowperpage}
            page={page}
            count={data.length}
            component="div"
            onPageChange={handlechangepage}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      style={{ backgroundColor: "black", color: "white" }}
                      key={column.name}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((item: Tag, i: number) => (
                    <TableRow key={i}>
                      {columns.map((column, j) => (
                        <TableCell key={j}>
                          {item[column.id] as string}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default TableComponent;
