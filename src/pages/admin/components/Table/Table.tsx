import { FC } from 'react';
import { Table as TableComponent } from 'reactstrap';
import styled from 'styled-components';
import Link from 'next/link';

import { IRow } from '@pages/admin/components/Table/types/IRow';

interface IProps {
  rows: IRow[];
}

export const Table: FC<IProps> = ({ rows }) => (
  <STable>
    <TableComponent responsive={false}>
      <thead>
        <tr key={0}>
          <th>#</th>
          {rows[0].values.map((value, idx) => (
            <th key={idx}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(
          (row, rowIdx) =>
            rowIdx !== 0 && (
              <tr key={rowIdx + 1}>
                <th scope='row'>{rowIdx}</th>
                {row.values.map((value, valueIdx) =>
                  Array.isArray(value) ? (
                    <td key={valueIdx + rowIdx + 1}>
                      {value.map((link, idx) => (
                        <SLink key={idx}>
                          <Link href={link.url}>{link.text}</Link>
                        </SLink>
                      ))}
                    </td>
                  ) : (
                    <td key={valueIdx}>{value}</td>
                  ),
                )}
              </tr>
            ),
        )}
      </tbody>
    </TableComponent>
  </STable>
);

const STable = styled.div`
  overflow: scroll;
  white-space: nowrap;

  & a {
    width: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SLink = styled.span`
  margin-left: 10px;
`;
