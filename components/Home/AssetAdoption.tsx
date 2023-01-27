import { Body, Box, Card, Flex } from "legion-ui";

type AdoptionEachProject = {
    label: string;
    value: number;
}

type Props = {
    componentPercentage: number;
    adoptionEachProjects: AdoptionEachProject[];
}

export default function AssetAdoption({ componentPercentage, adoptionEachProjects }: Props) {
    return <Card variant='bordered' p={3} sx={{ width: '24%' }}>
        <Body size="lg_bold">
            Assets Adoption
        </Body>
        <Box>
            <Body size="sm_regular">
                Total of components adoption in projects
            </Body>
        </Box>
        <Box mt={3}>
            <Body size="lg_bold">
                ?%
            </Body>
        </Box>
        <Box bg="#DDE2EF" sx={{
            position: 'relative',
            height: '4px',
            borderRadius: '20px',
            overflow: 'hidden',
        }}>
            <Flex
                role="progressbar"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={80}
                aria-label="Assets Coverage"
                bg="success500"
                sx={{
                    width: '50%',
                    borderRadius: '20px',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} />

        </Box>
        <Box mt={"24px"}>
            <Body size="lg_bold">
                Leaderboard Project
            </Body>
        </Box>
        <Box>
            <Body size="sm_regular">
                Top leader of adoption legion assets
            </Body>
        </Box>
        <Flex mt="24px" sx={{ flexDirection: 'column', gap: '16px' }}>
            {adoptionEachProjects.map(({ label, value }) => <Flex key={label}>
                <Body size="sm_regular">
                    {label}
                </Body>
                <Body size="sm_bold" ml="auto">
                    {value}%
                </Body>
            </Flex>)}
        </Flex>
    </Card>;
}
