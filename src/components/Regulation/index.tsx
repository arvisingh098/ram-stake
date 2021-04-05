import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableCell, Text } from '@aragon/ui'

import IconHeader from "../common/IconHeader";

function Regulation({ user }: {user: string}) {

  return (
    <>
      <IconHeader icon={<i className="fas fa-chart-area"/>} text="Supply Regulation"/>
      <Table style={{width: '50%', alignItems: 'center', marginLeft: '25%', marginRight: '2%', outline: 'thin solid', border: '1px solid black'}}>
    <TableRow>
      <TableCell>
        <Text>Total Rewards :- February</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text>32 commits</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text>32 commits</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text>32 commits</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text>32 commits</Text>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Text>32 commits</Text>
      </TableCell>
    </TableRow>
  </Table>
    </>
  );
}

export default Regulation;
