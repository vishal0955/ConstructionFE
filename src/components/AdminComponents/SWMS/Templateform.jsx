// 


import { useState } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConstructionHazardForm() {
  const [formData, setFormData] = useState({
    workActivity: '',
    hazards: [
      {
        description: '',
        severityLevel: 'Medium',
        likelihood: 'Possible',
        controlmeasures: '',
        responsiblePerson: '',
        implementationDate: '',
        status: 'Pending',

      }
    ],
    ppe: {
      hardHat: { selected: false, mandatory: false },
      safetyBoots: { selected: false, mandatory: false },
      highVisVest: { selected: false, mandatory: false },
      safetyGlasses: { selected: false, mandatory: false },
      earProtection: { selected: false, mandatory: false },
      respirator: { selected: false, mandatory: false },
      gloves: { selected: false, mandatory: false },
      fallProtection: { selected: false, mandatory: false }
    }
  });

  const handleWorkActivityChange = (e) => {
    setFormData({
      ...formData,
      workActivity: e.target.value
    });
  };

  const handleHazardChange = (index, field, value) => {
    const updatedHazards = [...formData.hazards];
    updatedHazards[index] = {
      ...updatedHazards[index],
      [field]: value
    };
    setFormData({
      ...formData,
      hazards: updatedHazards
    });
  };

  const addHazard = () => {
    setFormData({
      ...formData,
      hazards: [
        ...formData.hazards,
        {
          description: '',
          severityLevel: 'Medium',
          likelihood: 'Possible'
        }
      ]
    });
  };

  const removeHazard = (index) => {
    if (formData.hazards.length === 1) return;
    const updatedHazards = [...formData.hazards];
    updatedHazards.splice(index, 1);
    setFormData({
      ...formData,
      hazards: updatedHazards
    });
  };

  const togglePPE = (item, field) => {
    setFormData({
      ...formData,
      ppe: {
        ...formData.ppe,
        [item]: {
          ...formData.ppe[item],
          [field]: !formData.ppe[item][field]
        }
      }
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Hazard assessment saved successfully!');
  };

  const statuscolors = {
    Pending: 'bg-red-500 text-white',
    InProgress: 'bg-yellow-500 text-white',
    Completed: 'bg-green-500 text-white',
  };

  const severityColors = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-orange-500',
    Critical: 'bg-red-500'
  };

  const likelihoodColors = {
    Unlikely: 'bg-gray-300',
    Possible: 'bg-yellow-500',
    Likely: 'bg-orange-400',
    Certain: 'bg-red-500'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className=" flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Construction Hazard Assessment</h1>
        <Link to="/swms">
                  <button
                    
                    className="btn btn-secondary"
                    style={{ backgroundColor: "#0d6efd", color: "white" }}
                  >
                    <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
                  </button>
                  </Link>
      </div>

      {/* Work Activity Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Work Activity</label>
        <textarea
          value={formData.workActivity}
          onChange={handleWorkActivityChange}
          placeholder="Describe the work activity in detail..."
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
          rows="3"
        />
      </div>

      {/* Hazards Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-800">Hazards</h2>
          <button
            onClick={addHazard}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <Plus size={16} className="mr-1" /> Add Hazard
          </button>
        </div>

        {formData.hazards.map((hazard, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded ">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-700 mb-2">Hazard #{index + 1}</h3>
              {formData.hazards.length > 1 && (
                <button
                  onClick={() => removeHazard(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Hazard Description</label>
              <textarea
                value={hazard.description}
                onChange={(e) => handleHazardChange(index, 'description', e.target.value)}
                placeholder="Describe the potential hazard in detail..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Severity Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Low', 'Medium', 'High', 'Critical'].map(level => (
                    <button
                      key={`${index}-severity-${level}`}
                      type="button"
                      className={`py-1 rounded text-white text-center ${severityColors[level]} ${
                        hazard.severityLevel === level ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleHazardChange(index, 'severityLevel', level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Likelihood</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Unlikely', 'Possible', 'Likely', 'Certain'].map(option => (
                    <button
                      key={`${index}-likelihood-${option}`}
                      type="button"
                      className={`py-1 rounded text-center ${likelihoodColors[option]} ${
                        option === 'Unlikely' ? 'text-gray-700' : 'text-white'
                      } ${hazard.likelihood === option ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => handleHazardChange(index, 'likelihood', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>


            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Control Measures</label>
              <textarea
                value={hazard.controlmeasures}
                onChange={(e) => handleHazardChange(index, 'controlmeasures', e.target.value)}
                placeholder="Control measures to prevent the potential hazard in detail..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
                rows="2"
              />
            </div>

            <div className=" flex items-center justify-content-between mb-3 gap-2">
                <div className='w-full' > 
              <label className="block text-sm text-gray-600 mb-1">Responsible Person</label>
              <input
                type="text"
                value={hazard.responsiblePerson}
                onChange={(e) => handleHazardChange(index, 'responsiblePerson', e.target.value)}
                placeholder=""
                className="w-full p-2 rounded "
                rows="2"
              />
              </div>
              <div className="w-full"> 
              <label className="block text-sm text-gray-600 mb-1">Implementation Date</label>
              <input
                type="date"
                value={hazard.implementationDate}
                onChange={(e) => handleHazardChange(index, 'implementationDate', e.target.value)}
                placeholder=""
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
              </div>
            </div>

            <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <div className="grid grid-cols-3 gap-2">
               { ['Pending', 'InProgress', 'Completed'].map(status => (
                    <button
                        key={`${index}-status-${status}`}
                        type="button"
                        className={`py-1 rounded text-center ${hazard.status === status ? ` ${statuscolors[status]} bg-green-500 text-white border-blue-500 border-2` : 'bg-gray-100 text-gray-700 border-gray-300 border-1'}`}
                        onClick={() => handleHazardChange(index, 'status', status)}
                    >
                        {status}
                    </button>
                ))}
                </div>
                {/* <select
                    value={hazard.status}
                    onChange={(e) => handleHazardChange(index, 'status', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select> */}
                

</div>




          </div>
        ))}
      </div>

      {/* PPE Requirements Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Required PPE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries({
            hardHat: "Hard Hat",
            safetyBoots: "Safety Boots",
            highVisVest: "High-Vis Vest",
            safetyGlasses: "Safety Glasses",
            earProtection: "Ear Protection",
            respirator: "Respirator",
            gloves: "Gloves",
            fallProtection: "Fall Protection"
          }).map(([key, label]) => (
            <div key={key} className="border border-gray-200 rounded p-3 bg-white">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`ppe-${key}`}
                  checked={formData.ppe[key].selected}
                  onChange={() => togglePPE(key, 'selected')}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={`ppe-${key}`} className="ml-2 text-sm text-gray-700">
                  {label}
                </label>
              </div>
              
              {formData.ppe[key].selected && (
                <div className="flex items-center text-xs mt-2 ml-2">
                  <input
                    type="checkbox"
                    id={`mandatory-${key}`}
                    checked={formData.ppe[key].mandatory}
                    onChange={() => togglePPE(key, 'mandatory')}
                    className="h-4 w-4 text-green-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`mandatory-${key}`} className="ml-2 text-sm text-green-700">
                    Mandatory
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Assessment
        </button>
      </div>
    </div>
  );
}