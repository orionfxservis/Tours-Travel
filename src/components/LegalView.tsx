import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale,
  ShieldCheck,
  FileText,
  AlertCircle,
  CreditCard,
  Lock,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';

export const LegalView: React.FC = () => {
  const { showToast } = useApp();
  const [openSection, setOpenSection] = useState<string>('cancellation');

  const legalSections = [
    {
      id: 'cancellation',
      icon: <AlertCircle className="w-4 h-4 text-primary" />,
      title: 'Flexible Cancellation & Refund Policy',
      content: `
        At Voyager, we understand that expeditions require flexibility. All standard bookings feature our 48-Hour Grace Window where you can cancel for a 100% full refund with zero cancellation fees.

        • Cancellations made 30+ days prior to departure: 100% refund of trip balance, minus non-refundable charter deposits.
        • Cancellations 14 to 29 days prior: 75% credit towards any future Voyager expedition, valid for 24 months.
        • Cancellations under 14 days: Protected by Voyager Comprehensive Trip Interruption Insurance (where included).
      `
    },
    {
      id: 'payment-security',
      icon: <CreditCard className="w-4 h-4 text-secondary" />,
      title: 'Payment Gateway Security & PCI-DSS Compliance',
      content: `
        Voyager utilizes bank-grade 256-bit SSL encryption. All cardholder data is tokenized and processed via Stripe and Apple Pay certified PCI Service Provider Level 1 infrastructure. 

        Voyager never stores raw credit card numbers, CVVs, or bank credentials on client devices or server databases. Multi-factor 3D Secure 2.0 (3DS) authentication is enforced for all cross-border transactions.
      `
    },
    {
      id: 'terms',
      icon: <Scale className="w-4 h-4 text-tertiary" />,
      title: 'Terms of Service & Itinerary Governance',
      content: `
        By scheduling or booking an expedition with Voyager, you agree to our bespoke traveler covenants. Custom itineraries are curated in conjunction with licensed local guides and marine charter operators.

        Voyager reserves the right to make minor route adjustments in cases of adverse maritime weather, natural disruption, or civil safety advisories, always substituting with equal or superior luxury accommodations.
      `
    },
    {
      id: 'privacy',
      icon: <Lock className="w-4 h-4 text-primary" />,
      title: 'Privacy Policy & GDPR/CCPA Protections',
      content: `
        Your personal data (including passport details provided for visa clearance and dietary preferences) is processed strictly in accordance with GDPR and CCPA regulations.

        We never sell, broker, or rent traveler information to third-party ad networks. Data retention is limited strictly to active itinerary execution and legal accounting periods. You may request immediate profile deletion at any time via your Account Settings.
      `
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Governance & Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
            Legal & Traveler Protection
          </h2>
        </div>

        <button
          onClick={() => showToast('Downloading Master Terms & Traveler Agreement PDF...', 'download_done')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors w-fit"
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Download PDF Agreement</span>
        </button>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-surface-container rounded-2xl p-5 mb-6 border border-surface-container-high/40 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-on-surface">Voyager Certified Traveler Guarantee</h4>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            Every booking is backed by our $2,000,000 maritime & overland liability umbrella and 24/7 consular evacuation assistance hotline.
          </p>
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-3">
        {legalSections.map((sec) => {
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className="bg-surface-container-lowest rounded-2xl border border-surface-container-high/40 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenSection(isOpen ? '' : sec.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    {sec.icon}
                  </div>
                  <span className="text-sm font-bold text-on-surface">
                    {sec.title}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-secondary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-secondary" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-on-surface-variant leading-relaxed whitespace-pre-line border-t border-surface-container-high/30">
                  {sec.content.trim()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Contact */}
      <div className="mt-8 text-center text-xs text-on-surface-variant">
        Have questions regarding our policies or enterprise charters?{' '}
        <span
          onClick={() => showToast('Opening compliance inquiry ticket...', 'support_agent')}
          className="text-primary font-bold hover:underline cursor-pointer"
        >
          Contact Legal & Concierge Support
        </span>
      </div>
    </div>
  );
};
