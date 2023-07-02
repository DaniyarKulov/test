import { UserData } from './user-data.model';

export type SortMap = Record<string, (a: UserData, b: UserData) => number>;
