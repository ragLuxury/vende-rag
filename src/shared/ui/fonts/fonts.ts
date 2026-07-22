import { Cormorant_Garamond, Manrope } from 'next/font/google';
import localFont from 'next/font/local';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const commutersSans = localFont({
  src: [
    { path: './commuterssans-regular-webfont.woff2', weight: '400', style: 'normal' },
    { path: './commuterssans-semibold-webfont.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-commuters-sans',
  display: 'swap',
});

const editorsNote = localFont({
  src: [
    { path: './editor_snote-hairline-webfont.woff2', weight: '100', style: 'normal' },
    { path: './editor_snote-hairlineitalic-webfont.woff2', weight: '100', style: 'italic' },
    { path: './editor_snote-light-webfont.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-editors-note',
  display: 'swap',
});

const alfredinoSemiMono = localFont({
  src: './alfredino-semimono-webfont.woff2',
  variable: '--font-alfredino',
  display: 'swap',
});

export const fontVariables = [
  manrope.variable,
  commutersSans.variable,
  editorsNote.variable,
  alfredinoSemiMono.variable,
  cormorantGaramond.variable,
].join(' ');
