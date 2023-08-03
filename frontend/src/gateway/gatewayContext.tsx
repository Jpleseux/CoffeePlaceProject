import { createContext, ReactNode } from 'react';
import HttpUser from './httpUser';
import FetchAdapter from "../http/fetchAdapter";

interface GatewayContextType {
  userGateway: HttpUser;
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

interface GatewayProviderProps {
  children: ReactNode;
}

function GatewayProvider({ children }: GatewayProviderProps) {
  const httpClient = new FetchAdapter();
  const userGateway = new HttpUser(httpClient);

  return (
    <GatewayContext.Provider value={{ userGateway }}>
      {children}
    </GatewayContext.Provider>
  );
}

export { GatewayContext, GatewayProvider };
