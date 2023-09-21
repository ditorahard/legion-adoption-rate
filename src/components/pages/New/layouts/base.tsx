import React, { FC, ReactNode, useState } from 'react'
import { Users, Home, Layout, File, Database, Tool, Menu } from 'react-feather'
import { Box, Sidebar, Flex, Divider, Text, Button, Avatar } from '@legion-ui/core'
import UserSidebar from '/images/user-sidebar.svg'
import Header from './header'
import Footer from './footer'

const ListMenu = () => [
  {
    iconTitle: <Home size={20}/>,
    title: 'Dashboard',
    childrens: [
      {
        title: <span>Website Analytic</span>,
        },
      {
        title: <span>Sales Monitoring</span>,
         },
      {
        title: <span>Customer Service</span>,
         },
      {
        title: <span>Product Performance</span>,
            },
    ],
  },
  {
    iconTitle: <Layout size={20}/>,
    title: 'Data Visualization',
    childrens: [
      { 
        title: <span>Capture a trend</span>,

      },
      { 
        title: <span>Visualize Relationship</span>,
      },
      { 
        title: <span>Partial and Full Charts</span>,
      },
      { 
        title: <span>Visualize Single Value</span>,
      },
      { 
        title: <span>Present Distribution</span>,
      },
    ]
  },
]

type BaseProps = {
  children: ReactNode
}

const Base: FC<BaseProps> = ({ children }) => {
  const [navMode, setNavMode] = useState('withLogo')
  const [isSidebarCollapse, setIsSidebarCollapse] = useState<boolean>(false)
  const widthSidebar = isSidebarCollapse ? '70px' : '264px'
  const handleToogleSidebar = () => {
    setIsSidebarCollapse(prev => !prev)
  }
  const handleNavMode = (mode: 'withLogo' | 'outsideLogo' | 'bottomLogo' ) => {
    setNavMode(mode)
  }

  return  (
    <div className='app'>
      <Header isSidebarCollapse={isSidebarCollapse} handleNavMode={handleNavMode} navMode={navMode} handleToggleSidebar={handleToogleSidebar} />
        <div className={`app-sidebar ${isSidebarCollapse ? 'collapse' : ''}`} style={{ width: widthSidebar}}>
          <Flex alignY='center' alignX='space-between' padding='24px 8px 8px 8px'>
            <Flex alignY='center' pl='10px' pr='8px' style={{ display: isSidebarCollapse ? 'none' : 'flex'}}>
              <Box>
                <Avatar src={'/images/user-sidebar.svg'} />
              </Box>
              <Flex alignY='center' alignX='space-between' padding='0 0 0 8px'>
                <div>
                  <Text color='tertiary800' weight='700' block>
                    Telkom Indonesia
                  </Text>
                  <Text color='tertiary500' size='12px' block>
                    Status : &nbsp;<Text color='success500' weight='600'>Active</Text>
                  </Text>
                </div>
              </Flex>
            </Flex>
            {navMode === 'bottomLogo' && (
              <Button variant='transparent' onClick={handleToogleSidebar} color='tertiary'>
                <Menu />
              </Button>
            )}
          </Flex>
          <Sidebar items={ListMenu()} collapse={isSidebarCollapse}/>
          <Divider padding='10px'/>
          {!isSidebarCollapse && <Text padding='2px 24px' color='tertiary500' size='16px' block>Template Page</Text>}
          <Sidebar items={ListMenu()} collapse={isSidebarCollapse} />
          <Divider padding='10px'/>
          {!isSidebarCollapse && <Text padding='2px 24px' color='tertiary500' size='16px' block>Other Page</Text>}
          <Sidebar items={ListMenu()} collapse={isSidebarCollapse} />
        </div>
        <div className='app-main' style={{ width: `calc(100% - ${widthSidebar})`, marginLeft: widthSidebar }}>
          {children}
          <Footer />
        </div>
    </div>
  )
}


export default Base
