// SWMSAnalyticsSection.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#0088FE','#caba2d'];

const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow p-4 md:w-1/5 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className="text-2xl font-bold text-blue-800">{value}</h2>
  </div>
);


const stats = [
  {
    title: 'Total SWMS',
    number: 42,
    subtitle: 'Total number of SWMS created',
    color: 'blue',
  },
  {
    title: 'Average Hazards/SWMS',
    number: 3.7,
    subtitle: 'Average number of hazards per SWMS',
    color: 'green',
  },
  {
    title: 'Pending SWMS',
    number: 12,
    subtitle: 'SWMS pending review',
    color: 'yellow',
  },  
  {
    title: 'Approved SWMS',
    number: 15,
    subtitle: 'SWMS approved and active',
    color: 'purple',
  },
  {
    title: 'Total Hazards',
    number: 150,
    subtitle: 'Total hazards identified in all SWMS',
    color: 'red',
  },
  {
    title: 'High-Risk Hazards',
    number: 25,
    subtitle: 'High-risk hazards identified in SWMS',
    color: 'orange',
  },
]

const SWMSAnalyticsSection = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Fetch analytics data from your backend
    fetch('/api/swms/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Mock analytics data
    const mockData = {
      totalSwms: 42,
      averageHazardsPerSwms: 3.7,
      statusBreakdown: {
        Pending: 12,
        Submitted: 15,
        Approved: 15,
      },
      complianceStatus: {
        Compliant: 25,
        NonCompliant: 10,
        UnderReview: 7,
      },
      commonHighRiskItems: [
        'Working at Heights',
        'Electrical Work',
        'Confined Spaces',
        'Asbestos Exposure',
        'Heavy Machinery'
      ]
    };
  
    // Simulate API delay
    setTimeout(() => {
      setAnalytics(mockData);
    }, 500);
  }, []);
  

  if (!analytics) return <div className="p-4">Loading analytics...</div>;

  const barData = Object.entries(analytics.statusBreakdown).map(([status, count]) => ({
    status,
    count
  }));

  const pieData = Object.entries(analytics.complianceStatus).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <section className="  rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4 ">SWMS Analytics Overview</h2>


<div className="row g-3 mb-4">
      <div className="col-md-3" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[0]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[0]}`}
                >
                 {analytics.totalSwms}
                </div>
                <div>
                  <div className="stats-title h6 mb-1">
                  Total SWMS
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {stat.subtitle} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[1]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[1]}`}
                >
                 {analytics.averageHazardsPerSwms.toFixed(1)}
                </div>
                <div>
                  <div className="stats-title h6 mb-1">
                  average Hazards Per Swms
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {stat.subtitle} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[3]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[3]}`}
                >
                 {analytics.statusBreakdown.Approved}
                </div>
                <div>
                  <div className="stats-title h6 mb-1">
                  Approved
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {stat.subtitle} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3" >
            <div
              className={`stats-card p-4 shadow-lg border-start border-4 border-${color[2]} rounded-3  h-100 transition-all hover:shadow-xl`}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className={`stats-number h2 mb-0 fw-bold text-${color[2]}`}
                >
                 {analytics.statusBreakdown.Pending}
                </div>
                <div>
                  <div className="stats-title h6 mb-1">
                  Pending 
                  </div>
                  <div className="stats-subtitle small text-gray-600">
                    {/* {stat.subtitle} */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          
</div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-8 mx-auto">
        {/* <StatCard label="Total SWMS" value={analytics.totalSwms} />
        <StatCard label="Avg Hazards/SWMS" value={analytics.averageHazardsPerSwms.toFixed(1)} />
        <StatCard label="Pending SWMS" value={analytics.statusBreakdown.Pending || 0} />
        <StatCard label="Approved SWMS" value={analytics.statusBreakdown.Approved || 0} /> */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className=" p-4 rounded-xl shadow">
          <h3 className="text-md font-medium mb-2">SWMS by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className=" p-4 rounded-xl shadow">
          <h3 className="text-md font-medium mb-2">Compliance Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Common High-Risk Hazards */}
      <div className="stats-card mt-8 p-4 rounded-xl shadow">
        <h3 className="text-md font-medium mb-3">Most Common High-Risk Hazards</h3>
        <ul className="list-disc pl-5 ">
          {analytics.commonHighRiskItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SWMSAnalyticsSection;
