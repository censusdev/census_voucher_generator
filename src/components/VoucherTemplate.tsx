import React from 'react';
import { Card } from '@/components/ui/card';

interface VoucherTemplateProps {
  data: {
    hotelName: string;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfGuests: number;
  };
}

const VoucherTemplate: React.FC<VoucherTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const bookingNo = `ACC${Math.random().toString().substr(2, 9)}`;
  const gstin = '22AAAAAA0000A1Z5';
  const contactNumber = '8822665599';
  const mobileNumber = '9922663388';
  const email = 'abcd@xyz.com';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white" style={{ width: '210mm', minHeight: '297mm' }}>
      <Card className="border-2 border-gray-800 rounded-none">
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Voucher Format</h1>
        </div>
        
        {/* Logo and Hotel Name */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
              Vyapar
            </div>
          </div>
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold">{data.hotelName}</h2>
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-2 border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">
            <span className="font-semibold">Booking No:</span>
            <div className="bg-gray-100 p-1 mt-1">{bookingNo}</div>
          </div>
          <div className="p-2">
            <span className="font-semibold">Booking Name:</span>
            <div className="bg-gray-100 p-1 mt-1">{data.guestName}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">
            <span className="font-semibold">Contact Number:</span>
            <div className="bg-gray-100 p-1 mt-1">{contactNumber}</div>
          </div>
          <div className="p-2">
            <span className="font-semibold">Mobile Number:</span>
            <div className="bg-gray-100 p-1 mt-1">{mobileNumber}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">
            <span className="font-semibold">State Address:</span>
            <div className="bg-gray-100 p-1 mt-1">_____</div>
          </div>
          <div className="p-2">
            <span className="font-semibold">Email:</span>
            <div className="bg-gray-100 p-1 mt-1">{email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">
            <span className="font-semibold">GSTIN:</span>
            <div className="bg-gray-100 p-1 mt-1">{gstin}</div>
          </div>
          <div className="p-2">
            <span className="font-semibold">No of Guest:</span>
            <div className="bg-gray-100 p-1 mt-1">{data.numberOfGuests}</div>
          </div>
        </div>

        {/* Check-in/out Details */}
        <div className="grid grid-cols-3 border-b border-gray-800">
          <div className="p-4 text-center border-r border-gray-800">
            <div className="font-semibold text-blue-700">Check-in</div>
            <div className="text-xl font-bold mt-2">{formatDate(data.checkInDate)}</div>
          </div>
          <div className="p-4 text-center border-r border-gray-800">
            <div className="font-semibold text-blue-700">Check-out</div>
            <div className="text-xl font-bold mt-2">{formatDate(data.checkOutDate)}</div>
          </div>
          <div className="p-4 text-center">
            <div className="font-semibold text-blue-700">Number of Days</div>
            <div className="text-xl font-bold mt-2">{calculateNights()} day {calculateNights() - 1} Night</div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-blue-900 text-white p-2 text-center font-semibold">
          Package Details
        </div>
        <div className="grid grid-cols-6 text-sm">
          <div className="p-2 border-r border-gray-800 font-semibold">Room Type</div>
          <div className="p-2 border-r border-gray-800 font-semibold">Unit</div>
          <div className="p-2 border-r border-gray-800 font-semibold">Quantity</div>
          <div className="p-2 border-r border-gray-800 font-semibold">GST</div>
          <div className="p-2 border-r border-gray-800 font-semibold">Amount</div>
          <div className="p-2 font-semibold">Taxable Pay GST+Service</div>
        </div>
        <div className="grid grid-cols-6 text-sm border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">Single Room</div>
          <div className="p-2 border-r border-gray-800">1</div>
          <div className="p-2 border-r border-gray-800">2</div>
          <div className="p-2 border-r border-gray-800">18%</div>
          <div className="p-2 border-r border-gray-800">16850</div>
          <div className="p-2">19883</div>
        </div>
        <div className="grid grid-cols-6 text-sm border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">Double Room</div>
          <div className="p-2 border-r border-gray-800">1</div>
          <div className="p-2 border-r border-gray-800">1</div>
          <div className="p-2 border-r border-gray-800">18%</div>
          <div className="p-2 border-r border-gray-800">11000</div>
          <div className="p-2">12980</div>
        </div>
        <div className="grid grid-cols-6 text-sm border-b border-gray-800">
          <div className="p-2 border-r border-gray-800 col-span-4 font-semibold">Total Payable Amount</div>
          <div className="p-2 border-r border-gray-800 font-semibold">32863</div>
          <div className="p-2"></div>
        </div>

        {/* Guest Information */}
        <div className="bg-blue-900 text-white p-2 text-center font-semibold">
          Guest Information
        </div>
        <div className="grid grid-cols-5 text-sm">
          <div className="p-2 border-r border-gray-800 font-semibold">Guest Name</div>
          <div className="p-2 border-r border-gray-800 font-semibold">Age</div>
          <div className="p-2 border-r border-gray-800 font-semibold">Sex</div>
          <div className="p-2 border-r border-gray-800 font-semibold">No of Pax</div>
          <div className="p-2 font-semibold">QR Code</div>
        </div>
        <div className="grid grid-cols-5 text-sm border-b border-gray-800">
          <div className="p-2 border-r border-gray-800">{data.guestName}</div>
          <div className="p-2 border-r border-gray-800">63</div>
          <div className="p-2 border-r border-gray-800">M</div>
          <div className="p-2 border-r border-gray-800">Adult</div>
          <div className="p-2 row-span-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-black flex items-center justify-center text-white text-xs">
              QR
            </div>
          </div>
        </div>

        {/* Package Includes */}
        <div className="bg-blue-900 text-white p-2 text-center font-semibold">
          Package Includes
        </div>
        <div className="grid grid-cols-2 text-sm p-2">
          <div>
            <div>1. Breakfast</div>
            <div>3. Daily House Keeping</div>
            <div>5. Wifi</div>
            <div>7. Air conditioning</div>
          </div>
          <div>
            <div>2. Pool</div>
            <div>4. Garden</div>
            <div>6. Smoking rooms</div>
            <div>8. Safety deposit box</div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-blue-900 text-white p-2 text-center font-semibold">
          Terms & Conditions
        </div>
        <div className="text-xs p-2 space-y-1">
          <div>1. All booking must be made in advance.</div>
          <div>2. Booking made with vouchers is not refundable in cash.</div>
          <div>3. Vouchers are not refundable in cash or replaceable if lost, destroyed, or stolen.</div>
          <div>4. All vouchers must be presented by the bearer on arrival at the hotel and must be mentioned when booking.</div>
          <div>5. Any remaining amount is not exchangeable for cash or another voucher and will be automatically forfeited.</div>
        </div>

        {/* Footer */}
        <div className="bg-blue-900 text-white p-2 text-center font-semibold">
          Thanks for business with us!!! Please visit us again !!!
        </div>
      </Card>
    </div>
  );
};

export default VoucherTemplate;