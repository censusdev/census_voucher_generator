import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Hotel, Plane } from 'lucide-react';

interface HotelFormData {
  bookingNumber: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  multipleGuests: boolean;
  guestNames: string[];
}

interface FlightFormData {
  flightNumber: string;
  airlineName: string;
  passengerName: string;
  travelDate: string;
  returnDate: string;
  adults: number;
  children: number;
}

interface VoucherFormProps {
  onGenerateHotel: (data: HotelFormData) => void;
  onGenerateFlight: (data: FlightFormData) => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ onGenerateHotel, onGenerateFlight }) => {
  const [hotelData, setHotelData] = useState<HotelFormData>({
    bookingNumber: `HOTEL${Math.floor(100000 + Math.random() * 900000)}`,
    hotelName: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    multipleGuests: false,
    guestNames: ['']
  });

  const [flightData, setFlightData] = useState<FlightFormData>({
    flightNumber: '',
    airlineName: '',
    passengerName: '',
    travelDate: '',
    returnDate: '',
    adults: 1,
    children: 0
  });

  // Update guest names array when adults/children change
  useEffect(() => {
    const totalGuests = hotelData.adults + hotelData.children;
    if (hotelData.multipleGuests) {
      const newGuestNames = [...hotelData.guestNames];
      while (newGuestNames.length < totalGuests) {
        newGuestNames.push('');
      }
      while (newGuestNames.length > totalGuests) {
        newGuestNames.pop();
      }
      setHotelData({...hotelData, guestNames: newGuestNames});
    } else {
      // Ensure at least one name exists
      if (hotelData.guestNames.length === 0) {
        setHotelData({...hotelData, guestNames: ['']});
      }
    }
  }, [hotelData.adults, hotelData.children, hotelData.multipleGuests]);

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuestNames = [...hotelData.guestNames];
    newGuestNames[index] = value;
    setHotelData({...hotelData, guestNames: newGuestNames});
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateHotel(hotelData);
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateFlight(flightData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Voucher Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hotel" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="hotel" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              Hotel Voucher
            </TabsTrigger>
            <TabsTrigger value="flight" className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              Flight Voucher
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hotel">
            <form onSubmit={handleHotelSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bookingNumber" className="text-sm font-medium">Booking Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="bookingNumber"
                    value={hotelData.bookingNumber}
                    onChange={(e) => setHotelData({...hotelData, bookingNumber: e.target.value})}
                    required
                    className="h-11 flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setHotelData({
                      ...hotelData,
                      bookingNumber: `HOTEL${Math.floor(100000 + Math.random() * 900000)}`
                    })}
                    className="h-11"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hotelName" className="text-sm font-medium">Hotel Name</Label>
                <Input
                  id="hotelName"
                  placeholder="Enter hotel name"
                  value={hotelData.hotelName}
                  onChange={(e) => setHotelData({...hotelData, hotelName: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn" className="text-sm font-medium">Check-in Date</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={hotelData.checkInDate}
                    onChange={(e) => setHotelData({...hotelData, checkInDate: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOut" className="text-sm font-medium">Check-out Date</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={hotelData.checkOutDate}
                    onChange={(e) => setHotelData({...hotelData, checkOutDate: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="adults" className="text-sm font-medium">Adults</Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={hotelData.adults}
                    onChange={(e) => setHotelData({...hotelData, adults: parseInt(e.target.value)})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children" className="text-sm font-medium">Children</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={hotelData.children}
                    onChange={(e) => setHotelData({...hotelData, children: parseInt(e.target.value)})}
                    className="h-11"
                  />
                </div>
              </div>

              {(hotelData.adults + hotelData.children) > 1 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multipleGuests"
                    checked={hotelData.multipleGuests}
                    onCheckedChange={(checked) => 
                      setHotelData({...hotelData, multipleGuests: Boolean(checked)})
                    }
                  />
                  <Label htmlFor="multipleGuests">Enter names for all guests</Label>
                </div>
              )}

              {hotelData.multipleGuests ? (
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Guest Names</Label>
                  {Array.from({ length: hotelData.adults }).map((_, index) => (
                    <div key={`adult-${index}`} className="space-y-2">
                      <Label htmlFor={`adult-name-${index}`} className="text-sm font-medium">
                        Adult {index + 1} Name
                      </Label>
                      <Input
                        id={`adult-name-${index}`}
                        placeholder={`Enter adult ${index + 1} name`}
                        value={hotelData.guestNames[index] || ''}
                        onChange={(e) => handleGuestNameChange(index, e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  ))}
                  {Array.from({ length: hotelData.children }).map((_, index) => (
                    <div key={`child-${index}`} className="space-y-2">
                      <Label htmlFor={`child-name-${index}`} className="text-sm font-medium">
                        Child {index + 1} Name
                      </Label>
                      <Input
                        id={`child-name-${index}`}
                        placeholder={`Enter child ${index + 1} name`}
                        value={hotelData.guestNames[hotelData.adults + index] || ''}
                        onChange={(e) => handleGuestNameChange(hotelData.adults + index, e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="guestName" className="text-sm font-medium">
                    {hotelData.adults + hotelData.children > 1 ? 'Primary Guest Name' : 'Guest Name'}
                  </Label>
                  <Input
                    id="guestName"
                    placeholder="Enter guest name"
                    value={hotelData.guestNames[0] || ''}
                    onChange={(e) => handleGuestNameChange(0, e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Generate Hotel Voucher
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="flight">
            <form onSubmit={handleFlightSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="flightNumber" className="text-sm font-medium">Flight Number</Label>
                <Input
                  id="flightNumber"
                  placeholder="e.g., AI-202"
                  value={flightData.flightNumber}
                  onChange={(e) => setFlightData({...flightData, flightNumber: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="airlineName" className="text-sm font-medium">Airline Name</Label>
                <Input
                  id="airlineName"
                  placeholder="Enter airline name"
                  value={flightData.airlineName}
                  onChange={(e) => setFlightData({...flightData, airlineName: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengerName" className="text-sm font-medium">Passenger Name</Label>
                <Input
                  id="passengerName"
                  placeholder="Enter passenger name"
                  value={flightData.passengerName}
                  onChange={(e) => setFlightData({...flightData, passengerName: e.target.value})}
                  required
                  className="h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelDate" className="text-sm font-medium">Travel Date</Label>
                  <Input
                    id="travelDate"
                    type="date"
                    value={flightData.travelDate}
                    onChange={(e) => setFlightData({...flightData, travelDate: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnDate" className="text-sm font-medium">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    value={flightData.returnDate}
                    onChange={(e) => setFlightData({...flightData, returnDate: e.target.value})}
                    required
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="flightAdults" className="text-sm font-medium">Adults</Label>
                  <Input
                    id="flightAdults"
                    type="number"
                    min="1"
                    value={flightData.adults}
                    onChange={(e) => setFlightData({...flightData, adults: parseInt(e.target.value)})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flightChildren" className="text-sm font-medium">Children</Label>
                  <Input
                    id="flightChildren"
                    type="number"
                    min="0"
                    value={flightData.children}
                    onChange={(e) => setFlightData({...flightData, children: parseInt(e.target.value)})}
                    className="h-11"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                Generate Flight Voucher
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoucherForm;