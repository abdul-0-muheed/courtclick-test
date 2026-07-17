import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';

export function CaseCustomerDetails({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('Case & Customer Details');
  const tabs = ['Case & Customer Details', 'Address', 'Products', 'Digio eSign Documents'];

  if (!order || !order.orderDetails) return null;

  const { orderDetails } = order;
  const { timeline, customerDetails, address, products, digioDocuments } = orderDetails;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-[60]">
      <div className="w-[877px] h-full bg-white relative overflow-y-auto shadow-2xl p-[24px] pt-[24px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-[20px] pl-[24px] pr-[2px]">
          <h2 className="font-semibold text-[26px] leading-[130%] text-[#11060C]">Order Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors border-2 border-transparent hover:border-gray-200">
            <X size={20} className="text-[#1E1F21]" strokeWidth={2.5} />
          </button>
        </div>

        {/* Timeline Grid */}
        <div className="flex flex-col gap-[8px] pl-[24px] mb-[20px]">
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Order ID:</span><span className="font-semibold text-[14px] text-[#11060C]">{orderDetails.orderId || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Tracking ID:</span><span className="font-semibold text-[14px] text-[#11060C]">{orderDetails.trackingId || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Payment completed:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.paymentCompleted || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Order placed:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.orderPlaced || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Assigned:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.assigned || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Applied:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.applied || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Dispatched:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.dispatched || '-'}</span></div>
          <div className="flex"><span className="w-[252px] font-semibold text-[14px] text-[#818181]">Delivered:</span><span className="font-semibold text-[14px] text-[#11060C]">{timeline?.delivered || '-'}</span></div>
        </div>

        {/* Divider */}
        <div className="w-[747px] h-px bg-[#DCD2D8] mb-[16px] ml-[24px]" />

        {/* Tabs */}
        <div className="flex gap-[40px] pl-[24px] relative mb-[20px]">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-semibold text-[16px] leading-[130%] transition-colors relative pb-[12px] ${activeTab === tab ? 'text-[#11060C]' : 'text-[#818181] font-normal'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#50223C] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content area */}
        <div className="w-[745px] ml-[26px] bg-[#F5F5F5] rounded-[16px] p-[16px] min-h-[200px] relative">
          
          {activeTab === 'Case & Customer Details' && customerDetails && (
            <div className="flex flex-col gap-[12px]">
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Case Number:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.caseNumber}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Legal Name:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.legalName}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Name:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.name}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Email:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.email}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Phone:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.phone}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Delivery Feedback:</span><span className="font-semibold text-[14px] text-[#11060C]">{customerDetails.deliveryFeedback}</span></div>
            </div>
          )}

          {activeTab === 'Address' && address && (
            <div className="flex flex-col gap-[12px]">
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Pincode:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.pincode}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Address Line 1:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.addressLine1}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Address Line 2:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.addressLine2}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">City:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.city}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">District:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.district}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">State:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.state}</span></div>
              <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Country:</span><span className="font-semibold text-[14px] text-[#11060C]">{address.country}</span></div>

              <button className="absolute top-[16px] right-[16px] flex items-center justify-center gap-2 bg-[#F5F5F5] border border-[#DFDFDF] rounded-[5px] px-3 py-1.5 hover:bg-[#EAEAEA] transition-colors">
                <Copy size={16} className="text-[#1F0D19]" />
                <span className="font-medium text-[13px] text-[#1F0D19]">Copy Address</span>
              </button>
            </div>
          )}

          {activeTab === 'Products' && products && (
            <div className="flex flex-col gap-[16px]">
              {products.map((product, idx) => (
                <div key={idx} className="flex flex-col gap-[12px]">
                  <span className="font-semibold text-[14px] text-[#11060C]">Product {product.id}</span>
                  <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Type:</span><span className="font-semibold text-[14px] text-[#11060C]">{product.type}</span></div>
                  <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Order Date:</span><span className="font-semibold text-[14px] text-[#11060C]">{product.orderDate}</span></div>
                  <div className="flex">
                    <span className="w-[225px] font-semibold text-[14px] text-[#818181]">File:</span>
                    <a href={product.fileUrl || '#'} className="font-semibold text-[14px] text-[#3AA6FF] underline">{product.file}</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Digio eSign Documents' && digioDocuments && (
            <div className="flex flex-col gap-[16px]">
              {digioDocuments.map((doc, idx) => (
                <div key={idx} className="flex flex-col gap-[12px]">
                  <span className="font-semibold text-[14px] text-[#11060C]">{doc.id}</span>
                  <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Digio ID:</span><span className="font-semibold text-[14px] text-[#11060C]">{doc.digioId}</span></div>
                  <div className="flex"><span className="w-[225px] font-semibold text-[14px] text-[#818181]">Status:</span><span className="font-bold text-[14px] text-[#11060C]">{doc.status}</span></div>
                  <div className="flex">
                    <span className="w-[225px] font-semibold text-[14px] text-[#818181]">Signed Document:</span>
                    <a href={doc.signedDocumentUrl || '#'} className="font-semibold text-[14px] text-[#3AA6FF] underline">View Signed Document</a>
                  </div>
                  <div className="flex">
                    <span className="w-[225px] font-semibold text-[14px] text-[#818181]">Audit Log:</span>
                    <a href={doc.auditLogUrl || '#'} className="font-semibold text-[14px] text-[#3AA7FF] underline">View Audit Log</a>
                  </div>
                </div>
              ))}
              {digioDocuments.length === 0 && (
                <span className="text-[14px] text-[#818181]">No documents available.</span>
              )}
            </div>
          )}

          {(!customerDetails && activeTab === 'Case & Customer Details') || 
           (!address && activeTab === 'Address') || 
           (!products && activeTab === 'Products') || 
           (!digioDocuments && activeTab === 'Digio eSign Documents') ? (
            <span className="text-[14px] text-[#818181]">No details available.</span>
          ) : null}

        </div>
      </div>
    </div>
  );
}
