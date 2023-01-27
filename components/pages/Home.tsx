import { Body, Box, Caption, Card, Flex, Heading } from "legion-ui";
import { Bar, Line } from "react-chartjs-2";
import { BookOpen, Code, Figma, Folder, Logo } from "../icons";
import * as usagesByMonth from '../../data/usages_by_month.json'
import * as usagesByProject from '../../data/usages_by_project.json';
import { BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const usagesByMonthOptions = {
    responsive: true,
    legend: {
        position: 'right' as const,
    },
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
            label: 'Legion Assets',
            data: legionUI,
            borderColor: 'rgb(135, 91, 247)',
            backgroundColor: 'rgba(135, 91, 247, 0.5)',
            fill: true,
            lineTension: 0.4,
        },
        {
            label: 'Local Assets',
            data: nonLegionUI,
            borderColor: 'rgb(247, 144, 9)',
            backgroundColor: 'rgba(247, 144, 9, 0.5)',
            fill: true,
            lineTension: 0.4
        },
    ],
};

const barDefaultOptions = {
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
            },
        },

    },
    responsive: false,
};

const getAdaptionByType = (type: 'target' | 'homebrew') => usagesByProject
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
            label: 'Legion Assets',
            data: legionUsages.usages,
            borderColor: 'rgb(135,91,247)',
            backgroundColor: 'rgb(135,91,247)',
            categoryPercentage: 1,
            barPercentage: 0.8,
            barThickness: 16
        },
    ],
};

const nonLegionData = {
    labels: nonLegionUsages.labels,
    datasets: [
        {
            label: 'Local Assets',
            data: nonLegionUsages.usages,
            borderColor: 'rgb(247,144,9)',
            backgroundColor: 'rgb(247,144,9)',
        },
    ],
};

export default function Home() {
    return <Box bg="secondary25">
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
        </Box>
        {/* TODO Tab */}
        <Box p={4}>
            <Flex sx={{ gap: '24px', width: '100%' }}>
                <Card p={3} variant="bordered" sx={{ width: '24%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Design Assets Website
                            </Body>
                            <Heading size="h4">
                                28 Component
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Figma />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="bordered" sx={{ width: '24%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Code Assets Website
                            </Body>
                            <Heading size="h4">
                                27 Component
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Code />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="bordered" sx={{ width: '24%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Documentation Assets Website
                            </Body>
                            <Heading size="h4">
                                20 Content
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <BookOpen />
                        </Box>
                    </Flex>
                </Card>
                <Card p={3} variant="bordered" sx={{ width: '24%' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                        <Box>
                            <Body size='sm_regular'>
                                Total Repository Usage
                            </Body>
                            <Heading size="h4">
                                2 Repository
                            </Heading>
                        </Box>
                        <Box ml="auto">
                            <Folder />
                        </Box>
                    </Flex>
                </Card>
            </Flex>
            <Flex mt="24px" sx={{ gap: '24px' }}>
                <Card variant='bordered' p={3} sx={{ width: '24%' }}>
                    <Body size="lg_bold">
                        Assets Adoption
                    </Body>
                    <Box>
                        <Body size="sm_regular">
                            Total of components adoption in projects
                        </Body>
                    </Box>
                    <Box mt={3} >
                        <Body size="lg_bold">
                            ?%
                        </Body>
                    </Box>
                    <Box bg="#DDE2EF" sx={{
                        position: 'relative',
                        height: '4px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                    }}>
                        <Flex
                            role="progressbar"
                            aria-valuemax={100}
                            aria-valuemin={0}
                            aria-valuenow={80}
                            aria-label="Assets Coverage"
                            bg="success500"
                            sx={{
                                width: '50%',
                                borderRadius: '20px',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        />

                    </Box>
                    <Box mt={"24px"} >
                        <Body size="lg_bold">
                            Leaderboard Project
                        </Body>
                    </Box>
                    <Box >
                        <Body size="sm_regular">
                            Top leader of adoption legion assets
                        </Body>
                    </Box>
                    <Flex mt="24px" sx={{ flexDirection: 'column', gap: '16px' }}>
                        <Flex>
                            <Body size="sm_regular">
                                Logee Port Repo
                            </Body>
                            <Body size="sm_bold" ml="auto">
                                ?%
                            </Body>
                        </Flex>
                        <Flex>
                            <Body size="sm_regular">
                                QIP Website Repo
                            </Body>
                            <Body size="sm_bold" ml="auto">
                                ?%
                            </Body>
                        </Flex>
                        <Flex>
                            <Body size="sm_regular">
                                Logee Order Repo
                            </Body>
                            <Body size="sm_bold" ml="auto">
                                ?%
                            </Body>
                        </Flex>
                        <Flex>
                            <Body size="sm_regular">
                                Agree Mart Website
                            </Body>
                            <Body size="sm_bold" ml="auto">
                                ?%
                            </Body>
                        </Flex>
                        <Flex>
                            <Body size="sm_regular">
                                MyTens Website
                            </Body>
                            <Body size="sm_bold" ml="auto">
                                ?%
                            </Body>
                        </Flex>
                    </Flex>
                </Card>
                <Card variant='bordered' p={3} sx={{ width: '75%' }}>
                    <Box>
                        <Body size="lg_bold" sx={{ display: 'block' }}>
                            Design system Adoption
                        </Body>
                    </Box>
                    <Box mb="24px">
                        <Body size="sm_regular" sx={{ display: 'block' }}>
                            Design system vs local component usages across all tracked projects
                        </Body>
                    </Box>
                    <Line options={usagesByMonthOptions} data={usagesByMonthChartData} style={{
                        maxHeight: '328px'
                    }} />
                </Card>
            </Flex>
            <Card mt="24px" variant='bordered' p={3} sx={{ width: '100%' }}>
                <Box>
                    <Body size="lg_bold" sx={{ display: 'block' }}>
                        Component Asset system Adoption
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
                        <Bar options={barDefaultOptions} data={legionData} width={600} height={600} />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Box>
                            <Body size='lg_bold' sx={{ display: 'block' }}>
                                Local Project Assets
                            </Body>
                        </Box>
                        <Bar options={{ ...barDefaultOptions, maintainAspectRatio: true, responsive: true }} data={nonLegionData} />
                    </Box>
                </Flex>
            </Card>
        </Box>
    </Box >
}