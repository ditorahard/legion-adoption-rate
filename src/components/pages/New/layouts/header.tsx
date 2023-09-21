import React, { FC, useState } from 'react'
import { Bell, Settings, ChevronDown, Menu, Gitlab } from 'react-feather'
import { Flex, Box, Button, Dropdown, Text, Avatar, Badge } from '@legion-ui/core'

const Logo = '/images/legion-logo.svg'
const LogoPlain = '/images/legion-plain-logo.svg'

interface HeaderProps {
  handleToggleSidebar: (e?: any) => void
  handleNavMode: (e?: any) => void
  isSidebarCollapse?: boolean
  navMode?: string
}

const Header: FC<HeaderProps> = ({ handleToggleSidebar, isSidebarCollapse, navMode, handleNavMode }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const widhHeaderLeft = isSidebarCollapse && navMode === 'outsideLogo' ? '69px' : '263px'

  return (
    <header className='app-header'>
      <Flex alignX='space-between' alignY='center'>
        <Flex width={widhHeaderLeft} alignY='center' alignX={isSidebarCollapse && navMode === 'outsideLogo' ? 'center' : 'space-between'}>
          <Box pl={isSidebarCollapse && navMode === 'outsideLogo' ? '0' : '24px'}>
            <img src={isSidebarCollapse && navMode === 'outsideLogo' ? LogoPlain :Logo} loading='lazy' height='32' alt='logo' />
          </Box>
          {navMode === 'withLogo' && (
            <Button variant='transparent' onClick={handleToggleSidebar} color='tertiary' margin='0 12px 0 0'>
              <Menu />
            </Button>
          )}
        </Flex>
        <Flex width={`calc(100% - ${widhHeaderLeft})`} pr='24px' alignY='center' padding='4px 0' style={{ borderLeft: '1px solid #D0D5DD' }}>
          <Flex width='100%' alignY='center' alignX='space-between'>
            <div>
              {navMode === 'outsideLogo' && (
                <Button variant='transparent' onClick={handleToggleSidebar} color='tertiary' margin='0 0 0 12px'>
                  <Menu />
                </Button>
              )}
            </div>
            <Flex alignY='center' alignX='flex-end'>
              <Button
                margin='0 8px'
                variant='transparent'
                color='tertiary'
                onClick={() => window.open('https://gitlab.playcourt.id/telkomdev/legion-pattern-dashboard', '_blank')}
                title='Repository'
              >
                <Gitlab size={18} />
              </Button>
              
              <Dropdown
                onClose={() => setShowSetting(false)}
                show={showSetting}
                trigger={
                  <Button
                    variant='transparent'
                    color='tertiary'
                    onClick={() => setShowSetting((prev) => !prev)}
                  >
                    <Settings size={18} />
                  </Button>
                }
              >
                <Box padding='4px 8px' width='198px'>
                  <Button variant='transparent' margin='4px 0' color={navMode === 'withLogo' ? 'primary' : 'tertiary'} onClick={() => handleNavMode('withLogo')} block>Navigation Option 1</Button>
                  <Button variant='transparent' margin='4px 0' color={navMode === 'outsideLogo' ? 'primary' : 'tertiary'} onClick={() => handleNavMode('outsideLogo')} block>Navigation Option 2</Button>
                  <Button variant='transparent' margin='4px 0' color={navMode === 'bottomLogo' ? 'primary' : 'tertiary'} onClick={() => handleNavMode('bottomLogo')} block>Navigation Option 3</Button>
                </Box>
              </Dropdown>
              <Dropdown
                show={showNotif}
                onClose={() => setShowNotif(false)}
                trigger={
                  <Button
                    variant='transparent'
                    color='tertiary'
                    onClick={() => setShowNotif((prev) => !prev)}
                    margin='0 10px'
                  >
                    <Badge count='2'>
                      <Bell size={18} />
                    </Badge>
                  </Button>
                }
              >
                <Box padding='8px' width='198px'>
                  <Box padding='8px' radius='8px' background='#F5F3FF'>
                    <Text color='#875BF7' block>Outcome - Rp 200.000</Text>
                    <Text color='#667085' size='12px' height='18px'>20 Minutes Ago</Text>
                  </Box>
                  <Box padding='8px' radius='8px'>
                    <Text color='#875BF7' block>Outcome - Rp 200.000</Text>
                    <Text color='#667085' size='12px' height='18px'>20 Minutes Ago</Text>
                  </Box>
                </Box>
              </Dropdown>
              <Dropdown
                show={toggleMenu}
                onClose={() => setToggleMenu(false)}
                trigger={
                  <Button
                    iconLeft={<Avatar src='https://rickandmortyapi.com/api/character/avatar/192.jpeg' />}
                    iconRight={<ChevronDown />}
                    variant='transparent'
                    color='tertiary'
                    onClick={() => setToggleMenu((prev) => !prev)}
                  >
                    <div>
                      <Text color='tertiary800' weight='700' block>
                        Alwan Thio
                      </Text>
                      <Text color='tertiary500' size='12px' block>Administrator</Text>
                    </div>
                  </Button>
                }
              >
                <Box padding='4px 8px' width='198px'>
                  <Button variant='transparent' color='tertiary' margin='4px 0' block>Profile</Button>
                  <Button variant='transparent' color='tertiary' margin='4px 0' block>Logout</Button>
                </Box>
              </Dropdown>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </header>
  )
}

export default Header