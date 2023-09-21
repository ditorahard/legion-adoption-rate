import { Flex, Text, Anchor } from "@legion-ui/core";

 
export default function Footer() {
  return(
    <Flex direction="row" alignX="space-between" padding="24px" margin="0 24px 0 24px" style={{borderTop: '1px solid gray'}}>
      <Flex>
      <Text>2022 © Dashboard Template by <Anchor>Legion Design System</Anchor></Text>
      </Flex>
      <Flex direction="row" alignX="space-between">
      <Anchor>About Us</Anchor> <Anchor>Help</Anchor> <Anchor>Contact Us</Anchor>
      </Flex>
    </Flex>
  )
}