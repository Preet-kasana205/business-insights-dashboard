function SummaryCard({ label, value }) {
  return (
    <div className="summary-card">
      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
    </div>
  );
}

export default SummaryCard;