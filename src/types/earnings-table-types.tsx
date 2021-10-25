export type Earning = {
  id: number;
  date: Date;
  details: Details[];
};
type Details = {
  id: number;
  company: Company;
  favorite: boolean;
  event: Event;
  sentiment: Sentiment;
  call: boolean;
  callType: string;
  epsEst: number;
  eps: number;
  surprise: number;
};
type Company = {
  shortName: string;
  fullName: string;
};
type Event = {
  type: string;
  name: string;
};
type Sentiment = {
  ats: string;
  option: string;
};
