import { Body, Box, Caption, Card, Divider, Flex, Heading, Select } from "legion-ui";
import { Bar } from "react-chartjs-2";
import { BookOpen, Code, Figma, Folder, Logo } from "../../icons";
import * as usagesByMonth from "../../../data/usages_by_month.json";
import { usagesByProject, projects as repositories } from "../../../data/usagesByProject";
import type { Project } from "../../../data/usagesByProject";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import SummaryInfo from "./SummaryInfo";
import AssetAdoption from "./AssetAdoption";
import { useMemo, useState } from "react";
import DesignSystemAdoption from "./DesignSystemAdoption";
import { componentKinds } from "@/legion";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, Tooltip, Legend);

const labels = Object.keys(usagesByMonth)
  .reverse()
  .filter((v) => v !== "default");

const { legionUI, nonLegionUI } = Object.values(usagesByMonth)
  .reverse()
  .reduce<{ legionUI: number[]; nonLegionUI: number[] }>(
    (acc, { legionUI, nonLegionUI }) => ({
      legionUI: legionUI === undefined ? acc.legionUI : [...acc.legionUI, legionUI],
      nonLegionUI: nonLegionUI === undefined ? acc.nonLegionUI : [...acc.nonLegionUI, nonLegionUI],
    }),
    {
      legionUI: [],
      nonLegionUI: [],
    }
  );

const usagesByMonthChartData = {
  labels,
  fill: true,
  datasets: [
    {
      label: "Legion Assets",
      data: legionUI,
      borderColor: "rgb(135, 91, 247)",
      backgroundColor: "rgba(135, 91, 247, 0.5)",
      fill: true,
      lineTension: 0.4,
    },
    {
      label: "Non Legion Assets",
      data: nonLegionUI,
      borderColor: "rgb(247, 144, 9)",
      backgroundColor: "rgba(247, 144, 9, 0.5)",
      fill: true,
      lineTension: 0.4,
    },
  ],
};

const barDefaultOptions = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    y: {
      ticks: {
        autoSkip: false,
      },
    },
    x: {
      max: 35,
    },
  },
  responsive: false,
};

const getAdaptionByType = (type: "target" | "homebrew", project: Project) =>
  usagesByProject[project]
    .filter(({ type: componentType }) => componentType === type)
    .map((x) => {
      const component = x.component;
      const match = component.startsWith("component")
        ? component.match(/^component\s*(.*)/)
        : component.match(/^import\s*(.*?)\s/);
      return {
        ...x,
        component: match ? match[1] : "",
      };
    })
    .sort((a, b) => b.usages - a.usages);

const adaptionDataToChartData = (type: "target" | "homebrew", project: Project) => {
  const adaptionByType = getAdaptionByType(type, project);
  return componentKinds.reduce<{ labels: string[]; usages: number[] }>(
    (acc, kind) => {
      return {
        labels: [...acc.labels, kind],
        usages: [
          ...acc.usages,
          adaptionByType.reduce((acc, current) => {
            return current.component === kind ? acc + current.usages : acc;
          }, 0),
        ],
      };
    },
    { labels: [], usages: [] }
  );
};

const notProvidedByLegions = (project: Project) => {
  const componentListByProject = getAdaptionByType("homebrew", project);
  // TODO Optimize
  return componentListByProject.reduce<{ labels: string[]; usages: number[] }>(
    (acc, { component }) => {
      if (!componentKinds.find((a) => a === component)) {
        return {
          labels: [...acc.labels, component],
          usages: [
            ...acc.usages,
            componentListByProject.reduce((acc, current) => {
              return current.component === component ? acc + current.usages : acc;
            }, 0),
          ],
        };
      }
      return acc;
    },
    { labels: [], usages: [] }
  );
};

const CODE_ASSET_WEBSITE = componentKinds.length;

const summaryInfoList = [
  {
    label: "Design Assets Website",
    value: "28 Component",
    icon: <Figma />,
  },
  {
    label: "Code Assets Website",
    value: `${CODE_ASSET_WEBSITE} Component`,
    icon: <Code />,
  },
  {
    label: "Documentation Assets Website",
    value: "20 Content",
    icon: <BookOpen />,
  },
  {
    label: "Total Repository Usage",
    value: `${repositories.length} Repository`,
    icon: <Folder />,
  },
];

const getAdoptionRateByProject = (project: Project) => {
  const legionComponentKindThatUsed = adaptionDataToChartData("target", project).usages.filter(usage => usage > 0).length
  return parseFloat(((legionComponentKindThatUsed /
      (legionComponentKindThatUsed + notProvidedByLegions(project).labels.length)) *
      100).toFixed(2))
  ;
}

const adoptionEachProjects = [
  {
    label: "Agree Market Seller",
    value: getAdoptionRateByProject('agreeMarketSeller')
  },
  {
    label: "Agree Market Buyer",
    value: getAdoptionRateByProject('agreeMarketBuyer')
  },
  {
    label: "Logee Port Repo",
    value: getAdoptionRateByProject('logeePort')
  },
  {
    label: "Logee Port Dashboard Repo",
    value: getAdoptionRateByProject('logeeOrder')
  },
  {
    label: "Logee Truck Dashboard User Repo",
    value: getAdoptionRateByProject('logeeTruck')
  },
];

type SelectOption = {
  value: Project;
  label: JSX.Element;
};

