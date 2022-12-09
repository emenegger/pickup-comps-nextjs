import {
  Td,
  Tr
} from '@chakra-ui/react'

import React from 'react'

const StatRow = (props: any) => {
  const {category, user, adjusted, nba} = props;

  return (
    <Tr>
      <Td>{category}</Td>
      <Td>{user}</Td>
      <Td>{adjusted}</Td>
      <Td>{nba}</Td>
    </Tr>
  )
}

export default StatRow