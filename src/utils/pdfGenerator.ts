// Enhanced PDF generation utility that creates a proper voucher PDF
// instead of printing the entire page

export const generateVoucherPDF = (voucherData: any, voucherType: 'hotel' | 'flight') => {
  // Create a new window for the voucher
  const printWindow = window.open('', '_blank', 'width=800,height=1000');
  if (!printWindow) {
    console.error('Could not open print window');
    return;
  }

  // Create voucher HTML content
  const voucherHTML = createVoucherHTML(voucherData, voucherType);
  
  // Write the voucher content to the new window
  printWindow.document.write(voucherHTML);
  printWindow.document.close();

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
};

const createVoucherHTML = (data: any, type: 'hotel' | 'flight') => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const calculateNights = () => {
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  //const bookingNo = `ACC${Math.random().toString().substr(2, 9)}`;
  const bookingNo = data.bookingNumber || `ACC${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const gstin = '22AAAAAA0000A1Z5';
  const contactNumber = '+971 50 356 2142';
  const mobileNumber = '+971 56 211 0398';
  const email = 'info@census.travel';

  if (type === 'hotel') {
    const hasMultipleGuests = data.guestNames && data.guestNames.length > 1;
    const primaryGuestName = data.guestNames?.[0] || data.guestName || '';

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hotel Booking Confirmation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; }
          .voucher { width: 210mm; margin: 0 auto; background: white; }
          .border { border: 1px solid #ddd; }
          .header { padding: 10px 0; text-align: center; border-bottom: 1px solid #ddd; }
          .logo-section { display: flex; padding: 10px 20px; align-items: center; }
          .logo { width: 90px; height: 90px; margin-right: 20px;border-radius:8px; }
          .hotel-info { flex: 1; text-align: center; }
          .hotel-name { font-size: 22px; font-weight: bold; color: #1e3a8a; }
          .hotel-address { font-size: 12px; color: #666; margin-top: 5px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; }
          .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }
          .cell { padding: 8px; border-right: 1px solid #ddd; }
          .cell:last-child { border-right: none; }
          .row { border-bottom: 1px solid #ddd; }
          .section-header { background: #f0f0f0; padding: 8px; text-align: center; font-weight: bold; border-bottom: 1px solid #ddd; }
          .input-field { padding: 4px; margin-top: 4px; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .text-blue { color: #1e40af; }
          .qr-code { width: 60px; height: 60px; background: #f5f5f5; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; }
          .footer { padding: 15px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #ddd; }
          .signature { margin-top: 30px; border-top: 1px dashed #333; width: 200px; display: inline-block; text-align: center; padding-top: 5px; }
          .status-confirmed { display: inline-flex; align-items: center;gap: 4px;background-color: #ecfdf5;color: #065f46;padding: 4px 8px;border-radius: 12px;font-weight: 500;}
          @media print {
            body { margin: 0; }
            .voucher { width: 100%; border: none; }
          }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="logo-section">
            <div class="logo">
              <img src=${'/Logo.png'} alt="Hotel Logo" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div class="hotel-info">
              <div class="hotel-name">${data.hotelName}</div>
              <div class="hotel-address">Booked From: ${data.hotelAddress || 'Census Travel and Tourism, 923 Block B, Business Village Building, Clock Tower Deira, Dubai, UAE'}</div>
              <div class="hotel-address">Phone: ${data.hotelPhone || '+971 50356 2142'} | Email: ${data.hotelEmail || 'info@census.travel'}</div>
            </div>
          </div>

          <div class="header">
            <h2>HOTEL BOOKING CONFIRMATION</h2>
          </div>

          <div class="grid-3 row">
            <div class="cell">
              <span class="bold">Booking Reference:</span>
              <div class="input-field">${bookingNo}</div>
            </div>
            <div class="cell">
              <span class="bold">Booking Date:</span>
              <div class="input-field">${formatDate(new Date().toString())}</div>
            </div>
            <div class="cell">
              <span class="bold">Status:</span>
              <div class="input-field">
                Confirmed
                <span class="status-confirmed">
                   ✓
                </span>
              </div>
            </div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
             <span class="bold">${hasMultipleGuests ? 'Primary Guest' : 'Guest Name'}:</span>
              <div class="input-field">${primaryGuestName}</div>
            </div>
            <div class="cell">
              <span class="bold">Contact Number:</span>
              <div class="input-field">${contactNumber}</div>
            </div>
          </div>
           ${hasMultipleGuests ? `
          <div class="row">
            <div class="cell">
              <span class="bold">Additional Guests:</span>
              <div class="input-field guest-list">
                ${data.guestNames.slice(1).map((name: string, index: number) => `
                  <div class="guest-item">${name} (${index < data.adults - 1 ? 'Adult' : 'Child'})</div>
                `).join('')}
              </div>
            </div>
            <div class="cell">
              <span class="bold">Total Guests:</span>
              <div class="input-field">${data.adults} Adults, ${data.children} Children</div>
            </div>
          </div>
          ` : `
          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">Total Guests:</span>
              <div class="input-field">${data.adults} Adult(s), ${data.children} Child(ren)</div>
            </div>
            <div class="cell">
              <span class="bold">Email:</span>
              <div class="input-field">${email}</div>
            </div>
          </div>
          `}

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">Email:</span>
              <div class="input-field">${email}</div>
            </div>
            <div class="cell">
              <span class="bold">No. of Guests:</span>
              <div class="input-field">${data.adults + data.children} (${data.adults || 2} Adults, ${data.children || 0} Children)</div>
            </div>
          </div>

          <div class="section-header">STAY DETAILS</div>
          <div class="grid-3 row">
            <div class="cell center">
              <div class="bold text-blue">Check-in</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${formatDate(data.checkInDate)}</div>
              <div>14:00 onwards</div>
            </div>
            <div class="cell center">
              <div class="bold text-blue">Check-out</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${formatDate(data.checkOutDate)}</div>
              <div>12:00 noon</div>
            </div>
            <div class="cell center">
              <div class="bold text-blue">Duration</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${calculateNights()} Nights</div>
            </div>
          </div>

          <div class="section-header">ROOM DETAILS</div>
          <div class="grid-4 row">
            <div class="cell bold">Room Type</div>
            <div class="cell bold">Quantity</div>
            <div class="cell bold">Meal Plan</div>
          
          </div>
          <div class="grid-4 row">
            <div class="cell">${data.roomType || 'Deluxe Room'}</div>
            <div class="cell">${data.noOfRooms || 1}</div>
            <div class="cell">${data.mealPlan || 'Room Only'}</div>
           
          </div>

          <div class="section-header">IMPORTANT NOTES</div>
          <div style="padding: 10px; font-size: 11px;">
            <div>• Please present this confirmation and valid photo ID at reception during check-in.</div>
            <div>• Standard check-in time is 14:00 and check-out time is 12:00 noon.</div>
            <div>• Early check-in and late check-out are subject to availability and may incur additional charges.</div>
            <div>• Cancellation must be made 48 hours prior to arrival to avoid cancellation charges.</div>
            <div>• The hotel reserves the right to cancel or modify reservations where it appears necessary.</div>
          </div>
        </div>
      </body>
    </html>
    `;
  } else {
    // Flight booking confirmation
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Flight Booking Confirmation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; }
          .voucher { width: 210mm; margin: 0 auto; background: white; }
          .border { border: 1px solid #ddd; }
          .header { padding: 10px 0; text-align: center; border-bottom: 1px solid #ddd; }
          .logo-section { display: flex; padding: 10px 20px; align-items: center; }
          .logo { width: 80px; height: 80px; border: 1px solid #ddd; margin-right: 20px; }
          .airline-info { flex: 1; text-align: center; }
          .airline-name { font-size: 22px; font-weight: bold; color: #1e3a8a; }
          .flight-details { font-size: 12px; color: #666; margin-top: 5px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; }
          .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }
          .grid-5 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
          .cell { padding: 8px; border-right: 1px solid #ddd; }
          .cell:last-child { border-right: none; }
          .row { border-bottom: 1px solid #ddd; }
          .section-header { background: #f0f0f0; padding: 8px; text-align: center; font-weight: bold; border-bottom: 1px solid #ddd; }
          .input-field { padding: 4px; margin-top: 4px; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .text-blue { color: #1e40af; }
          .text-green { color: #065f46; }
          .flight-time { font-size: 16px; font-weight: bold; margin: 5px 0; }
          .flight-route { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; }
          .airport-code { font-size: 18px; font-weight: bold; }
          .flight-duration { text-align: center; font-size: 12px; }
          .qr-code { width: 60px; height: 60px; background: #f5f5f5; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; }
          .footer { padding: 15px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #ddd; }
          .signature { margin-top: 30px; border-top: 1px dashed #333; width: 200px; display: inline-block; text-align: center; padding-top: 5px; }
          @media print {
            body { margin: 0; }
            .voucher { width: 100%; border: none; }
          }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="logo-section">
            <div class="logo">
              <!-- Replace with actual logo -->
              <img src=${'/Logo.png'} alt="Airline Logo" style="width:100%; height:100%; object-fit:contain;">
            </div>
            <div class="airline-info">
              <div class="airline-name">${data.airline || 'Air India Express'}</div>
              <div class="flight-details">Flight Booking Confirmation | E-Ticket</div>
            </div>
          </div>

          <div class="header">
            <h2>FLIGHT BOOKING CONFIRMATION</h2>
          </div>

          <div class="grid-3 row">
            <div class="cell">
              <span class="bold">Booking Reference:</span>
              <div class="input-field">${bookingNo}</div>
            </div>
            <div class="cell">
              <span class="bold">Booking Date:</span>
              <div class="input-field">${formatDate(new Date().toString())}</div>
            </div>
            <div class="cell">
              <span class="bold">Status:</span>
              <div class="input-field text-green">Confirmed</div>
            </div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">Passenger Name:</span>
              <div class="input-field">${data.passengerName}</div>
            </div>
            <div class="cell">
              <span class="bold">Contact Number:</span>
              <div class="input-field">${contactNumber}</div>
            </div>
          </div>

          <div class="section-header">FLIGHT DETAILS</div>
          
          <div class="grid-4 row">
            <div class="cell bold">Flight Number</div>
            <div class="cell bold">Departure</div>
            <div class="cell bold">Arrival</div>
            <div class="cell bold">Duration</div>
          </div>
          <div class="grid-4 row">
            <div class="cell">${data.flightNumber || 'AI-202'}</div>
            <div class="cell">${formatDate(data.travelDate)}<br>${formatTime(data.departureTime)}</div>
            <div class="cell">${formatDate(data.arrivalDate)}<br>${formatTime(data.arrivalTime)}</div>
            <div class="cell">${data.duration || '2h 15m'}</div>
          </div>

          <div class="section-header">ROUTE DETAILS</div>
          <div style="padding: 15px;">
            <div class="flight-route">
              <div>
                <div class="airport-code">${data.departureAirport || 'DEL'}</div>
                <div>${data.departureCity || 'Delhi'}</div>
                <div class="flight-time">${formatTime(data.departureTime)}</div>
                <div>${formatDate(data.travelDate)}</div>
              </div>
              <div class="flight-duration">
                <div>${data.duration || '2h 15m'}</div>
                <div>➝</div>
                <div>${data.flightType || 'Non-stop'}</div>
              </div>
              <div style="text-align: right;">
                <div class="airport-code">${data.arrivalAirport || 'BOM'}</div>
                <div>${data.arrivalCity || 'Mumbai'}</div>
                <div class="flight-time">${formatTime(data.arrivalTime)}</div>
                <div>${formatDate(data.arrivalDate)}</div>
              </div>
            </div>
          </div>

          <div class="section-header">PASSENGER DETAILS</div>
          <div class="grid-5 row">
            <div class="cell bold">Passenger Name</div>
            <div class="cell bold">Type</div>
            <div class="cell bold">Seat</div>
            <div class="cell bold">Baggage</div>
            <div class="cell bold">PNR</div>
          </div>
          <div class="grid-5 row">
            <div class="cell">${data.passengerName}</div>
            <div class="cell">Adult</div>
            <div class="cell">${data.seatNumber || '12A'}</div>
            <div class="cell">${data.baggageAllowance || '15kg'}</div>
            <div class="cell">${data.pnr || 'ABC123'}</div>
          </div>

          <div class="section-header">FARE DETAILS</div>
          <div class="grid-3 row">
            <div class="cell bold">Fare Type</div>
            <div class="cell bold">Base Fare</div>
            <div class="cell bold">Total</div>
          </div>
          <div class="grid-3 row">
            <div class="cell">${data.fareType || 'Economy'}</div>
            <div class="cell">₹${data.baseFare || '4500'}</div>
            <div class="cell">₹${data.totalFare || '5200'}</div>
          </div>
          <div class="grid-3 row">
            <div class="cell bold">Taxes & Fees</div>
            <div class="cell">₹${data.taxes || '700'}</div>
            <div class="cell"></div>
          </div>
          <div class="grid-3 row">
            <div class="cell bold" style="grid-column: span 2;">Total Amount Paid</div>
            <div class="cell bold">₹${data.totalFare || '5200'}</div>
          </div>

          <div class="section-header">IMPORTANT INFORMATION</div>
          <div style="padding: 10px; font-size: 11px;">
            <div>• Please check-in online or arrive at the airport at least 2 hours before departure.</div>
            <div>• Carry a printed copy of this confirmation and valid photo ID to the airport.</div>
            <div>• Web check-in opens 48 hours before departure and closes 2 hours before departure.</div>
            <div>• Baggage allowance: ${data.baggageAllowance || '15kg check-in + 7kg cabin'} per passenger.</div>
            <div>• For any changes/cancellations, please contact the airline or your booking agent.</div>
          </div>
        </div>
      </body>
    </html>
    `;
  }
};

// Legacy function for backward compatibility
export const generatePDF = (elementId: string, filename: string) => {
  generateVoucherPDF({}, 'hotel');
};

export const generateAdvancedPDF = async (elementId: string, filename: string) => {
  generateVoucherPDF({}, 'hotel');
};