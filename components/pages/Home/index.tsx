import { Body, Box, Caption, Card, Flex, Heading, Select } from "legion-ui";
import { Bar } from "react-chartjs-2";
import { BookOpen, Code, Figma, Folder, Logo } from "../../icons";
import * as usagesByMonth from '../../../data/usages_by_month.json'
import { usagesByProject } from '../../../data/usagesByProject';
import type { Project } from '../../../data/usagesByProject';
import { BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import SummaryInfo from "./SummaryInfo";
import AssetAdoption from "./AssetAdoption";
import { useMemo, useState } from "react";
import DesignSystemAdoption from "./DesignSystemAdoption";
import { componentKinds } from "@/legion";

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
        x: {
            max: 35
        }
    },
    responsive: false,
};

const getAdaptionByType = (type: 'target' | 'homebrew', project: Project) =>
    usagesByProject[project]
        .filter(({ type: componentType }) =>
            componentType === type)
        .map(x => {
            const component = x.component;
            const match = component.startsWith("component") ? component.match(/^component\s*(.*)/) : component.match(/^import\s*(.*?)\s/);
            return {
                ...x,
                component: match ? match[1] : '',
            };
        })
        .sort((a, b) => b.usages - a.usages)


const adaptionDataToChartData = (type: 'target' | 'homebrew', project: Project) => {
    const adaptionByType = getAdaptionByType(type, project)
    return componentKinds.reduce<{ labels: string[], usages: number[] }>((acc, kind) => {
        if (type === 'target') {
            return {
                labels: [...acc.labels, kind],
                usages: [...acc.usages, adaptionByType.find(v => v.component === kind)?.usages ?? 0]
            }
        } else {
            return {
                labels: [...acc.labels, kind ],
                usages: [...acc.usages, adaptionByType.find(v => v.component === kind)?.usages ?? 0]
            }
        }
    }, { labels: [], usages: [] })
}
const CODE_ASSET_WEBSITE = 27

const summaryInfoList = [
    {
        label: 'Design Assets Website',
        value: '28 Component',
        icon: <Figma />
    },
    {
        label: 'Code Assets Website',
        value: `${CODE_ASSET_WEBSITE} Component`,
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
        value: Math.round((adaptionDataToChartData('target', 'logeePort').labels.length / CODE_ASSET_WEBSITE) * 100) / 100
    },
    {
        label: 'Logee Order Dashboard Repo',
        value: Math.round((adaptionDataToChartData('target', 'logeeOrder').labels.length / CODE_ASSET_WEBSITE) * 100) / 100
    },
]

type SelectOption = {
    value: Project;
    label: JSX.Element
}

const projects: SelectOption[] = [
    { value: "all", label: <Body color="tertiary500" size="sm_regular">All Repository Project</Body> },
    { value: "logeePort", label: <Body color="tertiary500" size="sm_regular">Logee Port</Body> },
    { value: "logeeOrder", label: <Body color="tertiary500" size="sm_regular">Logee Order Dashboard</Body> },
]


export default function Home() {
    const [selectedProject, setProjectSelector] = useState(projects[0]);
    const legionUsages = useMemo(() => adaptionDataToChartData('target', selectedProject.value), [selectedProject])
    const nonLegionUsages = useMemo(() => adaptionDataToChartData('homebrew', selectedProject.value), [selectedProject])
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
    const onSetProjectSelector = (selectedProject: SelectOption) => setProjectSelector(selectedProject)
    const MINMUM_BAR_WIDTH = 28;
    const MINMUM_CHART_HEIGHT = 48;
    const getHeightBar = (totalItems: number) => totalItems * MINMUM_BAR_WIDTH + MINMUM_CHART_HEIGHT
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
                <AssetAdoption componentPercentage={1.41} adoptionEachProjects={adoptionEachProjects} />
                <DesignSystemAdoption usagesByMonthChartData={usagesByMonthChartData} />
            </Flex>
            <Card mt="24px" variant='bordered' p={3} sx={{ width: '100%' }}>
                <Flex>
                    <Box>
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
                    </Box>
                    <Box ml="auto" sx={{ width: '23%' }} >
                        <Select
                            options={projects}
                            value={selectedProject} onChange={v => onSetProjectSelector(v as SelectOption)}
                        />
                    </Box>
                </Flex>
                <Flex mt={3}>
                    <Box sx={{ width: '50%' }}>
                        <Box>
                            <Body size='lg_bold' sx={{ display: 'block' }}>
                                Legion Assets
                            </Body>
                        </Box>
                        <Bar
                            key={selectedProject.value}
                            options={barDefaultOptions}
                            data={legionData}
                            width={600} height={getHeightBar(legionUsages.labels.length)}
                        />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Box>
                            <Body size='lg_bold' sx={{ display: 'block' }}>
                                Local Project Assets
                            </Body>
                        </Box>
                        <Bar
                            key={selectedProject.value}
                            options={{ ...barDefaultOptions }}
                            data={nonLegionData}
                            width={600} height={getHeightBar(nonLegionUsages.labels.length)}
                        />
                    </Box>
                </Flex>
            </Card>
        </Box>
    </Box >
}

