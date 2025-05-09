// import React, { useState } from 'react';
// import { useLocation,Link } from 'react-router-dom';
// import { jsPDF } from "jspdf";
// const checklists = {
//   'Working at Heights': [
//     "Has a risk assessment been completed for the task?",
//     "Has the SWMS (Safe Work Method Statement) been reviewed?",
//     "Is the person trained and authorized to work at height?",
//     "Is the weather suitable for working at heights?",
//     "Ladder is in good condition (no damage, cracks, etc.)",
//     "Ladder is stable on a flat, non-slip surface",
//     "Ladder is secured to prevent movement",
//     "Three points of contact maintained while climbing",
//     "Scaffolding erected by a qualified person",
//     "Guardrails and toe boards are in place on scaffolding",
//     "Scaffolding inspected and tagged",
//     "EWP operator trained and licensed",
//     "EWP pre-start inspection completed",
//     "Harness used and attached to anchor point",
//     "Fall arrest systems in place and checked",
//     "Emergency rescue procedure available",
//     "No overhead hazards (e.g., power lines)",
//     "Tools/materials secured to prevent falls",
//     "Supervisor reviewed checklist",
//     "Toolbox talk completed",
//     "Permit to work obtained",
//     "Barricades and signage installed",
//     "Anchor points certified and rated",
//     "Edge protection installed where necessary",
//     "Helmet with chin strap worn",
//     "High-visibility clothing worn",
//     "Non-slip footwear used",
//     "Shock-absorbing lanyards inspected",
//     "Self-retracting lifelines (SRLs) checked",
//     "Rope grab and lifeline used and inspected"
//   ],

//   'Electrical Work': [
//     "Lockout/tagout procedures in place?",
//     "Insulated tools being used?",
//     "Circuit de-energized before work?",
//     "Voltage tested with proper equipment?",
//     "Electrical PPE (gloves, face shield) worn?",
//     "Work area dry and clear of water?",
//     "Qualified electrician present?",
//     "Proper signage and barriers in place?",
//     "Ground fault protection installed?",
//     "All cables properly rated and labeled?",
//     "Circuit breakers identified and accessible?",
//     "No exposed live wires?",
//     "Electrical panels closed and secured?",
//     "Emergency shut-off devices accessible?",
//     "Test equipment calibrated and functional?",
//     "Rubber insulating mats used?",
//     "Arc flash protection suit available?",
//     "Portable RCD tested and used?",
//     "Insulated ladder available?",
//     "Fire extinguisher rated for electrical fires present?"
//   ],

//   'Heavy Machinery Operation': [
//     "Operator certified and trained?",
//     "Daily machinery inspection done?",
//     "Emergency stop buttons functional?",
//     "Clear zone established around equipment?",
//     "Backup alarms working?",
//     "Seatbelts worn by operator?",
//     "Communication with spotter established?",
//     "Weather suitable for operation?",
//     "Load limits not exceeded?",
//     "Fuel and oil levels checked?",
//     "Machine secured when not in use?",
//     "Hydraulic lines checked for leaks?",
//     "Brakes and steering operational?",
//     "Fire extinguisher on board?",
//     "Maintenance records up to date?",
//     "Flashing beacons operational?",
//     "Mirrors and cameras clean and adjusted?",
//     "Operator manual available?",
//     "Wheel chocks used when needed?",
//     "Warning decals and signage intact?"
//   ],

//   'Confined Space Entry': [
//     "Entry permit issued?",
//     "Atmosphere tested for oxygen and gas?",
//     "Rescue plan in place?",
//     "Ventilation provided?",
//     "Attendant present outside entry?",
//     "Communication system available?",
//     "PPE including harness and lifeline used?",
//     "Training and authorization confirmed?",
//     "Entry point barriers installed?",
//     "Continuous atmospheric monitoring?",
//     "Confined space properly labeled?",
//     "Lifeline connected and functional?",
//     "First aid trained personnel available?",
//     "Tripod with winch available?",
//     "Explosion-proof lighting used?",
//     "Full body harness worn?",
//     "Gas detector calibrated and operational?",
//     "Breathing apparatus available if required?",
//     "Intrinsically safe tools used?",
//     "Spare oxygen cylinder available if needed?"
//   ],

//   'Excavation and Trenching': [
//     "Underground services located?",
//     "Shoring or trench box used?",
//     "Spoil piles kept away from edge?",
//     "Entry/exit ladders provided?",
//     "Daily inspection by competent person?",
//     "Water accumulation controlled?",
//     "Fall protection near edges?",
//     "Emergency plan established?",
//     "Excavation deeper than 1.5m has shoring?",
//     "Barricades and warning signs in place?",
//     "Access controlled to excavation site?",
//     "Equipment parked a safe distance away?",
//     "Trench shields inspected?",
//     "Steel caps and reflective vests worn?",
//     "Hand tools in good condition?",
//     "Hard hats worn near excavation?",
//     "Ladder extends 1m above trench edge?",
//     "Soil type assessed for stability?"
//   ],

