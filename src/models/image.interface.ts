export interface Image {
  $key?: string; 
  timestamp: string;
  uploadedBy: string;
  url: string;
  sentTo_OneSignalId: string;
  sentToUid?: string;  
}