import { Cities } from "./cities";

export interface Departments {
  Id: number;
  Code: string;
  Description: string;
  Cities: Cities[];
}
