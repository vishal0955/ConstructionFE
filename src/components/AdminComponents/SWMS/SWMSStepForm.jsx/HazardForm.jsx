import { useState } from 'react';
import { AlertCircle } from 'lucide-react';


export default function HazardForm() {
  const [formData, setFormData] = useState({
    hazardDescription: '',
    severityLevel: '',
    likelihood: '',
    additionalNotes: '',
    responsiblePerson: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const severityColors = {
    Low: 'bg-green-500 text-white',
    Medium: 'bg-yellow-400 text-black',
    High: 'bg-orange-500 text-white',
    Critical: 'bg-red-600 text-white'
  };

  const likelihoodColors = {
    Unlikely: 'bg-gray-300 text-white',
    Possible: 'bg-yellow-400 text-black',
    Likely: 'bg-orange-400 text-white',
    Certain: 'bg-red-500 text-white'
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Hazard added successfully!');
  };

  return (
    <div className="flex justify-center items-start w-full ">
      <div className=" max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        {/* <div className="p-4 border-b border-gray-200 flex items-center">
          <AlertCircle className="mr-2 text-blue-500" size={20} />
          <h2 className="text-lg font-semibold">Add New Hazard</h2>
        </div> */}

        <div className="">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hazard Description
            </label>
            
            <textarea
              name="hazardDescription"
              value={formData.hazardDescription}
              placeholder=' Describe the potential hazard in detail...'
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Severity Level
              </label>
              <div className="flex flex-wrap gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map(level => (
                  <button
                    key={level}
                    type="button"
                    className={`px-4 py-1 text-sm rounded ${severityColors[level]} ${
                      formData.severityLevel === level
                        ? 'bg-blue-500 text-white border-blue-500 border-2'
                        : 'bg-gray-100 text-gray-700 '
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, severityLevel: level }))}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Likelihood
              </label>
              <div className="flex flex-wrap gap-2">
                {['Unlikely', 'Possible', 'Likely', 'Certain'].map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`px-4 py-1 text-sm rounded ${likelihoodColors[option]} ${
                      formData.likelihood === option
                        ? ' text-white border-blue-500 border-2'
                        : 'bg-gray-100 text-gray-700 '
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, likelihood: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
          
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder=' List all control measures to mitigate this hazard...'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsible Person
            </label>
            
            <input
              type="text"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleChange}
              placeholder=' Enter the name of person responsible'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Add Hazard
          </button>
        </div>
      </div>
    </div>
  );
}