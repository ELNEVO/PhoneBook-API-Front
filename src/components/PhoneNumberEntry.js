import React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const PhoneNumberEntry = ({entry, edit}) => (
    <TableRow key={entry.id} onClick={() => edit(entry)} hover>
      <TableCell>{entry.name}</TableCell>
      <TableCell>{entry.phoneNumber}</TableCell>
    </TableRow>
);

export default PhoneNumberEntry;