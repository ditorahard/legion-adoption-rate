import React from 'react'
import { Flex, Card, Text, Chip } from '@legion-ui/core'
import ReactApexChart from 'react-apexcharts'
import { ArrowDown } from 'react-feather'
import TitleTooltip from './title-tooltip'


const BounceRate = () => {
  const series = [
    {
      data: [30, 40, 20, 35, 20, 30, 20, 28, 20, 25]
    },
  ]

  const options: ApexCharts.ApexOptions = {
    chart: {
      sparkline: {
        enabled: true
      },
    },
    colors: ['#0FC6C2'],
    stroke: { curve: 'straight', },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      },
    },
  }

  return (
    <Card bordered>
      <TitleTooltip title='Bounce Rate' tooltip='Tooltip'/>
      <Text color='tertiary900' weight='700' size='24px' height='36px' padding='4px 0 0 0'>33.50%</Text>
      <Flex alignY='center' padding='4px 0 12px 0'>
        <Chip variant='soft' color='error'>
          <ArrowDown size={14}/>
          25%
        </Chip>
        <Text margin='0 0 0 10px' color='#5F6D7E'>from week</Text>
      </Flex>
      {(typeof window !== 'undefined') && <ReactApexChart series={series} type='area' options={options} height={110} />}
    </Card>
  )
}

export default BounceRate