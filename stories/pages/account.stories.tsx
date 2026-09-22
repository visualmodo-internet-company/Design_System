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

const onAction = fn();
const meta = {
  title: 'Pages/Account',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Settings: Story = { render: () => <AccountDemo initialPage="account-settings" onAction={onAction} /> };
export const Authentication: Story = { render: () => <AccountDemo initialPage="account-authentication" onAction={onAction} /> };
export const SignInWithVercel: Story = { render: () => <AccountDemo initialPage="account-sign-in" onAction={onAction} /> };
export const BillingInformation: Story = { render: () => <AccountDemo initialPage="account-billing-information" onAction={onAction} /> };
export const BillingItems: Story = { render: () => <AccountDemo initialPage="account-billing-items" onAction={onAction} /> };
export const Invoices: Story = { render: () => <AccountDemo initialPage="account-invoices" onAction={onAction} /> };
export const Tokens: Story = { render: () => <AccountDemo initialPage="account-tokens" onAction={onAction} /> };
