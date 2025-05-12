import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";

const StatCard = ({ colorClass, title, value, changeText, icon }) => {
    return (
      <div className={`card p-3 ${colorClass}`} style={{ width: '10rem',height: '12rem' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h2 className="fw-bold">{value}</h2>
            <p className="text-muted small mb-0">{changeText}</p>
          </div>
          <div className="fs-2">{icon}</div>
        </div>
      </div>
    );
  };

const tradeData = [
  { name: "Electrical", value: 30 },
  { name: "Plumbing", value: 25 },
  { name: "Civil", value: 40 },
];

const locationData = [
  { name: "Block A", value: 20 },
  { name: "Block B", value: 35 },
  { name: "Block C", value: 15 },
];

const trendData = [
  { week: "Week 1", defects: 12 },
  { week: "Week 2", defects: 18 },
  { week: "Week 3", defects: 10 },
  { week: "Week 4", defects: 15 },
];

const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const DefectsDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Analytics Cards */}
      {/* <div className="flex flex-wrap gap-2">
        <StatsCard title="Total Defects" value="120" icon="🧱" changeText="vs last month: 102 ↑" color="bg-blue-50" />
        <StatsCard title="Open Defects" value="48" icon="🚧" changeText="vs last month: 55 ↓" color="bg-yellow-50" />
        <StatsCard title="Resolved This Week" value="18" icon="✅" changeText="vs last week: 14 ↑" color="bg-green-50" />
        <StatsCard title="Avg. Time to Close" value="3.8 days" icon="⏱️" changeText="vs last month: 4.1 ↓" color="bg-teal-50" />
        <StatsCard title="Overdue Defects" value="9" icon="⚠️" changeText="vs last month: 5 ↑" color="bg-red-50" />
      </div> */}

{/* <div className="d-flex flex-wrap gap-3">
      <StatCard
        colorClass="bg-light"
        title="Total Defects"
        value="120"
        changeText="vs last month: 102 ↑"
        icon="📦"
      />
      <StatCard
        colorClass="bg-warning-subtle"
        title="Open Defects"
        value="48"
        changeText="vs last month: 55 ↓"
        icon="🚧"
      />
      <StatCard
        colorClass="bg-success-subtle"
        title="Resolved This Week"
        value="18"
        changeText="vs last week: 14 ↑"
        icon="✅"
      />
      <StatCard
        colorClass="bg-info-subtle"
        title="Avg. Time to Close"
        value="3.8 days"
        changeText="vs last month: 4.1 ↓"
        icon="⏱️"
      />
      <StatCard
        colorClass="bg-danger-subtle"
        title="Overdue Defects"
        value="9"
        changeText="vs last month: 5 ↑"
        icon="⚠️"
      />
    </div> */}


    
    <div className="d-flex gap-4">
      <div className="col-md-2" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[0]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[0]}`}
                >
                120
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                  Total Defects
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {analyticsData.totalReports}{analyticsData.averageResolutionDays} */}
                    vs last month: 102 ↑
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[1]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[1]}`}
                >
               55
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                  Open Defects
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {analyticsData.totalReports}{analyticsData.averageResolutionDays} */}
                    vs last month: 55% ↓
                  
               
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-2" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[2]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[2]}`}
                >
            18
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                  Resolved This Week
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {analyticsData.totalReports}{analyticsData.averageResolutionDays} */}
                    vs last week: 14 ↑
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[2]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[2]}`}
                >
           3.8 days
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                  Avg. Time to Close
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {analyticsData.totalReports}{analyticsData.averageResolutionDays} */}
                    vs last month: 4.1 ↓
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[2]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[2]}`}
                >
           9
                </div>
                <div>
                  <div className="stats-title h6 mb-1 text-gray-800">
                  Overdue Defects
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {analyticsData.totalReports}{analyticsData.averageResolutionDays} */}
                    vs last month: 5 ↑
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart by Trade */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Breakdown by Trade</h3>
          <PieChart width={300} height={250}>
            <Pie data={tradeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {tradeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Pie Chart by Location */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Breakdown by Location</h3>
          <PieChart width={300} height={250}>
            <Pie data={locationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
              {locationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Trendline Chart */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Defect Trend Over Time</h3>
          <LineChart width={600} height={250} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="defects" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DefectsDashboard;