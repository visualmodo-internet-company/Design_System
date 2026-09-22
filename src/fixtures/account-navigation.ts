import {
  Activity,
  FileText,
  Globe2,
  KeyRound,
  LayoutGrid,
  LifeBuoy,
  Mail,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserRoundCheck,
  WalletCards,
} from 'lucide-react';
import type { NavigationGroup } from '@/blocks/navigation';

export const accountNavigation: NavigationGroup[] = [
  {
    id: 'account-primary',
    items: [
      { id: 'account-overview', label: 'Overview', icon: LayoutGrid },
      { id: 'account-domains', label: 'Domains', icon: Globe2 },
      { id: 'account-activity', label: 'Activity', icon: Activity },
      { id: 'account-invites', label: 'Invites', icon: Mail },
      { id: 'account-support', label: 'Support', icon: LifeBuoy },
    ],
  },
  {
    id: 'account-settings',
    items: [
      {
        id: 'account-settings',
        label: 'Settings',
        icon: Settings,
        children: [
          { id: 'account-authentication', label: 'Authentication', icon: ShieldCheck },
          { id: 'account-sign-in', label: 'Sign in with Vercel', icon: UserRoundCheck },
          { id: 'account-billing-information', label: 'Billing Information', icon: WalletCards },
          { id: 'account-billing-items', label: 'Billing Items', icon: ReceiptText },
          { id: 'account-invoices', label: 'Invoices', icon: FileText },
          { id: 'account-tokens', label: 'Tokens', icon: KeyRound },
        ],
      },
    ],
  },
];
