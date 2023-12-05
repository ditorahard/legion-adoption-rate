import React from 'react'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { HelpCircle } from 'react-feather'
import { Card, Divider, Text, Flex, Box, Tooltip, Tabs } from '@legion-ui/core'

type CoverageOverview = {
  need_to_scan: number,
  total_coverage: number,
  scan_repo: number,
  total_assets: number
}

type CoverageGraph = {
  web: [],
  ios: [],
  android: []
}

type Props = {
  coverageOverview: CoverageOverview,
  coverageGraph: CoverageGraph
}

const WebsiteAudienceMetrics = (props: Props) => {
  const {coverageGraph, coverageOverview} = props;

  const ItemTabs = [
    {
      key: 0,
      label: (
        <span style={{ paddingLeft: '8px' }}>Adoption</span>
      ),
    },
    {
      key: 1,
      label: (
      <span style={{ paddingLeft: '8px' }}>Coverage</span>
      ),
    },
  ]
  
  const series = [
    {
      name: 'Website',
      data: coverageGraph.web
    },
    {
      name: 'Android',
      data: coverageGraph.android
    },
    {
      name: 'iOS',
      data: coverageGraph.ios
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

  const CardData = (title: string, tooltip: string, mount: any) => (
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
      <Flex margin='0 -12px 24px -12px' padding="0 12px 0 12px">
        {CardData('Total Coverage', 'Tooltip total coverage', Math.round(coverageOverview.total_coverage) + '%')}
        {CardData('Scan Repo', 'Tooltip Scan Repo', coverageOverview.scan_repo)}
        {CardData('Need to Scan', 'Tooltip Need to Scan', coverageOverview.need_to_scan)}
        {CardData('Total Assets', 'Total Assets', coverageOverview.total_assets)}
      </Flex>
      {(typeof window !== 'undefined') && series ? <ReactApexChart
        options={options}
        series={series}
        width={"100%"}
        height={290}
        type="area"
      /> : null}
    </Card>
  )
}

export default WebsiteAudienceMetrics