import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hotel, Plane } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface HotelFormData {
  bookingNumber: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  multipleGuests: boolean;
  guestNames: string[];
  roomType: string;
  noOfRooms: number;
  mealPlan: string;
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

const roomTypes = [
  { value: 'standard', label: 'Standard Room' },
  { value: 'deluxe', label: 'Deluxe Room' },
  { value: 'suite', label: 'Suite' },
  { value: 'family', label: 'Family Room' },
  { value: 'executive', label: 'Executive Suite' },
];

const mealPlans = [
  { value: 'room_only', label: 'Room Only' },
  { value: 'breakfast', label: 'Breakfast Included' },
  { value: 'half_board', label: 'Half Board' },
  { value: 'full_board', label: 'Full Board' },
  { value: 'all_inclusive', label: 'All Inclusive' },
];

const VoucherForm: React.FC<VoucherFormProps> = ({ onGenerateHotel, onGenerateFlight }) => {
  const [hotelData, setHotelData] = useState<HotelFormData>({
    bookingNumber: `HOTEL${Math.floor(100000 + Math.random() * 900000)}`,
    hotelName: '',
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    multipleGuests: false,
    guestNames: [''],
    roomType: 'standard',
    noOfRooms: 1,
    mealPlan: 'room_only'
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

  const totalGuests = hotelData.adults + hotelData.children;
  const showMultipleGuestsOption = totalGuests > 1;

  const handleGuestNamesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // const names = e.target.value.split('\n').filter(name => name.trim() !== '');
    // setHotelData({...hotelData, guestNames: names});
     const rawValue = e.target.value;
    setHotelData(prev => ({
      ...prev,
      guestNamesRaw: rawValue
    }));
    
    const names = rawValue.split('\n').filter(name => name.trim() !== '');
    setHotelData(prev => ({
      ...prev,
      guestNames: names
    }));
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If not using multiple guests, ensure we have at least the primary guest name
    if (!hotelData.multipleGuests && hotelData.guestNames.length === 0) {
      setHotelData({...hotelData, guestNames: ['']});
    }
    
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
             

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomType" className="text-sm font-medium">Room Type</Label>
                  <Select
                    value={hotelData.roomType}
                    onValueChange={(value) => setHotelData({...hotelData, roomType: value})}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noOfRooms" className="text-sm font-medium">Number of Rooms</Label>
                  <Input
                    id="noOfRooms"
                    type="number"
                    min="1"
                    value={hotelData.noOfRooms}
                    onChange={(e) => setHotelData({...hotelData, noOfRooms: parseInt(e.target.value)})}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mealPlan" className="text-sm font-medium">Meal Plan</Label>
                  <Select
                    value={hotelData.mealPlan}
                    onValueChange={(value) => setHotelData({...hotelData, mealPlan: value})}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select meal plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealPlans.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

              {showMultipleGuestsOption && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="multipleGuests"
                    checked={hotelData.multipleGuests}
                    onCheckedChange={(checked) => 
                      setHotelData({
                        ...hotelData, 
                        multipleGuests: Boolean(checked),
                        guestNames: checked ? [''] : [hotelData.guestNames[0] || '']
                      })
                    }
                  />
                  <Label htmlFor="multipleGuests">Enter names for all guests</Label>
                </div>
              )}

              {hotelData.multipleGuests ? (
                <div className="space-y-2">
                  <Label htmlFor="allGuestNames" className="text-sm font-medium">
                    Guest Names ({totalGuests} guests)
                  </Label>
                  <Textarea
                    id="allGuestNames"
                    placeholder={`Enter all guest names, one per line\nExample:\nAakash\nRohan\nPratik`}
                    value={hotelData.guestNames.join('\n')}
                    onChange={handleGuestNamesChange}
                    required
                    className="min-h-[100px]"
                     onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                      }
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter one name per line. {totalGuests} names expected ({hotelData.adults} adults and {hotelData.children} children).
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="guestName" className="text-sm font-medium">
                    {totalGuests > 1 ? 'Primary Guest Name' : 'Guest Name'}
                  </Label>
                  <Input
                    id="guestName"
                    placeholder="Enter guest name"
                    value={hotelData.guestNames[0] || ''}
                    onChange={(e) => setHotelData({
                      ...hotelData,
                      guestNames: [e.target.value]
                    })}
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