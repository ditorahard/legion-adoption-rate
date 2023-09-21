import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Flex, Box, Card, Text, Chip } from '@legion-ui/core'
import { ArrowUp } from 'react-feather'
import TitleTooltip from './title-tooltip'

const AllSession = () => {
  const series = [
    { data: [90, 100, 80, 100, 70, 80, 90, 90, 80, 100, 80, 100] },
  ]
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true
      },
    },
    colors: ['#165DFF'],
    stroke: { curve: 'straight', width: 0 },
  }

  return (
    <Card bordered>
      <Flex>
        <Box width='50%' padding='12px'>
          <TitleTooltip title='All Sessions' tooltip='Tooltip'/>
          <Flex padding='8px 0 0 0' alignY='center'>
            <Text as='h3' size='30px' height='36px' color='#272D37' weight='700' padding='0 12px 0 0'>
              16,869
            </Text>
            <Chip variant='soft' color='success'>
              <ArrowUp size={14}/>
              25%
            </Chip>
          </Flex>
          <Text as='p' size='14px' color='#5F6D7E' weight='300'>
            The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc.
          </Text>
        </Box>
        <Box width='50%' padding='12px'>
        {(typeof window !== 'undefined') && <ReactApexChart
            series={series}
            options={options}
            type="bar"
            height={180}
          />}
        </Box>
      </Flex>
    </Card>
  )
}

export default AllSession
