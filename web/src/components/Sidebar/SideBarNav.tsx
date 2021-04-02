import {Stack} from '@chakra-ui/react';

import {NavSection} from './NavSection';
import {NavLink} from './NavLink';

import {RiDashboardLine, RiContactsLine, RiInputMethodLine} from 'react-icons/ri';

export function SidebarNav() {
    return (
        <Stack
        spacing="12"
        alignItems="flex-start"
    >
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} href="/dashboard">
            Dashboard
          </NavLink>
          <NavLink icon={RiContactsLine} href="/users">
            Usuários
          </NavLink>

            
        </NavSection>

        <NavSection title="AUTOMAÇÃO">
           <NavLink icon={RiInputMethodLine} href="forms">
               Formulários
           </NavLink>
           <NavLink icon={RiInputMethodLine} href="/automation">
               Automação
           </NavLink>
        </NavSection>


    </Stack>
    );
}