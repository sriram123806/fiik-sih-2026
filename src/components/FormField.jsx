import React from 'react';

export function Field({ label, required, hint, children }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
}

export function Input({ type = 'text', value, onChange, placeholder, required, disabled }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus-ring focus:border-fiik-orange bg-white disabled:bg-gray-100"
    />
  );
}

export function Select({ value, onChange, options = [], placeholder = 'Select...' }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus-ring focus:border-fiik-orange bg-white"
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

export function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus-ring focus:border-fiik-orange bg-white resize-y"
    />
  );
}

export function FieldGrid({ cols = 2, children }) {
  const gridClasses = cols === 3 ? 'grid sm:grid-cols-3 gap-4' : 'grid sm:grid-cols-2 gap-4';
  return <div className={gridClasses}>{children}</div>;
}
