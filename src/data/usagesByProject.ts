import all from './raw/all.json';
import logeePort from './raw/logee_ssoport.json';
import logeeOrder from './raw/logee_newnpct1.json';

export type Project = 'all' | 'logeeOrder' | 'logeePort'
type Usage = {
    component: string;
    usages: number;
    type: string
}

export type UsagesByProject = Record<Project, Usage[]>;

export const usagesByProject: UsagesByProject = {
    all,
    logeePort,
    logeeOrder,
}
