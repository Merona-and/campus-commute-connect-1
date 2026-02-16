import { CheckCircle2, CreditCard, IndianRupee, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const payments = [
  { year: "2026", amount: "₹15,000", status: "Paid" },
  { year: "2025", amount: "₹15,000", status: "Paid" },
  { year: "2024", amount: "₹12,000", status: "Paid" },
];

const PaymentScreen = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    setLoading(true);

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID_HERE") {
      alert("Please set your VITE_RAZORPAY_KEY_ID in the .env file");
      setLoading(false);
      return;
    }

    // Placeholder for actual order creation via backend
    // In a real app, you would fetch the order_id from your server here
    const options = {
      key: razorpayKey, // Enter the Key ID generated from the Dashboard
      amount: "1500000", // Amount is in currency subunits. Default currency is INR. Hence, 1500000 refers to 1500000 paise (₹15,000)
      currency: "INR",
      name: "Campus Commute Connect",
      description: "Yearly Subscription",
      image: "https://example.com/your_logo",
      // order_id: "order_9A33XWu170g81s", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        console.log("Payment Successful", response);
        setLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Campus Address",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      alert("Payment Failed: " + response.error.description);
      setLoading(false);
    });

    rzp1.open();
  };

  return (
    <div className="px-5 pt-6 pb-24 space-y-5 animate-fade-in">
      <h1 className="text-2xl font-extrabold">Payments</h1>

      {/* Success animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card rounded-2xl p-8 text-center shadow-xl">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-3" />
            <p className="text-xl font-bold">Payment Successful!</p>
            <p className="text-sm text-muted-foreground mt-1">₹15,000 paid for 2027</p>
          </div>
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-card rounded-2xl p-5 border border-border shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Subscription Plan</p>
            <p className="font-bold text-lg">Yearly Plan</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-foreground" />
            <span className="text-3xl font-extrabold">45,000</span>
          </div>
          <span className="text-sm text-muted-foreground">/year</span>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>

      {/* Payment History */}
      <div>
        <h2 className="text-lg font-bold mb-3">Payment History</h2>
        <div className="space-y-2">
          {payments.map((p) => (
            <div
              key={p.year}
              className="flex items-center justify-between bg-card rounded-xl p-4 border border-border"
            >
              <div>
                <p className="font-semibold">{p.year}</p>
                <p className="text-sm text-muted-foreground">{p.amount}</p>
              </div>
              <span className="status-badge status-active">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
