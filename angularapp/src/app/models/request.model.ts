import { Feed } from "./feed.model";

export interface Request {
    _id?: string;             
    feedId: Feed;           
    userId: string;          
    livestockId: string;      
    quantity: number;
    status: string;
    requestDate: Date | string; 
    createdAt?: Date | string; 
    updatedAt?:string; 
}

  