import { useState } from 'react';
import { ChevronDown, ChevronUp, HardHat, Shield, FileText, Clipboard, UserCheck, Building2 } from 'lucide-react';

export default function SWMSFormStep4({ onNext, onBack }) {
  const [expandedSections, setExpandedSections] = useState({
    'project-details': true,
    'required-ppe': false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Header with rating */}
      <header className=" p-4 flex justify-between items-center border-b">
        <h1 className="text-lg font-medium">Risk Assessment</h1>
        <div className="flex items-center justify-center mt-1">
       
          <span className="text-xs text-gray-500 ml-2">Step 4 of 4</span>
          
        </div>
        <div className="flex items-center mt-1">

<button className="btn btn-primary px-4 py-2 rounded-md mr-2">download PDF</button>

<button className="btn btn-primary px-4 py-2 rounded-md">
share via Email </button>
 
 </div>

       
      </header>

      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Project Details Section */}
          <div className="bg-white border-b">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection('project-details')}
            >
              <h2 className="font-medium">Project Details</h2>
              {expandedSections['project-details'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections['project-details'] && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500">Project Name</label>
                  <p className="font-medium">Westfield Commercial Tower</p>
                </div>
                
                <div className="flex space-x-8">
                  <div>
                    <label className="block text-xs text-gray-500">Site Address</label>
                    <p>250 Collins St, Melbourne</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Date</label>
                    <p>April 14, 2023</p>
                  </div>
                </div>
                
                <div className="flex space-x-8">
                  <div>
                    <label className="block text-xs text-gray-500">Supervisor</label>
                    <p>Michael Thompson</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Project ID</label>
                    <p>WCT-2023-5414</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500">Scope of Works</label>
                  <p>Electrical system upgrade for floors 15-20 of commercial office building.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Tasks & Hazards Sections */}
          <div className="bg-white border-b">
            <div className="p-4">
              <h2 className="font-medium mb-4">Tasks & Hazards</h2>
              
              {/* Task 1 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Electrical Panel Installation</h3>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-medium">High Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Replacing existing distribution boards and circuits</p>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Electrical shock</li>
                    <li>Fall from height</li>
                  </ul>
                </div>
              </div>
              
              {/* Task 2 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Cable Routing</h3>
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs font-medium">Medium Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Running new cables through ceiling</p>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Working in confined spaces</li>
                    <li>Manual handling injuries</li>
                  </ul>
                </div>
              </div>
              
              {/* Task 3 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Testing & Commissioning</h3>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-medium">High Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Final testing of installed systems</p>
                
                <div>
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Electrical shock</li>
                    <li>Arc flash</li>
                    <li>Equipment damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Required PPE Section */}
          <div className="bg-white">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection('required-ppe')}
            >
              <h2 className="font-medium">Required PPE</h2>
              {expandedSections['required-ppe'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections['required-ppe'] && (
              <div className="p-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <HardHat size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Hard Hat<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <Shield size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Safety Glasses<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Insulated Gloves<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <Clipboard size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">Safety Boots<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <UserCheck size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">Dust Mask<br />(As Required)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <Building2 size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">High Vis<br />(Mandatory)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with navigation buttons */}
      <div className="flex border-t bg-white p-4">
        <button className="flex-1 py-3 border border-gray-300 rounded mr-2 font-medium" onClick={onBack}>
          Back
        </button>
        <button className="flex-1 btn btn-primary py-3 rounded font-medium">
          Submit SWMS
        </button>
      </div>
    </div>
  );
}