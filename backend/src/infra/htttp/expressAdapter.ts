import httpServer from "./httpServer";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import Order from "../../domain/entities/Order";
import databaseRepositoryFactory from "../factory/databaseRepositoryFactory";
import Chat from "../../domain/entities/Chat";
import generateRandomCode from "../../domain/entities/generateCod";
import Message from "../../domain/entities/Message";
import Notification from "../../domain/entities/Notification";
import Product from "../../domain/entities/Product";

enum httpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

export default class expressAdapter implements httpServer {
  app: any;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(cors(corsOptions));
    const server = http.createServer(this.app);
    const factoryDatabase = new databaseRepositoryFactory();
    const chatDatabase = factoryDatabase.createChatRepository();
    const messageDatabase = factoryDatabase.createMessageRepository();
    const orderDatabase = factoryDatabase.createOrderRepository();
    const notificationDatabase = factoryDatabase.createNotificationRepository();
    const productDatabase = factoryDatabase.createProductRepository();
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
      }, 
    });
    io.listen(4000);
    io.on("connection", (socket: any) => {
      socket.on("Purchase", async (order: Order) => {
        console.log(order)
        const cod = await generateRandomCode();
        // @ts-ignore
        const chat = new Chat(cod, "order",[{ nameUser: order.saller, role: "salesman",typeChat:"order"  }]);
        const notification = new Notification("O senhor tem uma nova venda, clique no Link abaixo para entrar no chat", true, order.saller, chat._id );
        const product =  order.product;
        const newamount = await product[0].amount - order.amount;
        await productDatabase.setNewAmountFromProduct(product[0]._id,newamount);
        await notificationDatabase.save(notification);
        const newChat = await chatDatabase.save(chat);
        // @ts-ignore
        const message = new Message("order", "O senhor tem um novo pedido", order.buyer.nameBuyer, newChat._id, order);
        const newMessage = await messageDatabase.save(message);
        io.emit("reciveMessage", newMessage);
      });
      socket.on("teste", ()=>{
        console.log("Deu certo")
      })

      socket.on("new-message", async (msg: Message) => {
        await messageDatabase.save(msg);
        io.emit("reciveMessage", msg);
      });

      socket.on("cancelOrder", async (idOrder: string, idChat: string, nameReceiver:string, order:Order) => {
        const oldNotification = await notificationDatabase.getByChat(idChat);
        // @ts-ignore
        const product:Product = await productDatabase.getById(order.product[0]._id)
        for(let notification of oldNotification){
          await notificationDatabase.delete(notification.id);
        };
        const newAmount = order.amount + product.amount
        await productDatabase.setNewAmountFromProduct(order.product[0]._id,newAmount );
        // @ts-ignore
        await orderDatabase.delete(idOrder);
        const notification = new Notification("O pedido abaixo foi cancelado pelo vendedor:", true, nameReceiver, undefined , order);
        await notificationDatabase.save(notification);
        await chatDatabase.delete(idChat);
        socket.emit("confirmState", { msg: "Pedido cancelado com sucesso", done: true });
        return "";
      });

      socket.on("confirmOrder", async (buyer: string, saller: string, idChat: string, order:Order) => {
        console.log(order)
        const cod = await generateRandomCode();
        const notification = new Notification("O pedido abaixo foi confirmado pelo vendedor:", true, buyer, cod , order);
        await notificationDatabase.save(notification);
        // @ts-ignore
        const chat = new Chat(cod , "normal", [{ nameUser: saller, role: "salesman" }, { nameUser: buyer, role: "buyer" }]);
        const msg = new Message("order", `O código de finalização do pedido é ${order.finalOrderCode}, quando o vendedor pedir o mesmo forneça, mas apenas quando a compra for finalizada`, "system", cod.toString(), order);
        await messageDatabase.save(msg);
        await chatDatabase.save(chat);
        await chatDatabase.delete(idChat);
        socket.emit("confirmState", {
          msg: "Pedido confirmado com sucesso, uma notificação irá te redirecionar ao chat com o comprador e esse chat será deletado",
          done: true,
        });
      });
      socket.on("finalizePurchase", async(idOrder:string)=>{
        const response = await orderDatabase.setfinalizedOrder(idOrder);
        if(response === false){
          socket.emit("confirmState", {
            msg: "Erro ao finalizar pedido",
            done: false,
          });
        }
        if(response === true){
          socket.emit("confirmState", {
            msg: "Pedido finalizado com sucesso",
            done: true,
          });
        }
      });
    });
  }

  on(method: httpMethods, url: String, callBack: Function, middleware?: any): void {
    if (middleware) {
      this.app[method](url, middleware, async function (req: Request, res: Response) {
        try {
          const output = await callBack(req.params, req.body, req.headers);
          res.status(output.typeHttpResponse).json(output.data);
        } catch (e: any) {
          res.status(422).json({ msg: "Error:" + e.message });
        }
      });
    } else {
      this.app[method](url, async function (req: Request, res: Response) {
        try {
          const output = await callBack(req.params, req.body, req.headers);
          res.status(output.typeHttpResponse).json(output.data);
        } catch (e: any) {
          res.status(422).json({ msg: e.message, done: false });
        }
      });
    }
  }

  listen(port: Number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
