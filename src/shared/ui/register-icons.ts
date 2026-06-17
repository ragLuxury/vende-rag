import { addIcon } from '@iconify/react';
import { icons as ionCollection } from '@iconify-json/ion';

const USED_ICONS: readonly string[] = [
  'chevron-forward-outline',
  'chevron-back-outline',
  'chevron-down-outline',
  'pricetag-outline',
  'location-outline',
  'images-outline',
  'camera-outline',
  'information-circle-outline',
  'person-outline',
  'home-outline',
  'add-circle-outline',
  'bag-handle-outline',
  'paper-plane-outline',
  'card-outline',
  'document-text-outline',
  'grid-outline',
  'log-out-outline',
  'warning-outline',
  'lock-closed-outline',
  'trash-outline',
  'eye-outline',
  'eye-off-outline',
  'checkmark-circle',
  'close-circle',
  'checkmark-circle-outline',
  'sync-outline',
  'refresh-outline',
  'search-outline',
  'funnel-outline',
  'image-outline',
];

let registered = false;

export function registerIcons(): void {
  if (registered) return;
  registered = true;

  const width = ionCollection.width ?? 512;
  const height = ionCollection.height ?? 512;

  for (const name of USED_ICONS) {
    const entry = ionCollection.icons[name];
    if (!entry) continue;
    addIcon(`ion:${name}`, { ...entry, width, height });
  }
}

registerIcons();
