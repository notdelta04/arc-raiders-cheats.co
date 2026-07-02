import type { IconName } from '../lib/icons';
import type { MediaItem } from '../lib/media';
import { getCheatTierMedia } from '../lib/cheat-media';

export type CheatTier = {
  id: string;
  icon: IconName;
  tier: string;
  name: string;
  description: string;
  features: string[];
  media: MediaItem[];
  systemRequirements?: string[];
  featured?: boolean;
};

export const cheats: CheatTier[] = [
  {
    id: 'xray',
    icon: 'scan',
    tier: 'Minimal',
    name: 'Xray',
    description:
      'Entry-level Arc Raiders overlay with core ESP and smooth targeting — clean visuals without the full toolkit.',
    media: getCheatTierMedia('xray'),
    features: [
      'Raider Visibility Check',
      'ARC Weakpoint Selection',
      'Targeting FOV',
      'Smooth Targeting',
      'Enable Overlay ESP',
      'Raider Box ESP',
      'Health Bar ESP',
      'Distance Readout',
      'Skeleton ESP',
      'Head Marker ESP',
      'Loot Value ESP',
      'Box Type (Square, Corner, 2D, 3D)',
      'Health Bar Position (Right, Left, Bottom, Above)',
      'Overlay Menu',
      'Save Configs',
      'Cloud-Sync Option',
    ],
  },
  {
    id: 'pro',
    icon: 'crosshair',
    tier: 'Mid Tier',
    name: 'Pro',
    description:
      'Mid-tier combat suite — aim assist, trigger tools, and deep ESP. More than Xray, without the full Private stack.',
    media: getCheatTierMedia('pro'),
    features: [
      'Enable Aim Assist',
      'Aim Key Bind',
      'Raider Visibility Check',
      'Enable Trigger Assist',
      'Trigger Key Bind',
      'Trigger FOV',
      'Show Trigger FOV',
      'Enable Overlay ESP',
      'Raider Box ESP',
      'Fill Box ESP',
      'Health Bar ESP',
      'Distance Readout',
      'Player Name ESP',
      'Skeleton ESP',
      'Head Marker ESP',
      'Threat Level ESP',
      'Weapon ESP',
      'Box Type (Square, Corner, 2D, 3D)',
      'Health Bar Position (Right, Left, Bottom, Above)',
      'Hostile Only Filter',
      'Inactive Raider Check',
      'Overlay Menu',
      'Menu Theme Selector',
      'Wireframe Gear View',
      'Secure Boot Compatible',
      'Save Configs',
      'Cloud-Sync Option',
    ],
    featured: true,
  },
  {
    id: 'private',
    icon: 'enemy',
    tier: 'Private',
    name: 'Private',
    description:
      'Our in-house Viper private build — full aimbot, ESP, 2D radar, and extraction intel. Not resold, only available directly from us with long-term safety in mind.',
    systemRequirements: [
      'Steam version only (not Epic Games)',
      'Windows 10: 22H2, 21H2, 21H1, 20H2, 2004, 1909',
      'Windows 11: 23H2, 24H2, 25H2',
      'Intel Virtualization (VT-D) or AMD SVM enabled in BIOS',
      'Compatible with all CPUs and GPUs',
    ],
    media: getCheatTierMedia('private'),
    features: [
      'Enable Aimbot',
      'Drone Aimbot',
      'Custom Aim Keys (2 Slots)',
      'Selectable Hitboxes (Head, Neck, Chest, Body)',
      'Hold Shift = Head Aim',
      'Aim Smoothing',
      'Custom FOV Circle',
      'Visibility Check',
      'Max Aim Distance',
      'Dead Zone Control',
      'Focus Bots / Teams',
      'Draw Dead Zone',
      'Player ESP',
      'Drone ESP',
      'Team ESP',
      '2D Box ESP',
      'Names & Distance',
      'Health & Armor Bars',
      'Skeleton ESP',
      'Weapon Display',
      'Item & Loot ESP',
      'Max ESP Distance',
      '2D Radar Hack',
      'Radar Styles (Square, Circle, Custom)',
      'Show Players on Radar',
      'Show Drones on Radar',
      'Extraction Zone ESP',
      'ARC Patrol ESP',
      'Stream-Safe Mode',
      'Remaining Duration Display',
      'Language Switch (Chinese Supported)',
      'Direct Support Channel',
    ],
  },
];

export function getCheatById(id: string): CheatTier | undefined {
  return cheats.find((cheat) => cheat.id === id);
}

/** Ordered feature list for comparison table (Private → Pro → Xray merge). */
export function getComparisonFeatures(): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const cheat of [...cheats].reverse()) {
    for (const feature of cheat.features) {
      if (!seen.has(feature)) {
        seen.add(feature);
        ordered.push(feature);
      }
    }
  }
  return ordered;
}

/** Display features per tier — Private includes the full merged stack. */
export function getCheatFeatures(cheatId: string): string[] {
  if (cheatId === 'private') {
    return getComparisonFeatures();
  }
  return getCheatById(cheatId)?.features ?? [];
}

export function cheatHasFeature(cheatId: string, feature: string): boolean {
  if (cheatId === 'private') return true;
  const cheat = getCheatById(cheatId);
  return cheat?.features.includes(feature) ?? false;
}
