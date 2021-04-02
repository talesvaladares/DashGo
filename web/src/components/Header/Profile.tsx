import {Flex, Box, Text, Avatar} from '@chakra-ui/react';

interface ProfileProps{
    showProfiledata?: boolean;
}

export function Profile({showProfiledata = true}: ProfileProps) {
    return (
        <Flex alignItems="center">
            {showProfiledata && (
                <Box mr="4" textAlign="right">
                    <Text>Tales Eduardo</Text>
                    <Text
                        color="gray.300"
                        fontSize="small"
                    >
                        tales.e.valadares@gmail.com
                    </Text>             
                </Box>
            )}

            <Avatar
                size="md"
                name="Tales Eduardo"
                src="https://github.com/talesvaladares.png"
            />

        </Flex>
    );
}