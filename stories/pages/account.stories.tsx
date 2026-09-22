import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ApplicationShell } from '@/layouts/application-shell';
import { AccountPageRouter, ACCOUNT_PAGE_TITLES } from '@/pages/account-pages';
import { accountNavigation } from '@/fixtures/account-navigation';

function AccountDemo({ initialPage, onAction }: { initialPage: string; onAction: (message: string) => void }) {
  const [activeId, setActiveId] = useState(initialPage);
  return (
    <ApplicationShell
      navigation={accountNavigation}
      activeId={activeId}
      onNavigate={setActiveId}
      title={ACCOUNT_PAGE_TITLES[activeId] ?? 'Account'}
      workspace="Design System"
      workspacePlan="Hobby"
      project="example-project"
      userName="Jamie Doe"
      onAction={onAction}
      variant="account"
      onBack={() => setActiveId('account-settings')}
      storageKey="design-system-account-story"
    >
      <AccountPageRouter activeId={activeId} onAction={onAction} />
    </ApplicationShell>
  );
}

const meta = {
  title: 'Pages/Account',
  parameters: { layout: 'fullscreen' },
  args: { onAction: fn() },
} satisfies Meta<{ onAction: (message: string) => void }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Settings: Story = { render: (args) => <AccountDemo initialPage="account-settings" onAction={args.onAction} /> };
export const Authentication: Story = { render: (args) => <AccountDemo initialPage="account-authentication" onAction={args.onAction} /> };
export const SignInWithVercel: Story = { render: (args) => <AccountDemo initialPage="account-sign-in" onAction={args.onAction} /> };
export const BillingInformation: Story = { render: (args) => <AccountDemo initialPage="account-billing-information" onAction={args.onAction} /> };
export const BillingItems: Story = { render: (args) => <AccountDemo initialPage="account-billing-items" onAction={args.onAction} /> };
export const Invoices: Story = { render: (args) => <AccountDemo initialPage="account-invoices" onAction={args.onAction} /> };
export const Tokens: Story = { render: (args) => <AccountDemo initialPage="account-tokens" onAction={args.onAction} /> };
