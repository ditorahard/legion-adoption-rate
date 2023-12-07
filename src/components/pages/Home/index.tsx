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

import axios from 'axios';
import { useRouter } from 'next/router';


const Index = () => {

  const [leaderboardTribe, setLeaderboardTribe] = useState(null);
  const [leaderboardDTP, setLeaderboardDTP] = useState(null);
  const [leaderboardHomebrew, setLeaderboardHomebrew] = useState(null);
  const [leaderboardComponent, setLeaderboardComponent] = useState(null);
  const [coverageOverview, setCoverageOverview] = useState({need_to_scan: 0, scan_repo: 0, total_coverage: 0, total_assets: 0})
  const [coverageGraph, setCoverageGraph] = useState({web: [], ios: [], android: []});
  const [mounted, setMounted] = useState(false);
  const {replace} = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const TOKEN = 'Bearer ' + localStorage.getItem('_token');
      console.log('token', TOKEN);
      axios({ method: 'get', url:'http://legion-tracker-api.telkom.design/api/v1/leaderboard/dtp?limit=5',
      headers: {
          'Authorization': TOKEN,}
      })
      .then((res) =>  {
        console.log("res Leaderboard DTP ", res.data);
        setLeaderboardDTP(res.data.data);
        
      }).catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })
      axios.get('http://legion-tracker-api.telkom.design/api/v1/leaderboard/tribe', {
        headers: {
          'Authorization': TOKEN,
        }
      })
      .then((res) =>  {
        console.log("Leaderboard Tribe ", res.data);
        setLeaderboardTribe(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })
      axios.get('http://legion-tracker-api.telkom.design/api/v1/leaderboard/component/homebrew?limit=5', {
        headers: {
          'Authorization': TOKEN,}
        }
      )
      .then((res) => {
        console.log("Leaderboard Non Legion Component ", res.data.data);
        setLeaderboardHomebrew(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })
      axios.get('http://legion-tracker-api.telkom.design/api/v1/leaderboard/component/legion?limit=5', {
        headers: {
            'Authorization': TOKEN,}
        }
      )
      .then((res) =>  {
        console.log("Leaderboard Component ", res.data.data)
        setLeaderboardComponent(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })

      axios.get('http://legion-tracker-api.telkom.design/api/v1/coverage/overview', {
        headers: {
            'Authorization': TOKEN,}
        }
      )
      .then((res) =>  {
        console.log("Leaderboard Coverage Overview ", res.data.data)
        setCoverageOverview(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })

      axios.get('http://legion-tracker-api.telkom.design/api/v1/coverage/graph', {
        headers: {
            'Authorization': TOKEN,}
        }
      )
      .then((res) =>  {
        console.log("Leaderboard Coverage Graph ", res.data.data)
        setCoverageGraph(res.data.data);
      })
      .catch(() => {
        localStorage.removeItem("_token");
        replace("/login");
      })
    }
  }, [])

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
        {(typeof window !== 'undefined') && <WebsiteAudienceMetrics coverageOverview={coverageOverview} coverageGraph={coverageGraph} /> }
        </Box>
      </Flex>
      <Flex margin='0 -12px'>
        <Box padding='12px'>
          <Box padding="8px" margin="0 0 8px">
            <Text as='h1' size='24px' height='36px' color='tertiary900' weight='700' block>
            Leaderboard Tribe & DTP
          </Text>
          <Text as='p' size='14px' height='21px' color='tertiary500'>
            Information adoption in projects and top leader of adoption in DTP
          </Text>
        </Box>
        <LeaderboardTribeDTP leaderboardDTP={leaderboardDTP || []} leaderboardTribe={leaderboardTribe || []} />
      </Box>
        <Box padding='12px'>
        <Box padding="8px" margin="0 0 8px">
          <Text as='h1' size='24px' height='36px' color='tertiary900' weight='700' block>
            Leaderboard Legion Assets
          </Text>
          <Text as='p' size='14px' height='21px' color='tertiary500'>
            Repo information, assets adoption in projects and top leader of adoption in DTP
          </Text>
        </Box>
        <LeaderboardLegionAssets leaderboardComponent={leaderboardComponent || []} leaderboardHomebrew={leaderboardHomebrew || []}/>
        </Box>
      </Flex>
    </Base>
  )
}

export default Index