//   'Manual Handling': [
//     "Load assessed before lifting?",
//     "Use of mechanical aids considered?",
//     "Proper lifting technique used?",
//     "Path cleared of obstacles?",
//     "Team lifting where needed?",
//     "Breaks taken during repetitive tasks?",
//     "Stretching or warm-up performed?",
//     "Heavy items stored at waist height?",
//     "Gloves used for grip and protection?",
//     "Manual handling training completed?",
//     "Trolleys or dollies in good condition?",
//     "Back support belt worn if required?",
//     "Non-slip footwear worn?"
//   ],

//   'Scaffolding Erection': [
//     "Erected by licensed scaffolder?",
//     "Platform fully planked?",
//     "Toe boards and guardrails installed?",
//     "Tagged and inspected before use?",
//     "Access ladders secure?",
//     "Weight limit signage visible?",
//     "Scaffold tied to structure if required?",
//     "Bracing installed and secure?",
//     "No gaps between planks?",
//     "Debris cleared from scaffold surface?",
//     "Inspections logged daily?",
//     "Harness used for mobile scaffold work?",
//     "Base plates and sole boards in place?",
//     "Scaffold level and plumb?"
//   ],

//   'Hot Work (Welding & Cutting)': [
//     "Hot work permit issued?",
//     "Fire extinguisher nearby?",
//     "Work area cleared of flammables?",
//     "Fire watch assigned?",
//     "PPE including gloves and helmet used?",
//     "Ventilation for fumes ensured?",
//     "Flash screen used for protection?",
//     "Combustible materials shielded or removed?",
//     "Gas cylinders properly secured?",
//     "Sparks and slag controlled?",
//     "30-minute fire watch after completion?",
//     "Welding apron and sleeves used?",
//     "Welding mask with proper shade used?",
//     "Hoses inspected for leaks?"
//   ],

//   'Demolition Work': [
//     "Demolition plan approved?",
//     "Utilities disconnected?",
//     "Barriers and signage in place?",
//     "Structural integrity assessed?",
//     "Dust suppression used?",
//     "Debris managed and cleared safely?",
//     "Personal protective equipment used?",
//     "Fall zones identified and marked?",
//     "Noise and vibration controls implemented?",
//     "Emergency response plan available?",
//     "Hard hats, gloves, goggles worn?",
//     "Demolition tools checked for integrity?",
//     "Dust masks or respirators used?",
//     "Fire extinguishers accessible?"
//   ]
// };



// const Template = () => {
//   const location = useLocation();
//   const { title } = location.state || {};
//   const [checkedItems, setCheckedItems] = useState({});

//   const checklistItems = checklists[title] || [];
//   const handleDownload = () => {
//     const doc = new jsPDF();
//     const lineHeight = 10;
//     let y = 20;
  
//     doc.setFontSize(16);
//     doc.text(`${title} Checklist`, 10, 10);
  
//     doc.setFontSize(12);
//     checklistItems.forEach((item, index) => {
//       const status = checkedItems[index] === 'yes' ? '✅' : 
//                      checkedItems[index] === 'no' ? '❌' : '⬜';
  
//       if (y > 280) {
//         doc.addPage();
//         y = 20;
//       }
  
//       doc.text(`${index + 1}. ${item} ${status}`, 10, y);
//       y += lineHeight;
//     });
  
//     doc.save(`${title}_Checklist.pdf`);
//   };
  
  
//   return (
//     <div className="container my-4">
//       {/* Button Container */}
//       <div className="d-flex justify-content-end mb-3">
//      <Link to="/swms">   <button className="btn btn-primary me-2" ><i class="fa-solid fa-arrow-left me-2"></i>Back</button></Link>
//         <button className="btn btn-success" onClick={handleDownload}>Download Checklist</button>
//       </div>

//       {/* Checklist Title */}
//       <h4 className="fw-bold mb-3">✅ {title} Checklist</h4>
//       {checklistItems.length > 0 ? (
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Checklist Item</th>
//               <th className="text-center">Yes</th>
//               <th className="text-center">No</th>
//             </tr>
//           </thead>
//           <tbody>
//             {checklistItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item}</td>
//                 <td className="text-center">
//                 <input
//   type="radio"
//   name={`check-${index}`}
//   value="yes"
//   checked={checkedItems[index] === 'yes'}
//   onChange={() => setCheckedItems(prev => ({ ...prev, [index]: 'yes' }))}
// />

//                 </td>
//                 <td className="text-center">
//                 <input
//   type="radio"
//   name={`check-${index}`}
//   value="no"
//   checked={checkedItems[index] === 'no'}
//   onChange={() => setCheckedItems(prev => ({ ...prev, [index]: 'no' }))}
// />

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No checklist found for this template.</p>
//       )}
//     </div>
//   );
// };

// export default Template;


