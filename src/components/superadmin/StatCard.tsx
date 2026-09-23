interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({ label, value, change, positive, icon, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ background: color + '1a', color }}>
        {icon}
      </div>
      <div className="stat-card-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {change && (
          <p className={`stat-change ${positive ? 'positive' : 'negative'}`}>
            {positive ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
}
