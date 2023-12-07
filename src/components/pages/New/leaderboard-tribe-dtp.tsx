import React from 'react'
import { Card, Flex, Table, Chip, Tabs } from '@legion-ui/core'

type LeaderboardDTPItem = {
  coverage: number,
  dtp: string,
  id: string,
  tribe: string,
  platform: string,
}

type Props = {
  leaderboardTribe: Array<LeaderboardDTPItem>;
  leaderboardDTP: Array<LeaderboardDTPItem>;
}

const LeaderboardTribeDTP = (props: Props) => {
  const {leaderboardTribe, leaderboardDTP} = props; 
  
  const chipColorPicker = (platform: string) =>  {
    switch(platform){
      case 'Android':
        return 'success';
        break;
      case 'Website':
        return 'secondary';
        break;
      case 'iOS':
        return 'warning';
        break;
    }
  }

  const renderLeaderboardDTP = () => {
    return leaderboardDTP.map((item,i) => {
      const chipColor = chipColorPicker(item.platform);
      return (
        <tr key={i}>
         <td>{i+1}</td>
          <td>{item.dtp}</td>
          <td>{Math.round(item.coverage) + '%'}</td>
          <td><Chip variant="soft" color={chipColor}>{item.platform}</Chip></td>
        </tr>
      )
    })
  }

  const renderLeaderboardTribe = () => {
    return leaderboardTribe.map((item,i) => {
      return (
        <tr key={i}>          
          <td>{i+1}</td>
          <td>{item.tribe}</td>
          <td>{Math.round(item.coverage) + '%'}</td>
        </tr>
      )
    })
  }

  const TribeTabs = [
    {
      key: 0,
      label: (
        <span style={{ paddingLeft: '8px' }}>Tribe Leaderboard</span>
      ),
      children: <Table className='table-top-5-page' striped>
      <thead>
        <tr>
        <th>Rank</th>
          <th>Tribe</th>
          <th>Adopt</th>
          
        </tr>
      </thead>
      <tbody>
        {renderLeaderboardTribe()}
      </tbody>
    </Table>
    },
    {
      key: 1,
      label: (
      <span style={{ paddingLeft: '8px' }}>DTP Leaderboard</span>
      ),
      children: <Table className='table-top-5-page' striped>
      <thead>
        <tr>
        <th>Rank</th>
          <th>DTP Name</th>
          <th>Adopt</th>
          <th>Platform</th>
        </tr>
      </thead>
      <tbody>
        {renderLeaderboardDTP()}
      </tbody>
    </Table>
    },
  ]

  return (
    <Card>
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}} margin="0 0 12px">
        <Tabs items={TribeTabs}></Tabs>
      </Flex>
      
    </Card>
  )
}

export default LeaderboardTribeDTP