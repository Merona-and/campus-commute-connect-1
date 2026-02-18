import { CheckCircle2, CreditCard, IndianRupee, Loader2, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const payments = [
  { id: "TXN-2026-0312", date: "12 Mar 2026", amount: "₹15,000", status: "Paid", year: "2026–27" },
  { id: "TXN-2025-0408", date: "08 Apr 2025", amount: "₹15,000", status: "Paid", year: "2025–26" },
  { id: "TXN-2024-0315", date: "15 Mar 2024", amount: "₹12,000", status: "Paid", year: "2024–25" },
];

const PaymentScreen = () => {
  const { user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    setLoading(true);

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID_HERE") {
      // Demo mode — simulate payment
      setTimeout(() => {
        setLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
      }, 1500);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: "1500000", // ₹15,000 in paise
      currency: "INR",
      name: "Campus Commute Connect",
      description: "Annual Bus Pass — 2027",
      handler: function (response: any) {
        console.log("Payment Successful", response);
        setLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
      },
      prefill: {
        name: user?.name ?? "",
        email: user?.email ?? "",
        contact: "",
      },
      theme: { color: "#7c3aed" },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      console.error("Payment failed:", response.error.description);
      setLoading(false);
    });
    rzp1.open();
  };

  return (
    <div className="px-4 pt-6 pb-24 space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Payments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your bus pass subscription</p>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6" style={{ background: 'hsl(240 15% 6% / 0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-2xl p-8 text-center w-full max-w-xs" style={{ background: 'hsl(240 12% 12%)', border: '1px solid hsl(145 70% 48% / 0.3)', boxShadow: '0 0 40px hsl(145 70% 48% / 0.2)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'hsl(145 70% 48% / 0.15)' }}>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-xl font-bold text-foreground">Payment Successful!</p>
            <p className="text-sm text-muted-foreground mt-1">₹15,000 — Annual Bus Pass 2027</p>
          </div>
        </div>
      )}

      {/* Current Plan */}
      <div className="rounded-2xl p-5 border" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'hsl(35 100% 55% / 0.15)', border: '1px solid hsl(35 100% 55% / 0.25)' }}>
            <CreditCard className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Plan</p>
            <p className="font-bold text-foreground">Annual Bus Pass</p>
          </div>
        </div>

        <div className="flex items-end gap-1 mb-1">
          <IndianRupee className="w-5 h-5 text-foreground mb-1" />
          <span className="text-3xl font-extrabold text-foreground">15,000</span>
          <span className="text-sm text-muted-foreground mb-1 ml-1">/ year</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Covers all routes · Valid 12 months</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 p-3 rounded-xl" style={{ background: 'hsl(240 15% 7%)' }}>
          <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Next renewal due: <span className="text-foreground font-medium">15 June 2027</span></span>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 text-white"
          style={{ background: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 70% 52%))', boxShadow: '0 4px 20px hsl(262 83% 65% / 0.3)' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Renew Now — ₹15,000"
          )}
        </button>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Payment History</h2>
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'hsl(240 12% 10%)', borderColor: 'hsl(262 30% 22%)' }}>
          {payments.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center justify-between px-4 py-3.5 ${i < payments.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: 'hsl(262 30% 18%)' }}
            >
              <div>
                <p className="font-semibold text-sm text-foreground">{p.year}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.date} · {p.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{p.amount}</p>
                <span className="status-badge status-active text-xs mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 rounded-xl" style={{ background: 'hsl(240 12% 10%)', border: '1px solid hsl(262 30% 20%)' }}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
        <span>Payments are processed securely via Razorpay. Contact admin for refunds or disputes.</span>
      </div>
    </div>
  );
};

export default PaymentScreen;
