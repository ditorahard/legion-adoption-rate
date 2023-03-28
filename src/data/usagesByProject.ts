import logeePort from './raw/logee-ssoport.json';
import logeeOrder from './raw/logee-newnpct1.json';
import logeeTruck from './raw/logee-truck.json';
import agreeMarketSeller from './raw/agree-market-seller-company.json';
import agreeMarketBuyer from './raw/agree-market-buyer-enteprise-web.json';
import all from './raw/all.json';

export const projects = ['logeeOrder', 'logeePort', 'agreeMarketSeller', 'agreeMarketBuyer', 'logeeTruck']

export type Project =  'all' | typeof projects[number]
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
    logeeTruck,
    agreeMarketSeller,
    agreeMarketBuyer
}
