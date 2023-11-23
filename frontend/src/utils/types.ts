type IsoDateTimeString = `${number}T${number}:${number}:${number}.${number}Z`;
type IsoDateString = `${number}-${number}-${number}`;

export interface Message {
  id: number;
  content: string;
  sender: number;
  receiver: number;
  seen: boolean;
  timestampSent: IsoDateTimeString;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: IsoDateString;
  gender: string;
  username: string;
  latestMessageExchanged?: IsoDateTimeString;
}
