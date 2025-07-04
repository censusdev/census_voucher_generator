import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plane, Users, MapPin } from 'lucide-react';
import { generateVoucherPDF } from '@/utils/pdfGenerator';

interface FlightVoucherProps {
  data: {
    flightName: string;
    passengerName: string;
    travelDate: string;
    returnDate: string;
    //numberOfPassengers: number;
    flightNumber: string;
    adults: number;
    children: number;
  };
  onExportPDF: () => void;
}

const FlightVoucher: React.FC<FlightVoucherProps> = ({ data, onExportPDF }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportPDF = () => {
    generateVoucherPDF(data, 'flight');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-green-50 to-blue-100">
        <div className="bg-gradient-to-r from-green-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plane className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">FLIGHT VOUCHER</h1>
                <p className="text-green-100">Boarding Pass & Travel Details</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-100">Booking Reference</p>
              <p className="text-xl font-mono">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Plane className="h-5 w-5 mr-2 text-green-600" />
                  Flight Information
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-700">{data.flightName}</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    International Route
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Passenger Details
                </h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800">{data.passengerName}</p>
                  <p className="text-gray-600">{data.adults} Adult Passenger{data.adults > 1 ? 's' : ''} - {data.children} child{data.children > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Travel Schedule
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">DEPARTURE</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(data.travelDate)}</p>
                    <p className="text-sm text-gray-600">Gate opens 2 hours before</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">RETURN</p>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(data.returnDate)}</p>
                    <p className="text-sm text-gray-600">Check-in required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-green-100">Seat Class</p>
                <p className="text-lg font-bold">Economy</p>
              </div>
              <div>
                <p className="text-sm text-green-100">Baggage</p>
                <p className="text-lg font-bold">20kg Included</p>
              </div>
              <div>
                <p className="text-sm text-green-100">Status</p>
                <p className="text-lg font-bold">CONFIRMED</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
            >
              Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightVoucher;