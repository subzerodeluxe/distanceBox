export interface ReceivedBoostRequest {
  $key?: string // nodig voor verwijderen 
  sendToUid: string,
  sendByUid: string,  
  timestamp: any, 
  date: string; 
  sendByName: string; 
  sendByProfileImage?: string;
  header: string;
  body: string;
  accepted: boolean; 
}