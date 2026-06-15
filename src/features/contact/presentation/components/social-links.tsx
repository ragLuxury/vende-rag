import type { ComponentType } from 'react';

interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType;
}

const LINKS: readonly SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/rag.mx', icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/rag.mx', icon: FacebookIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/rag.mx', icon: PinterestIcon },
  { label: 'X', href: 'https://x.com/rag.mx', icon: XIcon },
];

export function SocialLinks() {
  return (
    <ul className="flex items-center justify-center gap-10">
      {LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="text-neutral-900"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.43 8.5 3.43 8.85 3.43 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M14 8.5h2.2V5.6c-.38-.05-1.32-.16-2.4-.16-2.38 0-4 1.45-4 4.12V12H7.1v3.2h2.7V23h3.3v-7.8h2.6l.4-3.2h-3V9.9c0-.93.25-1.4 1.6-1.4Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M12 2.2a9.8 9.8 0 0 0-3.57 18.92c-.05-.8-.1-2.04.02-2.92.11-.78.74-3.13.74-3.13s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .54-.35 1.36-.53 2.12-.15.63.32 1.15.94 1.15 1.13 0 2-1.19 2-2.91 0-1.52-1.1-2.58-2.66-2.58-1.81 0-2.88 1.36-2.88 2.77 0 .55.21 1.13.47 1.45.05.06.06.12.04.18l-.18.73c-.03.12-.1.15-.22.09-.81-.38-1.31-1.56-1.31-2.51 0-2.04 1.48-3.92 4.28-3.92 2.25 0 4 1.6 4 3.74 0 2.23-1.41 4.03-3.36 4.03-.66 0-1.27-.34-1.48-.74l-.4 1.54c-.15.56-.54 1.27-.81 1.7A9.8 9.8 0 1 0 12 2.2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}
