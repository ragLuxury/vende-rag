'use client';

import { TopNav } from '@/src/shared/ui/top-nav';
import { useCurrentUser } from '../hooks/use-current-user';
import { LoginModalProvider } from '../login-modal-context';
import { TopNavActions } from './top-nav-actions';
import { LandingHeader } from './landing-header';
import { LandingHero } from './landing-hero';
import { LandingValuation } from './landing-valuation';
import { LandingProcessTabs } from './landing-process-tabs';
import { LandingPaymentTimeline } from './landing-payment-timeline';
import { LandingWhyConsign } from './landing-why-consign';
import { LandingShipping } from './landing-shipping';
import { LandingFaq } from './landing-faq';
import { LandingFirstTime } from './landing-first-time';
import { LandingNewProducts } from './landing-new-products';
import { LandingFooter } from './landing-footer';

export function LandingScreen() {
  const user = useCurrentUser();

  return (
    <LoginModalProvider>
      <div className={`flex min-h-full flex-col bg-white ${user ? 'md:pt-20' : ''}`}>
        {user ? <TopNav trailing={<TopNavActions />} /> : <LandingHeader />}

        <LandingHero />
        <LandingValuation />
        <LandingProcessTabs />
        <LandingPaymentTimeline />
        <LandingWhyConsign />
        <LandingShipping />
        <LandingFaq />
        <LandingFirstTime />
        <LandingNewProducts />
        <LandingFooter isAuthenticated={Boolean(user)} />
      </div>
    </LoginModalProvider>
  );
}
