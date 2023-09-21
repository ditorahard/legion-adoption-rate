import React from 'react'
import { ChevronRight } from 'react-feather'
import { Anchor, Card, Divider, Flex, Table, Chip, Tabs } from '@legion-ui/core'
import TitleTooltip from './title-tooltip'

const Top5PageViews = () => {

  const TribeTabs = [
    {
      key: 0,
      label: (
        <span style={{ paddingLeft: '8px' }}>Tribe Leaderboard</span>
      ),
    },
    {
      key: 1,
      label: (
      <span style={{ paddingLeft: '8px' }}>DTP Leaderboard</span>
      ),
    },
  ]

  return (
    <Card>
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}} margin="0 0 12px">
        <Tabs items={TribeTabs}></Tabs>
      </Flex>
      <Table className='table-top-5-page' striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>DTP Name</th>
            <th>Adopt</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Agree Seller</td>
            <td>90%</td>
            <td><Chip variant="soft" color="secondary">Website</Chip></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Agree Buyer</td>
            <td>80%</td>
            <td><Chip variant="soft" color="success">Android</Chip></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Logee port</td>
            <td>70%</td>
            <td><Chip variant="soft" color="warning">iOS</Chip></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Logee truck</td>
            <td>80%</td>
            <td><Chip variant="soft" color="secondary">Website</Chip></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Agree Market</td>
            <td>70%</td>
            <td><Chip variant="soft" color="success">Android</Chip></td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default Top5PageViews