import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck, CreditCard, Lock, Sparkles, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  subject: {
    title: string;
    price?: number;
  };
}

export default function CheckoutModal({ isOpen, onClose, onConfirm, subject }: CheckoutModalProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    // Simulate payment processing time
    setTimeout(async () => {
      try {
        await onConfirm();
        onClose();
      } catch (err) {
        setError('Payment processing failed. Please try again.');
        setProcessing(false);
      }
    }, 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!processing ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative p-6 border-b border-white/5 bg-white/[0.02]">
          <button 
            onClick={onClose}
            disabled={processing}
            className="absolute top-6 right-6 text-gray-400 hover:text-white disabled:opacity-50 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-2 text-indigo-400 mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Premium Access</span>
          </div>
          <h2 className="text-xl font-bold text-white pr-8">Complete Your Purchase</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6 ring-1 ring-white/10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 font-medium">Course</span>
              <span className="text-white font-bold text-right ml-4">{subject.title}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-gray-400">Total Price</span>
              <span className="text-2xl font-black text-indigo-400">₹{subject.price || 0}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Dummy Card Input */}
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Details</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  required
                  className="w-full bg-[#111111] border border-white/10 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700 font-mono"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  required
                  className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700 font-mono"
                  defaultValue="12/26"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="CVC" 
                  required
                  className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700 font-mono text-center"
                  defaultValue="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full relative mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Pay ₹{subject.price || 0}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-1.5 mt-4 text-xs text-gray-500 font-medium">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Payments are secure and encrypted</span>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
