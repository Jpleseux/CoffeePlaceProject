import { createContext, ReactNode } from 'react';
import HttpUser from './httpUser';
import FetchAdapter from "../http/fetchAdapter";
import httpCategory from './httpCategory';

interface GatewayContextType {
  userGateway: HttpUser;
  categoryGateway:httpCategory;
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

interface GatewayProviderProps {
  children: ReactNode;
}

function GatewayProvider({ children }: GatewayProviderProps) {
  const httpClient = new FetchAdapter();
  const userGateway = new HttpUser(httpClient);
  const categoryGateway = new httpCategory(httpClient);

  return (
    <GatewayContext.Provider value={{ userGateway, categoryGateway}}>
      {children}
    </GatewayContext.Provider>
  );
}

export { GatewayContext, GatewayProvider };
