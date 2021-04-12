import { AppProps} from 'next/app';
import { ChakraProvider} from '@chakra-ui/react';
import {theme} from '../styles/theme';
import {SidebarDrawerProvider} from '../hooks/useSidebarDrawer';
import { makeServer } from '../services/mirage';
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {queryClient} from '../services/react-query/queryClient';


function MyApp({ Component, pageProps } : AppProps) {

  //se for ambiente de desenvolvimento vai chamar a função makeServer para 
  //iniciar o banco de dados
  if(process.env.NODE_ENV === 'development'){
    makeServer();
  }

  

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarDrawerProvider>
          <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
          </ChakraProvider>
      </SidebarDrawerProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
    
  )
}

export default MyApp
