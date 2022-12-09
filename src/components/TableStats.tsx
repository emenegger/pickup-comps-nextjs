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
import { useNbaCompContext } from "../context/nba-comp-context";
import StatRow from "./StatRow";

const TableStats = (props: any) => {
  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();
  const [nbaComp, setNbaComp] = useNbaCompContext();

  // *** map the table dynamically instead of hard coding it
  return (
    <TableContainer p={5} m={1}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Your Stats</Th>
            <Th>Adjusted Stats</Th>
            <Th>{nbaComp.last_name}'s Stats</Th>
          </Tr>
        </Thead>
        <Tbody>
          <StatRow
            category="PPG"
            user={userStatsObj.points}
            adjusted={adjustedStats.points}
            nba={nbaComp.pts}
          />
          <StatRow
            category="APG"
            user={userStatsObj.assists}
            adjusted={adjustedStats.assists}
            nba={nbaComp.ast}
          />
          <StatRow
            category="RPG"
            user={userStatsObj.rebounds}
            adjusted={adjustedStats.rebounds}
            nba={nbaComp.reb}
          />
          <StatRow
            category="SPG"
            user={userStatsObj.steals}
            adjusted={adjustedStats.steals}
            nba={nbaComp.stl}
          />
          <StatRow
            category="BPG"
            user={userStatsObj.blocks}
            adjusted={adjustedStats.blocks}
            nba={nbaComp.blk}
          />
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableStats;
