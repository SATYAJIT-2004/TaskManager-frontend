import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import RecentTasks from "../../components/RecentTasks";
import CustomPiechart from "../../components/CustomPiechart";
import CustomBarchart from "../../components/CustomBarchart";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [dashboardData, setDashboardData] = useState(null);
  const [piechartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    console.log("data is: ", data);
    const taskDistributions = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevel || {};

    const taskDistributionData = [
      { status: "Pending", count: taskDistributions?.Pending || 0 },
      { status: "In Progress", count: taskDistributions?.InProgress || 0 },
      { status: "Completed", count: taskDistributions?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/tasks/dashboard-data");

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.log("Error fetching dashboard data: ", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="p-4 sm:p-6 space-y-6">

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 sm:p-6 shadow-lg text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Welcome! {currentUser?.name}
              </h2>

              <p className="text-blue-100 mt-1 text-sm sm:text-base">
                {moment().format("dddd Do MMMM YYYY")}
              </p>
            </div>

            <div className="w-full md:w-auto">
              <button
                className="w-full md:w-auto bg-white text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-md"
                onClick={() => navigate("/admin/create-task")}
              >
                Create New Task
              </button>
            </div>

          </div>
        </div>

        {/* Stats Cards */}
        {dashboardData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution?.All || 0}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <h3 className="text-gray-500 text-sm font-medium">
                Pending Tasks
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution?.Pending || 0}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-medium">
                In Progress Tasks
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution?.InProgress || 0}
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-medium">
                Completed Tasks
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution?.Completed || 0}
              </p>
            </div>

          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          <div className="bg-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Distribution
            </h3>

            <div className="h-56 sm:h-64">
              <CustomPiechart
                data={piechartData}
                label="Total Balance"
                colors={COLORS}
              />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Priority Levels
            </h3>

            <div className="h-56 sm:h-64">
              <CustomBarchart data={barChartData} />
            </div>
          </div>

        </div>

        {/* Recent Tasks */}
        <RecentTasks tasks={dashboardData?.recentTasks} />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;