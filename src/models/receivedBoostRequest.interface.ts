export interface ReceivedBoostRequest {
  $key?: string // nodig voor verwijderen 
  sentToUid: string,
  sentByUid: string,  
  timestamp: any, 
  date: string; 
  sentByName: string; 
  sentByProfileImage?: string;
  header: string;
  body: string;
  accepted: boolean; 
}