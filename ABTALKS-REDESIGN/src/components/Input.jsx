import React from 'react';

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon = null,
  error = null,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[13px] font-semibold text-[#111111]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#6B6B6B]">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-[50px] bg-white border ${
            error ? 'border-red-500' : 'border-[#E6E6E1]'
          } rounded-[12px] ${
            Icon ? 'pl-10' : 'px-4'
          } pr-4 text-[15px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF5A36] focus:ring-2 focus:ring-[#FF5A36]/20 transition-all`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-[12px] text-red-500 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
