import React from 'react'
import { Flex, Card, Text, Chip } from '@legion-ui/core'
import { ArrowUp } from 'react-feather'
import ReactApexChart from 'react-apexcharts'
import TitleTooltip from './title-tooltip'

const TotalUsers = () => {
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
    colors: ['#F79009'],
    stroke: { curve: 'smooth', },
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
      <TitleTooltip title='Total Users' tooltip='Tooltip'/>
      <Text color='tertiary900' weight='700' size='24px' height='36px' padding='4px 0 0 0'>86,000</Text>
      <Flex alignY='center' padding='4px 0 12px 0'>
        <Chip variant='soft' color='success'>
          <ArrowUp size={14}/>
          25%
        </Chip>
        <Text margin='0 0 0 10px' color='#5F6D7E'>from week</Text>
      </Flex>
      {(typeof window !== 'undefined') && <ReactApexChart series={series} type='area' options={options} height={110}/> }
    </Card>
  )
}

export default TotalUsers