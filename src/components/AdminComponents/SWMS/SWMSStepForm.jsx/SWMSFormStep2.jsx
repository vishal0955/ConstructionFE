// import { useState } from 'react';
// import { ChevronDown, PlusCircle, AlertCircle } from 'lucide-react';

// export default function SWMSFormStep2({onNext, onBack}) {
//   const [workActivity, setWorkActivity] = useState('Scaffolding');
//   const [hazards, setHazards] = useState([
//     { id: 1, name: "Fall from height", selected: true },
//     { id: 2, name: "Electrical shock", selected: true },
//     { id: 3, name: "Struck by falling objects", selected: true },
//     { id: 4, name: "Exposure to harmful substances", selected: true }
//   ]);

//   const handleActivityChange = (activity) => {
//     setWorkActivity(activity);
//   };

//   const toggleHazard = (id) => {
//     setHazards(hazards.map(hazard => 
//       hazard.id === id ? { ...hazard, selected: !hazard.selected } : hazard
//     ));
//   };

//   const addNewHazard = () => {
//     // Logic to add a new hazard would go here
//     console.log("Add new hazard clicked");
//   };

//   const handleNext = () => {
//     console.log("Moving to step 3");
//     // Logic to proceed to next step would go here
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="p-4 border-b">
//         <h1 className="text-lg font-medium">Task & Hazards</h1>
//         <div className="mt-1 text-sm text-gray-500">Step 2 of 4</div>
//       </header>

//       <div className="flex-1 overflow-auto p-4 space-y-6">
//         {/* Work Activity Section */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Work Activity</label>
//           <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
          
//           <div className="relative">
//             <div className="flex items-center justify-between p-3 border rounded-md bg-white">
//               <div className="flex items-center">
//                 <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
//                   <AlertCircle size={16} color="white" />
//                 </div>
//                 <span>{workActivity}</span>
//                 {workActivity === 'Scaffolding' && 
//                   <span className="ml-1 text-blue-600">@ Height</span>
//                 }
//               </div>
//               <ChevronDown size={20} />
//             </div>
//           </div>
//         </div>

//         {/* Hazard Identification Section */}
//         <div>
//           <h2 className="text-base font-medium mb-3">Hazard Identification</h2>
          
//           <div className="space-y-2">
//             {hazards.map(hazard => (
//               <div 
//                 key={hazard.id}
//                 className="flex items-center justify-between p-3 bg-white border rounded-md"
//                 onClick={() => toggleHazard(hazard.id)}
//               >
//                 <span>{hazard.name}</span>
//                 <div 
//                   className={`w-6 h-6 border rounded ${
//                     hazard.selected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
//                   }`}
//                 >
//                   {hazard.selected && (
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
//                       <polyline points="20 6 9 17 4 12"></polyline>
//                     </svg>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {/* Add New Hazard Button */}
//             <button 
//               onClick={addNewHazard}
//               className="flex items-center justify-center w-full p-3 border border-blue-500 rounded-md text-blue-500"
//             >
//               <PlusCircle size={20} className="mr-2" />
//               Add New Hazard
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer with Next button */}
//       <div className=" d-flex p-4 border-t mt-auto gap-2">
//       <button
//           onClick={onBack}
//           className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { ChevronDown, PlusCircle, AlertCircle } from 'lucide-react';
import { Modal, Button, Form } from "react-bootstrap";
import HazardForm from './HazardForm';

export default function SWMSFormStep2({ onNext, onBack }) {
  const activityOptions = [
    "Scaffolding",
    "Welding",
    "Painting",
    "Electrical",
    "Plumbing"
  ];

  const [selectedActivities, setSelectedActivities] = useState(["Scaffolding"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const [hazards, setHazards] = useState([
    { id: 1, name: "Fall from height", selected: true },
    { id: 2, name: "Electrical shock", selected: true },
    { id: 3, name: "Struck by falling objects", selected: true },
    { id: 4, name: "Exposure to harmful substances", selected: true }
  ]);

  const [showHazardModal, setShowHazardModal] = useState(false);

  const addNewHazard = () => {
    setShowHazardModal(true);
  };

  const closeHazardModal = () => {
    setShowHazardModal(false);
  };

  const toggleHazard = (id) => {
    setHazards(hazards.map(hazard =>
      hazard.id === id ? { ...hazard, selected: !hazard.selected } : hazard
    ));
  };

 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-lg font-medium">Task & Hazards</h1>
        <div className="mt-1 text-sm text-gray-500">Step 2 of 4</div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Work Activity Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Work Activity</label>
          <p className="text-xs text-gray-500 mb-2">Select all that apply</p>

          <div className="relative">
            <div
              className="flex items-center justify-between p-3 border rounded-md bg-white cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center flex-wrap gap-1">
                {selectedActivities.length === 0 ? (
                  <span className="text-gray-400">Select activities</span>
                ) : (
                  selectedActivities.map((activity) => (
                    <div key={activity} className="flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {activity}
                      {/* {activity === "Scaffolding" && <span className="ml-1 text-blue-600">@ Height</span>} */}
                    </div>
                  ))
                )}
              </div>
              <ChevronDown size={20} />
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full border bg-white shadow-md rounded-md max-h-60 overflow-y-auto">
                {activityOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(option)}
                      onChange={() => toggleActivity(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hazard Identification Section */}
        <div>
          <h2 className="text-base font-medium mb-3">Hazard Identification</h2>

          <div className="space-y-2">
            {hazards.map(hazard => (
              <div
                key={hazard.id}
                className="flex items-center justify-between p-3 bg-white border rounded-md cursor-pointer"
                onClick={() => toggleHazard(hazard.id)}
              >
                <span>{hazard.name}</span>
                <div
                  className={`w-6 h-6 border rounded ${
                    hazard.selected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
                  }`}
                >
                  {hazard.selected && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Hazard Button */}
            <button
              onClick={addNewHazard}
              className="flex items-center justify-center w-full p-3 border border-blue-500 rounded-md text-blue-500"
            >
              <PlusCircle size={20} className="mr-2" />
              Add New Hazard
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex p-4 border-t mt-auto gap-2">
        <button
          onClick={onBack}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
        >
          Next
        </button>
      </div>

      {showHazardModal && (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        //   <div className="relative">
        //     <button
        //       onClick={closeHazardModal}
        //       className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
        //       aria-label="Close"
        //     >
        //       &times;
        //     </button>
        //     <HazardForm />
        //   </div>
        // </div>
        <Modal show={showHazardModal} onHide={closeHazardModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Hazard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HazardForm />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
