export default function Architecture() {
  return (
    <div className="architecture">
      <div className="arch-node frontend">React Frontend</div>
      <span className="arch-arrow">→</span>
      <div className="arch-node inventory">
        Inventory
        <br />
        Management
      </div>
      <div className="services">
        <span>
          ↗ <b>Vendor Service</b>
        </span>
        <span>
          ↘ <b>Material Service</b>
        </span>
      </div>
    </div>
  );
}
