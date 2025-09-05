import React, { useContext, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaMapMarkerAlt, FaClipboardList, FaUsers, FaSmile } from "react-icons/fa";
import { UserContext } from "@/Context/UserContext";
import { useNavigate,Link } from "react-router-dom";
import { getItemByname } from "@/Api/postApi";

const Home = () => {
  const { role } = useContext(UserContext);
  const [search,setSearch] = useState('');
  const [searchResults,setSearchResults] = useState([])
  const navigate = useNavigate();
  const isRoleValid = role && role !== "null" && role !== "invalid";
  const handleNavigate = () =>{
    navigate('/post')
  }

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  const handleSearch = async()=>{
    try{
      const response = await getItemByname(search)
      setSearchResults(response.data.data)
      console.log(response.data.data)
    }catch(error){
      console.log(error)
    }
    
  }
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center px-4 py-8">
      {/* Top Badge */}
      <div className="mb-6">
        <span className="px-4 py-1 text-sm font-medium border rounded-full shadow flex">
          <FcSearch className="mr-2 mt-1" />
          Smart Community Platform
        </span>
      </div>

      {/* Headings */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-6xl font-extrabold">Lost Something?</h1>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-600">
          Find It Here!
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg sm:text-xl">
          Connect with your community to reunite lost items with their owners.
          Secure, smart, and always helpful!
        </p>
      </div>

      {/* Conditional Section */}
      {isRoleValid ? (
        <>
          {/* Search Bar */}
          <div className="mt-8 flex w-full max-w-2xl relative">
  <input
    type="text"
    placeholder="Search for found items..."
    className="flex-1 px-4 py-3 border rounded-l-lg outline-none"
    onChange={handleChange}
    value={search}
  />
  <button
    onClick={handleSearch}
    className="px-6 bg-black text-white font-semibold rounded-r-lg hover:bg-blue-700"
  >
    Search Items
  </button>

  {/* Dropdown */}
  {searchResults.length > 0 && (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-50">
      {searchResults.map(item => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          
        >
          <Link to={`/text/${item.user}`}>{item.itemName} - {item.category}<img
              src={`http://localhost:8000/${item.imageUrl}`}
              alt={item.itemName}
              className="w-full h-full object-cover  shadow-lg border border-zinc-700"
            /></Link>
        </div>
      ))}
    </div>
  )}
</div>

          

          
          <div className="mt-6 flex gap-4">
            <button onClick={handleNavigate} className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-blue-600">
              <FaMapMarkerAlt /> Report Lost Item
            </button>
            <button onClick={handleNavigate} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300">
              Report Found Item
            </button>
          </div>
        </>
      ) : (
        <>
          {/* About Us Section */}
          <div className="mt-12 max-w-3xl text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
            <p className="text-gray-600 text-lg">
              We are a community-driven platform helping people find lost items.
              Our mission is to make the process easy, secure, and reliable.
            </p>
          </div>

          {/* Working Process Section */}
          <div className="mt-10 max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-xl shadow-lg bg-blue-50 hover:scale-105 transition-transform duration-300 text-center">
              <FaClipboardList className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Report Item</h3>
              <p className="text-gray-600">
                Submit details of lost or found items easily through our platform.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6 rounded-xl shadow-lg bg-green-50 hover:scale-105 transition-transform duration-300 text-center">
              <FaUsers className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Search</h3>
              <p className="text-gray-600">
                Connect with nearby community members to help locate your items.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6 rounded-xl shadow-lg bg-yellow-50 hover:scale-105 transition-transform duration-300 text-center">
              <FaSmile className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reunite Items</h3>
              <p className="text-gray-600">
                Successfully reunite lost items with their owners quickly and safely.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full text-center">
        <div className="p-6 border rounded-xl shadow">
          <h2 className="text-3xl font-bold text-black">2,500+</h2>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="p-6 border rounded-xl shadow">
          <h2 className="text-3xl font-bold text-black">1,200+</h2>
          <p className="text-gray-600">Items Found</p>
        </div>
        <div className="p-6 border rounded-xl shadow">
          <h2 className="text-3xl font-bold text-black">85%</h2>
          <p className="text-gray-600">Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
