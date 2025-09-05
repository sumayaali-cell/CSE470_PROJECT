

import Registration from "./Pages/registration";
import Otp from "./Pages/otp";
import Login from "./Pages/login"; 

import { Route, Routes } from "react-router-dom";
import UserProvider from "./Context/UserContext";
import ProtectedRoute from "./Routes/protectedRoute";




import Unauthorized from "./Pages/Unauthorized";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostForm from "./Pages/post";
import ItemList from "./Pages/ItemList";
import Chat from "./Pages/chat";
import ChatList from "./Pages/ChatList";
import Address from "./Pages/Address";
import ReportList from "./Pages/ReportList";
import ItemDetails from "./Pages/ItemDetails";
import Verification from "./Pages/Verification";
import Footer from "./Pages/Footer";
import Donated from "./Pages/Donated";
import Resolved from "./Pages/Resolved";
import MyItems from "./Pages/MyItems";
import Notifications from "./Pages/Notifications";
import UserResolvedCases from "./Pages/UserResolvedCases";








function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        
        <Route path="/registration" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home/>}/>
        
           <Route
          path="/post"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <PostForm/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/item-list"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <ItemList/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/text/:id"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Chat/>
            </ProtectedRoute>
          }
        />


          <Route
          path="/chat"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <ChatList/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/location/:id"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Address/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute role={["admin"]}>
              <ReportList/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/details/:id"
          element={
            <ProtectedRoute role={["admin"]}>
              <ItemDetails/>
            </ProtectedRoute>
          }
        />


         <Route
          path="/verification"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Verification/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/donated"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Donated/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/resolved"
          element={
            <ProtectedRoute role={["admin"]}>
              <Resolved/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-items"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <MyItems/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/notification"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <Notifications/>
            </ProtectedRoute>
          }
        />
        

        <Route
          path="/my-cases"
          element={
            <ProtectedRoute role={["admin","user"]}>
              <UserResolvedCases/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </UserProvider>
    
  );
}

export default App;
