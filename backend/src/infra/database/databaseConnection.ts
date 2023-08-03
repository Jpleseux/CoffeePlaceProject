
export default interface databaseConnection{
    connect(): Promise<void>;
}