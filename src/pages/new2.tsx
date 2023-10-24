import React, {useState, useEffect} from 'react';
import { Plus, Calendar } from 'react-feather';
import { Box, Button, Flex, Text, Tabs } from '@legion-ui/core';
import { DateRangePicker } from '@legion-ui/dates';

import Base from '@/components/pages/New/layouts/base';
import WebsiteAudienceMetrics from '@/components/pages/New/website-audience-metrics'
import BounceRate from '@/components/pages/New/bounce-rate'
import TotalUsers from '@/components/pages/New/total-users'
import AllSession from '@/components/pages/New/all-sessions'
import LeaderboardTribeDTP from '@/components/pages/New/leaderboard-tribe-dtp';
import LeaderboardLegionAssets from '@/components/pages/New/leaderboard-legion-assets';
import SessionByChannel from '@/components/pages/New/session-by-channel';



const New2 = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted) return <></>;
  return (
    <Base>
      <Flex alignX='space-between' alignY='center'>
        <Box width={{ xl: 'calc(100% - 408px - 168px)', lg: '100%'}}>
          <Text as='h1' size='24px' height='36px' color='#101828' weight='700' block>
            Hi, welcome back!
          </Text>
          <Text as='p' size='14px' height='21px' color='#667085'>
            Your web analytics dashboard template.
          </Text>
        </Box>
      </Flex>
      <Flex margin='12px -12px'>
        <Box width='100%' padding='12px'>
        {(typeof window !== 'undefined') && <WebsiteAudienceMetrics /> }
        </Box>
      </Flex>
      <Flex margin='0 -12px'>
        <Box width='45%' padding='12px'>
          <Box padding="8px" margin="0 0 8px">
            <Text as='h1' size='24px' height='36px' color='tertiary900' weight='700' block>
            Leaderboard Tribe & DTP
          </Text>
          <Text as='p' size='14px' height='21px' color='tertiary500'>
            Information adoption in projects and top leader of adoption in DTP
          </Text>
        </Box>
        <LeaderboardTribeDTP />
      </Box>
        <Box width='55%' padding='12px'>
        <Box padding="8px" margin="0 0 8px">
          <Text as='h1' size='24px' height='36px' color='tertiary900' weight='700' block>
            Leaderboard Legion Assets
          </Text>
          <Text as='p' size='14px' height='21px' color='tertiary500'>
            Repo information, assets adoption in projects and top leader of adoption in DTP
          </Text>
        </Box>
        <LeaderboardLegionAssets />
        </Box>
      </Flex>
    </Base>
  )
}

export default New2
