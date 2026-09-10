import React from 'react';

const SeatGrid = ({ seats, selectedSeats, onToggleSeat, ticketPrice = {} }) => {
  // Group seats by tier/category
  const rowsMap = {};
  seats.forEach(seat => {
    if (!rowsMap[seat.row]) {
      rowsMap[seat.row] = [];
    }
    rowsMap[seat.row].push(seat);
  });

  const sortedRows = Object.keys(rowsMap).sort().reverse(); // Show top rows (Recliners/Premium) first like BMS

  // Group rows by seatType
  const tierOrder = [
    { type: 'recliner', label: 'RECLINER / SOFA', price: ticketPrice.recliner || 450 },
    { type: 'premium', label: 'PREMIUM / BALCONY', price: ticketPrice.premium || 350 },
    { type: 'standard', label: 'PRIME / FIRST CLASS', price: ticketPrice.standard || 250 },
    { type: 'classic', label: 'CLASSIC / STANDARD', price: ticketPrice.classic || 175 }
  ];

  return (
    <div>
      {/* Screen at the top */}
      <div className="screen-indicator">
        <div className="screen-text">All Eyes This Way • Screen 1</div>
      </div>

      <div className="seat-matrix">
        {tierOrder.map(tier => {
          const tierRows = sortedRows.filter(row => rowsMap[row][0]?.seatType === tier.type);
          if (tierRows.length === 0) return null;

          return (
            <div key={tier.type} style={{ width: '100%', marginBottom: '1.5rem' }}>
              <div className="seat-tier-header">
                {tier.label} - ₹{tier.price}
              </div>

              {tierRows.map(row => {
                const rowSeats = rowsMap[row].sort((a, b) => a.col - b.col);

                return (
                  <div key={row} className="seat-row" style={{ justifyContent: 'center', marginBottom: '0.4rem' }}>
                    <span className="row-label">{row}</span>

                    {rowSeats.map(seat => {
                      const isSelected = selectedSeats.includes(seat.seatId);
                      let seatClass = 'seat-available';

                      if (seat.status === 'booked') {
                        seatClass = 'seat-booked';
                      } else if (seat.status === 'locked' && !isSelected) {
                        seatClass = 'seat-locked';
                      } else if (isSelected) {
                        seatClass = 'seat-selected';
                      }

                      // Aisle gaps: add spacing after column 2 and column 8 for realistic walkway
                      const isAisleRight = seat.col === 2 || seat.col === 8;

                      return (
                        <React.Fragment key={seat.seatId}>
                          <button
                            disabled={seat.status === 'booked' || (seat.status === 'locked' && !isSelected)}
                            onClick={() => onToggleSeat(seat.seatId)}
                            className={`seat-btn ${seatClass}`}
                            title={`Seat ${seat.seatId} (${tier.label}) - ₹${tier.price}`}
                          >
                            {seat.col}
                          </button>
                          {isAisleRight && <div className="aisle-gap" />}
                        </React.Fragment>
                      );
                    })}

                    <span className="row-label">{row}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Real-world Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'var(--seat-available)' }}></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'var(--seat-selected)' }}></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'var(--seat-locked)' }}></div>
          <span>Reserved (In Cart)</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: 'var(--seat-booked)', border: '1px solid #334155' }}></div>
          <span>Sold Out</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
