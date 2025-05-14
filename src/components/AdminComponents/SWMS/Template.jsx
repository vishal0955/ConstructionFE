

import { useState } from 'react';
import { ChevronRight, AlertTriangle, Hammer, Users, HardHat, Box, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className='d-flex justify-between'>
      <h2 className="text-xl font-bold mb-6">Pre-Populated Templates</h2>

<Link to="/HazardTemplateForm">
      <button 
        className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
       
      > 
        Add New Template
      </button> 
      </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div 
            key={template.id} 
            className=" rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all hover:shadow-lg"
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
            <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
