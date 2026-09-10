import React from 'react';

const SeatGrid = ({ seats, selectedSeats, onToggleSeat }) => {
  // Group seats by row
  const rowsMap = {};
  seats.forEach(seat => {
    if (!rowsMap[seat.row]) {
      rowsMap[seat.row] = [];
    }
    rowsMap[seat.row].push(seat);
  });

  // Sort rows and columns
  const sortedRows = Object.keys(rowsMap).sort();

  return (
    <div>
      <div className="screen-indicator">
        <div className="screen-text">All Eyes This Way (Screen)</div>
      </div>

      <div className="seat-matrix">
        {sortedRows.map(row => {
          const rowSeats = rowsMap[row].sort((a, b) => a.col - b.col);
          const isPremiumRow = rowSeats[0]?.seatType === 'premium';

          return (
            <div key={row} className="seat-row">
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

                return (
                  <button
                    key={seat.seatId}
                    disabled={seat.status === 'booked' || (seat.status === 'locked' && !isSelected)}
                    onClick={() => onToggleSeat(seat.seatId)}
                    className={`seat-btn ${seatClass}`}
                    title={`${seat.seatId} (${seat.seatType}) - ${seat.status}`}
                  >
                    {seat.col}
                  </button>
                );
              })}
              <span className="row-label">{row}</span>
            </div>
          );
        })}
      </div>

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
          <span>Reserved/Hold</span>
        </div>
        <div className="legend-item">
          <div className="legend-box" style={{ background: '#1e293b', border: '1px solid #334155' }}></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
