import React, { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';

export function Share({ order, onClose }) {
  if (!order || !order.orderDetails) return null;

  const details = order.orderDetails;

  const rows = [
    { label: 'APPLICANT', value: details.applicant },
    { label: 'CASE NUMBER', value: details.caseNumber },
    { label: 'CASE NAME', value: details.caseName },
    { label: 'CNR NUMBER', value: details.cnrNumber },
    { label: 'COURT ESTABLISHMENT', value: details.courtEstablishment },
    { label: 'DOCUMENT TYPE', value: details.documentType },
    { label: 'ORDER NUMBER', value: details.orderNumber },
    { label: 'ORDER DATE', value: details.orderDate },
  ];

  const handleCopy = () => {
    const textToCopy = rows.map(r => `${r.label}: ${r.value}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setcopy("Copied to Clipboard")
  };
  const [copy, setcopy] = useState("Copy Details")
  useEffect(() => {
    const t = setTimeout(() => {
      setcopy("Copy Details");
    }, 1000);
    return () => clearTimeout(t);
  }, [copy])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 font-inter">
      <div className="relative w-[673px] h-[452px] bg-[#FFFFFF] rounded-[16px] shadow-[0px_4px_16px_rgba(30,31,33,0.25)] flex flex-col p-[40px] pt-[40px]">

        {/* Header */}
        <div className="flex items-center justify-between mb-[32px]">
          <h2 className="text-[26px] font-semibold text-[#11060C] leading-[130%]">Order Details</h2>

          <div className="flex items-center gap-[10px]">
            {/* Copy Details Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-[6px] px-[8px] py-[4px] bg-[#F5F5F5] border border-[#DFDFDF] rounded-[5px] hover:bg-[#EAEAEA] transition-colors h-[32px]"
            >
              <Copy size={14} className="text-[#1F0D19]" strokeWidth={2.5} />
              <span className="text-[13px] font-medium text-[#1F0D19] leading-[130%]">{copy}</span>
            </button>

            {/* Close Button */}
            <button onClick={onClose} className="p-[3px] hover:bg-gray-100 rounded-md transition-colors text-[#1E1F21]">
              <X size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="flex flex-col gap-[22px] mt-2">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-[200px_1fr] items-start">
              <span className="text-[#818181] text-[14px] font-medium uppercase leading-[130%] tracking-wide">
                {row.label}
              </span>
              <span className="text-[#11060C] text-[14px] font-bold leading-[130%]">
                {row.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
