import { Language } from '../app/context/LanguageContext';

export interface LinkItem {
  label: string;
  href: string;
  icon: string;
}

export type Links = Record<Language, ReadonlyArray<LinkItem>>;
