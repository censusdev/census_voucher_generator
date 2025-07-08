import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Hotel } from 'lucide-react';
import { generateVoucherPDF } from '@/utils/pdfGenerator';

interface HotelVoucherProps {
  data: {
    bookingDate: string;
    bookingNumber: string;
    hotelName: string;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    //numberOfGuests: number;
    adults: number;
    children: number;
    roomType: string;
    noOfRooms: number;
    mealPlan: string;
  };
  onExportPDF: () => void;
}

const HotelVoucher: React.FC<HotelVoucherProps> = ({ data, onExportPDF }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleExportPDF = () => {
    generateVoucherPDF(data, 'hotel');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hotel className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">HOTEL VOUCHER</h1>
                <p className="text-blue-100">Confirmation & Booking Details</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Voucher #</p>
              <p className="text-xl font-mono">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Hotel className="h-5 w-5 mr-2 text-blue-600" />
                  Hotel Information
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-blue-700">{data.hotelName}</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Premium Location
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Guest Details
                </h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800">{data.guestName}</p>
                  <p className="text-gray-600">{data.adults} Adult Guest{data.adults > 1 ? 's' : ''} - {data.children} Child Guest{data.children > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Stay Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(data.checkInDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(data.checkOutDate)}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600">Total Duration</p>
                    <p className="text-2xl font-bold text-purple-700">{calculateNights()} Night{calculateNights() > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Booking Confirmed</h3>
              <p className="text-blue-100">Present this voucher at check-in</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelVoucher;