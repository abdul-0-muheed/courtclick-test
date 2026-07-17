"use client";
import { useState } from 'react';
import { Upload, Search, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { OrdersTable } from '../components/OrdersTable';
import FilterPopup from '../components/FilterPopup';
import { AddClerkPopup } from '../components/AddClerkPopup';
import { AssignClerkPopup } from '../components/AssignClerkPopup';
import clerksData from '../data/clerks.json';
import ordersData from '../data/orders.json';

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddClerkOpen, setIsAddClerkOpen] = useState(false);
  const [assigningOrderId, setAssigningOrderId] = useState(null);
  const [clerks, setClerks] = useState(clerksData);
  const [orders, setOrders] = useState(ordersData);
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA]">
      {/* Dashboard Header Div */}
      <div className="flex justify-between items-center px-10 py-4">

        {/* Left side: Title and Subtitle */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[#11060C] font-bold text-2xl leading-[130%]">
            Certified True Copy (47834)
          </h1>
          <p className="text-[#818181] font-normal text-sm leading-[130%] capitalize">
            Manage Your CTC Orders Here
          </p>
        </div>

        {/* Right side: Action buttons and Search */}
        <div className="flex items-center gap-4">

          {/* Share Button (Upload icon matches the design) */}
          <button className="flex items-center justify-center hover:opacity-80 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="7.75" stroke="#1F0D19" strokeWidth="0.5"/>
              <path d="M12 27.8572V18.4286C12 17.5951 12.3585 16.796 12.9961 16.2066C13.6337 15.6172 14.4983 15.2858 15.4 15.2858H17.1C17.5694 15.2858 17.95 15.6376 17.95 16.0715C17.95 16.5054 17.5694 16.8572 17.1 16.8572H15.4C14.9491 16.8572 14.5169 17.0229 14.198 17.3176C13.8792 17.6123 13.7 18.0119 13.7 18.4286V27.8572C13.7 28.2739 13.8792 28.6735 14.198 28.9682C14.5169 29.2629 14.9491 29.4286 15.4 29.4286H25.6C26.0509 29.4286 26.4831 29.2629 26.802 28.9682C27.1208 28.6735 27.3 28.2739 27.3 27.8572V18.4286C27.3 18.0119 27.1208 17.6123 26.802 17.3176C26.4831 17.0229 26.0509 16.8572 25.6 16.8572H23.9C23.4306 16.8572 23.05 16.5054 23.05 16.0715C23.05 15.6376 23.4306 15.2858 23.9 15.2858H25.6C26.5017 15.2858 27.3663 15.6172 28.0039 16.2066C28.6415 16.796 29 17.5951 29 18.4286V27.8572C29 28.6907 28.6415 29.4898 28.0039 30.0792C27.3663 30.6686 26.5017 31 25.6 31H15.4C14.4983 31 13.6337 30.6686 12.9961 30.0792C12.3585 29.4898 12 28.6907 12 27.8572ZM19.65 23.1429V11.6826L17.701 13.4842C17.369 13.791 16.831 13.791 16.499 13.4842C16.1671 13.1774 16.1671 12.68 16.499 12.3732L19.899 9.23031L19.9632 9.17609C20.2971 8.92434 20.7898 8.94263 21.101 9.23031L24.501 12.3732L24.5596 12.4325C24.832 12.7411 24.8122 13.1965 24.501 13.4842C24.1898 13.7719 23.6971 13.7902 23.3632 13.5384L23.299 13.4842L21.35 11.6826V23.1429C21.35 23.5768 20.9694 23.9286 20.5 23.9286C20.0306 23.9286 19.65 23.5768 19.65 23.1429Z" fill="#1F0D19"/>
            </svg>
          </button>

          {/* Filter/Settings Button */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="7.75" stroke="#1F0D19" strokeWidth="0.5" />
                <g clipPath="url(#clip0_889_2917)">
                  <path d="M9.09091 27.6364H16.9149C17.3652 26.3666 18.5778 25.4545 20 25.4545C21.4222 25.4545 22.6347 26.3666 23.0851 27.6364H30.9091C31.5116 27.6364 32 28.1248 32 28.7273C32 29.3297 31.5116 29.8182 30.9091 29.8182H23.0851C22.6347 31.0879 21.4222 32 20 32C18.5778 32 17.3653 31.0879 16.9149 29.8182H9.09091C8.48844 29.8182 8 29.3297 8 28.7273C8 28.1248 8.48844 27.6364 9.09091 27.6364ZM20 29.8182C20.6015 29.8182 21.0909 29.3288 21.0909 28.7273C21.0909 28.1257 20.6015 27.6364 20 27.6364C19.3985 27.6364 18.9091 28.1257 18.9091 28.7273C18.9091 29.3288 19.3985 29.8182 20 29.8182Z" fill="#1F0D19" />
                  <path d="M30.9091 21.0909H25.2669C24.8166 22.3606 23.604 23.2727 22.1818 23.2727C20.7596 23.2727 19.5471 22.3606 19.0967 21.0909H9.09091C8.48844 21.0909 8 20.6025 8 20C8 19.3975 8.48844 18.9091 9.09091 18.9091H19.0967C19.5471 17.6394 20.7596 16.7273 22.1818 16.7273C23.604 16.7273 24.8165 17.6394 25.2669 18.9091H30.9091C31.5116 18.9091 32 19.3975 32 20C32 20.6025 31.5116 21.0909 30.9091 21.0909ZM22.1818 18.9091C21.5803 18.9091 21.0909 19.3985 21.0909 20C21.0909 20.6015 21.5803 21.0909 22.1818 21.0909C22.7833 21.0909 23.2727 20.6015 23.2727 20C23.2727 19.3985 22.7833 18.9091 22.1818 18.9091Z" fill="#1F0D19" />
                  <path d="M30.9091 12.3636H20.9033C20.4529 13.6333 19.2404 14.5455 17.8182 14.5455C16.396 14.5455 15.1834 13.6333 14.7331 12.3636H9.09091C8.48844 12.3636 8 11.8752 8 11.2727C8 10.6703 8.48844 10.1818 9.09091 10.1818H14.7331C15.1834 8.91215 16.396 8 17.8182 8C19.2404 8 20.4529 8.91215 20.9033 10.1818H30.9091C31.5116 10.1818 32 10.6703 32 11.2727C32 11.8752 31.5116 12.3636 30.9091 12.3636ZM17.8182 10.1818C17.2167 10.1818 16.7273 10.6712 16.7273 11.2727C16.7273 11.8743 17.2167 12.3636 17.8182 12.3636C18.4197 12.3636 18.9091 11.8743 18.9091 11.2727C18.9091 10.6712 18.4197 10.1818 17.8182 10.1818Z" fill="#1F0D19" />
                </g>
                <defs>
                  <clipPath id="clip0_889_2917">
                    <rect width="24" height="24" fill="white" transform="matrix(1 0 0 -1 8 32)" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <FilterPopup onClose={() => setIsFilterOpen(false)} />
              </div>
            )}
            
            {isAddClerkOpen && (
              <AddClerkPopup 
                onClose={() => setIsAddClerkOpen(false)} 
                onSave={(newClerk) => {
                  setClerks([...clerks, newClerk]);
                }}
              />
            )}
            
            {assigningOrderId && (
              <AssignClerkPopup
                clerks={clerks}
                onClose={() => setAssigningOrderId(null)}
                onAddNew={() => setIsAddClerkOpen(true)}
                onAssign={(clerkId) => {
                  const clerk = clerks.find(c => c.id === clerkId);
                  setOrders(orders.map(o => o.id === assigningOrderId ? { ...o, clerk: { assigned: true, name: clerk.name } } : o));
                  setAssigningOrderId(null);
                }}
              />
            )}
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-[#EEEEEE] rounded-lg px-4 h-10 w-[271px] gap-2">
            <Search className="text-[#818181]" size={20} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none text-sm text-[#818181] w-full"
            />
          </div>

        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex justify-between items-center px-10 mb-3">

        {/* Left side: Tabs Container */}
        <div className="flex items-center bg-[#1F0D19] rounded-[32px] p-1.5 gap-2">
          {/* Active Tab */}
          <button className="flex items-center justify-center bg-[#F9F9F9] rounded-2xl px-5 py-1.5 shadow-[0px_4px_9.2px_rgba(238,238,238,0.21)]">
            <span className="text-[#1F0D19] font-semibold text-sm">Orders (121)</span>
          </button>

          {/* Inactive Tabs */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 hover:opacity-80 transition-opacity">
            <span className="text-[#E6E6E6] font-medium text-sm">Clerks ({clerks.length})</span>
            <div 
              className="bg-[#F9F9F9] rounded-sm p-0.5 flex items-center justify-center hover:bg-gray-200 transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsAddClerkOpen(true); }}
            >
              <Plus size={12} className="text-[#1F0D19]" strokeWidth={3} />
            </div>
          </button>

          <button className="flex items-center px-3 py-1.5 hover:opacity-80 transition-opacity">
            <span className="text-[#E6E6E6] font-medium text-sm">Courts (32)</span>
          </button>

          <button className="flex items-center px-3 py-1.5 hover:opacity-80 transition-opacity">
            <span className="text-[#E6E6E6] font-medium text-sm">Districts (14)</span>
          </button>

          <button className="flex items-center px-3 py-1.5 pr-4 hover:opacity-80 transition-opacity">
            <span className="text-[#E6E6E6] font-medium text-sm">Eligible Users (11)</span>
          </button>
        </div>

        {/* Right side: Types Dropdown */}
        <button className="flex flex-col items-start justify-center border-[0.5px] border-[#1F0D19] rounded-lg px-3 py-1 h-10 min-w-[112px] hover:bg-gray-50 transition-colors bg-white">
          <span className="text-[#555555] text-[11px] leading-[130%] font-normal">Types</span>
          <div className="flex items-center justify-between w-full mt-[-2px]">
            <span className="text-[#11060C] font-medium text-sm leading-[130%]">ORDERS</span>
            <ChevronDown size={14} className="text-[#1E1F21]" strokeWidth={2.5} />
          </div>
        </button>

      </div>

      {/* Main Table Section */}
      <OrdersTable 
        orders={orders} 
        onAssignClerkClick={(orderId) => setAssigningOrderId(orderId)} 
        onUnassignClerkClick={(orderId) => setOrders(orders.map(o => o.id === orderId ? { ...o, clerk: { assigned: false, name: '' } } : o))}
        onUpdateStatus={(orderId, newStatus) => setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))}
        onAddOrderTag={(orderId, tag) => setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tags: [...(o.tags || []).filter(t => t.label !== tag.label), tag] } : o))}
        onRemoveOrderTag={(orderId, tagLabel) => setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tags: (o.tags || []).filter(t => t.label !== tagLabel) } : o))}
      />

      {/* Pagination Section */}
      <div className="flex justify-end items-center px-10 pb-8 mt-auto">
        <div className="flex items-center gap-4">
          <button className="text-[#818181] hover:text-[#11060C] transition-colors"><ChevronLeft size={16} strokeWidth={2.5} /></button>

          <div className="flex items-center gap-1.5">
            <button className="w-[30px] h-[30px] flex items-center justify-center bg-[#50223C] text-white rounded-[5px] font-bold text-sm">1</button>
            <button className="w-[30px] h-[30px] flex items-center justify-center text-[#000000] rounded-[5px] font-bold text-sm hover:bg-gray-200 transition-colors">2</button>
            <button className="w-[30px] h-[30px] flex items-center justify-center text-[#000000] rounded-[5px] font-bold text-sm hover:bg-gray-200 transition-colors">3</button>
            <button className="w-[30px] h-[30px] flex items-center justify-center text-[#000000] rounded-[5px] font-bold text-sm hover:bg-gray-200 transition-colors">4</button>
            <button className="w-[30px] h-[30px] flex items-center justify-center text-[#000000] rounded-[5px] font-bold text-sm hover:bg-gray-200 transition-colors">5</button>
            <div className="flex items-center gap-[3px] mx-2">
              <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-[#D9D9D9] rounded-full"></span>
            </div>
            <span className="text-[#000000] font-bold text-sm ml-1">4810</span>
          </div>

          <button className="text-[#818181] hover:text-[#11060C] transition-colors"><ChevronRight size={16} strokeWidth={2.5} /></button>

          <div className="flex items-center gap-3 ml-6">
            <span className="text-[#11060C] font-bold text-sm">Go to</span>
            <input type="text" className="w-[65px] h-[30px] bg-[#F9F9F9] border border-[#B8B8B8] rounded-[9px] px-2 text-center text-sm font-medium outline-none focus:border-[#50223C] transition-colors" />
            <span className="text-[#11060C] font-bold text-sm">Page</span>
          </div>
        </div>
      </div>
    </div>
  );
}
