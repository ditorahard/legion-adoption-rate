import * as selectedProjectUsages from '../data/raw/selected_project_usages.json'
import dayjs from 'dayjs'

const latestUpdatedDate = dayjs(selectedProjectUsages.latestUpdatedDate)
const getSubstractedDate = (weekAgo: number) => latestUpdatedDate.subtract(weekAgo, 'week').format('MM-YYYY')

const data = selectedProjectUsages.data as Array<{
    weeksAgo: number,
    type: 'target' | 'homebrew',
    usages: number
}>

const adjustedData = data.reduce<Record<string, { legionUI: number, nonLegionUI: number }>>((acc, { weeksAgo, type, usages }) => {
    const dateSubstractedDateByWeekAgo = getSubstractedDate(weeksAgo)
    if (!acc[dateSubstractedDateByWeekAgo]) return {
        ...acc,
        [dateSubstractedDateByWeekAgo]: {
            legionUI: type === 'target' ? usages : 0,
            nonLegionUI: type === 'homebrew' ? usages : 0
        }
    }
    const componentType = type === 'target' ? 'legionUI' : 'nonLegionUI'
    if (acc[dateSubstractedDateByWeekAgo][componentType]) return acc
    return {
        ...acc,
        [dateSubstractedDateByWeekAgo]: {
            ...acc[dateSubstractedDateByWeekAgo],
            [componentType]: usages
        }
    }
}, {})

console.log(JSON.stringify(adjustedData))

export { }