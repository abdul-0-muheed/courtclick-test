import React, { useState, useEffect } from 'react';
import { Copy, Eye, Edit3, Trash2, Share2, UserPlus, CloudUpload, PenLine, X, Check } from 'lucide-react';
import { CaseCustomerDetails } from './CaseCustomerDetails';
import { TagQuickFilter } from './TagQuickFilter';
import { ChooseTag } from './ChooseTag';
import { CreateNewTag } from './CreateNewTag';
import { Share } from './Share';
import initialTags from '../data/tags.json';

const STATUS_OPTIONS = [
  { label: "cancelled", color: "text-[#D67252]", borderColor: "border-[#D67252]" },
  { label: "order placed", color: "text-[#3B8255]", borderColor: "border-[#3B8255]" },
  { label: "payment completed", color: "text-[#D0A415]", borderColor: "border-[#D0A415]" },
  { label: "completed", color: "text-[#288B57]", borderColor: "border-[#288B57]" }
];

const SortIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_889_3341" fill="white">
      <path d="M16 0C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 3.22133e-08 18.2091 0 16V4C0 1.79086 1.79086 3.22128e-08 4 0H16Z" />
    </mask>
    <path d="M20 4H20.5H20ZM16 20V20.5V20ZM0 16H-0.5H0ZM4 0V-0.5V0ZM16 0V0.5C17.933 0.5 19.5 2.067 19.5 4H20H20.5C20.5 1.51472 18.4853 -0.5 16 -0.5V0ZM20 4H19.5V16H20H20.5V4H20ZM20 16H19.5C19.5 17.933 17.933 19.5 16 19.5V20V20.5C18.4853 20.5 20.5 18.4853 20.5 16H20ZM16 20V19.5H4V20V20.5H16V20ZM4 20V19.5C2.067 19.5 0.5 17.933 0.5 16H0H-0.5C-0.5 18.4853 1.51472 20.5 4 20.5V20ZM0 16H0.5V4H0H-0.5V16H0ZM0 4H0.5C0.5 2.067 2.067 0.5 4 0.5V0V-0.5C1.51472 -0.5 -0.5 1.51472 -0.5 4H0ZM4 0V0.5H16V0V-0.5H4V0Z" fill="#1F0D19" mask="url(#path-1-inside-1_889_3341)" />
    <path d="M15.4545 10.5454H4.54547C4.3138 10.5454 4.10744 10.6918 4.03078 10.9103C3.95409 11.1289 4.02387 11.3721 4.20475 11.5168L9.6594 15.8804C9.759 15.9601 9.87958 16 10.0001 16C10.1207 16 10.2413 15.9601 10.3409 15.8804L15.7953 11.5168C15.9761 11.3721 16.0459 11.1289 15.9692 10.9103C15.8925 10.6917 15.6861 10.5454 15.4545 10.5454ZM10.0001 14.756L6.10048 11.6363H13.8996L10.0001 14.756Z" fill="#1F0D19" />
    <path d="M4.54551 9.45472H15.4545C15.6862 9.45472 15.8926 9.3084 15.9692 9.08982C16.0459 8.87124 15.9761 8.62804 15.7953 8.48335L10.3406 4.11974C10.1414 3.96039 9.85835 3.96039 9.65911 4.11974L4.20475 8.48335C4.02387 8.62804 3.95409 8.87124 4.03078 9.08982C4.10747 9.3084 4.31387 9.45472 4.54551 9.45472ZM9.99987 5.24417L13.8995 8.36378H6.10044L9.99987 5.24417Z" fill="#1F0D19" />
  </svg>
);

