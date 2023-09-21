import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'
import { Card, Divider, Text, Flex, Box, Tooltip, Tabs } from '@legion-ui/core'

const WebsiteAudienceMetrics = () => {

  const ItemTabs = [
    {
      key: 0,
      label: (
        <span style={{ paddingLeft: '8px' }}>Coverage</span>
      ),
    },
    {
      key: 1,
      label: (
      <span style={{ paddingLeft: '8px' }}>Component</span>
      ),
    },
  ]
  
  const series = [
    {
      name: 'Website',
      data: [400, 410, 350, 510, 790, 620, 690, 910, 480, 600, 410, 350]
    },
    {
      name: 'Android',
      data: [260, 370, 110, 320, 530, 220, 860, 530, 210, 130, 260, 370]
    },
    {
      name: 'iOS',
      data: [200, 450, 200, 400, 680, 340, 590, 800, 320, 400, 300, 290]
    },
  ]

  const options: ApexCharts.ApexOptions = {
    legend: {
      position: 'top'
    },
    chart: {
      zoom: {
        enabled: false
      },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]
    },
  }

  const CardData = (title: string, tooltip: string, mount: string) => (
    <Box width='25%' padding='12px'>
      <Flex alignY='center'>
        <Text size='14px' height='21px' weight='700' color='tertiary900' margin='0 10px 0 0'>
          {title}
        </Text>
        <Tooltip text={tooltip}><HelpCircle color='#8C8F93' size={16}/></Tooltip>
      </Flex>
      <Text size='24px' height='36px' weight='700' color='tertiary900'>{mount}</Text>
    </Box>
  )
  
  return (
    <Card>
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}}>
            <Tabs items={ItemTabs}></Tabs>
          </Flex>
      {/* <Text as='h3' size='18px' height='28px' weight='700' color='tertiary900'>
        Website Audience Metrics
      </Text>
      <Text size='14px' height='21px' margin='4px 0 0' color='#86909C'>
        Audience to which the users belonged while on the current date range.
      </Text> */}
      {/* <Divider padding='12px' /> */}
      <Flex margin='0 -12px 24px -12px' padding="0 12px 0 12px">
        {CardData('Total Coverage', 'Tooltip total coverage', '60%')}
        {CardData('Scan Repo', 'Tooltip Scan Repo', '20')}
        {CardData('Need to Scan', 'Tooltip Need to Scan', '5')}
        {CardData('Sessions', 'Total Usage', '8,312')}
      </Flex>
      {(typeof window !== 'undefined') && series ? <ReactApexChart
        options={options}
        series={series}
        height={290}
        type="area"
      /> : null}
    </Card>
  )
}

export default WebsiteAudienceMetrics