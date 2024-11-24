import React, { useEffect, useState } from 'react';

const OtpModal: React.FC<{
  onVerify: (otp: string) => void;
  onResendOtp: () => void;
  onCancel: () => void;
}> = ({ onVerify, onResendOtp, onCancel }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    onVerify(otpValue);
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setError('');
    setTimer(60); // Reset the timer to 60 seconds
    setIsResendDisabled(true);
    onResendOtp(); // Trigger the resend OTP function
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6  shadow-md w-80">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Verify OTP</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to your email.
        </p>
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-10 h-10 border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="w-full border border-black text-black py-2 hover:bg-gray-100 transition duration-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-100"
          >
            Verify
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          {isResendDisabled ? (
            <p>
              Resend OTP in <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
