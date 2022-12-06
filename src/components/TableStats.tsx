import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useUserStatsContext } from "../context/user-context";
import { useAdjustedStatsContext } from "../context/adjusted-stats-context";

const TableStats = () => {
  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();


  // *** map the table dynamically instead of hard coding it
  return (
    <TableContainer p={5} m={1}>
      <Table size="sm">
        <Thead> 
          <Tr>
            <Th>Category</Th>
            <Th>Your Stats</Th>
            <Th>Adjusted Stats</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>PPG</Td>
            <Td>{userStatsObj.points}</Td>
            <Td>{adjustedStats.points}</Td>
          </Tr>
          <Tr>
            <Td>APG</Td>
            <Td>{userStatsObj.assists}</Td>
            <Td>{adjustedStats.assists}</Td>
          </Tr>
          <Tr>
            <Td>RPG</Td>
            <Td>{userStatsObj.rebounds}</Td>
            <Td>{adjustedStats.rebounds}</Td>
          </Tr>
          <Tr>
            <Td>SPG</Td>
            <Td>{userStatsObj.steals}</Td>
            <Td>{adjustedStats.steals}</Td>
          </Tr>
          <Tr>
            <Td>BPG</Td>
            <Td>{userStatsObj.blocks}</Td>
            <Td>{adjustedStats.blocks}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableStats;
