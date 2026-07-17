import React, { useState } from 'react';
import { Check } from 'lucide-react';


export function TagQuickFilter({ tags = [], onClose, onApply, position }) {
  const [selectedTags, setSelectedTags] = useState(['Add Case']);

  const toggleTag = (tagLabel) => {
    setSelectedTags(prev => 
      prev.includes(tagLabel) 
        ? prev.filter(t => t !== tagLabel)
        : [...prev, tagLabel]
    );
  };

  const handleReset = () => {
    setSelectedTags([]);
  };

  return (
    <>
      {/* Backdrop to capture outside clicks and close the popup */}
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      
      <div 
        className="fixed z-[100] w-[382px] h-[474px] bg-[#FEFEFE] rounded-[12px] border border-[#555555]/10 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] p-[24px] flex flex-col cursor-default font-inter normal-case tracking-normal"
        style={{ top: position?.top || 0, left: position?.left || 0 }}
      >
      <div className="flex flex-col gap-[16px] flex-1 overflow-y-auto pr-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.label);
          return (
            <div key={tag.label} className="flex items-center gap-[16px] cursor-pointer" onClick={() => toggleTag(tag.label)}>
              <div className={`w-[22px] h-[22px] rounded-[4px] border-[2.5px] flex items-center justify-center transition-colors flex-shrink-0 ${isSelected ? 'bg-[#6F5B73] border-[#6F5B73]' : 'border-[#6F5B73] bg-white'}`}>
                {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
              </div>
              <div 
                className="px-[16px] py-[5px] rounded-full text-white font-medium text-[15px]"
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-end gap-[12px] pt-[20px]">
        <button 
          onClick={handleReset}
          className="px-[24px] py-[10px] rounded-[24px] border border-[#50223C] text-[#50223C] font-semibold text-[15px] hover:bg-gray-50 transition-colors"
        >
          Reset Filter
        </button>
        <button 
          onClick={() => {
            onApply?.(selectedTags);
            onClose();
          }}
          className="px-[32px] py-[10px] rounded-[24px] bg-[#50223C] text-white font-semibold text-[15px] hover:bg-[#3d192e] transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
    </>
  );
}
