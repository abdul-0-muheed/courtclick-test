import React from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

export default function FilterPopup({ onClose }) {
  return (
    <div className="w-[559px] bg-white rounded-2xl relative flex flex-col shadow-2xl pb-[36px]">
      {/* Header */}
      <div className="flex items-center justify-between px-[40px] pt-[40px]">
        <h2 className="text-[#11060C] text-[26px] font-semibold leading-[130%]">Filter Users</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} className="text-[#1E1F21]" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="px-[40px] flex flex-col gap-4 mt-[32px] mb-10">

        {/* District */}
        <div className="flex flex-col gap-[11px]">
          <label className="text-[#818181] font-semibold text-sm">District</label>
          <div className="flex items-center justify-between bg-[#F5F5F5] border border-[#E4E4E4] rounded-lg px-[17px] h-[52px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-[#818181] text-sm opacity-50">Choose District</span>
            <ChevronDown size={16} className="text-[#1E1F21]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Court Establishment */}
        <div className="flex flex-col gap-[11px]">
          <label className="text-[#818181] font-medium text-sm">Court Establishment</label>
          <div className="flex items-center justify-between bg-[#F5F5F5] border border-[#E4E4E4] rounded-lg px-[17px] h-[52px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-[#818181] text-sm opacity-50">Choose Court Establishment</span>
            <ChevronDown size={16} className="text-[#1E1F21]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Product */}
        <div className="flex flex-col gap-[11px]">
          <label className="text-[#818181] font-medium text-sm">Product</label>
          <div className="flex items-center justify-between bg-[#F5F5F5] border border-[#E4E4E4] rounded-lg px-[17px] h-[52px] cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-[#11060C] font-semibold text-sm">All</span>
            <ChevronDown size={16} className="text-[#1E1F21]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Test Users Checkbox */}
        <div className="flex items-center gap-4 mt-[16px]">
          <div className="w-5 h-5 rounded-[4px] bg-[#6E5773] flex items-center justify-center cursor-pointer hover:bg-[#5a465e] transition-colors">
            <Check size={14} strokeWidth={3} className="text-white" />
          </div>
          <span className="text-[#11060C] font-bold text-sm tracking-[0.02em]">Test Users</span>
        </div>

      </div>

      {/* Footer Buttons */}
      <div className="mt-[40px] pr-[40px] flex items-center justify-end gap-2">
        <button className="flex items-center justify-center w-[110px] h-[42px] border border-[#50223C] rounded-full hover:bg-gray-50 transition-colors">
          <span className="text-[#50223C] font-semibold text-sm">Reset Filter</span>
        </button>
        <button className="flex items-center justify-center w-[220px] h-[42px] bg-[#50223C] rounded-full hover:bg-[#3d1a2e] transition-colors">
          <span className="text-[#E6E6E6] font-semibold text-sm">Apply Filter</span>
        </button>
      </div>

    </div>
  );
}
