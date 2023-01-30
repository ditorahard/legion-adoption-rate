import { Body, Box, Caption, Card, Flex, Heading } from "legion-ui";
import { Bar, Line } from "react-chartjs-2";
import { BookOpen, Code, Figma, Folder, Logo } from "../../icons";
import * as usagesByMonth from '../../../data/usages_by_month.json'
import * as usagesByProject from '../../../data/usages_by_project.json';
import { BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import SummaryInfo from "./SummaryInfo";
import AssetAdoption from "./AssetAdoption";

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

const summaryInfoList = [
    {
        label: 'Design Assets Website',
        value: '28 Component',
        icon: <Figma />

    },
    {
        label: 'Code Assets Website',
        value: '27 Component',
        icon: <Code />

    },
    {
        label: 'Documentation Assets Website',
        value: '20 Content',
        icon: <BookOpen />

    },
    {
        label: 'Total Repository Usage',
        value: '2 Repository',
        icon: <Folder />

    },
]

const adoptionEachProjects = [
    {
        label: 'Logee Port Repo',
        value: 0
    },
    {
        label: 'QIP Website Repo',
        value: 0
    },
    {
        label: 'Logee Order Repo',
        value: 0
    },
    {
        label: 'Agree Mart Website',
        value: 0
    },
    {
        label: 'MyTens Website',
        value: 0
    },
]

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
                {summaryInfoList.map(info => <SummaryInfo key={info.label} {...info} />)}
            </Flex>
            <Flex mt="24px" sx={{ gap: '24px' }}>
                <AssetAdoption componentPercentage={0} adoptionEachProjects={adoptionEachProjects} />
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

