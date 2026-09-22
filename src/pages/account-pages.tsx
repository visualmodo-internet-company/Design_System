import { useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  Copy,
  CreditCard,
  ExternalLink,
  FileSearch,
  Github,
  KeyRound,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Notify = (message: string) => void;

const account = {
  displayName: 'Jamie Doe',
  username: 'example-user',
  email: 'user@example.com',
  phone: '+1 (201) 555-0123',
  userId: 'usr_example_01',
  team: 'Example Team',
  company: 'Example Company',
  invoiceEmail: 'billing@example.com',
  country: 'United States',
  address: '1 Example Street',
};

const demoAccessRows = [
  { id: 'browser', name: 'Browser session from current device', detail: 'Created Aug 28 · Never expires', scope: 'Full account', last: 'Just now', state: 'active' },
  { id: 'cli-1', name: 'CLI access from workstation', detail: 'Created Sep 19 · Expired Sep 19', scope: 'Full account', last: 'Sep 19', state: 'expired' },
  { id: 'cli-2', name: 'CLI access from laptop', detail: 'Created Sep 18 · Revoked Sep 18', scope: 'Full account', last: 'Sep 18', state: 'revoked' },
  { id: 'automation', name: 'Automation access', detail: 'Created Sep 17 · Never expires', scope: 'Read and write', last: 'Sep 17', state: 'active' },
  { id: 'local', name: 'Local development access', detail: 'Created Sep 12 · Revoked Sep 17', scope: 'Read only', last: 'Sep 12', state: 'revoked' },
  { id: 'preview', name: 'Preview tooling access', detail: 'Created Sep 10 · Expired Sep 12', scope: 'Read only', last: 'Sep 10', state: 'expired' },
];

export const ACCOUNT_PAGE_TITLES: Record<string, string> = {
  'account-overview': 'Overview',
  'account-domains': 'Domains',
  'account-activity': 'Activity',
  'account-invites': 'Invites',
  'account-support': 'Support',
  'account-settings': 'Settings',
  'account-authentication': 'Authentication',
  'account-sign-in': 'Sign in with Vercel',
  'account-billing-information': 'Billing Information',
  'account-billing-items': 'Billing Items',
  'account-invoices': 'Invoices',
  'account-tokens': 'Tokens',
};

function AccountCard({
  title,
  description,
  children,
  footer,
  danger = false,
  className = '',
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  danger?: boolean;
  className?: string;
}) {
  return (
    <section className={`ds-account-card ${danger ? 'ds-account-card--danger' : ''} ${className}`}>
      <div className="ds-account-card-body">
        <div className="ds-account-card-heading">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
      {footer && <div className={`ds-account-card-footer ${danger ? 'ds-account-card-footer--danger' : ''}`}>{footer}</div>}
    </section>
  );
}

function FooterLine({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="ds-account-footer-line"><span>{children}</span>{action}</div>;
}

function AvatarMark() {
  return <div className="ds-account-avatar" aria-label="Example account avatar">DS</div>;
}

function SettingsPage({ onAction }: { onAction: Notify }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState(account.username);
  const [phone, setPhone] = useState(account.phone);
  return (
    <div className="ds-account-stack">
      <h1 className="ds-sr-only">Settings</h1>

      <AccountCard
        title="Avatar"
        description={<>This is your avatar.<br />Upload a custom avatar from your files.</>}
        footer={<span>An avatar is optional but strongly recommended.</span>}
        className="ds-account-avatar-card"
      >
        <AvatarMark />
      </AccountCard>

      <AccountCard
        title="Display Name"
        description="Please enter your full name, or a display name you are comfortable with."
        footer={<FooterLine action={<Button size="sm" disabled={!displayName.trim()} onClick={() => onAction('Display name saved locally for the demo.')}>Save</Button>}>Please use 32 characters at maximum.</FooterLine>}
      >
        <Input aria-label="Display Name" value={displayName} maxLength={32} onChange={(event) => setDisplayName(event.target.value)} className="ds-account-short-field" />
      </AccountCard>

      <AccountCard
        title="Username"
        description="This is your URL namespace within the platform."
        footer={<FooterLine action={<Button size="sm" onClick={() => onAction('Username saved locally for the demo.')}>Save</Button>}>Please use 48 characters at maximum.</FooterLine>}
      >
        <div className="ds-account-input-group ds-account-short-field">
          <span>example.com/</span>
          <Input aria-label="Username" value={username} maxLength={48} onChange={(event) => setUsername(event.target.value)} />
        </div>
      </AccountCard>

      <AccountCard
        title="Default Team"
        description="Your default team will be used when you make a request without specifying a particular team. It is also selected when you first navigate to the dashboard."
        footer={<FooterLine action={<Button size="sm" disabled>Save</Button>}><a className="ds-link" href="#default-team" onClick={(event) => event.preventDefault()}>Learn more about Default Teams <ExternalLink aria-hidden="true" /></a></FooterLine>}
      >
        <div className="ds-account-team-chip"><span className="ds-team-avatar-mark" aria-hidden="true" /><span>{account.team}</span><span aria-hidden="true">×</span></div>
      </AccountCard>

      <AccountCard
        title="Email"
        description="Enter the email addresses you want to use to log in with. Your primary email will be used for account-related notifications."
        footer={<span>Emails must be verified to be able to login with them or be used as primary email.</span>}
      >
        <div className="ds-account-list-row">
          <span className="ds-grow">{account.email}</span>
          <Badge variant="info">Verified</Badge>
          <Badge variant="success">Primary</Badge>
          <Button variant="ghost" size="icon-sm" aria-label="Email actions" onClick={() => onAction('Email actions opened in the demo.')}><MoreHorizontal aria-hidden="true" /></Button>
        </div>
        <Button size="sm" variant="outline" onClick={() => onAction('Add email demonstrated locally.')}><Plus aria-hidden="true" />Add Another</Button>
      </AccountCard>

      <AccountCard
        title="Your Phone Number"
        description="Enter a phone number to receive important service updates by SMS."
        footer={<FooterLine action={<Button size="sm" onClick={() => onAction('Phone number saved locally for the demo.')}>Save</Button>}>A code will be sent to verify.</FooterLine>}
      >
        <Input aria-label="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} className="ds-account-short-field" />
      </AccountCard>

      <AccountCard
        title="User ID"
        description="This is your user ID within the platform."
        footer={<span>Used when interacting with the platform API.</span>}
      >
        <div className="ds-account-copy-field">
          <code>{account.userId}</code>
          <Button variant="ghost" size="icon-sm" aria-label="Copy user ID" onClick={() => onAction('User ID copied in the demo.')}><Copy aria-hidden="true" /></Button>
        </div>
      </AccountCard>

      <AccountCard
        title="Reset Tips"
        description="See onboarding tips you might have missed."
        footer={<FooterLine action={<Button size="sm" onClick={() => onAction('Onboarding tips reset locally for the demo.')}>Reset</Button>}>Resetting will make all onboarding tips re-appear.</FooterLine>}
      />

      <AccountCard
        title="Delete Account"
        description="Permanently remove your Personal Account and all of its contents from the platform. This action is not reversible, so please continue with caution."
        danger
        footer={<div className="ds-account-danger-action"><Button size="sm" variant="destructive" onClick={() => onAction('Delete Account is intentionally non-destructive in this design demo.')}>Delete Personal Account</Button></div>}
      />
    </div>
  );
}

function AuthRow({
  icon,
  title,
  description,
  trailing,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="ds-account-auth-row">
      <span className="ds-account-auth-icon" aria-hidden="true">{icon}</span>
      <span className="ds-account-auth-copy"><strong>{title}</strong><span>{description}</span></span>
      {trailing && <div className="ds-account-auth-trailing">{trailing}</div>}
    </div>
  );
}

function AuthenticationPage({ onAction }: { onAction: Notify }) {
  return (
    <div className="ds-account-stack">
      <h1 className="ds-sr-only">Authentication</h1>
      <AccountCard title="Sign-in Methods" description="Customize how you access your account. Link your Git profiles and set up passkeys for seamless, secure authentication.">
        <div className="ds-account-auth-list">
          <AuthRow icon={<Mail />} title="Email" description={account.email} trailing={<Button size="sm" variant="outline" onClick={() => onAction('Manage email sign-in demonstrated.')}>Manage</Button>} />
          <AuthRow icon={<KeyRound />} title="Passkeys" description="0 passkeys registered" trailing={<Button size="sm" onClick={() => onAction('Add passkey demonstrated.')}>Add</Button>} />
          <AuthRow icon={<span className="ds-provider-dot">G</span>} title="Google" description={account.email} trailing={<><span className="ds-muted ds-small">Last used Aug 28</span><Button variant="ghost" size="icon-sm" aria-label="Google actions"><MoreHorizontal /></Button></>} />
          <AuthRow icon={<Github />} title="GitHub" description="Connect your GitHub account" trailing={<Button size="sm" onClick={() => onAction('Connect GitHub demonstrated.')}>Connect</Button>} />
          <AuthRow icon={<ChevronRight />} title="More options" description="Additional sign-in providers" trailing={<div className="ds-account-provider-marks" aria-hidden="true"><span>●</span><span>◆</span><span>◉</span><span>◎</span></div>} />
        </div>
      </AccountCard>

      <AccountCard
        title="Two-Factor Authentication"
        description="Protects your account by requiring a second factor at sign-in."
        danger
      >
        <div className="ds-account-danger-banner"><AlertTriangle aria-hidden="true" />It is strongly recommended to enable two-factor authentication.</div>
        <div className="ds-account-auth-list">
          <AuthRow icon={<KeyRound />} title="Passkeys" description="Sign in with biometrics. Faster and safer than a password." trailing={<Button size="sm" onClick={() => onAction('Add passkey demonstrated.')}>Add Passkey</Button>} />
          <AuthRow icon={<Smartphone />} title="Authenticator App (TOTP)" description="Use an app like 1Password, Google Authenticator, or Microsoft Authenticator." trailing={<Button size="sm" onClick={() => onAction('Authenticator setup demonstrated.')}>Set Up</Button>} />
        </div>
      </AccountCard>

      <AccountCard
        title="Team Authentication"
        description="Authentication methods for connecting to your organization's teams."
        footer={<a className="ds-link" href="#saml" onClick={(event) => event.preventDefault()}>Learn more about SAML Single Sign-On <ExternalLink aria-hidden="true" /></a>}
      >
        <p className="ds-muted">If any of your teams have SAML enabled you'll see them here to connect.</p>
      </AccountCard>
    </div>
  );
}

function SignInPage({ onAction }: { onAction: Notify }) {
  const [query, setQuery] = useState('');
  const visible = 'Vercel CLI'.toLowerCase().includes(query.toLowerCase());
  return (
    <div className="ds-account-standalone">
      <div className="ds-account-page-heading">
        <h1>Sign in with Vercel</h1>
        <p>Use your Vercel account to log in to third-party applications. <a href="#learn" className="ds-link" onClick={(event) => event.preventDefault()}>Learn More <ExternalLink aria-hidden="true" /></a></p>
      </div>
      <div className="ds-account-toolbar">
        <div className="ds-search"><Search aria-hidden="true" /><Input type="search" aria-label="Filter applications" placeholder="Filter..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <Select defaultValue="all"><SelectTrigger aria-label="Connection status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="connected">Connected</SelectItem></SelectContent></Select>
      </div>
      {visible && <div className="ds-account-connected-row">
        <span className="ds-account-app-icon" aria-hidden="true">▲</span>
        <span className="ds-account-auth-copy"><strong>Vercel CLI</strong><span>Owned by Vercel <ShieldCheck aria-hidden="true" /></span></span>
        <span className="ds-muted ds-small">Connected Sep 17</span>
        <Button variant="ghost" size="icon-sm" aria-label="Connection actions" onClick={() => onAction('Connection actions demonstrated.')}><MoreHorizontal /></Button>
      </div>}
    </div>
  );
}

function BillingInformationPage({ onAction }: { onAction: Notify }) {
  const [invoiceEmail, setInvoiceEmail] = useState(account.invoiceEmail);
  const [company, setCompany] = useState(account.company);
  const [address, setAddress] = useState(account.address);
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [taxId, setTaxId] = useState('000000000');
  const save = (label: string) => onAction(`${label} saved locally for the demo.`);
  return (
    <div className="ds-account-stack">
      <h1 className="ds-sr-only">Billing Information</h1>
      <AccountCard
        title="Payment Method"
        description="Payments for domains, add-ons, and other usage are made using the default card."
        footer={<FooterLine action={<Button size="sm" onClick={() => onAction('Add card demonstrated locally.')}>Add Card</Button>}>At most, three credit cards can be added.</FooterLine>}
      >
        <div className="ds-account-empty-inline"><span className="ds-empty-icon"><CreditCard /></span><span>No payment methods added</span></div>
      </AccountCard>

      <AccountCard title="Invoice Email Recipient" description="By default, all your invoices will be sent to your account's email address. If you want to use a custom email address specifically for receiving invoices, enter it here." footer={<FooterLine action={<Button size="sm" onClick={() => save('Invoice email recipient')}>Save</Button>}>Please use 254 characters at maximum.</FooterLine>}>
        <Input aria-label="Invoice Email Recipient" value={invoiceEmail} onChange={(event) => setInvoiceEmail(event.target.value)} />
      </AccountCard>

      <AccountCard title="Company Name" description="By default, your account name is shown on your invoice. If you want to show a custom name instead, please enter it here." footer={<FooterLine action={<Button size="sm" onClick={() => save('Company name')}>Save</Button>}>Please use 64 characters at maximum.</FooterLine>}>
        <Input aria-label="Company Name" value={company} onChange={(event) => setCompany(event.target.value)} />
      </AccountCard>

      <AccountCard title="Billing Address" description={null} footer={<div className="ds-account-danger-action"><Button size="sm" disabled>Save</Button></div>}>
        <div className="ds-account-form-stack">
          <Label htmlFor="billing-name">Name or Organization</Label><Input id="billing-name" value={company} onChange={(event) => setCompany(event.target.value)} />
          <Label htmlFor="billing-country">Country or Region</Label><Select defaultValue="us"><SelectTrigger id="billing-country"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="us">United States</SelectItem><SelectItem value="br">Brazil</SelectItem><SelectItem value="gb">United Kingdom</SelectItem></SelectContent></Select>
          <Label htmlFor="billing-address">Address</Label><Input id="billing-address" value={address} onChange={(event) => setAddress(event.target.value)} />
        </div>
      </AccountCard>

      <AccountCard title="Invoice Language" description="If your billing department is using a different language, enter it here." footer={<FooterLine action={<Button size="sm" onClick={() => save('Invoice language')}>Save</Button>}>This field determines the language of your invoice.</FooterLine>}>
        <Select defaultValue="en"><SelectTrigger aria-label="Invoice Language"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="pt">Português</SelectItem><SelectItem value="es">Español</SelectItem></SelectContent></Select>
      </AccountCard>

      <AccountCard title="Invoice Purchase Order" description="By default, no purchase order line is shown on your account's billing invoices. If you want to show a purchase order line, please enter it here." footer={<FooterLine action={<Button size="sm" onClick={() => save('Invoice purchase order')}>Save</Button>}>Please use 64 characters at maximum.</FooterLine>}>
        <Input aria-label="Invoice Purchase Order" value={purchaseOrder} onChange={(event) => setPurchaseOrder(event.target.value)} />
      </AccountCard>

      <AccountCard title="Tax ID" description="If you would like your invoice to render a specific tax ID, enter it here." footer={<FooterLine action={<Button size="sm" onClick={() => save('Tax ID')}>Save</Button>}>Countries that do not use Tax IDs are not listed.</FooterLine>}>
        <div className="ds-account-tax-row">
          <Select defaultValue="us-tax"><SelectTrigger aria-label="Tax type"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="us-tax">US Tax ID</SelectItem><SelectItem value="vat">VAT number</SelectItem></SelectContent></Select>
          <Input aria-label="Tax ID" value={taxId} onChange={(event) => setTaxId(event.target.value)} />
        </div>
      </AccountCard>
    </div>
  );
}

function BillingItemsPage({ onAction }: { onAction: Notify }) {
  return (
    <div className="ds-account-section-stack">
      <section><h1 className="ds-account-section-title">Personal</h1>
        <div className="ds-account-billing-item">
          <div className="ds-account-billing-item-top"><div><strong className="ds-account-plan-name">V0 Plan</strong><Badge>Free</Badge></div></div>
          <FooterLine action={<Button variant="outline" onClick={() => onAction('Billing settings demonstrated.')}>View Billing Settings</Button>}>Learn more by visiting v0's <a className="ds-link" href="#pricing" onClick={(event) => event.preventDefault()}>pricing page <ExternalLink aria-hidden="true" /></a>.</FooterLine>
        </div>
      </section>
      <section><h2 className="ds-account-section-title">Teams</h2>
        <div className="ds-account-billing-item">
          <div className="ds-account-billing-item-top"><div className="ds-row"><span className="ds-team-avatar-mark" aria-hidden="true" /><strong className="ds-account-plan-name">{account.team}</strong><Badge>Hobby</Badge><Badge variant="success">Active</Badge></div></div>
          <FooterLine action={<Button variant="outline" onClick={() => onAction('Team billing settings demonstrated.')}>View Billing Settings</Button>}>Visit {account.team}'s billing settings for details.</FooterLine>
        </div>
      </section>
    </div>
  );
}

function InvoicesPage() {
  return (
    <div className="ds-account-invoices">
      <h1 className="ds-sr-only">Invoices</h1>
      <Select defaultValue="all"><SelectTrigger aria-label="Invoice filter"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Invoices</SelectItem><SelectItem value="paid">Paid</SelectItem></SelectContent></Select>
      <div className="ds-account-empty-large"><span className="ds-empty-icon"><FileSearch /></span><strong>No Invoices</strong><p>You currently don't have any invoices.</p></div>
    </div>
  );
}

function TokensPage({ onAction }: { onAction: Notify }) {
  const [name, setName] = useState('New Token');
  const [filter, setFilter] = useState('all');
  const visible = useMemo(() => demoAccessRows.filter((row) => filter === 'all' || row.state === filter), [filter]);
  return (
    <div className="ds-account-token-page">
      <div className="ds-account-page-heading">
        <h1>Tokens</h1>
        <p>These tokens allow other apps to control your whole account. Be careful!</p>
      </div>
      <AccountCard title="Create Token" description="Enter a unique name for your token to differentiate it from other tokens. Then select the scope for the token." footer={<FooterLine action={<Button size="sm" onClick={() => onAction(`Create access for ${name} demonstrated locally.`)}>Create</Button>}><a href="#access-tokens" className="ds-link" onClick={(event) => event.preventDefault()}>Learn more about Access Tokens <ExternalLink aria-hidden="true" /></a></FooterLine>}>
        <div className="ds-account-create-token-grid">
          <div><Label htmlFor="token-name">TOKEN NAME</Label><Input id="token-name" value={name} onChange={(event) => setName(event.target.value)} /></div>
          <div><Label htmlFor="token-scope">SCOPE</Label><Select defaultValue="all"><SelectTrigger id="token-scope"><Search aria-hidden="true" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Select scope</SelectItem><SelectItem value="read">Read only</SelectItem></SelectContent></Select></div>
          <div><Label htmlFor="token-expiration">EXPIRATION</Label><Select defaultValue="date"><SelectTrigger id="token-expiration"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="date">Select Date</SelectItem><SelectItem value="never">Never</SelectItem></SelectContent></Select></div>
        </div>
      </AccountCard>

      <Tabs value={filter} onValueChange={setFilter} className="ds-account-token-tabs">
        <TabsList aria-label="Token status"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="expired">Expired</TabsTrigger><TabsTrigger value="revoked">Revoked</TabsTrigger></TabsList>
      </Tabs>

      <div className="ds-account-token-table" role="table" aria-label="Access tokens">
        <div className="ds-account-token-row ds-account-token-head" role="row">
          <span role="columnheader"><Checkbox aria-label="Select all tokens" />Select all</span>
          <span role="columnheader">Scope</span>
          <span role="columnheader">Last active</span>
          <span role="columnheader"><MoreHorizontal aria-hidden="true" /></span>
        </div>
        {visible.map((row) => <div className="ds-account-token-row" role="row" key={row.id}>
          <span role="cell" className="ds-account-token-name-cell"><Checkbox aria-label={`Select ${row.name}`} /><span className="ds-account-token-glyph" aria-hidden="true">▲</span><span><strong>{row.name}</strong><small>{row.detail}</small></span></span>
          <span role="cell"><span className="ds-account-scope-dot" aria-hidden="true" />{row.scope}</span>
          <span role="cell">{row.last}</span>
          <span role="cell"><Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.name}`} onClick={() => onAction('Access row actions demonstrated.')}><MoreHorizontal /></Button></span>
        </div>)}
      </div>
    </div>
  );
}

function AccountPlaceholderPage({ activeId }: { activeId: string }) {
  const title = ACCOUNT_PAGE_TITLES[activeId] ?? 'Account';
  return (
    <div className="ds-account-standalone">
      <div className="ds-account-page-heading">
        <h1>{title}</h1>
        <p>This navigation destination is included for shell consistency. A page-specific visual reference has not been supplied yet.</p>
      </div>
      <div className="ds-account-empty-large"><span className="ds-empty-icon"><FileSearch /></span><strong>{title}</strong><p>Use the shared account shell when this page is designed.</p></div>
    </div>
  );
}

export function AccountPageRouter({ activeId, onAction }: { activeId: string; onAction: Notify }) {
  switch (activeId) {
    case 'account-authentication': return <AuthenticationPage onAction={onAction} />;
    case 'account-sign-in': return <SignInPage onAction={onAction} />;
    case 'account-billing-information': return <BillingInformationPage onAction={onAction} />;
    case 'account-billing-items': return <BillingItemsPage onAction={onAction} />;
    case 'account-invoices': return <InvoicesPage />;
    case 'account-tokens': return <TokensPage onAction={onAction} />;
    case 'account-settings': return <SettingsPage onAction={onAction} />;
    case 'account-overview':
    case 'account-domains':
    case 'account-activity':
    case 'account-invites':
    case 'account-support':
      return <AccountPlaceholderPage activeId={activeId} />;
    default: return <SettingsPage onAction={onAction} />;
  }
}
