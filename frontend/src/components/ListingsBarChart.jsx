import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function shortenLabel(value) {
  if (typeof value !== "string") return value;
  return value.length > 14 ? value.slice(0, 12) + "…" : value;
}

function ListingsBarChart({ title, data, dataKey, color }) {
  const hasData = data && data.length > 0;

  return (
    <div className="chart-card">
      <h2>{title}</h2>
      {hasData ? (
        <div className="chart-body">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={dataKey}
                tickFormatter={shortenLabel}
                angle={-30}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="empty-state">No data available</p>
      )}
    </div>
  );
}

export default ListingsBarChart;