import React, { useState } from 'react';
import { Pencil, Trash2, Tag } from 'lucide-react';

export function ChooseTag({ tags = [], position, onClose, onCreateNew, onEdit, onDelete, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />

      <div
        className="fixed z-[100] w-[382px] max-h-[500px] bg-[#FEFEFE] rounded-[12px] border border-[#555555]/10 shadow-[0px_8px_24px_rgba(0,0,0,0.12)] p-[24px] flex flex-col cursor-default font-inter normal-case tracking-normal"
        style={{ top: position?.top || 0, left: position?.left || 0 }}
      >
        <button
          onClick={() => {
            onCreateNew();
            onClose();
          }}
          className="flex items-center gap-2 border border-[#1F0D19] rounded-[8px] px-3 py-2 w-[160px] hover:bg-gray-50 transition-colors mb-4"
        >
          <Tag size={16} className="text-[#1F0D19]" />
          <span className="text-[#11060C] font-medium text-[14px]">Create New Tag</span>
        </button>

        <div className="w-full h-px bg-[#E9E3E7] mb-4" />

        <div className="flex flex-col gap-[16px] overflow-y-auto pr-2 custom-scrollbar">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 rounded-md p-1 -mx-1"
              onClick={() => onSelect?.(tag)}
            >
              <div
                className="px-[16px] py-[5px] rounded-full text-white font-medium text-[15px]"
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </div>
              <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); onEdit?.(tag); }} className="hover:text-[#50223C] transition-colors">
                  <Pencil size={18} strokeWidth={2} className="text-[#1F0D19]" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete?.(tag); }} className="hover:text-red-600 transition-colors">
                  <Trash2 size={18} strokeWidth={2} className="text-[#1F0D19]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
