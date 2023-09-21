import React from 'react'
import { Box, Flex, Anchor, Divider } from '@legion-ui/core'

const Footer = () => {
  return (
    <Box as='footer' padding='20px 0 0 0'>
      <Divider padding='0' />
      <Flex alignX='space-between' padding='20px 0 0 0'>
        <Box width={{xl: '50%', md: '50%', sm: '100%'}}>
          <span>2022 © Dashoard Template by</span>
          <Anchor href='https://legion.telkom.design'>Legion Design System</Anchor>
        </Box>
        <Box width={{xl: '50%', md: '50%', sm: '100%'}} alignX="right">
          <Anchor>About Us</Anchor>
          <Anchor>Help</Anchor>
          <Anchor>Contact Us</Anchor>
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer