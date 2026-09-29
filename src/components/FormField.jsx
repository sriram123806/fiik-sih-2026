import React from 'react';

export function Field({ label, required, hint, children, className = '' }) {
  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label className="block text-xs font-black text-[#071A3D] uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1.5 text-xs text-gray-500 font-medium">{hint}</p>}
    </div>
  );
}

export function Input({ type = 'text', value, onChange, placeholder, required, disabled, className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white disabled:bg-gray-100 disabled:text-gray-500 transition-all ${className}`}
    />
  );
}

export function Select({ value, onChange, options = [], placeholder = 'Select...', disabled, className = '' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white disabled:bg-gray-100 disabled:text-gray-500 transition-all cursor-pointer ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
          {typeof opt === 'string' ? opt : opt.label}
        </option>
      ))}
    </select>
  );
}

export function TextArea({ value, onChange, placeholder, rows = 3, disabled, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full border-2 border-gray-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#071A3D] focus:ring-2 focus:ring-[#071A3D]/20 bg-white disabled:bg-gray-100 disabled:text-gray-500 resize-y transition-all ${className}`}
    />
  );
}

export function FieldGrid({ cols = 2, children, className = '' }) {
  const gridClasses = cols === 3 ? 'grid sm:grid-cols-3 gap-5' : cols === 4 ? 'grid sm:grid-cols-2 lg:grid-cols-4 gap-5' : 'grid sm:grid-cols-2 gap-5';
  return <div className={`${gridClasses} ${className}`}>{children}</div>;
}
