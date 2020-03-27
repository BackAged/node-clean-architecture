import { ClientSession } from "mongodb";
export interface TransactionFN {
    (session: ClientSession): Promise<any>;
}


export interface DBInterface {
    create<T>(collectionName: string, model: T): Promise<T>;
    updateOne(collectionName: string, predicate: object, toUpdate: object): Promise<any>;
    deleteOne(collectionName: string, predicate: object): Promise<any>;
    findOne(collectionName: string, predicate: Record<string, any>): Promise<any>;
    find(collectionName: string, predicate: Record<string, any>,
        options: { skip?: number; limit?: number; sort?: object }): Promise<any>;
    withTransaction(fn: TransactionFN): Promise<any>;
    createIndexes(collectionName: string, indexes: any[]): Promise<any>;
}
