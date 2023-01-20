import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';

import { Body, Box, Caption, Card, Flex, Heading } from 'legion-ui'

import { data1 } from '../data/data'
import * as usagesByMonth from '../data/usages_by_month.json'
import { BookOpen, Code, Figma, Folder, Logo } from '@/components/icons';
import { access } from 'fs';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    scales: {
        y: {
            ticks: {
                autoSkip: false
            }
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
    },
};


const getAdaptionByType = (type: 'target' | 'homebrew') => data1
    .filter(x => x.type === type)
    .map(x => {
        const component = x.component;
        const match = component.startsWith("component") ? component.match(/^component\s*(.*)/) : component.match(/^import\s*(.*?)\s/);
        return {
            ...x,
            component: match ? match[1] : '',
        };
    })
    .sort((a, b) => b.usages - a.usages)

const adaptionDataToChartData = (type: 'target' | 'homebrew') =>
    getAdaptionByType(type).reduce<{ labels: string[], usages: number[] }>((acc, { component, usages }) => {
        return { labels: [...acc.labels, component], usages: [...acc.usages, usages] }
    }, { labels: [], usages: [] })

const legionUsages =
    adaptionDataToChartData('target')

const nonLegionUsages =
    adaptionDataToChartData('homebrew')

const legionData = {
    labels: legionUsages.labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: legionUsages.usages,
            borderColor: 'rgb(135,91,247)',
            backgroundColor: 'rgb(135,91,247)',
        },
    ],
};

const nonLegionData = {
    labels: nonLegionUsages.labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: nonLegionUsages.usages,
            borderColor: 'rgb(247,144,9)',
            backgroundColor: 'rgb(247,144,9)',
        },
    ],
};

const usagesByMonthOptions = {
    responsive: true,
};

const labels = Object.keys(usagesByMonth).reverse().filter((v => v !== 'default'))



const { legionUI, nonLegionUI } = Object.values(usagesByMonth)
    .reverse()
    .reduce<{ legionUI: number[], nonLegionUI: number[] }>((acc, { legionUI, nonLegionUI }) => ({
        legionUI: legionUI === undefined ? acc.legionUI : [...acc.legionUI, legionUI],
        nonLegionUI: nonLegionUI === undefined ? acc.nonLegionUI : [...acc.nonLegionUI, nonLegionUI]
    })
        , {
            legionUI: [],
            nonLegionUI: []
        })
        
const usagesByMonthChartData = {
    labels,
    fill: true,
    datasets: [
        {
            label: 'legion Assets',
            data: legionUI,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
            lineTension: 0.4

        },
        {
            label: 'Local Assets',
            data: nonLegionUI,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: true,
            lineTension: 0.4
        },
    ],
};



export default function Chart() {
    return <Box>
        <Flex px={4} bg='black' sx={{ height: '64px', alignItems: 'center' }}>
            <Logo />
        </Flex>

        <Box px={4} mt={'24px'}>
            <Heading size='h5' sx={{ fontFamily: 'Nunito !important' }}>
                Hi, Welcome Back
            </Heading>
            <Caption size='lg_regular'>
                Legion design system adoption rate analytic dashboard
            </Caption>
            <Box sx={{ height: '328px' }}>
                <Line options={usagesByMonthOptions} data={usagesByMonthChartData} />
            </Box>
        </Box>
        {/* TODO Tab */}
        <Box p={4}>
            <Flex sx={{ gap: '24px', width: '100%' }}>
                <Card p={3} variant="shadow" sx={{ width: '25%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Design Assets Website
                            </Body>
                            <Heading size="h4">
                                ? Component
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Figma />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="shadow" sx={{ width: '25%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Code Assets Website
                            </Body>
                            <Heading size="h4">
                                ? Component
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Code />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="shadow" sx={{ width: '25%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Documentation Assets Website
                            </Body>
                            <Heading size="h4">
                                ? Content
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <BookOpen />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="shadow" sx={{ width: '25%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Total Repository Usage
                            </Body>
                            <Heading size="h4">
                                ? Repository
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Folder />
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Card mt="24px" variant='shadow' p={3} sx={{ width: '100%' }}>
                <Box>
                    <Body size="lg_bold" sx={{ display: 'block' }}>
                        Design system Adoption
                    </Body>
                </Box>
                <Box>
                    <Body size="sm_regular" sx={{ display: 'block' }}>
                        Design system vs local component usages across all tracked projects
                    </Body>
                </Box>
                <Flex mt={3}>
                    <Box sx={{ width: '50%' }}>
                        <Box>
                            <Body size='lg_bold' sx={{ display: 'block' }}>
                                Legion Assets
                            </Body>
                        </Box>
                        <Bar options={options} data={legionData} />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Box>
                            <Body size='lg_bold' sx={{ display: 'block' }}>
                                Local Project Assets
                            </Body>
                        </Box>
                        <Bar options={options} data={nonLegionData} />
                    </Box>
                </Flex>
            </Card>
        </Box>
    </Box>
}
