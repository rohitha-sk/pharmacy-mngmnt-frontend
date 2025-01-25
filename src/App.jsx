import { Route, Routes } from "react-router-dom";
import Login from "./components/login-&-registration/Login";
import Registration from "./components/login-&-registration/Registration";
import Dashboard from "./components/admin/dashboardContents/Dashboard";
import HomePage from "./components/customer/HomePage";
import RepDashboard from "./components/pharmacy-rep/RepDashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserManagement from "./components/admin/dashboardContents/user-management/UserManagement";
import DashboardHome from "./components/admin/dashboardContents/DashboardHome";
import Settings from "./components/admin/dashboardContents/Settings/Settings";
import StockManagement from "./components/admin/dashboardContents/stock-management/StockManagement";
import SearchComponent from "./components/admin/dashboardContents/stock-management/SearchComponent";
import ItemsReordering from "./components/admin/dashboardContents/reordering/ItemsReordering";


function App() {
    return (
        <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Login />} />

            <Route path="/admin" element={
               <ProtectedRoute>
               <Dashboard />
           </ProtectedRoute>
                }>
                {/* Default route inside dashboard */}
                <Route path="home" element={<DashboardHome />} /> {/* Default dashboard content */}
                <Route path="display_users" element={<UserManagement />} />
                <Route path="display_stock_items" element={<StockManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="test_search" element={<SearchComponent />} />

                <Route path="reorder_items" element={<ItemsReordering />} />
            </Route>

            
            <Route
                path="/customer-homepage"
                element={
                  <ProtectedRoute>
                        <HomePage /> 
                  </ProtectedRoute>
                }
            />
            <Route
                path="/rep-dashboard"
                element={
                  <ProtectedRoute>
                        <RepDashboard /> 
                  </ProtectedRoute>
                }
            />
         
        </Routes>
    );
}

export default App;
