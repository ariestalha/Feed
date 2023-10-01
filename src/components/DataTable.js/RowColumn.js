import React from "react";
import { TableCell } from "@mui/material";
import { flexRender } from "@tanstack/react-table";

export default function RowColumn(props) {
  const {
    cell,
    cell: {
      column: {
        columnDef: { onClick },
      },
    },
    onClickColumn,
  } = props;

  return (
    <TableCell
      className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
      key={cell.id}
    >
      {onClick ? (
        <a onClick={() => onClickColumn(cell)} href="javascript:void(0)">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </a>
      ) : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </TableCell>
  );
}
