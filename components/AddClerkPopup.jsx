"use client";
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export function AddClerkPopup({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clerkId, setClerkId] = useState('');

  const isFormValid = name.trim() !== '' && phone.trim() !== '' && clerkId.trim() !== '';

  const handleSave = () => {
    if (isFormValid) {
      onSave({
        id: clerkId,
        name,
        phone: `+91 ${phone}`,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[60]">
      <div className="w-[1093px] h-[546px] bg-[#F3F4F5] rounded-xl shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        {/* Content Area */}
        <div className="flex-1 px-[41px] flex flex-col pt-[45px]">
          <h2 className="text-[22px] font-bold text-[#1F0D19] mb-1">Add Clerk</h2>
          <p className="text-[#818181] text-[13px] mb-12">Add a new authorized person by providing details</p>

          {/* Form Fields */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-[56px]">
              {/* Clerk Name */}
              <div className="flex-1 flex flex-col gap-[10px]">
                <label className="text-[13px] font-medium text-[#818181]">
                  Clerk Name <span className="text-[#FF3B30]">*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Clerk Name"
                  className="h-[51px] rounded-[7.5px] border border-[#E4E4E4] px-4 text-[14px] text-[#1F0D19] bg-[#F5F5F5] focus:outline-none focus:border-[#DCD2D8]"
                />
              </div>

              {/* Phone Number */}
              <div className="flex-1 flex flex-col gap-[10px]">
                <label className="text-[13px] font-medium text-[#818181]">
                  Phone Number <span className="text-[#FF3B30]">*</span>
                </label>
                <div className="flex items-center h-[51px] rounded-[7.5px] border border-[#E4E4E4] bg-[#F5F5F5] overflow-hidden">
                  <div className="flex items-center gap-2 px-[14px] border-r border-[#E4E4E4] h-full cursor-pointer hover:bg-[#EAEAEA]">
                    <img src="https://flagcdn.com/in.svg" alt="India" className="w-5 h-3.5 object-cover rounded-[2px]" />
                    <span className="text-[#818181] text-[14px] font-medium">+91</span>
                    <ChevronDown size={14} className="text-[#818181]" />
                  </div>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                    className="flex-1 h-full px-4 text-[14px] text-[#1F0D19] bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Clerk ID */}
            <div className="flex gap-[56px]">
              <div className="flex-1 flex flex-col gap-[10px]">
                <label className="text-[13px] font-medium text-[#818181]">
                  Clerk ID <span className="text-[#FF3B30]">*</span>
                </label>
                <input 
                  type="text" 
                  value={clerkId}
                  onChange={(e) => setClerkId(e.target.value)}
                  placeholder="Enter Clerk ID"
                  className="h-[51px] rounded-[7.5px] border border-[#E4E4E4] px-4 text-[14px] text-[#1F0D19] bg-[#F5F5F5] placeholder:text-[#B4B4B4] focus:outline-none focus:border-[#DCD2D8]"
                />
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="h-[108px] bg-[#F9F9F9] flex items-center justify-end px-[41px] gap-[18px]">
          <button 
            onClick={onClose}
            className="w-[109px] h-[41px] rounded-[20.5px] border border-[#50223C] text-[#50223C] font-semibold text-[14px] flex items-center justify-center hover:bg-[#50223C] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            disabled={!isFormValid}
            onClick={handleSave}
            className={`w-[220px] h-[42px] rounded-[21px] font-semibold text-[14px] flex items-center justify-center transition-colors ${
              isFormValid 
                ? 'bg-[#50223C] text-white hover:bg-[#3c192d] cursor-pointer' 
                : 'bg-[#B4B4B4] text-white cursor-not-allowed'
            }`}
          >
            Add & Save
          </button>
        </div>
      </div>
    </div>
  );
}
