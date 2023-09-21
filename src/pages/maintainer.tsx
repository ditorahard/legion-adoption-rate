import { Button, Navbar, Image, Flex, Tabs, Text, Box, Table, Chip } from "@legion-ui/core";
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
          <span style={{ paddingLeft: '8px' }}>Leaderboard</span>
        ),
      },
      {
        key: 1,
        label: (
        <span style={{ paddingLeft: '8px' }}>All tribe and DTP</span>
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
    { rank: 6, mass: 12.011, adoption: '80%', platform: 'Website', level: 'Automator', nonlegion: 12.011, name: 'Agree' },
    { rank: 7, mass: 14.007, adoption: '80%', platform: 'Website', level: 'Automator', nonlegion: 12.011, name: 'LKPP' },
    { rank: 39, mass: 88.906, adoption: '80%', platform: 'Website', level: 'Automator', nonlegion: 12.011, name: 'Big Box' },
    { rank: 56, mass: 137.33, adoption: '80%', platform: 'Website', level: 'Automator', nonlegion: 88, name: 'Logee' },
    { rank: 58, mass: 140.12, adoption: '80%', platform: 'Website', level: 'Automator', nonlegion: 12.011, name: 'Legion' },
  ]
  
  if(!mounted) return <></>
  return (
  <Box style={{height:'800px', backgroundColor: '#F9FAFB'}}>
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

    <Flex background="white" margin="0 0 0 12px" style={{borderBottom:'1px solid #D0D5DD'}}>
        <Tabs items={ItemTabs}></Tabs>
      </Flex>

      <Flex direction="column" background="white"  padding="20px" margin="0 0 0 12px" style={{borderRadius:"12px", marginTop:"12px"}}>
              <Flex direction="column" padding="0 0 10px 0" style={{borderBottom: '1px solid gray'}}>
                <Text as="h6">Top Adoption DTP</Text>
              </Flex>
              <Table striped>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>DTP name</th>
                    <th>Legion Component</th>
                    <th>Non Legion Component</th>
                    <th>Adoption</th>
                    <th>Platform</th>
                    <th>Level</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptions.map((adoption) => (
                    <tr key={adoption.name}>
                      <td>{adoption.rank}</td>
                      <td>{adoption.name}</td>
                      <td>{adoption.mass}</td>
                      <td>{adoption.nonlegion}</td>
                      <td>{adoption.adoption}</td>
                      <td>{adoption.platform}</td>
                      <td><Chip color="secondary">Automator</Chip></td>
                      <td><Button variant="soft">See Details</Button> <Button>Update Level</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Flex>
    </Box>
    <Footer />
    </Box>
  );
}
