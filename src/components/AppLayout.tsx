import React, { useState } from 'react';
import VoucherForm from './VoucherForm';
import HotelVoucher from './HotelVoucher';
import FlightVoucher from './FlightVoucher';
import { generateVoucherPDF } from '@/utils/pdfGenerator';

interface HotelFormData {
  bookingNumber:string,
  hotelName: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  //numberOfGuests: number;
  adults: number;
  children: number;
}

interface FlightFormData {
  flightNumber: string;
  flightName: string;
  //passengerName: string;
  //travelDate: string;
  //returnDate: string;
  //numberOfPassengers: number;

  //flightNumber: string;
  airlineName: string;
  passengerName: string;
  travelDate: string;
  returnDate: string;
  adults: number;
  children: number;
}

type VoucherType = 'hotel' | 'flight' | null;

const AppLayout: React.FC = () => {
  const [currentVoucher, setCurrentVoucher] = useState<VoucherType>(null);
  const [hotelData, setHotelData] = useState<HotelFormData | null>(null);
  const [flightData, setFlightData] = useState<FlightFormData | null>(null);

  const handleGenerateHotel = (data: HotelFormData) => {
    setHotelData(data);
    setCurrentVoucher('hotel');
  };

  const handleGenerateFlight = (data: FlightFormData) => {
    setFlightData(data);
    setCurrentVoucher('flight');
  };

  const handleExportHotelPDF = () => {
    if (hotelData) {
      generateVoucherPDF(hotelData, 'hotel');
    }
  };

  const handleExportFlightPDF = () => {
    if (flightData) {
      generateVoucherPDF(flightData, 'flight');
    }
  };

  const handleBackToForm = () => {
    setCurrentVoucher(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Voucher Generator - Census
          </h1>
        </div>

        {currentVoucher === null && (
          <VoucherForm 
            onGenerateHotel={handleGenerateHotel}
            onGenerateFlight={handleGenerateFlight}
          />
        )}

        {currentVoucher === 'hotel' && hotelData && (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleBackToForm}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Form
              </button>
            </div>
            <div id="hotel-voucher">
              <HotelVoucher 
                data={hotelData}
                onExportPDF={handleExportHotelPDF}
              />
            </div>
          </div>
        )}

        {currentVoucher === 'flight' && flightData && (
          <div>
            <div className="mb-6 text-center">
              <button
                onClick={handleBackToForm}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Form
              </button>
            </div>
            <div id="flight-voucher">
              <FlightVoucher 
                data={flightData}
                onExportPDF={handleExportFlightPDF}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;