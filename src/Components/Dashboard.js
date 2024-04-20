import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ROUTES, LOCAL_TOKEN_NAME } from '../apiConfig';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    const token = localStorage.getItem(LOCAL_TOKEN_NAME);
    
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.getDashboardData}${user.user.id}/`, { headers: { 'Authorization': `Bearer ${token}` } });
      setDashboardData(response.data);
      
    } catch (error) {
      toast.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {dashboardData ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Display total tasks and completed tasks overall */}
          <div className="flex flex-row items-center justify-center gap-10 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-lg font-semibold flex justify-center mb-2 w-full">Total Tasks</h2>
            <div className='w-64 h-64 flex justify-end w-full'>
            <CircularProgressbar value={dashboardData.completed_tasks_all / dashboardData.total_tasks_all * 100} text={`${dashboardData.completed_tasks_all} / ${dashboardData.total_tasks_all}`} />
          </div>
          </div>
         
          {/* Map over category task counts and display each category */}
          {Object.keys(dashboardData.category_task_counts).map((category, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
              <div className="flex flex-row items-center justify-center gap-10 bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg font-semibold flex justify-center mb-2 w-full">{category}</h2>
              <div className='w-64 h-64 flex justify-end w-full'>
              <CircularProgressbar value={dashboardData.category_task_counts[category].completed_tasks / dashboardData.category_task_counts[category].total_tasks * 100} text={`${dashboardData.category_task_counts[category].completed_tasks} / ${dashboardData.category_task_counts[category].total_tasks}`} />
            </div>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
