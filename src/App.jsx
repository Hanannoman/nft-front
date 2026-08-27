// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import CreateAccount from "./pages/CreateAccount/CreateAccount";
// import Marketplace from "./Pages/Marketplace/Marketplace";
// import Profile from "./Pages/Profile/Profile";
// import Help from "./Pages/Help/Help";
// import CreateNft from "./Pages/CreateNft/CreateNft";
// import EditNftModal from "./Pages/EditNftModal/EditNftModal";
// import ShowNftInfo from "./Pages/ShowNftInfo/ShowNftInfo";
// import Transactions from "./Pages/Transactions/Transactions";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/create-account" element={<CreateAccount />} />
//         <Route path="/marketplace" element={<Marketplace />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/createNft" element={<CreateNft />} />
//         <Route path="/help" element={<Help />} />
//         <Route path="/edit-nft/:id" element={<EditNftModal />} />
//         <Route path="/show-nft-info/:id" element={<ShowNftInfo />} />
//         <Route path="/transactions" element={<Transactions/>} />
//     </Routes>
//     <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       theme="dark" />
//     </>
//   );
// }
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Marketplace from "./Pages/Marketplace/Marketplace";
import Profile from "./Pages/Profile/Profile";
import Help from "./Pages/Help/Help";
import CreateNft from "./Pages/CreateNft/CreateNft";
import EditNftModal from "./Pages/EditNftModal/EditNftModal";
import ShowNftInfo from "./Pages/ShowNftInfo/ShowNftInfo";
import Transactions from "./Pages/Transactions/Transactions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 1. استدعاء مكون المساعد الذكي (التشات بوت)
import ChatBot from './Components/ChatBot'; 

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createNft" element={<CreateNft />} />
        <Route path="/help" element={<Help />} />
        <Route path="/edit-nft/:id" element={<EditNftModal />} />
        <Route path="/show-nft-info/:id" element={<ShowNftInfo />} />
        <Route path="/transactions" element={<Transactions/>} />
      </Routes>

      {/* 2. إضافة المساعد الذكي ليكون متاحاً في كل صفحات المنصة */}
      <ChatBot />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark" />
    </>
  );
}