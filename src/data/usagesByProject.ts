import logeePort from './raw/logee_ssoport.json';
import logeeOrder from './raw/logee_newnpct1.json';
import agreeMarketSeller from './raw/agree-market-seller-company.json';
import agreeMarketBuyer from './raw/agree-market-buyer-enteprise-web.json';
import all from './raw/all.json';

export type Project =  'all' | 'logeeOrder' | 'logeePort' | 'agreeMarketSeller' | 'agreeMarketBuyer'
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
    agreeMarketSeller,
    agreeMarketBuyer
}
