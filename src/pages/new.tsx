import { Button, Navbar, Image, Flex, Tabs, Text, Box, Table, Chip, Anchor } from "@legion-ui/core";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import Footer from "@/components/pages/New/Footer";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


type AdoptionEachProject = {
    label: string;
    value: number;
}

type Props = {
    componentPercentage: number;
    adoptionEachProjects: AdoptionEachProject[];
}

export default function New(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const navbarItems = [
      {
        title: <span>Dashboard</span>,          
      },
      {
        title: <span>Data Storage</span>,
        
      },
      {
        title: <span>Maintainer</span>,
      },
  ];

  const ItemTabs = [
    {
      key: 0,
      label: (
        <span style={{ paddingLeft: '8px' }}>Overview</span>
      ),
    },
    {
      key: 1,
      label: (
      <span style={{ paddingLeft: '8px' }}>Website</span>
      ),
    },
    {
      key: 2,
      label: (<span style={{ paddingLeft: '8px' }}>Android</span>
      ),
    },
    {
      key: 3,
      label: (<span style={{ paddingLeft: '8px' }}>iOS</span>
      ),
    },
  ]

  const chart = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };
  const donutChart = {
    options: {
      chart: {
        id: "donut"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [23, 11, 54, 72],
labels: ["Android", "iOS", "Website", "Others"]
  };

  const adoptions = [
    { rank: 6, adopt: 12.011, platform: 'Android', name: 'Agree', android:12.123 },
    { rank: 7, adopt: 14.007, platform: 'iOS', name: 'LKPP', android:12.123 },
    { rank: 39, adopt: 88.906, platform: 'iOS', name: 'Big Box', android:12.123 },
    { rank: 56, adopt: 137.33, platform: 'Android', name: 'Logee', android:12.123 },
    { rank: 58, adopt: 140.12, platform: 'iOS', name: 'Legion', android:12.123 },
  ]
  
  if(!mounted) return <></>
  return (
  <Box style={{backgroundColor: '#F9FAFB'}}>
    <Flex padding="10px" alignX="space-between" direction="row" background="white">
    <Box>
      <Image src="/images/logo_2.png" width="140px" height="40px"></Image>
    </Box>
    <Box>  
      <Navbar items={navbarItems} />
    </Box>
    <Box>
      <Button>Login</Button>
    </Box>
    </Flex>
    
    <Box padding="12px">
    <Flex padding="10px" direction="column">
      <Text as="h5">Hi, welcome back!</Text>
      <Text as="p">Your web analysis dashboard template</Text>
    </Flex>
      
      <Flex background="white" style={{borderBottom:'1px solid #D0D5DD'}}>
        <Tabs items={ItemTabs}></Tabs>
      </Flex>
      <Flex direction="row">
        <Flex direction="column" background="white" padding="24px 24px 24px 24px" width="650px" style={{borderRadius:"12px", marginTop:"12px"}}>
          <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
            <Text as="h6">Adoption Coverage</Text>
            <Text as="p">Total Usage Assets in all scan repository DTP</Text>
          </Flex>
          <Flex alignX="space-between" margin="24px 0 24px 0">
            <Flex direction="column">
              <Text as="span" weight="700">
                Total Assets
              </Text>
              <Text as="h4" weight="700">
                100
              </Text>
            </Flex>
            <Flex direction="column">
              <Text as="span" weight="700">
              Usage
              </Text>
              <Text as="h4" weight="700">
                8.312
              </Text>
            </Flex>
            <Flex direction="column">
              <Text as="span" weight="700">
                Coverage
              </Text>
              <Text as="h4" weight="700">
                60%
              </Text>
            </Flex>
            <Flex direction="column">
              <Text as="span" weight="700">
                Scan Repo
              </Text>
              <Text as="h4" weight="700">
                20
              </Text>
            </Flex>
          </Flex>
          
          {(typeof window !== 'undefined') && chart ?
          <Chart
            options={chart.options}
            series={chart.series}
            type="line"
            width="600"
            height="300"
          /> : null
          }
        </Flex>
        <Flex direction="column">
          <Flex direction="row">
            <Flex direction="column" background="white" margin="0 0 0 10px" padding="16px 24px 16px 16px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Assets Website</Text>
              </Flex>
              <Flex margin="10px 0 10px 0" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Flex direction="column" margin="0 10px" padding="10px 10px 10px 0" style={{borderRight:'1px solid gray'}}>
                  <Text as="span" weight="400">
                    Released
                  </Text>
                  <Text as="h4" weight="700" color="green">
                    43
                  </Text>
                </Flex>
                <Flex direction="column">
                <Flex direction="column">
                  <Text as="h4" weight="700">
                  40 
                  </Text>
                  <Text as="span" weight="400">
                    Component
                  </Text>
                  </Flex>
                  <Flex direction="column">
                  <Text as="h4" weight="700">
                  3 
                  </Text>
                  <Text as="span" weight="400">
                    Pattern
                  </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Text>See details</Text>
              </Flex>
              <Flex direction="column" background="white" margin="0 0 0 10px" padding="16px 24px 16px 16px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Assets Android</Text>
              </Flex>
              <Flex margin="10px 0 10px 0" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Flex direction="column" margin="0 10px" padding="10px 10px 10px 0" style={{borderRight:'1px solid gray'}}>
                  <Text as="span" weight="400">
                    Released
                  </Text>
                  <Text as="h4" weight="700" color="orange">
                    43
                  </Text>
                </Flex>
                <Flex direction="column">
                <Flex direction="column">
                  <Text as="h4" weight="700">
                  40 
                  </Text>
                  <Text as="span" weight="400">
                    Component
                  </Text>
                  </Flex>
                  <Flex direction="column">
                  <Text as="h4" weight="700">
                  3 
                  </Text>
                  <Text as="span" weight="400">
                    Pattern
                  </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Text>See details</Text>
              </Flex>
              <Flex direction="column" background="white" margin="0 0 0 10px" padding="16px 24px 16px 16px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Assets iOS</Text>
              </Flex>
              <Flex margin="10px 0 10px 0" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Flex direction="column" margin="0 10px" padding="10px 10px 10px 0" style={{borderRight:'1px solid gray'}}>
                  <Text as="span" weight="400">
                    Released
                  </Text>
                  <Text as="h4" weight="700" color="orange">
                    43
                  </Text>
                </Flex>
                <Flex direction="column">
                <Flex direction="column">
                  <Text as="h4" weight="700">
                  40 
                  </Text>
                  <Text as="span" weight="400">
                    Component
                  </Text>
                  </Flex>
                  <Flex direction="column">
                  <Text as="h4" weight="700">
                  3 
                  </Text>
                  <Text as="span" weight="400">
                    Pattern
                  </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Text>See details</Text>
              </Flex>
            </Flex>
            <Flex direction="column" background="white" margin="0 0 0 10px" padding="24px 24px 24px 24px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Maturity Level</Text>
              </Flex>
              <Flex margin="10px 0 10px 0" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Flex direction="column" margin="0 10px" padding="10px 10px 10px 0" width="150px">
                  <Text as="h4" weight="700">
                    Good
                  </Text>
                  <Text as="p" weight="400">
                    The total number of sessions within date range. It is the period time a user is actively engaged with your website, page or app, etc.
                  </Text>
                </Flex>
                <Flex direction="column">
                {(typeof window !== 'undefined') && chart ?
                  <Chart
                    options={chart.options}
                    series={chart.series}
                    type="bar"
                    width="450"
                    height="200"
                  /> : null
                  }
                </Flex>
              </Flex>
              <Text>See details</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex margin="28px 0 12px 0" direction="column">
            <Text as="h5">Leaderboard Adoption Assets</Text>
            <Text as="p">Repo information, assets adoption in projects and top leader of adoption in DTP</Text>
          </Flex>
          <Flex direction="row" padding="0 0 12px 12px">
            <Flex direction="column" background="white"  padding="24px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Repo Details</Text>
              </Flex>
              <Flex direction="row">
                {(typeof window !== 'undefined') && chart ?
                  <Chart
                    options={donutChart.options}
                    series={donutChart.series}
                    type="donut"
                    width="450"
                    height="200"
                  /> : null
                  }
                </Flex>
            </Flex>
            <Flex direction="column" background="white"  padding="24px" margin="0 0 0 12px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Top Adoption DTP</Text>
              </Flex>
              <Table striped>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>DTP name</th>
                    <th>Adopt</th>
                    <th>Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions.map((adoption) => (
                    <tr key={adoption.name}>
                      <td>{adoption.rank}</td>
                      <td>{adoption.name}</td>
                      <td>{adoption.adopt}</td>
                      <td><Chip>{adoption.platform}</Chip></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Flex>
            <Flex direction="column" background="white"  padding="24px" margin="0 0 0 12px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Top Component Usage</Text>
              </Flex>
              <Table striped>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Component</th>
                    <th>Web</th>
                    <th>Android</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions.map((adoption) => (
                    <tr key={adoption.name}>
                      <td>{adoption.rank}</td>
                      <td>{adoption.name}</td>
                      <td>{adoption.adopt}</td>
                      <td>{adoption.android}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Flex>
          </Flex>
    </Box>
    <Footer />
  </Box>
  );
}
