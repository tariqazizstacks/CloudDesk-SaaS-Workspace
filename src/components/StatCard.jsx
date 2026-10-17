import { TrendingUp } from "lucide-react";

function StatCard({ title, value, change, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon size={21} />
      </div>

      <p className="stat-title">{title}</p>
      <h2>{value}</h2>

      <div className="stat-change">
        <TrendingUp size={15} />
        <span>{change}</span>
        <span className="stat-period">vs last month</span>
      </div>
    </div>
  );
}

export default StatCard;