import { createContext, ReactNode } from 'react';
import HttpUser from './httpUser';
import FetchAdapter from "../http/fetchAdapter";
import httpCategory from './httpCategory';
import httpProduct from './httpProduct';
import httpOrder from './httpOrder';
import httpChat from './httpChat';
import httpMessage from './httpMessage';
import httpNotification from './httpNotification';
import httpEmail from './httpEmail';
interface GatewayContextType {
  userGateway: HttpUser;
  categoryGateway:httpCategory;
  productGateway:httpProduct;
  orderGateway:httpOrder;
  chatGateway:httpChat;
  messageGateway:httpMessage;
  notificationGateway:httpNotification;
  emailGateway:httpEmail;
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

interface GatewayProviderProps {
  children: ReactNode;
}

function GatewayProvider({ children }: GatewayProviderProps) {
  const httpClient = new FetchAdapter();
  const userGateway = new HttpUser(httpClient);
  const categoryGateway = new httpCategory(httpClient);
  const productGateway = new httpProduct(httpClient);
  const orderGateway = new httpOrder(httpClient);
  const chatGateway = new httpChat(httpClient);
  const messageGateway = new httpMessage(httpClient);
  const notificationGateway = new httpNotification(httpClient);
  const emailGateway = new httpEmail(httpClient);

  return (
    <GatewayContext.Provider value={{ userGateway, categoryGateway, productGateway, orderGateway, chatGateway, messageGateway, notificationGateway, emailGateway}}>
      {children}
    </GatewayContext.Provider>
  );
}

export { GatewayContext, GatewayProvider };
