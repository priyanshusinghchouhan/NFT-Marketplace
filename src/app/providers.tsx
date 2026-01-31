'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {SUPPORTED_CHAIN} from "../constants/constants";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';

const config = getDefaultConfig({
  appName: 'NFTMarketplace',
  projectId: '1f9736ac8720848b24ee28f303f903db',
  chains: [SUPPORTED_CHAIN],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: "#FFF01F",          
          accentColorForeground: "#000000",
          borderRadius: "large",
        })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}