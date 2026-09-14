import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Smartphone,
  Sparkles
} from 'lucide-react';

export const BookingPaymentModal: React.FC = () => {
  const {
    selectedPackageForBooking,
    closeBookingModal,
    setActiveBooking,
    currency,
    formatPrice,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [partySize, setPartySize] = useState<number>(2);
  const availableDatesList = selectedPackageForBooking?.availableDates || ['Jul 15, 2025', 'Aug 02, 2025', 'Sep 10, 2025', 'Oct 05, 2025'];
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDatesList[0]
  );
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!selectedPackageForBooking) return null;

  const basePrice = selectedPackageForBooking.price * partySize;
  const conciergeFee = 180;
  const taxesAndFees = Math.round(basePrice * 0.08);
  const totalAmount = basePrice + conciergeFee + taxesAndFees;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const code = `VOY-${Math.floor(100000 + Math.random() * 900000)}-${selectedPackageForBooking.id.substring(0, 3).toUpperCase()}`;
      setConfirmationCode(code);
      setIsSuccess(true);

      const bookingRecord = {
        bookingId: code,
        packageTitle: selectedPackageForBooking.title,
        dates: selectedDate,
        partySize,
        totalPaid: totalAmount,
        currency: 'USD',
        status: 'confirmed' as const,
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + code
      };

      setActiveBooking(bookingRecord);
      localStorage.setItem('voyager_last_booking', JSON.stringify(bookingRecord));
      showToast(`Booking Confirmed! Code: ${code}`, 'verified');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full shadow-2xl border border-surface-container-high/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high/40 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-wider text-secondary">
              Secure Checkout & Booking
            </span>
          </div>
          <button
            onClick={closeBookingModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Booking Confirmed State */
          <div className="p-6 sm:p-8 flex flex-col items-center text-center animate-scale-in overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Expedition Reserved
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-on-surface mt-1">
              Your Journey Begins!
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 max-w-md">
              A bespoke concierge has been assigned to your itinerary. We have synced this booking with your group plan.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full bg-surface-container-low rounded-xl p-4 my-6 border border-surface-container-high/40 text-left text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-surface-container-high/40">
                <span className="text-on-surface-variant font-medium">Confirmation Code</span>
                <span className="font-mono font-bold text-primary text-sm">{confirmationCode}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container-high/40">
                <span className="text-on-surface-variant">Expedition</span>
                <span className="font-semibold text-on-surface">{selectedPackageForBooking.title}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container-high/40">
                <span className="text-on-surface-variant">Departure Date</span>
                <span className="font-semibold text-on-surface">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-surface-container-high/40">
                <span className="text-on-surface-variant">Travelers</span>
                <span className="font-semibold text-on-surface">{partySize} Persons</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-on-surface">
                <span>Total Amount Paid</span>
                <span className="text-primary font-black">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={() => {
                  showToast('Boarding voucher saved to offline wallet', 'download_done');
                }}
                className="w-full py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
              >
                Save Mobile Voucher
              </button>
              <button
                onClick={closeBookingModal}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Payment & Configuration Form */
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            {/* Package preview card */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
              <img
                src={selectedPackageForBooking.imageUrl}
                alt={selectedPackageForBooking.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  {selectedPackageForBooking.duration}
                </span>
                <h4 className="text-sm font-bold text-on-surface truncate">
                  {selectedPackageForBooking.title}
                </h4>
                <span className="text-xs text-on-surface-variant">
                  ${selectedPackageForBooking.price.toLocaleString()} / person
                </span>
              </div>
            </div>

            {/* Travel Dates & Party size */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-on-surface font-semibold mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Departure Window
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high text-on-surface font-medium focus:outline-none"
                >
                  {availableDatesList.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-on-surface font-semibold mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-secondary" />
                  Wanderers
                </label>
                <div className="flex items-center bg-surface-container-low rounded-xl border border-surface-container-high overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="px-3 py-2 hover:bg-surface-container font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold">{partySize}</span>
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.min(10, partySize + 1))}
                    className="px-3 py-2 hover:bg-surface-container font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-2">
                Select Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-container-high bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-container-high bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-container-high bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Google Pay</span>
                </button>
              </div>
            </div>

            {/* Payment Input Fields */}
            {paymentMethod === 'card' && (
              <div className="flex flex-col gap-2.5 text-xs">
                <div>
                  <label className="block text-on-surface font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high font-mono text-on-surface focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-on-surface font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high font-mono text-on-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-on-surface font-semibold mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container-high font-mono text-on-surface focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="bg-surface-container-low rounded-xl p-3.5 border border-surface-container-high/40 text-xs flex flex-col gap-1.5">
              <div className="flex justify-between text-on-surface-variant">
                <span>{selectedPackageForBooking.title} × {partySize}</span>
                <span>{formatPrice(basePrice)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Dedicated Voyager Concierge</span>
                <span>{formatPrice(conciergeFee)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxes & Maritime Port Dues</span>
                <span>{formatPrice(taxesAndFees)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-surface-container-high/40 font-bold text-sm text-on-surface">
                <span>Total Amount Due</span>
                <span className="text-primary font-black">{formatPrice(totalAmount)} ({currency})</span>
              </div>
            </div>

            {/* PCI Compliance Guarantee */}
            <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>PCI-DSS Level 1 Encrypted · 48-Hour Full Refund Guarantee</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Encrypted Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay ${totalAmount.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
