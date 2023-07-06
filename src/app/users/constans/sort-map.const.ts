import { SortMap } from '../models/sort-map.type';
import { localeStringComporator } from './locale-string-comporator.const';

export const sortMap:SortMap = {
  name: (a, b) => ((b.name && a.name) ? localeStringComporator(a.name.first, b.name.first) : 1),
  age: (a, b) => b.age - a.age,
  company: (a, b) => localeStringComporator(a.company, b.company),
  email: (a, b) => localeStringComporator(a.email, b.email),
  balance: (a, b) => localeStringComporator(a.balance, b.balance),
  address: (a, b) => localeStringComporator(a.address, b.address),
  tags: (a, b) => localeStringComporator(a.tags[0], b.tags[0]),
  favorite_fruit: (a, b) => localeStringComporator(a.favoriteFruit, b.favoriteFruit),
};
