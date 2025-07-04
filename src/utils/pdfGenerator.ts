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

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${type === 'hotel' ? 'Hotel' : 'Flight'} Voucher</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12px; }
          .voucher { width: 210mm; margin: 0 auto; background: white; }
          .border { border: 2px solid #000; }
          .header { background: #1e3a8a; color: white; padding: 8px; text-align: center; }
          .logo-section { display: flex; align-items: center; padding: 16px; border-bottom: 1px solid #000; }
          .logo { width: 60px; height: 60px; background: linear-gradient(45deg, #ef4444, #fbbf24); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 16px; }
          .hotel-name { flex: 1; text-align: center; font-size: 24px; font-weight: bold; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
          .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; }
          .grid-5 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
          .grid-6 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; }
          .cell { padding: 8px; border-right: 1px solid #000; }
          .cell:last-child { border-right: none; }
          .row { border-bottom: 1px solid #000; }
          .section-header { background: #1e3a8a; color: white; padding: 8px; text-align: center; font-weight: bold; }
          .input-field { background: #f3f4f6; padding: 4px; margin-top: 4px; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .text-blue { color: #1e40af; }
          .qr-code { width: 60px; height: 60px; background: #000; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; }
          @media print {
            body { margin: 0; }
            .voucher { width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="voucher border">
          <div class="header">
            <h1>Voucher Format</h1>
          </div>
          
          <div class="logo-section">
            <div class="logo">Vyapar</div>
            <div class="hotel-name">${type === 'hotel' ? data.hotelName : data.flightName}</div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">Booking No:</span>
              <div class="input-field">${bookingNo}</div>
            </div>
            <div class="cell">
              <span class="bold">Booking Name:</span>
              <div class="input-field">${type === 'hotel' ? data.guestName : data.passengerName}</div>
            </div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">Contact Number:</span>
              <div class="input-field">${contactNumber}</div>
            </div>
            <div class="cell">
              <span class="bold">Mobile Number:</span>
              <div class="input-field">${mobileNumber}</div>
            </div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">State Address:</span>
              <div class="input-field">_____</div>
            </div>
            <div class="cell">
              <span class="bold">Email:</span>
              <div class="input-field">${email}</div>
            </div>
          </div>

          <div class="grid-2 row">
            <div class="cell">
              <span class="bold">GSTIN:</span>
              <div class="input-field">${gstin}</div>
            </div>
            <div class="cell">
              <span class="bold">${type === 'hotel' ? 'No of Guest' : 'No of Passengers'}:</span>
              <div class="input-field">${type === 'hotel' ? data.numberOfGuests : data.numberOfPassengers}</div>
            </div>
          </div>

          <div class="grid-3 row">
            <div class="cell center">
              <div class="bold text-blue">${type === 'hotel' ? 'Check-in' : 'Departure'}</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${formatDate(type === 'hotel' ? data.checkInDate : data.travelDate)}</div>
            </div>
            <div class="cell center">
              <div class="bold text-blue">${type === 'hotel' ? 'Check-out' : 'Return'}</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${formatDate(type === 'hotel' ? data.checkOutDate : data.returnDate)}</div>
            </div>
            <div class="cell center">
              <div class="bold text-blue">Number of Days</div>
              <div class="bold" style="font-size: 16px; margin-top: 8px;">${type === 'hotel' ? calculateNights() + ' day ' + (calculateNights() - 1) + ' Night' : '1 day'}</div>
            </div>
          </div>

          <div class="section-header">Package Details</div>
          <div class="grid-6 row">
            <div class="cell bold">${type === 'hotel' ? 'Room Type' : 'Flight Type'}</div>
            <div class="cell bold">Unit</div>
            <div class="cell bold">Quantity</div>
            <div class="cell bold">GST</div>
            <div class="cell bold">Amount</div>
            <div class="cell bold">Taxable Pay GST+Service</div>
          </div>
          <div class="grid-6 row">
            <div class="cell">${type === 'hotel' ? 'Single Room' : 'Economy Class'}</div>
            <div class="cell">1</div>
            <div class="cell">2</div>
            <div class="cell">18%</div>
            <div class="cell">16850</div>
            <div class="cell">19883</div>
          </div>
          <div class="grid-6 row">
            <div class="cell">${type === 'hotel' ? 'Double Room' : 'Business Class'}</div>
            <div class="cell">1</div>
            <div class="cell">1</div>
            <div class="cell">18%</div>
            <div class="cell">11000</div>
            <div class="cell">12980</div>
          </div>
          <div class="grid-6 row">
            <div class="cell bold" style="grid-column: span 4;">Total Payable Amount</div>
            <div class="cell bold">32863</div>
            <div class="cell"></div>
          </div>

          <div class="section-header">${type === 'hotel' ? 'Guest' : 'Passenger'} Information</div>
          <div class="grid-5 row">
            <div class="cell bold">${type === 'hotel' ? 'Guest' : 'Passenger'} Name</div>
            <div class="cell bold">Age</div>
            <div class="cell bold">Sex</div>
            <div class="cell bold">No of Pax</div>
            <div class="cell bold">QR Code</div>
          </div>
          <div class="grid-5 row">
            <div class="cell">${type === 'hotel' ? data.guestName : data.passengerName}</div>
            <div class="cell">63</div>
            <div class="cell">M</div>
            <div class="cell">Adult</div>
            <div class="cell center">
              <div class="qr-code">QR</div>
            </div>
          </div>

          <div class="section-header">Package Includes</div>
          <div class="grid-2" style="padding: 8px;">
            <div>
              <div>1. ${type === 'hotel' ? 'Breakfast' : 'In-flight meals'}</div>
              <div>3. ${type === 'hotel' ? 'Daily House Keeping' : 'Baggage allowance'}</div>
              <div>5. ${type === 'hotel' ? 'Wifi' : 'Entertainment'}</div>
              <div>7. ${type === 'hotel' ? 'Air conditioning' : 'Priority boarding'}</div>
            </div>
            <div>
              <div>2. ${type === 'hotel' ? 'Pool' : 'Seat selection'}</div>
              <div>4. ${type === 'hotel' ? 'Garden' : 'Lounge access'}</div>
              <div>6. ${type === 'hotel' ? 'Smoking rooms' : 'Wi-Fi'}</div>
              <div>8. ${type === 'hotel' ? 'Safety deposit box' : 'Travel insurance'}</div>
            </div>
          </div>

          <div class="section-header">Terms & Conditions</div>
          <div style="padding: 8px; font-size: 10px;">
            <div>1. All booking must be made in advance.</div>
            <div>2. Booking made with vouchers is not refundable in cash.</div>
            <div>3. Vouchers are not refundable in cash or replaceable if lost, destroyed, or stolen.</div>
            <div>4. All vouchers must be presented by the bearer on arrival at the ${type === 'hotel' ? 'hotel' : 'airport'} and must be mentioned when booking.</div>
            <div>5. Any remaining amount is not exchangeable for cash or another voucher and will be automatically forfeited.</div>
          </div>

          <div class="section-header">
            Thanks for business with us!!! Please visit us again !!!
          </div>
        </div>
      </body>
    </html>
  `;
};

// Legacy function for backward compatibility
export const generatePDF = (elementId: string, filename: string) => {
  generateVoucherPDF({}, 'hotel');
};

export const generateAdvancedPDF = async (elementId: string, filename: string) => {
  generateVoucherPDF({}, 'hotel');
};