// SWMSAnalyticsSection.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#0088FE'];

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow p-4 md:w-1/5 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className="text-2xl font-bold text-blue-800">{value}</h2>
  </div>
);

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
    <section className=" bg-gray-50 rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">SWMS Analytics Overview</h2>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-8 mx-auto">
        <StatCard label="Total SWMS" value={analytics.totalSwms} />
        <StatCard label="Avg Hazards/SWMS" value={analytics.averageHazardsPerSwms.toFixed(1)} />
        <StatCard label="Pending SWMS" value={analytics.statusBreakdown.Pending || 0} />
        <StatCard label="Approved SWMS" value={analytics.statusBreakdown.Approved || 0} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
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
        <div className="bg-white p-4 rounded-xl shadow">
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
      <div className="bg-white mt-8 p-4 rounded-xl shadow">
        <h3 className="text-md font-medium mb-3">Most Common High-Risk Hazards</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {analytics.commonHighRiskItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SWMSAnalyticsSection;