const projects: SelectOption[] = [
  // Hide for temporary
  {
    value: "all",
    label: (
      <Body color="tertiary500" size="sm_regular">
        All Repository Project
      </Body>
    ),
  },
  {
    value: "agreeMarketSeller",
    label: (
      <Body color="tertiary500" size="sm_regular">
        Agree Market Seller
      </Body>
    ),
  },
  {
    value: "agreeMarketBuyer",
    label: (
      <Body color="tertiary500" size="sm_regular">
        Agree Market Buyer
      </Body>
    ),
  },
  {
    value: "logeePort",
    label: (
      <Body color="tertiary500" size="sm_regular">
        Logee Port
      </Body>
    ),
  },
  {
    value: "logeeOrder",
    label: (
      <Body color="tertiary500" size="sm_regular">
        Logee Port Dashboard
      </Body>
    ),
  },
  {
    value: "logeeTruck",
    label: (
      <Body color="tertiary500" size="sm_regular">
        Logee Truck Dashboard
      </Body>
    ),
  },
];

export default function Home() {
  const [selectedProject, setProjectSelector] = useState(projects[0]);
  const legionUsages = useMemo(
    () => adaptionDataToChartData("target", selectedProject.value),
    [selectedProject]
  );
  const nonLegionUsages = useMemo(
    () => adaptionDataToChartData("homebrew", selectedProject.value),
    [selectedProject]
  );
  const uniqueProjectComponent = useMemo(() => notProvidedByLegions(selectedProject.value), [selectedProject]);
  const legionData = {
    labels: legionUsages.labels,
    datasets: [
      {
        label: "Legion Assets",
        data: legionUsages.usages,
        borderColor: "rgb(135,91,247)",
        backgroundColor: "rgb(135,91,247)",
        categoryPercentage: 1,
        barPercentage: 0.8,
        barThickness: 16,
      },
    ],
  };

  const nonLegionData = {
    labels: nonLegionUsages.labels,
    datasets: [
      {
        label: "Non Legion Assets",
        data: nonLegionUsages.usages,
        borderColor: "rgb(247,144,9)",
        backgroundColor: "rgb(247,144,9)",
      },
    ],
  };

  const uniqueProjectComponentData = {
    labels: uniqueProjectComponent.labels,
    datasets: [
      {
        label: "Unique Project Assets",
        data: uniqueProjectComponent.usages,
        borderColor: "rgb(247,144,9)",
        backgroundColor: "rgb(247,144,9)",
      },
    ],
  };
  const onSetProjectSelector = (selectedProject: SelectOption) => setProjectSelector(selectedProject);
  const MINMUM_BAR_WIDTH = 28;
  const MINMUM_CHART_HEIGHT = 48;
  const getHeightBar = (totalItems: number) => totalItems * MINMUM_BAR_WIDTH + MINMUM_CHART_HEIGHT;

  const selectedAdoptionRatePercentage = (project: Project) => {
    if (project !== 'all') return getAdoptionRateByProject(project)
    return (
      repositories.reduce<number>((acc, repo) => acc + getAdoptionRateByProject(repo), 0) / repositories.length
    );
  }

  return (
    <Box bg="secondary25">
      <Flex color="white" px={4} bg="black" sx={{ height: "64px", alignItems: "center" }}>
        <Logo />
      </Flex>

      <Box px={4} mt={"24px"}>
        <Box sx={{ color: "#424242" }}>
          <Heading size="h5" sx={{ fontFamily: "Nunito !important" }}>
            Hi, Welcome Back
          </Heading>
        </Box>
        <Caption size="lg_regular">Legion design system adoption rate analytic dashboard</Caption>
      </Box>
      {/* TODO Tab */}
      <Box p={4}>
        <Flex sx={{ gap: "24px", width: "100%" }}>
          {summaryInfoList.map((info) => (
            <SummaryInfo key={info.label} {...info} />
          ))}
        </Flex>
        <Flex mt="24px" sx={{ gap: "24px" }}>
          <AssetAdoption componentPercentage={selectedAdoptionRatePercentage(selectedProject.value)} adoptionEachProjects={adoptionEachProjects} />
          <DesignSystemAdoption usagesByMonthChartData={usagesByMonthChartData} />
        </Flex>
        <Card mt="24px" variant="bordered" p={3} sx={{ width: "100%" }}>
          <Flex>
            <Box>
              <Box>
                <Body size="lg_bold" sx={{ display: "block" }}>
                  Component Asset system Adoption
                </Body>
              </Box>
              <Box>
                <Body size="sm_regular" sx={{ display: "block" }}>
                  Design system vs non legion component usages across all tracked projects
                </Body>
              </Box>
            </Box>
            <Box ml="auto" sx={{ width: "23%" }}>
              <Select
                options={projects}
                value={selectedProject}
                onChange={(v) => onSetProjectSelector(v as SelectOption)}
              />
            </Box>
          </Flex>
          <Flex mt={3}>
            <Box sx={{ width: "50%" }}>
              <Box>
                <Body size="lg_bold" sx={{ display: "block" }}>
                  Legion Assets
                </Body>
              </Box>
              <Bar
                key={selectedProject.value}
                options={barDefaultOptions}
                data={legionData}
                width={600}
                height={getHeightBar(legionUsages.labels.length)}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Box>
                <Body size="lg_bold" sx={{ display: "block" }}>
                  Non Legion Project Assets
                </Body>
              </Box>
              <Bar
                key={selectedProject.value}
                options={{ ...barDefaultOptions }}
                data={nonLegionData}
                width={600}
                height={getHeightBar(nonLegionUsages.labels.length)}
              />
            </Box>
          </Flex>
          <Box mt={3} sx={{ width: "100%" }}>
            <Box>
              <Body size="lg_bold" sx={{ display: "block" }}>
                Unique Project Assets
              </Body>
              <Divider sx={{ borderColor: "rgba(0, 0, 0, 0.15)" }} />
            </Box>
            <Bar
              key={selectedProject.value}
              options={{ ...barDefaultOptions }}
              data={uniqueProjectComponentData}
              width={600}
              height={getHeightBar(uniqueProjectComponent.labels.length)}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
