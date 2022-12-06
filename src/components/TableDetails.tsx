import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

const TableDetails = (props: any) => {
  const {playerDetails} = props;
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Position</Th>
            <Th>Team</Th>
            <Th>Age</Th>
            <Th>Height</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{playerDetails.position}</Td>
            <Td>{playerDetails.team}</Td>
            <Td>{playerDetails.age}</Td>
            <Td>{playerDetails.height_feet}' {playerDetails.height_inches}"</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableDetails;
