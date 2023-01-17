import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

import { data1 } from '../data/data'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
    },
};


const maxUsages = Math.max(...data1.map(x => x.usages));

const components = data1
    .filter(x => x.type === 'target')
    .map(x => {
        const component = x.component;
        const match = component.startsWith("component") ? component.match(/^component\s*(.*)/) : component.match(/^import\s*(.*?)\s/);
        return {
            ...x,
            component: match ? match[1] : '',
        };
    })
    .sort((a, b) => b.usages - a.usages)
const { labels, usages } = components.reduce<{ labels: string[], usages: number[] }>((acc, { component, usages }) => {
    return { labels: [...acc.labels, component], usages: [...acc.usages, usages] }
}, { labels: [], usages: [] });

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: usages,
            borderColor: 'rgb(135,91,247)',
            backgroundColor: 'rgb(135,91,247)',
        },
    ],
};

console.log(components)

export default function Chart() {
    return <Bar options={options} data={data} />;
}
