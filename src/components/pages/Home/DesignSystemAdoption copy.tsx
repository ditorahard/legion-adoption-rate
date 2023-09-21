import { ChartData } from "chart.js";
import { Box, Card, Body } from "legion-ui";
import { Line } from "react-chartjs-2";

type Props = {
    usagesByMonthChartData: ChartData<'line', number[], string>
}

const usagesByMonthOptions = {
    responsive: true,
    legend: {
        position: 'right' as const,
    },
};

export default function DesignSystemAdoption({ usagesByMonthChartData }: Props) {
    return <Card variant='bordered' p={3} sx={{ width: '75%' }}>
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
}