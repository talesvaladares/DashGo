import {Box,
    Drawer,
    useBreakpointValue,
    DrawerOverlay,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../hooks/useSidebarDrawer";
import { SidebarNav } from "./SideBarNav";

export default function Sidebar () {

    const {disclosure} = useSidebarDrawer();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false
    });

    if(isDrawerSidebar) {
       return (
            <Drawer isOpen={disclosure.isOpen} placement="left" onClose={disclosure.onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navagação</DrawerHeader>
                        <DrawerBody>
                            <SidebarNav/>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }

    return (
        <Box 
            as="aside"
            w="64"
            mr="8"

        >
           <SidebarNav/>

        </Box>
    );
}