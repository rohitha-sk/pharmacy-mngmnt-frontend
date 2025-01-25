import React from 'react';
import Card from '../dashboardContents/Card';
import OutofStock from './OutofStock';
import TotalSale from './TotalSale';
import Orders from './Orders';
import Users from './Users';
import BarChart from './BarChart';
import PieChart from './PieChart';

function DashboardHome() {
  return (
    <div className="grid gap-4 p-4">
      {/* First Row: 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: 'lightblue' }}>
          <Orders />
        </Card>
        <Card style={{ backgroundColor: 'lightgreen' }}>
          <TotalSale />
        </Card>
        <Card style={{ backgroundColor: 'lightpink' }}>
          <OutofStock />
        </Card>
        <Card style={{ backgroundColor: '#F0E68C' }}>
          <Users />
        </Card>
      </div>

      {/* Second Row: Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <BarChart />
        </Card>
        <Card>
          <PieChart />
        </Card>
      </div>
    </div>
  );
}

export default DashboardHome;
