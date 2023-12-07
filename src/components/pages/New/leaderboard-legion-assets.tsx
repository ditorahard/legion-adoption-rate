import React from 'react'
import { Card, Flex, Table, Tabs } from '@legion-ui/core'

type LeaderboardValue = {
  value: number,
  platform: string
}
type LeaderboardLegionItem = {
  name: string,
  data: Array<LeaderboardValue>
}

type Props = {
  leaderboardHomebrew: Array<LeaderboardLegionItem>;
  leaderboardComponent: Array<LeaderboardLegionItem>;
}

const LeaderboardLegionAssets = (props:Props) => {
  const {leaderboardHomebrew, leaderboardComponent} = props;

  const renderLeaderboardComponent = () => {
    return leaderboardComponent.map((item,i) => {
      return (
        <tr key={i}>
         <td>{i+1}</td>
         <td>{item.name}</td>
         <td>{item?.data?.find(o => o.platform === 'Web')?.value}</td>
         <td>{item?.data?.find(o => o.platform === 'Android')?.value}</td>
         <td>{item?.data?.find(o => o.platform === 'iOS')?.value}</td>
        </tr>
      )
    })
  }

  const renderLeaderboardHomebrew = () => {
    return leaderboardHomebrew.map((item,i) => {
      return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{item.name}</td>
          <td>{item?.data?.find(o => o.platform === 'Web')?.value}</td>
         <td>{item?.data?.find(o => o.platform === 'Android')?.value}</td>
         <td>{item?.data?.find(o => o.platform === 'iOS')?.value}</td>
        </tr>
      )
    })
  }

    
      const LeaderboardLegionTabs = [
        {
          key: 0,
          label: (
            <span style={{ paddingLeft: '8px' }}>Tribe Leaderboard</span>
          ),
          children: (<Table className='table-top-5-page' striped>
          <thead>
            <tr>
            <th>Rank</th>
            <th>Component</th>
            <th>Web</th>
            <th>Android</th>
            <th>iOS</th>
              
            </tr>
          </thead>
          <tbody>
            {renderLeaderboardComponent()}
          </tbody>
        </Table>)
        },
        {
          key: 1,
          label: (
          <span style={{ paddingLeft: '8px' }}>DTP Leaderboard</span>
          ),
          children: (<Table className='table-top-5-page' striped>
          <thead>
            <tr>
            <th>Rank</th>
            <th>Component</th>
            <th>Web</th>
            <th>Android</th>
            <th>iOS</th>
            </tr>
          </thead>
          <tbody>
            {renderLeaderboardHomebrew()}
          </tbody>
        </Table>)
        },
      ]

  return (
    <Card>
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}} margin="0 0 12px">
        <Tabs items={LeaderboardLegionTabs}></Tabs>
      </Flex>
    </Card>
  )
}

export default LeaderboardLegionAssets