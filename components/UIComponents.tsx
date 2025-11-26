import React, { InputHTMLAttributes, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

// --- Input Component ---
interface HexInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const HexInput: React.FC<HexInputProps> = ({ label, id, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative mb-6 group">
      <input
        id={id}
        {...props}
        className={`
          w-full bg-[#010A13]/90 border-2 rounded-md px-3 pt-5 pb-2 
          text-hextech-gold-100 font-medium outline-none transition-all duration-300
          ${isFocused ? 'border-hextech-gold-500 shadow-[0_0_10px_rgba(200,170,110,0.3)]' : 'border-[#3C3C41] hover:border-hextech-grey'}
        `}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          props.onBlur && props.onBlur(e);
        }}
        onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange && props.onChange(e);
        }}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none text-xs font-bold tracking-wider uppercase
          ${(isFocused || hasValue) 
            ? 'top-1.5 text-hextech-grey text-[10px]' 
            : 'top-3.5 text-hextech-grey/70 text-xs'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

// --- Button Component ---
interface HexButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const HexButton: React.FC<HexButtonProps> = ({ children, isLoading, className, ...props }) => {
  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.02, filter: 'brightness(1.2)' } : {}}
      whileTap={!isLoading ? { scale: 0.98 } : {}}
      disabled={isLoading}
      className={`
        group relative w-full h-14 rounded-xl flex items-center justify-center
        bg-gradient-to-br from-[#D13639] to-[#BC252A] 
        text-white font-bold tracking-widest uppercase border-2 border-[#D13639]
        disabled:opacity-70 disabled:cursor-not-allowed
        overflow-hidden transition-all
        ${className}
      `}
      {...props}
    >
        {/* Shine Effect */}
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1s_infinite]" />
        
        {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
            <div className="flex items-center gap-2 relative z-10">
                <span>{children}</span>
                <div className="bg-black/20 p-1 rounded-full border border-white/20 group-hover:border-white/50 transition-colors">
                    <ArrowRight size={16} />
                </div>
            </div>
        )}
    </motion.button>
  );
};

// --- Checkbox Component ---
export const HexCheckbox: React.FC<{ label: string }> = ({ label }) => {
    const [checked, setChecked] = useState(false);
    
    return (
        <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => setChecked(!checked)}
        >
            <div className={`
                w-5 h-5 rounded flex items-center justify-center transition-all duration-200 border
                ${checked ? 'bg-hextech-blue-500 border-hextech-blue-500' : 'bg-transparent border-[#3C3C41] group-hover:border-hextech-grey'}
            `}>
                {checked && <Check size={14} className="text-[#010A13] stroke-[4]" />}
            </div>
            <span className="text-hextech-grey text-xs font-medium group-hover:text-hextech-gold-300 transition-colors">
                {label}
            </span>
        </div>
    )
}