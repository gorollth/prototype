// // File: /lib/i18n/i18n.ts
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: {
//         // Carpool page
//         carpool: "Carpool",
//         availableRides: "Available Rides",
//         myRides: "My Rides",
//         // Ride details
//         from: "From",
//         to: "To",
//         price: "Price",
//         seats: "Seats",
//         vehicleType: "Vehicle Type",
//         description: "Description",
//         rating: "Rating",
//         bookRide: "Book Ride",
//       },
//     },
//     th: {
//       translation: {
//         // Carpool page
//         carpool: "แชร์การเดินทาง",
//         availableRides: "การเดินทางที่มี",
//         myRides: "การเดินทางของฉัน",
//         // Ride details
//         from: "จาก",
//         to: "ถึง",
//         price: "ราคา",
//         seats: "ที่นั่ง",
//         vehicleType: "ประเภทรถ",
//         description: "รายละเอียด",
//         rating: "คะแนน",
//         bookRide: "จองการเดินทาง",
//       },
//     },
//   },
//   lng: "en", // Default language
//   fallbackLng: "en",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;

// // File: /components/LanguageSwitcher.tsx
// import React from "react";
// import { useTranslation } from "react-i18next";

// export const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const toggleLanguage = () => {
//     const newLang = i18n.language === "en" ? "th" : "en";
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <button
//       onClick={toggleLanguage}
//       className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
//     >
//       {i18n.language === "en" ? "ไทย" : "English"}
//     </button>
//   );
// };

// // File: /app/carpool/page.tsx
// ("use client");

// import { RideCard } from "@/components/RideCard";
// import { RideDetails } from "@/components/RideDetails";
// import { LanguageSwitcher } from "@/components/LanguageSwitcher";
// import { useState } from "react";
// import { MessageSquare } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import type { Ride } from "../../lib/types/ride";
// import "../i18n/i18n"; // Import the i18n configuration

// // ... (previous imports and sample data remain the same)

// export default function CarpoolPage() {
//   const [activeTab, setActiveTab] = useState<"available" | "my-rides">(
//     "available"
//   );
//   const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
//   const { t } = useTranslation();

//   const navigateToChats = () => {
//     window.location.href = "/chats";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20 text-gray-600">
//       <div className="bg-white p-4 shadow-sm">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-semibold text-gray-600">
//             {t("carpool")}
//           </h1>
//           <div className="flex items-center gap-4">
//             <LanguageSwitcher />
//             <button
//               onClick={navigateToChats}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <MessageSquare className="w-6 h-6 text-gray-600" />
//             </button>
//           </div>
//         </div>
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={() => setActiveTab("available")}
//             className={`px-4 py-2 rounded-full text-sm ${
//               activeTab === "available"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-600"
//             }`}
//           >
//             {t("availableRides")}
//           </button>
//           <button
//             onClick={() => setActiveTab("my-rides")}
//             className={`px-4 py-2 rounded-full text-sm ${
//               activeTab === "my-rides"
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-600"
//             }`}
//           >
//             {t("myRides")}
//           </button>
//         </div>
//       </div>

//       {/* Rest of the component remains the same, but use t() for translations */}
//     </div>
//   );
// }
