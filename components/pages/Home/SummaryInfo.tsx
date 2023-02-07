import { Body, Box, Card, Flex, Heading } from "legion-ui";
import { ReactNode } from "react";

type Props = {
    label: string;
    value: string;
    icon: ReactNode
}

export default function SummaryInfo({label, value, icon}: Props) {
    return <Card p={3} variant="bordered" sx={{ width: '24%' }}>
        <Flex sx={{ alignItems: 'center' }}>
            <Box>
                <Body size='sm_regular'>
                    {label}
                </Body>
                <Heading size="h4">
                    {value}
                </Heading>
            </Box>
            <Box ml="auto">
                {icon}
            </Box>
        </Flex>
    </Card>
}