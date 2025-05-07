import { useState } from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';

export default function SWMSForm({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    swmsName: '',
    siteAddress: '',
    companyName: '',
    responsiblePersonName: '',
    dateCreated: '2023-04-14',
    principalContractorName: 'Melbourne Development Group',
    principalContractorContact: 'James Wilson',
    principalContractorPhone: '0412 345 678',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNext = () => {
    console.log('Form data submitted:', formData);
    // Logic to move to step 2 would go here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-blue-900 text-white p-4 flex items-center">
        <button className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Create SWMS</h1>
      </header> */}

      {/* Step indicator */}
      <div className="px-4 py-2 text-sm text-gray-600 border-b">
        Step 1 of 3
      </div>

      <div className="flex-1 overflow-auto">
        <form className="p-4 space-y-6">
          {/* SWMS Details Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">SWMS Name</label>
              <input
                type="text"
                name="swmsName"
                placeholder="Enter SWMS name"
                value={formData.swmsName}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Site Address</label>
              <div className="relative">
                <input
                  type="text"
                  name="siteAddress"
                  placeholder="Enter site address"
                  value={formData.siteAddress}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <MapPin className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Responsible Person Name</label>
              <input
                type="text"
                name="responsiblePersonName"
                placeholder="Enter responsible person name"
                value={formData.responsiblePersonName}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date Created</label>
              <input
                type="date"
                name="dateCreated"
                value={formData.dateCreated}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Company Information Section */}
          <div className="bg-white p-4 rounded border">
            <h2 className="font-medium mb-3">Company Information</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company Name</label>
           
                 <input
                type="text"
                value={formData.principalContractorName}
                onChange={handleChange}
                name="principalContractorName"
                className="w-full p-3 bg-gray-100 border rounded"
              />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">ABN</label>
                <div className="p-3 bg-gray-100 rounded">45 976 543 210</div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <div className="p-3 bg-gray-100 rounded">42 Construction Way, Melbourne VIC 3000</div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contact Number</label>
                <div className="p-3 bg-gray-100 rounded">(03) 9876 5432</div>
              </div>
            </div>
          </div>

          {/* Principal Contractor Section */}
          <div className="space-y-4">
            <h2 className="font-medium">Principal Contractor</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.principalContractorName}
                onChange={handleChange}
                name="principalContractorName"
                className="w-full p-3 bg-gray-100 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Person</label>
              <input
                type="text"
                value={formData.principalContractorContact}
                onChange={handleChange}
                readOnly
                className="w-full p-3 bg-gray-100 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                type="text"
                value={formData.principalContractorPhone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border rounded"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Footer with Next button */}
      <div className="p-4 border-t">
        <button
          onClick={onNext}
          className="w-full bg-blue-600 text-white p-3 rounded font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}