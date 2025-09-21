import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiShield, FiLogOut, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../components/shared/Button";
import { useSignoutMutation } from "../../redux/slices/authSlice";
import { logout } from "../../redux/features/authState";

const Profile = () => {
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout, { isLoading }] = useSignoutMutation();

  const handleLogout = async () => {
    try {
      await signout().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.username}</h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <FiShield className="w-3 h-3 mr-1" />
                    {user?.role}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleLogout}
                  loading={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FiUser className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-500">Full Name</span>
                        </div>
                        <p className="text-gray-900 font-medium">{user?.username}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FiMail className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-500">Email Address</span>
                        </div>
                        <p className="text-gray-900 font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Account Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FiShield className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-500">Account Type</span>
                        </div>
                        <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <FiUser className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-500">User ID</span>
                        </div>
                        <p className="text-gray-900 font-medium">#{user?.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Status</h4>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-green-800 font-medium">Account Active</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">Your account is in good standing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;