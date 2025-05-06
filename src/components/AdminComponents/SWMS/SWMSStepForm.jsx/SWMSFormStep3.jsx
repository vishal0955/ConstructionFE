import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';

export default function SWMSFormStep3({onNext, onBack}) {
  const [expanded, setExpanded] = useState({
    'working-at-height': true,
    'fall-from-height': false,
    'electrical-shock': false,
    'struck-by-objects': false,
    'harmful-substances': false
  });

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 border-b flex items-center">
        <ArrowLeft className="mr-2" size={20} />
        <h1 className="text-lg font-medium">Risk Assessment</h1>
        <div className="ml-auto text-sm text-gray-500">Step 3 of 4</div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-6 max-w-4xl mx-auto">
        {/* Activity Section */}
        <div className="bg-white border rounded-md shadow-sm">
          <div className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                <span className="text-xs">1</span>
              </div>
              <h2 className="font-medium">Working at Height</h2>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs font-medium mr-2">MEDIUM</span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expanded['working-at-height'] ? 'transform rotate-180' : ''}`}
                onClick={() => toggleSection('working-at-height')}
              />
            </div>
          </div>

          {expanded['working-at-height'] && (
            <div className="p-4">
              {/* Risk Matrix */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Risk Matrix</h3>
                <div className="grid grid-cols-5 gap-1 text-center text-white text-xs">
                  <div className="p-2 bg-gray-400">Impact</div>
                  <div className="p-2 bg-green-500">Low</div>
                  <div className="p-2 bg-yellow-500">Medium</div>
                  <div className="p-2 bg-orange-500">High</div>
                  <div className="p-2 bg-red-500">Extreme</div>
                  
                  <div className="p-2 bg-gray-400">Rare</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  
                  <div className="p-2 bg-gray-400">Unlikely</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  
                  <div className="p-2 bg-gray-400">Possible</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500 border-2 border-blue-600">3 x 2</div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  
                  <div className="p-2 bg-gray-400">Likely</div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  <div className="p-2 bg-red-500"></div>
                </div>
              </div>

              {/* Add more content here */}
            </div>
          )}
        </div>

        {/* Hazard 1 - Fall from height */}
        <div className="bg-white border rounded-md shadow-sm">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-medium">Fall from height</h2>
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs font-medium mr-2">MEDIUM</span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expanded['fall-from-height'] ? 'transform rotate-180' : ''}`}
                onClick={() => toggleSection('fall-from-height')}
              />
            </div>
          </div>
          
          {expanded['fall-from-height'] && (
            <div className="p-4">
              {/* Control Measures */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Control Measures</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">All workers must wear appropriate safety harnesses and be properly trained in height safety protocols.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Control Verification</label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Implemented</option>
                    <option>Pending</option>
                    <option>Not Implemented</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hazard 2 - Electrical shock */}
        <div className="bg-white border rounded-md shadow-sm">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-medium">Electrical shock</h2>
            <div className="flex items-center">
              <span className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-xs font-medium mr-2">HIGH</span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expanded['electrical-shock'] ? 'transform rotate-180' : ''}`}
                onClick={() => toggleSection('electrical-shock')}
              />
            </div>
          </div>
          
          {expanded['electrical-shock'] && (
            <div className="p-4">
              {/* Content for electrical shock section */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Control Measures</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">Use insulated tools and equipment. Ensure all electrical equipment is tested and tagged.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Control Verification</label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Implemented</option>
                    <option>Pending</option>
                    <option>Not Implemented</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hazard 3 - Struck by falling objects */}
        <div className="bg-white border rounded-md shadow-sm">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-medium">Struck by falling objects</h2>
            <div className="flex items-center">
              <span className="bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-xs font-medium mr-2">HIGH</span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expanded['struck-by-objects'] ? 'transform rotate-180' : ''}`}
                onClick={() => toggleSection('struck-by-objects')}
              />
            </div>
          </div>
          
          {expanded['struck-by-objects'] && (
            <div className="p-4">
              {/* Content for struck by objects section */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Control Measures</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">Establish exclusion zones. All workers must wear hard hats in designated areas.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Control Verification</label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Implemented</option>
                    <option>Pending</option>
                    <option>Not Implemented</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hazard 4 - Exposure to harmful substances */}
        <div className="bg-white border rounded-md shadow-sm">
          <div className="border-b p-4 flex justify-between items-center">
            <h2 className="font-medium">Exposure to harmful substances</h2>
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs font-medium mr-2">MEDIUM</span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expanded['harmful-substances'] ? 'transform rotate-180' : ''}`}
                onClick={() => toggleSection('harmful-substances')}
              />
            </div>
          </div>
          
          {expanded['harmful-substances'] && (
            <div className="p-4">
              {/* Content for harmful substances section */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Control Measures</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">Use appropriate PPE. Ensure adequate ventilation in work areas.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Responsible Person</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Control Verification</label>
                  <select className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Implemented</option>
                    <option>Pending</option>
                    <option>Not Implemented</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with Review Summary button */}
      <div className="p-4 border-t d-flex justify-between items-center bg-white">
      <button
          onClick={onBack}
          className=" bg-blue-600 text-white py-3 rounded-md font-medium p-3"
        >
          Back
        </button>
        <button
          className=" bg-blue-600 text-white p-3 rounded font-medium"
          onClick={onNext}
        >
          Review Summary
        </button>
      </div>
    </div>
  );
}