import { Language } from '../app/context/LanguageContext';
import React from 'react';

export interface LinkItem {
  label: string;
  href: string;
  icon: string | React.ReactNode;
}

export type Links = Record<Language, ReadonlyArray<LinkItem>>;
