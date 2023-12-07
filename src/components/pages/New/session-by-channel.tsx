import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { Monitor, Smartphone, ArrowUp } from 'react-feather'
import { Card, Text, Divider, Flex, Box, Chip } from '@legion-ui/core'
import TitleTooltip from './title-tooltip'

const SessionByChannel = () => {
  const series = [250, 100, 50, 100, 70, 20]
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    legend: {
      position: 'right',
      width: 250,
      fontSize: '12px',
      horizontalAlign: 'center',
      formatter: function (
        // eslint-disable-next-line
        seriesName: any, opts: any): any {
        return [seriesName, '-', opts.w.globals.series[opts.seriesIndex]]
      }
    },
    labels: ['Organic Search', 'Email', 'Referral', 'Instagram', 'Facebook', 'other'],
    dataLabels: { enabled: false },
    fill: { colors: ["#2970FF", "#12B76A", "#F79009", "#875BF7", "#F04438", "#B5BDCB"] },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Session',
              fontSize: '12px',
              color: '#4E5969',
              showAlways: true,
              // eslint-disable-next-line
              formatter: function (w: any) {
                const totals = w.globals.seriesTotals;
                // eslint-disable-next-line
                const result = totals.reduce((a: any, b: any) => a + b);
                return result;
              }
            }
          }
        }
      }
    }
  }
  
  return (
    <Card bordered>
      <TitleTooltip title='Session by Channel' tooltip='Tooltip'/>
      <Divider padding='12px' />
      <Flex alignX='space-between' padding='6px 0 28px 0'>
        <Flex>
          <Flex background='#F5F3FF' radius='8px' width='56px' height='56px' alignX='center' alignY='center' color='primary500'>
            <Monitor size={28} />
          </Flex>
          <Box margin='0 0 0 16px'>
            <Text color='tertiary900' weight='700' size='16px' height='150%' block margin='0 0 4px 0'>Desktop Device</Text>
            <Text color='tertiary900' weight='700' size='24px' height='150%'>
              9,000 
              <Chip variant='soft' color='success' style={{ marginLeft: '8px'}}>
                <ArrowUp size={14}/>
                15%
              </Chip>
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Flex background='#F5F3FF' radius='8px' width='56px' height='56px' alignX='center' alignY='center' color='primary500'>
            <Smartphone size={28} />
          </Flex>
          <Box margin='0 0 0 16px'>
            <Text color='tertiary900' weight='700' size='16px' height='150%' block margin='0 0 4px 0'>Mobile Device</Text>
            <Text color='tertiary900' weight='700' size='24px' height='150%'>
              4,000 
              <Chip variant='soft' color='success' style={{ marginLeft: '8px'}}>
                <ArrowUp size={14}/>
                15%
              </Chip>
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box width='478px'>
      {(typeof window !== 'undefined') && <ReactApexChart
          series={series}
          options={options}
          type='donut'
        />
        }
      </Box>
    </Card>
  )
}

export default SessionByChannel