export function OrdersTable({ orders = [], onAssignClerkClick, onUnassignClerkClick, onUpdateStatus, onAddOrderTag, onRemoveOrderTag }) {
  const [viewOrderDetails, setViewOrderDetails] = useState(null);
  const [tagFilterPos, setTagFilterPos] = useState(null);
  const [chooseTagPos, setChooseTagPos] = useState(null);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [tags, setTags] = useState(initialTags);
  const [editingTag, setEditingTag] = useState(null);
  const [copiedOrderId, setCopiedOrderId] = useState(null);

  const handleCopyAddress = (order) => {
    const { customerDetails, address } = order.orderDetails || {};
    if (!customerDetails || !address) return;

    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';

    const addressText = `${customerDetails.name}\n${address.addressLine1},\n${address.addressLine2},\n${capitalize(address.city)}, ${capitalize(address.state)}, ${address.pincode}\n${customerDetails.phone.startsWith('91') ? '+91 ' + customerDetails.phone.slice(2) : customerDetails.phone}`;

    navigator.clipboard.writeText(addressText);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const [activeStatusDropdown, setActiveStatusDropdown] = useState(null);
  const [shareOrder, setShareOrder] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveStatusDropdown(null);
    if (activeStatusDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeStatusDropdown]);

  const [copiedPhoneId, setCopiedPhoneId] = useState(null);

  const handleCopyPhone = (order) => {
    navigator.clipboard.writeText(order.userInfo.phone);
    setCopiedPhoneId(order.id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };

  return (
    <div className="w-full px-10 mb-20 overflow-x-auto">
      <div className="min-w-[1385px] bg-[#F8F8F8] border border-[#DCD2D8] rounded-[16px] shadow-sm overflow-hidden">

        <table className="w-full border-collapse table-fixed text-left">
          {/* Table Header */}
          <thead>
            <tr className="h-[57px] bg-[#D9D9D9] bg-opacity-50 border-b border-[#DCD2D8] text-[#818181] text-[11px] font-semibold tracking-wider">
              <th className="w-[71px] pl-[33px] py-0 font-semibold text-[13px] text-[#818181]">#</th>
              <th className="w-[177px] pl-0 py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">USER INFO</th>
              <th className="w-[139px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">COURT COMPLEX</th>
              <th className="w-[113px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">PRODUCTS</th>
              <th className="w-[125px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">
                <div className="flex items-center gap-1">ORDER DATE <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_889_3369" fill="white">
                    <path d="M16 0C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 3.22133e-08 18.2091 0 16V4C0 1.79086 1.79086 3.22128e-08 4 0H16Z" />
                  </mask>
                  <path d="M20 4H20.5H20ZM16 20V20.5V20ZM0 16H-0.5H0ZM4 0V-0.5V0ZM16 0V0.5C17.933 0.5 19.5 2.067 19.5 4H20H20.5C20.5 1.51472 18.4853 -0.5 16 -0.5V0ZM20 4H19.5V16H20H20.5V4H20ZM20 16H19.5C19.5 17.933 17.933 19.5 16 19.5V20V20.5C18.4853 20.5 20.5 18.4853 20.5 16H20ZM16 20V19.5H4V20V20.5H16V20ZM4 20V19.5C2.067 19.5 0.5 17.933 0.5 16H0H-0.5C-0.5 18.4853 1.51472 20.5 4 20.5V20ZM0 16H0.5V4H0H-0.5V16H0ZM0 4H0.5C0.5 2.067 2.067 0.5 4 0.5V0V-0.5C1.51472 -0.5 -0.5 1.51472 -0.5 4H0ZM4 0V0.5H16V0V-0.5H4V0Z" fill="#1F0D19" mask="url(#path-1-inside-1_889_3369)" />
                  <g clipPath="url(#clip0_889_3369)">
                    <path d="M5.05469 5.40625H5.40625V5.05469C5.40625 4.47313 5.87938 4 6.46094 4C7.04249 4 7.51562 4.47313 7.51562 5.05469V5.40625H8.92188V5.05469C8.92188 4.47313 9.39501 4 9.97656 4C10.5581 4 11.0312 4.47313 11.0312 5.05469V5.40625H12.4844V5.05469C12.4844 4.47313 12.9575 4 13.5391 4C14.1206 4 14.5938 4.47313 14.5938 5.05469V5.40625H14.9453C15.5269 5.40625 16 5.87938 16 6.46094C16 6.51194 16 14.8105 16 14.9453C16 15.5269 15.5269 16 14.9453 16H5.05469C4.47313 16 4 15.5269 4 14.9453C4 14.8806 4 6.57517 4 6.46094C4 5.87938 4.47313 5.40625 5.05469 5.40625ZM6.8125 5.05469C6.8125 4.86084 6.65479 4.70312 6.46094 4.70312C6.26709 4.70312 6.10938 4.86084 6.10938 5.05469V6.46094C6.10938 6.65479 6.26709 6.8125 6.46094 6.8125C6.65479 6.8125 6.8125 6.65479 6.8125 6.46094V5.05469ZM10.3281 5.05469C10.3281 4.86084 10.1704 4.70312 9.97656 4.70312C9.78271 4.70312 9.625 4.86084 9.625 5.05469V6.46094C9.625 6.65479 9.78271 6.8125 9.97656 6.8125C10.1704 6.8125 10.3281 6.65479 10.3281 6.46094V5.05469ZM13.8906 5.05469C13.8906 4.86084 13.7329 4.70312 13.5391 4.70312C13.3452 4.70312 13.1875 4.86084 13.1875 5.05469V6.46094C13.1875 6.65479 13.3452 6.8125 13.5391 6.8125C13.7329 6.8125 13.8906 6.65479 13.8906 6.46094V5.05469ZM4.70312 14.9453C4.70312 15.1392 4.86084 15.2969 5.05469 15.2969H14.9453C15.1392 15.2969 15.2969 15.1392 15.2969 14.9453V8.96875H4.70312V14.9453ZM4.70312 8.26562H15.2969V6.46094C15.2969 6.26709 15.1392 6.10938 14.9453 6.10938H14.5938V6.46094C14.5938 7.04249 14.1206 7.51562 13.5391 7.51562C12.9575 7.51562 12.4844 7.04249 12.4844 6.46094V6.10938H11.0312V6.46094C11.0312 7.04249 10.5581 7.51562 9.97656 7.51562C9.39501 7.51562 8.92188 7.04249 8.92188 6.46094V6.10938H7.51562V6.46094C7.51562 7.04249 7.04249 7.51562 6.46094 7.51562C5.87938 7.51562 5.40625 7.04249 5.40625 6.46094V6.10938H5.05469C4.86084 6.10938 4.70312 6.26709 4.70312 6.46094V8.26562Z" fill="#1F0D19" />
                    <path d="M5.75781 9.67188H14.2422C14.4363 9.67188 14.5938 9.82928 14.5938 10.0234V14.2422C14.5938 14.4363 14.4363 14.5938 14.2422 14.5938H5.75781C5.56366 14.5938 5.40625 14.4363 5.40625 14.2422V10.0234C5.40625 9.82928 5.56366 9.67188 5.75781 9.67188ZM12.4844 13.8906H13.8906V12.4844H12.4844V13.8906ZM12.4844 11.7812H13.8906V10.375H12.4844V11.7812ZM10.3281 13.8906H11.7812V12.4844H10.3281V13.8906ZM10.3281 11.7812H11.7812V10.375H10.3281V11.7812ZM8.21875 13.8906H9.625V12.4844H8.21875V13.8906ZM8.21875 11.7812H9.625V10.375H8.21875V11.7812ZM6.10938 13.8906H7.51562V12.4844H6.10938V13.8906ZM6.10938 11.7812H7.51562V10.375H6.10938V11.7812Z" fill="#1F0D19" />
                  </g>
                  <defs>
                    <clipPath id="clip0_889_3369">
                      <rect width="12" height="12" fill="white" transform="matrix(-1 0 0 1 16 4)" />
                    </clipPath>
                  </defs>
                </svg></div>
              </th>
              <th className="w-[165px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">
                <div className="flex items-center gap-1">STATUS <SortIcon /></div>
              </th>
              <th className="w-[139px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">ORDER DETAILS/ E-SIGN</th>
              <th className="w-[222px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7] relative">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={(e) => {
                    if (tagFilterPos) {
                      setTagFilterPos(null);
                      return;
                    }
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTagFilterPos({
                      top: rect.bottom + 8,
                      left: rect.left
                    });
                  }}
                >
                  TAGS / NOTE <SortIcon />
                </div>
                {tagFilterPos && (
                  <TagQuickFilter
                    tags={tags}
                    onClose={() => setTagFilterPos(null)}
                    onApply={(tags) => console.log('Applied tags:', tags)}
                    position={tagFilterPos}
                  />
                )}
              </th>
              <th className="w-[115px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider border-r border-[#E9E3E7]">
                <div className="flex items-center gap-1">CLERK <SortIcon /></div>
              </th>
              <th className="w-[119px] pl-[16px] py-0 font-semibold text-[11px] text-[#818181] uppercase tracking-wider">ECOPY</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} className={`align-top ${idx !== orders.length - 1 ? 'border-b border-[#E9E3E7]' : ''}`}>

                {/* ID */}
                <td className="pl-[33px] pr-4 py-4 text-[#818181] font-semibold text-sm pt-6">
                  {order.id}
                </td>

                {/* User Info */}
                <td className="pl-0 pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[#11060C] font-semibold text-sm">{order.userInfo.name}</span>
                    <div className="flex items-center gap-2 text-[#818181] text-[13px] font-medium">
                      {order.userInfo.phone}
                      {copiedPhoneId === order.id ? (
                        <Check size={12} className="text-green-600" />
                      ) : (
                        <Copy
                          onClick={() => handleCopyPhone(order)}
                          size={12}
                          className="cursor-pointer text-[#818181] hover:text-black transition-colors"
                        />
                      )}
                    </div>
                    <span className="text-[#818181] text-[13px] font-medium">{order.userInfo.ref}</span>
                    <button
                      className="flex items-center gap-1 bg-[#E4E4E4] px-2 py-1 rounded w-fit mt-1 text-[#555555] text-xs font-medium hover:bg-gray-300 transition-colors"
                      onClick={() => handleCopyAddress(order)}
                    >
                      {copiedOrderId === order.id ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      {copiedOrderId === order.id ? 'Copied' : 'Copy Address'}
                    </button>
                  </div>
                </td>

                {/* Court Complex */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[#11060C] font-semibold text-sm">{order.court.name}</span>
                    <span className="text-[#818181] font-medium text-[13px]">{order.court.location}</span>
                  </div>
                </td>

                {/* Products */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[#11060C] font-semibold text-sm">{order.product.title}</span>
                    {order.product.desc && <span className="text-[#818181] font-medium text-[11px] leading-snug pr-4">{order.product.desc}</span>}
                    <span className="text-[#818181] font-medium text-[13px]">{order.product.price}</span>
                  </div>
                </td>

                {/* Order Date */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[#11060C] font-semibold text-sm">{order.date.date}</span>
                    <span className="text-[#818181] font-medium text-[13px]">{order.date.time}</span>
                    {(order.date.subtextHighlight || order.date.subtext) && (
                      <span className="font-medium text-[15px] mt-1 leading-snug">
                        {order.date.subtextHighlight && <span className={order.date.subcolor}>{order.date.subtextHighlight}</span>}
                        <span className="text-[#818181]">{order.date.subtext}</span>
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-3 mt-1 relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveStatusDropdown(activeStatusDropdown === order.id ? null : order.id); }}
                      className="flex items-center justify-between border border-[#DCD2D8] bg-white rounded-md px-3 py-1.5 w-[120px] hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[#818181] text-xs">Update status</span>
                      <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5L13.5 5.5L7.25 12.5Z" fill="#1E1F21" /></svg>
                    </button>
                    {activeStatusDropdown === order.id && (
                      <div className="absolute top-[32px] left-0 mt-2 w-[150px] bg-white border border-[#E4E4E4] shadow-[0px_4px_16px_rgba(30,31,33,0.15)] rounded-[6px] z-50 py-2 flex flex-col">
                        {STATUS_OPTIONS.map((statusObj) => (
                          <button
                            key={statusObj.label}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus?.(order.id, statusObj);
                              setActiveStatusDropdown(null);
                            }}
                            className="px-4 py-2 hover:bg-[#F5F5F5] text-left text-[11px] font-semibold uppercase tracking-wider transition-colors"
                          >
                            <span className={`${statusObj.color}`}>{statusObj.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <div className={`border ${order.status.borderColor} rounded-full px-3 py-0.5 w-fit flex items-center justify-center`}>
                      <span className={`${order.status.color} text-[10px] font-semibold uppercase tracking-wider`}>{order.status.label}</span>
                    </div>
                  </div>
                </td>

                {/* Order Details / E-sign */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-2 mt-1">
                    <button
                      onClick={() => setViewOrderDetails(order)}
                      className="flex items-center justify-center gap-[4px] border border-[#E4E4E4] bg-[#F5F5F5] rounded-[6.15px] w-[107px] h-[33px] hover:bg-[#EAEAEA] transition-colors"
                    >
                      <span className="text-[#11060C] font-semibold text-sm">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-[4px] border border-[#E4E4E4] bg-[#F5F5F5] rounded-[6.15px] w-[107px] h-[33px] hover:bg-[#EAEAEA] transition-colors">
                      <Eye size={20} className="text-[#1F0D19]" strokeWidth={1.5} />
                      <span className="text-[#11060C] font-semibold text-[14px] leading-[130%]">E-sign</span>
                    </button>
                  </div>
                </td>

                {/* Tags / Note */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex items-center justify-between border border-[#DCD2D8] bg-white rounded-md px-3 py-1.5 flex-1 hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                          if (chooseTagPos) {
                            setChooseTagPos(null);
                            return;
                          }
                          const rect = e.currentTarget.getBoundingClientRect();
                          setChooseTagPos({ orderId: order.id, top: rect.bottom + 8, left: rect.left });
                        }}
                      >
                        <span className="text-[#818181] text-xs">Choose Tag</span>
                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5L13.5 5.5L7.25 12.5Z" fill="#1E1F21" /></svg>
                      </button>
                      <button className="flex items-center justify-center border border-[#DCD2D8] bg-white rounded-md w-8 h-8 shrink-0 hover:bg-gray-50 transition-colors">
                        <PenLine size={14} className="text-[#1F0D19]" />
                      </button>
                    </div>

                    {/* Tags Grid */}
                    <div className="flex flex-wrap gap-2 w-full mt-1.5">
                      {order.tags?.map((tag, i) => (
                        <div key={`${tag.label}-${i}`} className="relative flex-1 inline-flex min-w-[max-content]">
                          <div className="flex items-center justify-center w-full px-2.5 h-[25px] rounded-[16px]" style={{ backgroundColor: tag.color }}>
                            <span className="text-[#EDE8EB] text-[12px] font-normal leading-[130%] whitespace-nowrap">{tag.label}</span>
                          </div>
                          <button
                            className="absolute -top-[3px] -right-[3px] bg-[#1F0D19] w-[12px] h-[12px] rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveOrderTag?.(order.id, tag.label);
                            }}
                          >
                            <X size={8} strokeWidth={3} className="text-[#F9F9F9]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>

                {/* Clerk */}
                <td className="pl-[16px] pr-4 py-4 border-r border-[#E9E3E7]">
                  <div className="flex flex-col gap-2 mt-1">
                    {order.clerk.assigned ? (
                      <>
                        <span className="text-[#11060C] font-semibold text-sm">{order.clerk.name}</span>
                        <div className="flex items-center gap-3 text-[#1F0D19] mt-1">
                          <PenLine size={16} className="cursor-pointer hover:text-black transition-colors" onClick={() => onAssignClerkClick?.(order.id)} />
                          <Trash2 size={16} className="cursor-pointer hover:text-red-600 transition-colors" onClick={() => onUnassignClerkClick?.(order.id)} />
                          <Share2 size={16} className="cursor-pointer hover:text-black transition-colors" onClick={() => setShareOrder(order)} />
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => onAssignClerkClick?.(order.id)}
                        className="flex items-center justify-center gap-2 bg-[#552746] text-white rounded-md px-4 py-1.5 w-fit hover:bg-[#3d1c32] transition-colors shadow-sm"
                      >
                        <UserPlus size={14} />
                        <span className="font-semibold text-[13px]">Assign</span>
                      </button>
                    )}
                  </div>
                </td>

                {/* ECOPY */}
                <td className="pl-[16px] pr-4 py-4">
                  <div className="flex flex-col gap-2 mt-1">
                    <button className="flex items-center justify-center gap-[6px] bg-[#46223B] text-[#EDE8EB] rounded-[6px] w-[95px] h-[34px] hover:bg-[#301628] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_889_4855" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                          <path d="M0 0H16V16H0V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_889_4855)">
                          <path d="M12.1764 6.01593C12.0952 6.01593 12.0148 6.01899 11.9351 6.02465C11.187 4.4014 9.54584 3.27452 7.64128 3.27452C5.21553 3.27452 3.217 5.10243 2.94712 7.45593C1.56462 7.53824 0.46875 8.68499 0.46875 10.0882C0.46875 11.5448 1.64956 12.7256 3.10619 12.7256H12.1764C14.0292 12.7256 15.5312 11.2236 15.5312 9.37077C15.5312 7.51793 14.0292 6.01593 12.1764 6.01593Z" stroke="#EDE8EB" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 12.7256V8.13062" stroke="#EDE8EB" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.20654 9.92407L7.99995 8.13067L9.79336 9.92407" stroke="#EDE8EB" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      </svg>
                      <span className="font-semibold text-[14px]">Upload</span>
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {viewOrderDetails && (
        <CaseCustomerDetails
          order={viewOrderDetails}
          onClose={() => setViewOrderDetails(null)}
        />
      )}

      {chooseTagPos && (
        <ChooseTag
          tags={tags}
          position={chooseTagPos}
          onClose={() => setChooseTagPos(null)}
          onCreateNew={() => { setEditingTag(null); setShowCreateTag(true); }}
          onEdit={(tag) => { setEditingTag(tag); setShowCreateTag(true); }}
          onDelete={(tagToDelete) => {
            setTags(tags.filter(t => t.label !== tagToDelete.label));
          }}
          onSelect={(selectedTag) => {
            onAddOrderTag?.(chooseTagPos.orderId, selectedTag);
            setChooseTagPos(null);
          }}
        />
      )}

      {showCreateTag && (
        <CreateNewTag
          initialTag={editingTag}
          onClose={() => { setShowCreateTag(false); setEditingTag(null); }}
          onAdd={(newTag) => {
            if (editingTag) {
              setTags(tags.map(t => t.label === editingTag.label ? newTag : t));
            } else {
              setTags([...tags, newTag]);
            }
          }}
        />
      )}

      {shareOrder && (
        <Share order={shareOrder} onClose={() => setShareOrder(null)} />
      )}
    </div>
  );
}
