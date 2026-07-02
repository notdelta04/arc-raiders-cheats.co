import type { IconName } from '../lib/icons';

export type Product = {
  id: string;
  icon: IconName;
  tier: string;
  name: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: 'ugc',
    icon: 'wrench',
    tier: 'Account Tools',
    name: 'UGC',
    description:
      'Account recovery and unban tool builder — custom workflows, appeal automation, and profile rebuilds after restrictions.',
    features: [
      'Account Unban Tool Builder',
      'Custom Workflow Configuration',
      'Profile Recovery Tools',
      'Ban Appeal Automation',
      'Multi-Game Account Support',
      'Appeal Template Library',
      'Session & Identity Reset',
      'Account Health Checker',
      'Step-by-Step Recovery Guides',
      'Encrypted Config Storage',
      'One-Click Tool Export',
      'Cloud-Sync Profiles',
      'Direct Support Channel',
    ],
  },
  {
    id: 'cloud-dma',
    icon: 'cloud',
    tier: 'Infrastructure',
    name: 'Cloud DMA',
    description:
      'Single-PC cheat infrastructure via Hyper-V — no second machine, USB DMA bridge, or PCIe card required.',
    features: [
      'Hyper-V Virtual Environment',
      'Single-PC Setup (No Second Machine)',
      'No USB DMA Bridge Required',
      'No PCIe Card Required',
      'Encrypted Activation Link',
      'Automated Installer',
      'Powers Full Cheat Stack',
      'Secure Service Provisioning',
      'One-Click Environment Setup',
      'Full Cheat Stack Integration',
      'Isolated VM Layer',
      'Remote Activation Support',
      'Setup Guides Included',
      'Priority Infrastructure Support',
    ],
    featured: true,
  },
  {
    id: 'hwid-spoofer',
    icon: 'shield',
    tier: 'Hardware',
    name: 'HWID Spoofer',
    description:
      'Hardware ID spoofing for disk serials, MAC addresses, GPU IDs, and more — compatible with EAC, BattlEye, Vanguard, and major anti-cheats.',
    features: [
      'Disk Serial Spoofing',
      'MAC Address Spoofing',
      'GPU ID Masking',
      'Motherboard UUID Reset',
      'SMBIOS Identifier Spoof',
      'Registry HWID Cleanup',
      'EAC Compatible',
      'BattlEye Compatible',
      'Vanguard Compatible',
      'All Major Anti-Cheat Support',
      'One-Click Spoof Profile',
      'Persistent Spoof Mode',
      'Clean Slate After HW Ban',
      'Spoof Verification Tool',
      'Secure Boot Compatible',
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductComparisonFeatures(): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const product of [...products].reverse()) {
    for (const feature of product.features) {
      if (!seen.has(feature)) {
        seen.add(feature);
        ordered.push(feature);
      }
    }
  }
  return ordered;
}

export function productHasFeature(productId: string, feature: string): boolean {
  const product = getProductById(productId);
  return product?.features.includes(feature) ?? false;
}

export const homepageFaqs = [
  {
    question: 'Is this site updated after Arc Raiders patches?',
    answer:
      'Yes. We review cheat tiers, product pages, and blog posts within 48 hours of major patches. Weapon balance, loot tables, and extraction routes are checked first.',
  },
  {
    question: 'What Arc Raiders cheat tiers do you offer?',
    answer:
      'Three tiers: Xray for core ESP and targeting, Pro for aim assist and trigger tools, and Private — our in-house Viper build with full aimbot, ESP, radar, and extraction intel.',
  },
  {
    question: 'What products are available besides cheats?',
    answer:
      'Cloud DMA runs our cheat stack on one PC via Hyper-V. UGC is an account recovery and unban tool builder. HWID Spoofer masks hardware IDs for EAC, BattlEye, Vanguard, and other anti-cheats.',
  },
  {
    question: 'How do I get access after purchase?',
    answer:
      'Click Get Access on any cheat or product page — you are taken straight to checkout for instant delivery. Setup steps and activation details follow immediately after purchase.',
  },
  {
    question: 'Which OS does the Private cheat support?',
    answer:
      'Windows 10 (22H2, 21H2, 21H1, 20H2, 2004, 1909) and Windows 11 (23H2, 24H2, 25H2). Compatible with all CPUs and GPUs. Intel Virtualization (VT-D) or AMD SVM must be enabled in BIOS. Steam version only — does not work with the Epic Games launcher.',
  },
  {
    question: 'Can I use my license key on another computer?',
    answer:
      'No. Your key locks to the first computer you activate it on. If you reinstall Windows or change hardware, open a Discord ticket and we will reset your HWID for you.',
  },
  {
    question: 'What payment methods are available?',
    answer:
      'We accept credit/debit cards, Apple Pay, and Google Pay with instant delivery. For Russian users we also provide a separate FunPay store that supports local card payments. If you prefer Alipay or WeChat, we offer a separate shop for those payment methods as well.',
  },
  {
    question: 'I found a bug or have a suggestion — where do I report it?',
    answer:
      'Post it in our Discord. There is a dedicated ARC Raiders channel for bug reports and suggestions, and that is where we track and fix issues.',
  },
] as const;
