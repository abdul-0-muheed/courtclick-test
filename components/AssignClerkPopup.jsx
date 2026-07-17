"use client";
import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';

const defaultPersons = [
  { id: 'auth-1', name: 'auth1' },
  { id: 'auth-2', name: 'auth2' },
  { id: 'auth-3', name: 'auth3' }
];

export function AssignClerkPopup({ onClose, onAddNew, clerks, onAssign }) {
  const [selectedClerkId, setSelectedClerkId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedClerkFromList = clerks.find(c => c.id === selectedClerkId);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="w-[594px] h-[527px] bg-[#FEFEFE] shadow-[0px_4px_16px_rgba(30,31,33,0.25)] rounded-[6px] relative flex flex-col p-[40px] pt-[58px]">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-[16px] right-[16px] w-[40px] h-[40px] rounded-[7.75px] border-[0.5px] border-[#1F0D19] flex items-center justify-center hover:bg-gray-50 transition-colors">
          <X size={24} strokeWidth={1.5} className="text-[#1F0D19]" />
        </button>

        {/* Add New Button */}
        <button
          onClick={onAddNew}
          className="absolute top-[17px] right-[69px] w-[100px] h-[40px] bg-[#50223C] border border-white rounded-[6px] flex items-center justify-center gap-[6px] hover:bg-[#3c192d] transition-colors"
        >
          <Plus size={16} className="text-[#F9F9F9]" strokeWidth={3} />
          <span className="font-semibold text-[14px] text-[#EDE8EB]">Add New</span>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-[8px] mb-[24px]">
          <h2 className="font-bold text-[20px] text-[#11060C] leading-[24px] tracking-[0.01em]">Assign Authorized Personnel</h2>
          <p className="font-normal text-[14px] text-[#818181] leading-[17px]">Select the person who is authorized to collect CTC document.</p>
        </div>

        {/* Default Persons List */}
        <div className="flex flex-col gap-[8px] mb-[34px]">
          {defaultPersons.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-[16px] h-[40px] cursor-pointer"
            // onClick={() => setSelectedClerkId(person.id)}
            >
              <div className={`w-[20px] h-[20px] border-[2px] rounded-[4px] flex items-center justify-center ${selectedClerkId === person.id ? 'bg-[#6E5773] border-[#6E5773]' : 'border-[#6E5773]'}`}>
                {selectedClerkId === person.id && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>

              <div className="w-[40px] h-[40px] rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                <span className="text-[#818181] text-xs font-semibold">{person.name.substring(0, 2).toUpperCase()}</span>
              </div>

              <span className="text-[14px] text-[#11060C]">{person.name}</span>
            </div>
          ))}
        </div>

        {/* More Clerks Dropdown */}
        <div className="flex flex-col gap-[11px] relative">
          <span className="font-semibold text-[14px] text-[#818181] leading-[16px]">More Clerks</span>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-[479px] h-[52px] bg-[#F5F5F5] border border-[#E4E4E4] rounded-[8px] flex items-center justify-between px-[17px] cursor-pointer hover:bg-[#EAEAEA] transition-colors"
          >
            <span className={`text-[14px] ${selectedClerkFromList ? 'text-[#11060C]' : 'text-[#818181] opacity-50'}`}>
              {selectedClerkFromList ? selectedClerkFromList.name : 'Choose Clerks'}
            </span>
            <ChevronDown size={16} className={`text-[#1E1F21] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-[80px] left-[0px] w-[479px] max-h-[150px] overflow-y-auto bg-white border border-[#E4E4E4] rounded-[8px] shadow-lg z-10 py-1">
              {clerks.map((clerk) => (
                <div
                  key={clerk.id}
                  onClick={() => {
                    setSelectedClerkId(clerk.id);
                    setIsDropdownOpen(false);
                  }}
                  className="px-[17px] py-2.5 hover:bg-[#F5F5F5] cursor-pointer text-[14px] text-[#11060C] flex items-center gap-3 transition-colors"
                >
                  <div className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${selectedClerkId === clerk.id ? 'bg-[#6E5773] border-[#6E5773]' : 'border-[#6E5773]'}`}>
                    {selectedClerkId === clerk.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  {clerk.name}
                </div>
              ))}
              {clerks.length === 0 && (
                <div className="px-[17px] py-3 text-[#818181] text-[14px] text-center">No clerks available</div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-[41px] right-[16px] flex gap-[16px]">
          <button
            onClick={onClose}
            className="w-[110px] h-[42px] rounded-[24px] border border-[#50223C] text-[#50223C] font-semibold text-[14px] flex items-center justify-center hover:bg-[#50223C] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            className={`w-[220px] h-[42px] rounded-[24px] font-semibold text-[14px] flex items-center justify-center transition-colors ${selectedClerkId ? 'bg-[#50223C] text-[#E6E6E6] hover:bg-[#3c192d] cursor-pointer' : 'bg-[#B4B4B4] text-white cursor-not-allowed'}`}
            disabled={!selectedClerkId}
            onClick={() => {
              if (selectedClerkId) {
                onAssign?.(selectedClerkId);
                onClose();
              }
            }}
          >
            Assign Personnel
          </button>
        </div>

      </div>
    </div>
  );
}
