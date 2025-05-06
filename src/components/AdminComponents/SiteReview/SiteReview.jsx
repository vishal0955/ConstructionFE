


import React, { use, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ChevronDown, ChevronUp, Camera, AlertTriangle, CheckCircle, HelpCircle, Download, Mail, Plus, X, Check } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Table ,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {fetchsitereview, deletesitereview} from "../../../redux/slices/sitereviewSlice";


function SiteReview({ question, category, id, data, onAnswerChange, onCommentChange, helpText }) {
 
  const [showHelp, setShowHelp] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const dispatch = useDispatch();
  const siteReviews = [
    {
      siteName: "Site A",
      reviewDate: "Apr 20, 2025",
      reviewerName: "John Smith",
      complianceStatus: "Compliant",
    },
    {
      siteName: "Site B",
      reviewDate: "Apr 18, 2025",
      reviewerName: "Sarah Smith",
      complianceStatus: "Non-Compliant",
    },
    {
      siteName: "Site C",
      reviewDate: "Apr 19, 2025",
      reviewerName: "David Brown",
      complianceStatus: "Compliant",
    },
  ];

  const { sitereview, loading, error } = useSelector((state) => state.sitereview);
  console.log ("sitereview", sitereview);

  useEffect(() => {
    dispatch(fetchsitereview());
  }, [dispatch])

  





  const [activeTab, setActiveTab] = useState('checklist');
  const [expandedSections, setExpandedSections] = useState({
    'site-safety': true,
    'personal-safety': false,
    'tools-equipment': false,
    'environment': false
  });
  const [checklistData, setChecklistData] = useState({
    'site-safety': {
      'site-fencing': { answer: '', photos: [], comment: '' },
      'warning-signs': { answer: 'yes', photos: [], comment: '' },
      'public-protection': { answer: 'no', photos: [], comment: 'Need additional barriers at north entrance' },
      'first-aid': { answer: '', photos: [], comment: '' },
      'wash-stations': { answer: 'yes', photos: [], comment: '' }
    },
    'personal-safety': {
      'ppe-available': { answer: '', photos: [], comment: '' },
      'ppe-correct': { answer: '', photos: [], comment: '' },
      'staff-trained': { answer: '', photos: [], comment: '' }
    },
    'tools-equipment': {
      'inspection-current': { answer: '', photos: [], comment: '' },
      'proper-storage': { answer: '', photos: [], comment: '' },
      'damaged-items': { answer: '', photos: [], comment: '' }
    },
    'environment': {
      'waste-management': { answer: '', photos: [], comment: '' },
      'spill-controls': { answer: '', photos: [], comment: '' },
      'noise-management': { answer: '', photos: [], comment: '' }
    }
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleAnswerChange = (category, question, value) => {
    setChecklistData({
      ...checklistData,
      [category]: {
        ...checklistData[category],
        [question]: {
          ...checklistData[category][question],
          answer: value
        }
      }
    });
  };

  const handleCommentChange = (category, question, value) => {
    setChecklistData({
      ...checklistData,
      [category]: {
        ...checklistData[category],
        [question]: {
          ...checklistData[category][question],
          comment: value
        }
      }
    });
  };

  const countIssues = () => {
    let count = 0;
    Object.keys(checklistData).forEach(category => {
      Object.keys(checklistData[category]).forEach(question => {
        if (checklistData[category][question].answer === 'no') {
          count++;
        }
      });
    });
    return count;
  };

// const HandleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteSiteEntry  (id))
//           .then(() => {
//             Swal.fire(
//               'Deleted!',
//               'The site entry has been deleted.',
//               'success'
//             );
//             dispatch(fetchSiteEntries());  // Refresh the table after delete
//           })
//           .catch((error) => {
//             Swal.fire(
//               'Error!',
//               'Something went wrong.',
//               'error'
//             );
//           });
//       }
//     });
//   };
  const HandleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deletesitereview(id))
            .then(() => {
              Swal.fire(
                'Deleted!',
                'The site entry has been deleted.',
                'success'
              );
              dispatch(fetchsitereview());  // Refresh the table after delete
            })
            .catch((error) => {
              Swal.fire(
                'Error!',
                'Something went wrong.',
                'error'
              );
            });
        }
      });
    };

  const filteredsitereview = Array.isArray(sitereview?.data) ? sitereview.data : [];

  const [categories, setCategories] = useState({
    safety: {
      PPE_Compliance: false,
      Emergency_Exits: false,
      Fire_Safety: false,
    },
    cleanliness: {
      Waste_Management: false,
      Site_Organization: false,
      Material_Storage: false,
    },
    progress: {
      Timeline_Adherence: false,
      Quality_Standards: false,
      Resource_Allocation: false,
    },
    environmental: {
      Noise_Control: false,
      Dust_Management: false,
      Water_Conservation: false,
    },
  });

  const complianceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Compliance Rate",
        data: [85, 90, 88, 92, 87, 89, 91],
        backgroundColor: "#0052CC",
        borderColor: "#0052CC",
        borderWidth: 1,
      },
    ],
  };

  const safetyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Safety Reports",
        data: [150, 145, 142, 148, 155, 160, 158],
        borderColor: "#0052CC",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const handleCheckboxChange = (category, item) => {
    setCategories((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  return (
    <div className="container-fluid p-4">
      {/* Quick Actions */}

      <div className="container">
        <h3 className="mb-4 font-bold text-3xl">Site Review</h3>

        <div className="d-flex justify-content-end">
          <Link to="/addSiteReview">
            <Button variant="primary" size="sm">
              <i className="fas fa-plus me-2 text-white"></i> New Site Review
            </Button>
          </Link>
        </div>

      
        <div className="mt-3 rounded-3">
          <Table striped bordered hover responsive className="shadow-sm ">
            <thead className="bg-light">
              <tr>
                <th>Site Name/Location</th>
                <th>Review Date </th>
                <th>Reviewer Name</th>
                <th>Compliance Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { loading ? (
    <tr>
      <td colSpan="5" className="text-center py-3">Loading...</td>
    </tr>
  ) : 


  ( filteredsitereview?.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-3">
        No site reviews found.
      </td>
    </tr>
  ):
    filteredsitereview?.map((review, index) => (
  <tr key={review._id}>
    <td>{review.siteName}</td>
    <td>{new Date(review.reviewDate).toLocaleDateString()}</td> 
    <td>{review.reviewerName}</td>
    <td>
      <span
        className={`badge ${
          review.complianceStatus === "Compliant"
            ? "bg-success"
            : "bg-danger"
        }`}
      >
        {review.complianceStatus}
      </span>
    </td>
    {/* <td>
      <Link to={`/editReview/${index}`}>
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          style={{ borderRadius: "20px" }}
        >
          Edit
        </Button>
      </Link>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ borderRadius: "20px" }}
      >
        Delete
      </Button>
    </td> */}

    <td>
      <Link to={`/AddSiteReview/${review._id}`}>
        <button className="btn text-primary ">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </Link>

      <button className="btn text-danger" onClick={()  => HandleDelete(review._id)}>
        <i class="fa-solid fa-trash"></i>
      </button>
    </td>
  </tr>
)))

              }
            
            </tbody>
          </Table>
        </div>
      </div>

      {/* Insights Section */}
      <div className="row gy-4 mb-4">
        {/* Compliance Insights */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-chart-line me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Compliance Insights
              </h5>
              <p className="text-muted small">
                AI-generated insights from compliance data and KPIs
              </p>
              <div style={{ height: "200px" }}>
                <Line
                  data={complianceData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Reports */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-hard-hat me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Safety Reports
              </h5>
              <p className="text-muted small">
                AI-generated summaries of safety reports and status indicators
              </p>
              <div style={{ height: "200px" }}>
                <Line
                  data={safetyData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Alerts */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i
                  className="fas fa-bell me-2"
                  style={{ color: "#0052CC" }}
                ></i>
                Real-Time Alerts
              </h5>
              <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle me-2"></i>
                Critical Safety Warning
                <p className="small mb-0">Equipment malfunction in Sector 7</p>
              </div>
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Moderate Security Alert
                <p className="small mb-0">
                  Unusual activity detected in Zone 8
                </p>
              </div>
              <div className="alert alert-success">
                <i className="fas fa-check-circle me-2"></i>
                Safe Site Condition
                <p className="small mb-0">All systems operating normally</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Review Categories */}
      <h5 className="d-flex align-items-center mb-3">
        <i className="fas fa-robot me-2"></i>
        AI Review Categories
      </h5>

      <div className="row gy-4">
        {/* Category Cards */}
        {[
          { title: "Safety Checklist", icon: "shield-alt", key: "safety" },
          { title: "Cleanliness", icon: "broom", key: "cleanliness" },
          { title: "Progress Report", icon: "tasks", key: "progress" },
          { title: "Environmental", icon: "leaf", key: "environmental" },
        ].map(({ title, icon, key }) => (
          <div className="col-md-6" key={key}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title d-flex align-items-center">
                  <i className={`fas fa-${icon} me-2`}></i>
                  {title}
                </h6>
                {Object.entries(categories[key]).map(([subKey, value]) => (
                  <div className="form-check" key={subKey}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={value}
                      onChange={() => handleCheckboxChange(key, subKey)}
                      id={`${key}-${subKey}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${key}-${subKey}`}
                    >
                      {subKey.replace("_", " ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex bg-white border-b mt-4">
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'checklist' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('checklist')}
        >
          Safety Checklist
        </button>
        <button 
          className={`py-3 px-6 font-medium ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'checklist' ? (
          <div className="space-y-4">
            {/* Site Safety & Traffic Management Section */}
            <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('site-safety')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h2 className="text-lg font-semibold">Site Safety & Traffic Management</h2>
                </div>
                {expandedSections['site-safety'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['site-safety'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    {/* Question 1 */}
                    <ChecklistItem
                      question="Site is properly fenced and secured when unattended"
                      category="site-safety"
                      id="site-fencing"
                      data={checklistData['site-safety']['site-fencing']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'site-fencing', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'site-fencing', value)}
                      helpText="Ensure all perimeter fencing is at least 1.8m tall with no gaps and all access points can be locked."
                    />
                    
                    {/* Question 2 */}
                    <ChecklistItem
                      question="Appropriate warning signs and notices are displayed"
                      category="site-safety"
                      id="warning-signs"
                      data={checklistData['site-safety']['warning-signs']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'warning-signs', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'warning-signs', value)}
                      helpText="Signs should include Site Entry Requirements, PPE requirements, and Emergency Information."
                    />
                    
                    {/* Question 3 */}
                    <ChecklistItem
                      question="Protection for public and visitors is in place"
                      category="site-safety"
                      id="public-protection"
                      data={checklistData['site-safety']['public-protection']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'public-protection', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'public-protection', value)}
                      helpText="Check for safety barriers, marked pathways, and overhead protection where required."
                    />
                    
                    {/* Question 4 */}
                    <ChecklistItem
                      question="First aid kit is accessible and fully stocked"
                      category="site-safety"
                      id="first-aid"
                      data={checklistData['site-safety']['first-aid']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'first-aid', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'first-aid', value)}
                      helpText="First aid kit should be prominently located with supplies checked and replenished."
                    />
                    
                    {/* Question 5 */}
                    <ChecklistItem
                      question="Hand wash stations are available and maintained"
                      category="site-safety"
                      id="wash-stations"
                      data={checklistData['site-safety']['wash-stations']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'wash-stations', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'wash-stations', value)}
                      helpText="Clean water, soap, and hand drying facilities should be available at entry/exit points."
                    />
                  </div>
                </div>
              )}
            </div>
              {/* Personal Safety Section */}
              <div className="bg-white rounded-lg shadow">
              <div 
                className="d-flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('personal-safety')}
              >
                <div className="d-flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h2 className="text-lg font-semibold">Personal Safety & PPE</h2>
                </div>
                {expandedSections['personal-safety'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['personal-safety'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="Required PPE is available for all workers and visitors"
                      category="personal-safety"
                      id="ppe-available"
                      data={checklistData['personal-safety']['ppe-available']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'ppe-available', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'ppe-available', value)}
                      helpText="Check stock of hard hats, safety glasses, high-vis vests, and hearing protection."
                    />
                    
                    <ChecklistItem
                      question="Workers are using correct PPE for tasks being performed"
                      category="personal-safety"
                      id="ppe-correct"
                      data={checklistData['personal-safety']['ppe-correct']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'ppe-correct', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'ppe-correct', value)}
                      helpText="Ensure task-specific PPE is being used (e.g. respiratory protection for dust, fall arrest for heights)."
                    />
                    
                    <ChecklistItem
                      question="All staff are trained in correct PPE use and maintenance"
                      category="personal-safety"
                      id="staff-trained"
                      data={checklistData['personal-safety']['staff-trained']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'staff-trained', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'staff-trained', value)}
                      helpText="Workers should be able to demonstrate knowledge of when and how to use their PPE."
                    />
                  </div>
                </div>
              )}
            </div>

  {/* Tools & Equipment Section */}
  <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('tools-equipment')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h2 className="text-lg font-semibold">Tools & Equipment</h2>
                </div>
                {expandedSections['tools-equipment'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['tools-equipment'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="All tools have current inspection tags/records"
                      category="tools-equipment"
                      id="inspection-current"
                      data={checklistData['tools-equipment']['inspection-current']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'inspection-current', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'inspection-current', value)}
                      helpText="Check that power tools, lifting equipment and other machinery have up-to-date inspection tags."
                    />
                    
                    <ChecklistItem
                      question="Tools and equipment are properly stored when not in use"
                      category="tools-equipment"
                      id="proper-storage"
                      data={checklistData['tools-equipment']['proper-storage']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'proper-storage', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'proper-storage', value)}
                      helpText="Tools should be secured in designated storage areas to prevent unauthorized use or theft."
                    />
                    
                    <ChecklistItem
                      question="Damaged or defective items are tagged and removed from service"
                      category="tools-equipment"
                      id="damaged-items"
                      data={checklistData['tools-equipment']['damaged-items']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'damaged-items', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'damaged-items', value)}
                      helpText="Any damaged item should be clearly marked as 'Do Not Use' and secured away from operational equipment."
                    />
                  </div>
                </div>
              )}
            </div>
             {/* Environmental Controls Section */}
             <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('environment')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h2 className="text-lg font-semibold">Environmental Controls</h2>
                </div>
                {expandedSections['environment'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['environment'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="Waste is being properly managed and segregated"
                      category="environment"
                      id="waste-management"
                      data={checklistData['environment']['waste-management']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'waste-management', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'waste-management', value)}
                      helpText="Check for separate waste streams (general, recyclable, hazardous) and appropriate containers."
                    />
                    
                    <ChecklistItem
                      question="Spill control equipment is available and accessible"
                      category="environment"
                      id="spill-controls"
                      data={checklistData['environment']['spill-controls']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'spill-controls', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'spill-controls', value)}
                      helpText="Spill kits should be located near fuel storage, chemical storage and refueling areas."
                    />
                    
                    <ChecklistItem
                      question="Noise management controls are implemented"
                      category="environment"
                      id="noise-management"
                      data={checklistData['environment']['noise-management']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'noise-management', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'noise-management', value)}
                      helpText="Ensure noise barriers are in place if required and noisy work is scheduled appropriately."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
            ) : (
              // Summary Tab
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Safety Inspection Summary</h2>
                  <p className="text-gray-600">Project: Commercial Building #4752 | Date: May 6, 2025</p>
                </div>
                
                {/* Issues Overview */}
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="text-orange-500 mr-2" size={24} />
                    <h5 className="text-lg font-medium text-orange-700">Issues Requiring Attention ({countIssues()})</h5>
                  </div>
                  <ul className="space-y-2">
                    {Object.keys(checklistData).map(category => 
                      Object.keys(checklistData[category]).map(question => {
                        if (checklistData[category][question].answer === 'no') {
                          // Create a readable question name from the ID
                          const readableQuestion = question.split('-').map(
                            word => word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ');
                          
                          return (
                            <li key={`${category}-${question}`} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <div>
                                <span className="font-medium">{readableQuestion}</span>
                                {checklistData[category][question].comment && (
                                  <p className="text-gray-600 text-sm">{checklistData[category][question].comment}</p>
                                )}
                              </div>
                            </li>
                          );
                        }
                        return null;
                      })
                    ).flat().filter(Boolean)}
                    {countIssues() === 0 && (
                      <li className="text-green-600 flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        No issues identified in this inspection
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Smart Review Suggestions */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <HelpCircle className="text-blue-500 mr-2" size={24} />
                    <h5 className="text-lg font-medium text-blue-700">Smart Review Suggestions</h5>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>Based on missing controls, we recommend reviewing public safety barriers at north entrance area.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>This checklist indicates several unanswered items - consider scheduling a follow-up inspection.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>Reference NCC Section B.3.2 regarding public protection standards for commercial construction sites.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <Download size={18} className="mr-2" />
                    Download Report
                  </button>
                  <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg">
                    <Mail size={18} className="mr-2" />
                    Email Report
                  </button>
                  <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="mr-2" />
                    Create Tasks from Issues
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium">{question}</h3>
        </div>
        <button 
          className="ml-2 text-blue-600 hover:text-blue-800 flex items-center text-sm"
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle size={16} className="mr-1" />
          Unsure? View controls
        </button>
      </div>
      
      {showHelp && (
        <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm text-blue-800">
          {helpText}
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex items-center gap-4">
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'yes' ? 'text-green-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="yes"
              checked={data.answer === 'yes'}
              onChange={() => onAnswerChange('yes')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'yes' ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
              {data.answer === 'yes' && <Check size={14} className="text-white" />}
            </div>
            <span>Yes</span>
          </label>
          
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'no' ? 'text-red-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="no"
              checked={data.answer === 'no'}
              onChange={() => onAnswerChange('no')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'no' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}>
              {data.answer === 'no' && <X size={14} className="text-white" />}
            </div>
            <span>No</span>
          </label>
          
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'na' ? 'text-gray-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="na"
              checked={data.answer === 'na'}
              onChange={() => onAnswerChange('na')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'na' ? 'bg-gray-600 border-gray-600' : 'border-gray-400'}`}>
              {data.answer === 'na' && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span>N/A</span>
          </label>
        </div>
        
        <button 
          className={`flex items-center text-sm ml-auto ${showPhotoUpload ? 'text-blue-800 bg-blue-100 p-1 px-2 rounded' : 'text-blue-600'}`}
          onClick={() => setShowPhotoUpload(!showPhotoUpload)}
        >
          <Camera size={16} className="mr-1" />
          {data.photos.length > 0 ? `Photos (${data.photos.length})` : "Add Photo"}
        </button>
      </div>
      
      {showPhotoUpload && (
        <div className="mb-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Camera size={24} className="mx-auto mb-2 text-gray-400" />
            <div className="text-sm text-gray-500">Tap to take photo or upload</div>
          </div>
        </div>
      )}
      
      {(data.answer === 'no' || data.comment || showPhotoUpload) && (
        <div>
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            placeholder={data.answer === 'no' ? "Describe the issue and any immediate actions taken..." : "Add comment (optional)"}
            value={data.comment}
            onChange={(e) => onCommentChange(e.target.value)}
            rows={2}
          />
        </div>
      )}
    </div> */}

    </div>
  );
}


function ChecklistItem({ question, category, id, data, onAnswerChange, onCommentChange, helpText }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h5 className="font-medium">{question}</h5>
        </div>
        <button 
          className="ml-2 text-blue-600 hover:text-blue-800 flex items-center text-sm"
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle size={16} className="mr-1" />
          Unsure? View controls
        </button>
      </div>
      
      {showHelp && (
        <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm text-blue-800">
          {helpText}
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex items-center gap-4">
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'yes' ? 'text-green-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="yes"
              checked={data.answer === 'yes'}
              onChange={() => onAnswerChange('yes')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'yes' ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
              {data.answer === 'yes' && <Check size={14} className="text-white" />}
            </div>
            <span>Yes</span>
          </label>
          
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'no' ? 'text-red-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="no"
              checked={data.answer === 'no'}
              onChange={() => onAnswerChange('no')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'no' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}>
              {data.answer === 'no' && <X size={14} className="text-white" />}
            </div>
            <span>No</span>
          </label>
          
          <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'na' ? 'text-gray-600 font-medium' : ''}`}>
            <input
              type="radio"
              name={`${category}-${id}`}
              value="na"
              checked={data.answer === 'na'}
              onChange={() => onAnswerChange('na')}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'na' ? 'bg-gray-600 border-gray-600' : 'border-gray-400'}`}>
              {data.answer === 'na' && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span>N/A</span>
          </label>
        </div>
        
        <button 
          className={`flex items-center text-sm ml-auto ${showPhotoUpload ? 'text-blue-800 bg-blue-100 p-1 px-2 rounded' : 'text-blue-600'}`}
          onClick={() => setShowPhotoUpload(!showPhotoUpload)}
        >
          <Camera size={16} className="mr-1" />
          {data.photos.length > 0 ? `Photos (${data.photos.length})` : "Add Photo"}
        </button>
      </div>
      
      {showPhotoUpload && (
        <div className="mb-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Camera size={24} className="mx-auto mb-2 text-gray-400" />
            <div className="text-sm text-gray-500">Tap to take photo or upload</div>
          </div>
        </div>
      )}
      
      {(data.answer === 'no' || data.comment || showPhotoUpload) && (
        <div>
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            placeholder={data.answer === 'no' ? "Describe the issue and any immediate actions taken..." : "Add comment (optional)"}
            value={data.comment}
            onChange={(e) => onCommentChange(e.target.value)}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}

export default SiteReview;
