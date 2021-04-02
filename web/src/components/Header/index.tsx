import {Flex, useBreakpointValue, IconButton, Icon} from '@chakra-ui/react';
import { NotificationNave } from './NotificationNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';
import {Logo} from './Logo';
import { useSidebarDrawer } from '../../hooks/useSidebarDrawer';
import { RiMenuLine } from 'react-icons/ri';

export default function Header() {

    const {disclosure} = useSidebarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
       <Flex
          as="header"
          width="100%"
          height="20"
          maxWidth={1480}
          mx="auto"
          mt="4"
          px="6"
          alignItems="center"

        >
            {
                !isWideVersion && (
                    <IconButton
                        aria-label="open navigation"
                        icon={<Icon as={RiMenuLine}/>}
                        fontSize={24}
                        variant="unstyled"
                        onClick={disclosure.onOpen}
                        mr="2"
                    >


                    </IconButton>
                )
            }
            <Logo/>

            {isWideVersion &&  <SearchBox/>}
            <Flex
                alignItems="center"
                ml="auto"
            > 
               
                <NotificationNave/>
                <Profile showProfiledata={isWideVersion}/>
            </Flex>
        </Flex>
    );
}