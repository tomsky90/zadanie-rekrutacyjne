import { useState } from "react";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
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

import ErrorMessage from "../errorMessage.tsx/ErrorMessage";

type Tag = {
  name: string;
  count: number;
};

interface TableComponentProps {
  loading: boolean;
  error: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ loading, error }) => {
  const { items } = useSelector((state: RootState) => state.tags);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  const columns = [
    { id: "name", name: "Nazwa Tagu" },
    { id: "count", name: "Pole Count" },
  ];

  const handlechangepage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
      {items.length > 1 && (
        <Paper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowperpage}
            page={page}
            count={items.length}
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
                {items
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((tag: Tag, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{tag.name}</TableCell>
                      <TableCell>{tag.count}</TableCell>
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
