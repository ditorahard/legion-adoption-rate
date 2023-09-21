import React from 'react'
import { ChevronRight } from 'react-feather'
import { Anchor, Card, Divider, Flex, Table, Chip, Tabs } from '@legion-ui/core'
import TitleTooltip from './title-tooltip'

const Top5PageViews = () => {

    const LeaderboardLegionTabs = [
        {
          key: 0,
          label: (
            <span style={{ paddingLeft: '8px' }}>Legion Component</span>
          ),
        },
        {
          key: 1,
          label: (
          <span style={{ paddingLeft: '8px' }}>Non Legion Component</span>
          ),
        },
      ]

  return (
    <Card>
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}} margin="0 0 12px">
        <Tabs items={LeaderboardLegionTabs}></Tabs>
      </Flex>
      <Table className='table-top-5-page' striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Component</th>
            <th>Web</th>
            <th>Android</th>
            <th>IOS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Button</td>
            <td>90</td>
            <td>70</td>
            <td>40</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Typography</td>
            <td>80</td>
            <td>70</td>
            <td>40</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Checkbox</td>
            <td>80</td>
            <td>70</td>
            <td>40</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Text Field</td>
            <td>80</td>
            <td>70</td>
            <td>40</td>            
          </tr>
          <tr>
            <td>5</td>
            <td>Dropdown</td>
            <td>80</td>
            <td>70</td>
            <td>90</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default Top5PageViews