import React, { useState } from 'react';
import { X } from 'lucide-react';

const COLORS = [
  '#6B8FA3', '#8FA88F', '#C27A6B', '#A39382', '#C2A65A',
  '#9B8FAE', '#728799', '#C18F8F', '#9AA1A8', '#6F9A94', '#50223C'
];

export function CreateNewTag({ onClose, onAdd, initialTag }) {
  const [tagName, setTagName] = useState(initialTag?.label || '');
  const [selectedColor, setSelectedColor] = useState(initialTag?.color || COLORS[0]);

  const title = initialTag ? "Edit Tag" : "Support Tags";
  const subtitle = initialTag ? "Edit your tag here" : "Create new tags here";
  const buttonText = initialTag ? "Save Tag" : "Add Tag";

  const handleAdd = () => {
    if (tagName.trim()) {
      onAdd({ label: tagName.trim(), color: selectedColor });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 font-inter">
      <div className="relative w-[594px] bg-[#FEFEFE] shadow-[0px_4px_16px_rgba(30,31,33,0.25)] rounded-[6px] pt-[58px] pb-[40px] px-[40px] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        <div className="flex flex-col items-start w-full max-w-[513px] mx-auto mb-[40px]">
          <h2 className="font-bold text-[20px] text-[#11060C] tracking-[0.01em]">{title}</h2>
          <p className="text-[14px] text-[#818181] mt-2">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-[32px] w-full max-w-[513px] mx-auto">
          {/* Tag Name Input */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[14px] text-[#818181]">New Tag Name</label>
            <input
              type="text"
              placeholder="Enter Tag Name"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="h-[52px] w-[302px] bg-[#F5F5F5] border border-[#E4E4E4] rounded-[8px] px-4 text-[14px] text-[#11060C] placeholder-[#818181]/50 outline-none focus:border-[#50223C]"
            />
          </div>

          {/* Tag Color Selection */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-[14px] text-[#818181] font-urbanist">Choose Tag Color</label>
            <div className="flex gap-[16px]">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-[30px] h-[30px] rounded-full transition-all ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#50223C]' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Full width divider */}
        <div className="w-[594px] h-px bg-[#E9E3E7] -ml-[40px] mt-[32px] mb-[24px]" />

        <div className="flex flex-col w-full max-w-[513px] mx-auto">
          {/* Preview */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-[14px] text-[#818181] font-urbanist">Preview</label>
            <div className="h-[30px] flex items-center">
              {tagName ? (
                <div
                  className="px-[16px] py-[5px] rounded-full text-white font-medium text-[14px]"
                  style={{ backgroundColor: selectedColor }}
                >
                  {tagName}
                </div>
              ) : (
                <span className="text-[#818181] text-sm italic"></span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-4 mt-[40px]">
          <button
            onClick={onClose}
            className="flex justify-center items-center px-[24px] py-[12px] border border-[#50223C] rounded-[24px] text-[#50223C] font-semibold text-[14px] min-w-[110px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!tagName.trim()}
            className={`flex justify-center items-center px-[24px] py-[12px] rounded-[24px] text-white font-semibold text-[14px] min-w-[220px] transition-colors ${tagName.trim() ? 'bg-[#50223C] hover:bg-[#3d1a2d]' : 'bg-[#B4B4B4] cursor-not-allowed text-[#E6E6E6]'}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