import { useState } from 'react';
import { ChevronRight, AlertTriangle, Hammer, Users, HardHat, Box, Wrench } from 'lucide-react';

export default function Template() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Working at Heights",
      description: "Standard procedures for tasks involving ladders, scaffolding, or elevated platforms.",
      icon: "heights", 
      topHazards: [
        { name: "Fall from height", severity: "Critical", likelihood: "Possible" },
        { name: "Falling objects", severity: "High", likelihood: "Likely" }
      ],
      keyPPE: ["Hard Hat", "Fall Protection", "Safety Boots"]
    },
    {
      id: 2,
      title: "Electrical Work",
      description: "Precautions and procedures for safe handling of electrical systems and components.",
      icon: "electrical",
      topHazards: [
        { name: "Electric shock", severity: "Critical", likelihood: "Unlikely" },
        { name: "Burns", severity: "High", likelihood: "Possible" }
      ],
      keyPPE: ["Insulated Gloves", "Safety Glasses", "Safety Boots"]
    },
    {
      id: 3,
      title: "Heavy Machinery Operation",
      description: "Guidelines for operating excavators, bulldozers, and other heavy equipment safely.",
      icon: "machinery",
      topHazards: [
        { name: "Crushing", severity: "Critical", likelihood: "Unlikely" },
        { name: "Noise exposure", severity: "Medium", likelihood: "Certain" }
      ],
      keyPPE: ["Ear Protection", "High-Vis Vest", "Safety Boots"]
    },
    {
      id: 4,
      title: "Confined Space Entry",
      description: "Safety protocol for entering and working in restricted spaces with limited access.",
      icon: "confined",
      topHazards: [
        { name: "Oxygen deficiency", severity: "Critical", likelihood: "Possible" },
        { name: "Toxic atmosphere", severity: "Critical", likelihood: "Possible" }
      ],
      keyPPE: ["Respirator", "Safety Harness", "Gas Monitor"]
    },
    {
      id: 5,
      title: "Excavation and Trenching",
      description: "Hazard management and safe digging practices for foundation work and utilities.",
      icon: "excavation",
      topHazards: [
        { name: "Trench collapse", severity: "Critical", likelihood: "Unlikely" },
        { name: "Striking utilities", severity: "High", likelihood: "Possible" }
      ],
      keyPPE: ["Hard Hat", "High-Vis Vest", "Safety Boots"]
    },
    {
      id: 6,
      title: "Manual Handling",
      description: "Safe lifting techniques and risk assessment for moving materials on site.",
      icon: "manual",
      topHazards: [
        { name: "Back injury", severity: "High", likelihood: "Likely" },
        { name: "Hand injury", severity: "Medium", likelihood: "Possible" }
      ],
      keyPPE: ["Back Support", "Gloves", "Safety Boots"]
    }
  ]);

  const severityColors = {
    Low: "bg-green-100 text-green-800 border-green-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    High: "bg-orange-100 text-orange-800 border-orange-300",
    Critical: "bg-red-100 text-red-800 border-red-300"
  };

  const likelihoodColors = {
    Unlikely: "bg-gray-100 text-gray-800 border-gray-300",
    Possible: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Likely: "bg-orange-100 text-orange-800 border-orange-300",
    Certain: "bg-red-100 text-red-800 border-red-300"
  };

  const getIcon = (iconType) => {
    switch(iconType) {
      case "heights":
        return <HardHat size={24} className="text-blue-600" />;
      case "electrical":
        return <AlertTriangle size={24} className="text-yellow-600" />;
      case "machinery":
        return <Wrench size={24} className="text-gray-600" />;
      case "confined":
        return <Box size={24} className="text-red-600" />;
      case "excavation":
        return <Hammer size={24} className="text-orange-600" />;
      case "manual":
        return <Users size={24} className="text-green-600" />;
      default:
        return <AlertTriangle size={24} className="text-blue-600" />;
    }
  };

  const handleUseTemplate = (id) => {
    console.log(`Using template ${id}`);
    // Implementation for using the template
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-6">Pre-Populated Templates</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                {getIcon(template.icon)}
                <h3 className="ml-2 font-semibold ">{template.title}</h3>
              </div>
            </div>
            
            {/* Description */}
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-4">{template.description}</p>
              
              {/* Risk Assessment */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Key Hazards</h4>
                
                {template.topHazards.map((hazard, index) => (
                  <div key={index} className="mb-2 flex flex-wrap items-center">
                    <span className="text-sm mr-2 text-gray-700">{hazard.name}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[hazard.severity]}`}>
                        {hazard.severity}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${likelihoodColors[hazard.likelihood]}`}>
                        {hazard.likelihood}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* PPE Requirements */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Required PPE</h4>
                <div className="flex flex-wrap gap-1">
                  {template.keyPPE.map((item, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            {/* <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between">
              <button 
                onClick={() => handleUseTemplate(template.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                Use Template
                <ChevronRight size={16} className="ml-1" />
              </button>
              
              <button 
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Equipment
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
