//My Earlier Code

// import { useState, useEffect } from "react";
// import { Form, Button, InputGroup } from "react-bootstrap";
// import {
//   FaTrash,
//   FaEdit,
//   FaSave,
//   FaCloudUploadAlt,
//   FaCopy,
// } from "react-icons/fa";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { apiUrl } from "../../../utils/config";
// import axiosInstance from "../../../utils/axiosInstance";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjects } from "../../../redux/slices/projectSlice";
// import { fetchUsers } from "../../../redux/slices/userSlice";
// import { fetchITPs, updateITP, fetchITPById } from "../../../redux/slices/itpSlice";
// import { toast } from "react-toastify";

// const AddITPs = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { data: projects, loading: projectLoading } = useSelector(
//     (state) => state.projects
//   );

//   const users = useSelector((state) => state.users.data);

//   const [items, setItems] = useState([
//     { itemDescription: "", status: true, comments: "" }, // Changed to boolean
//   ]);
//   const [formData, setFormData] = useState({
//     projectName: "",
//     inspectionType: "",
//     inspector: "",
//     activity: "",
//     criteria: "",
//     status: "",
//     inspectionDate: "",
//     additionalNotes: "",
//     image: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     dispatch(fetchProjects());
//     dispatch(fetchUsers());
    
//     if (id) {
//       setIsEditMode(true);
//       setLoading(true);
      
//       dispatch(fetchITPById(id))
//         .unwrap()
//         .then((data) => {
//           // Format the data correctly
//           const formattedData = {
//             projectName: data.projectName || "",
//             inspectionType: data.InspectionType || "",
//             inspector: data.Inspector || "",
//             activity: data.activity || "",
//             criteria: data.criteria || "",
//             status: data.status || "",
//             inspectionDate: data.Date ? new Date(data.Date).toISOString().split("T")[0] : "",
//             additionalNotes: data.additionalNotes || "",
//             image: data.image || [],
//           };
          
//           setFormData(formattedData);
          
//           // Convert inspection items and ensure status is boolean
//           if (data.InspectionItems && data.InspectionItems.length > 0) {
//             const formattedItems = data.InspectionItems.map(item => ({
//               itemDescription: item.itemDescription || "",
//               status: typeof item.status === 'boolean' ? item.status : item.status === "true" || item.status === true,
//               comments: item.comments || ""
//             }));
//             setItems(formattedItems);
//           }
          
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log("Error in get ITP by id", err);
//           toast.error(err?.message || 'Failed to load ITP data!');
//           setLoading(false);
//         });
//     }
//   }, [id, dispatch]);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const addItem = () => {
//     setItems([...items, { itemDescription: "", status: true, comments: "" }]); // Default to true (Pass)
//   };

//   const removeItem = (index) => {
//     if (items.length > 1) {
//       setItems(items.filter((_, i) => i !== index));
//     } else {
//       toast.warn("At least one inspection item is required");
//     }
//   };

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItems = [...items];
    
//     // Convert status to boolean when it's changed
//     if (name === "status") {
//       updatedItems[index][name] = value === "true";
//     } else {
//       updatedItems[index][name] = value;
//     }
    
//     setItems(updatedItems);
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData((prev) => ({
//       ...prev,
//       image: [...prev.image, ...files],
//     }));
//   };

// //
//   const handleImageChange = (index, e) => {
//     const file = e.target.files[0];
//     const newItems = [...items];
//     newItems[index].images = file;
//     setItems(newItems);
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.projectName || !formData.inspectionType || !formData.inspector) {
//       toast.error("Please fill all required fields");
//       return;
//     }
    
//     setLoading(true);
  
//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("projectName", formData.projectName);
//     formDataToSubmit.append("InspectionType", formData.inspectionType);
//     formDataToSubmit.append("Inspector", formData.inspector);
//     formDataToSubmit.append("Date", formData.inspectionDate);
//     formDataToSubmit.append("activity", formData.activity);
//     formDataToSubmit.append("criteria", formData.criteria);
//     formDataToSubmit.append("status", formData.status);
//     formDataToSubmit.append("additionalNotes", formData.additionalNotes);
  
//     // Make sure each item has a boolean status value
//     const itemsWithBooleanStatus = items.map(item => ({
//       ...item,
//       status: Boolean(item.status) // Ensure it's a boolean value
//     }));
  
//     // Append inspection items with correct key name and boolean status values
//     formDataToSubmit.append("InspectionItems", JSON.stringify(itemsWithBooleanStatus));
  
//     // Handle image upload correctly
//     if (formData.image && formData.image.length > 0) {
//       formData.image.forEach((file) => {
//         if (file instanceof File) {
//           formDataToSubmit.append("image", file);
//         }
//       });
//     }
  
//     try {
//       if (id) {
//         await dispatch(updateITP({ id, updatedITP: formDataToSubmit })).unwrap();
//         toast.success("ITP Updated Successfully!");
//         navigate("/itps");
//       } else {
//         const response = await axiosInstance.post(
//           `${apiUrl}/itps`,
//           formDataToSubmit,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log("ITP Created:", response.data);
//         toast.success("ITP submitted successfully!");

//         navigate("/itps");
//       }
//     } catch (error) {
//       console.error("Submission failed:", error);
//       toast.error(error?.response?.data?.message || error?.message || "Failed to submit ITP.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleAutofill = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://constructionaimicroservice-production.up.railway.app/autofill`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ form_type: "itps" }),
//         }
//       );

//       const result = await response.json();
//       const suggested_data = result?.suggested_data;

//       if (!suggested_data) {
//         toast.error("No autofill data found.");
//         setLoading(false);
//         return;
//       }

//       setFormData({
//         projectName: suggested_data.projectName || "",
//         inspectionType: suggested_data.InspectionType || "",
//         inspector: suggested_data.Inspector || "",
//         activity: suggested_data.activity || "",
//         criteria: suggested_data.criteria || "",
//         status: suggested_data.status || "",
//         inspectionDate: suggested_data.Date
//           ? new Date(suggested_data.Date).toISOString().split("T")[0]
//           : "",
//         additionalNotes: suggested_data.additionalNotes || "",
//         image: [],
//       });

//       // Ensure status is boolean
//       const mappedItems = (suggested_data.InspectionItems || []).map(
//         (item) => ({
//           itemDescription: item.itemDescription || "",
//           status: typeof item.status === 'boolean' ? item.status : item.status === "true" || item.status === true,
//           comments: item.comments || "",
//         })
//       );

//       setItems(
//         mappedItems.length > 0
//           ? mappedItems
//           : [{ itemDescription: "", status: true, comments: "" }]
//       );

//       toast.success("Form autofilled successfully.");
//     } catch (error) {
//       console.error("Autofill failed:", error);
//       toast.error("Failed to fetch autofill data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && id) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container p-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3>{isEditMode ? "Edit Inspection Test Plan" : "Create Inspection Test Plan"}</h3>
//         <div className="d-flex gap-2 text-nowrap">
//           <button
//             className="btn bg-primary text-white"
//             onClick={handleAutofill}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                 Loading...
//               </>
//             ) : (
//               "Autofill"
//             )}
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="btn bg-primary text-white"
//           >
//             <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
//           </button>
//         </div>
//       </div>
//       <div className="card p-4 shadow-sm">
//         <div className="row g-3 mb-3">
//           <div className="col-md-6">
//             <Form.Group controlId="activity">
//               <Form.Label className="fw-semibold small">Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="activity"
//                 value={formData.activity}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </div>
//           <div className="col-md-6">
//             <Form.Group controlId="criteria">
//               <Form.Label className="fw-semibold small">Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="criteria"
//                 value={formData.criteria}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//           </div>
//         </div>

//         {/* Header Fields */}
//         <div className="row g-3 mb-3">
//           <div className="col-md-6">
//             <Form.Group controlId="projectName">
//               <Form.Label className="fw-semibold small">
//                 Project Name <span className="text-danger">*</span>
//                 <Link to={"/add-project"}>
//                   <i
//                     className="fa fa-plus ms-2"
//                     style={{ cursor: "pointer", color: "#0d6efd" }}
//                   ></i>
//                 </Link>
//               </Form.Label>
//               <Form.Select
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Project</option>
//                 {projectLoading ? (
//                   <option disabled>Loading...</option>
//                 ) : (
//                   projects.map((project) => (
//                     <option key={project._id} value={project._id}>
//                       {project.name}
//                     </option>
//                   ))
//                 )}
//               </Form.Select>
//             </Form.Group>
//           </div>
//           <div className="col-md-6">
//             <Form.Group controlId="inspectionType">
//               <Form.Label className="fw-semibold small">
//                 Task Type <span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 name="inspectionType"
//                 value={formData.inspectionType}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Task Type</option>
//                 <option value="Structural">In wall install</option>
//                 <option value="inspection">Inspection hold-point</option>
//                 <option value="Electrical">Electrical</option>
//                 <option value="Plumbing">Plumbing</option>
//                 <option value="Mechanical">Mechanical</option>
//                 <option value="Civil">Civil</option>
//                 <option value="Quality Control">Quality Control</option>
//               </Form.Select>
//             </Form.Group>
//           </div>
//         </div>

//         <div className="row g-3 mb-3">
//           <div className="col-md-6">
//             <Form.Group controlId="inspector">
//               <Form.Label className="fw-semibold small">
//                 {/* if role is admin then assigned */}
//                 Assigned To <span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Select
//                 name="inspector"
//                 value={formData.inspector}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select User</option>
//                 {users.map((user) => (
//                   <option key={user._id} value={user._id}>
//                     {user.name || `${user.firstName} ${user.lastName}`}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </div>
//           <div className="col-md-6">
//             <Form.Group controlId="inspectionDate">
//               <Form.Label className="fw-semibold small">
//                 Inspection Date <span className="text-danger">*</span>
//               </Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type="date"
//                   name="inspectionDate"
//                   value={formData.inspectionDate}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </InputGroup>
//             </Form.Group>
//           </div>
//         </div>

//         <div className="row g-3 mb-3">
//           <div className="col-md-6">
//             <Form.Group controlId="status">
//               <Form.Label className="fw-semibold small">Status</Form.Label>
//               <Form.Select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Status</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Pending">Pending</option>
//                 <option value="UnderReview">Under Review</option>
//               </Form.Select>
//             </Form.Group>
//           </div>

//           <div className="col-md-6">
// {/* <InputGroup className="flex justify-content-between mb-3">
//             <Form.Group controlId="unitno">
//               <Form.Label className="fw-semibold small">Unit No</Form.Label>
//               <Form.Control 
//                 type="text"
//                 name="unitno"
//                 value={formData.unitno}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group> 
//             <Form.Group controlId="zone">
//               <Form.Label className="fw-semibold small">Zone </Form.Label>
//               <Form.Control 
//                 type="text"
//                 name="zone"
//                 value={formData.zone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group> 
//             </InputGroup> */}

// <div className="row mb-3">
//   <div className="col-md-6">
//     <Form.Group controlId="unitno">
//       <Form.Label className="fw-semibold small">Unit No</Form.Label>
//       <Form.Control 
//         type="text"
//         name="unitno"
//         value={formData.unitno}
//         onChange={handleInputChange}
//         required
//       />
//     </Form.Group>
//   </div>

//   <div className="col-md-6">
//     <Form.Group controlId="zone">
//       <Form.Label className="fw-semibold small">Zone</Form.Label>
//       <Form.Control 
//         type="text"
//         name="zone"
//         value={formData.zone}
//         onChange={handleInputChange}
//         required
//       />
//     </Form.Group>
//   </div>
// </div>

//           </div>

//         </div>

//         {/* Inspection Items */}
//         <Form.Group className="mb-3">
//           <Form.Label className="fw-semibold small">
//             Inspection Items <span className="text-danger">*</span>
//           </Form.Label>
//           {items.map((item, index) => (
//             // <InputGroup className="mb-2" key={index}>
//             //   <Form.Control
//             //     placeholder="Item Description"
//             //     value={item.itemDescription}
//             //     name="itemDescription"
//             //     onChange={(e) => handleItemChange(index, e)}
//             //     required
//             //   />
//             //   <Form.Select
//             //     name="status"
//             //     value={item.status.toString()} // Convert boolean to string for select
//             //     onChange={(e) => handleItemChange(index, e)}
//             //     required
//             //   >
//             //     <option value="true">Meet Specs</option>
//             //     <option value="false">Requires rework</option>
//             //   </Form.Select>
//             //   <Form.Control
//             //     placeholder="Comments"
//             //     value={item.comments}
//             //     name="comments"
//             //     onChange={(e) => handleItemChange(index, e)}
//             //   />

             
//             //   <Button
//             //     variant="outline-danger"
//             //     onClick={() => removeItem(index)}
//             //     disabled={items.length === 1}
//             //   >
//             //     <FaTrash />
//             //   </Button>
//             //   <Button variant="outline-secondary">
//             //     <FaEdit />
//             //   </Button>
//             //   <Button variant="outline-dark">
//             //     <FaCopy />
//             //   </Button>
//             // </InputGroup>
//             <InputGroup className="mb-2" key={index}>
//   <Form.Control
//     placeholder="Item Description"
//     value={item.itemDescription}
//     name="itemDescription"
//     onChange={(e) => handleItemChange(index, e)}
//     required
//   />
  
//   <Form.Select
//     name="status"
//     value={item.status.toString()} // Convert boolean to string for select
//     onChange={(e) => handleItemChange(index, e)}
//     required
//   >
//     <option value="true">Meet Specs</option>
//     <option value="false">Requires rework</option>
//   </Form.Select>

//   <Form.Control
//     placeholder="Comments"
//     value={item.comments}
//     name="comments"
//     onChange={(e) => handleItemChange(index, e)}
//   />

//   {/* Image Upload Field */}
//   <Form.Control
//     type="file"
//     name="images"
//     accept="image/*"
//     onChange={(e) => handleImageChange(index, e)}
//   />

//   <Button
//     variant="outline-danger"
//     onClick={() => removeItem(index)}
//     disabled={items.length === 1}
//   >
//     <FaTrash />
//   </Button>
//   <Button variant="outline-secondary">
//     <FaEdit />
//   </Button>

// </InputGroup>

//           ))}
//           <Button
//             variant="link"
//             className="text-dark fw-semibold mt-2"
//             onClick={addItem}
//           >
//             + Add Item
//           </Button>
//         </Form.Group>

//         {/* Attachments */}
//         <Form.Group className="mb-4">
//           <Form.Label className="fw-semibold small">Attachments</Form.Label>
//           {formData.image && formData.image.length > 0 && (
//             <div className="mb-2">
//               <small className="text-muted">
//                 {formData.image.length} file(s) attached
//               </small>
//             </div>
//           )}
//           <div
//             className="border border-secondary-subtle text-center p-4 rounded"
//             style={{ borderStyle: "dashed", background: "#fafafa" }}
//           >
//             <FaCloudUploadAlt size={30} className="text-secondary mb-2" />
//             <p className="text-muted mb-0">
//               Drag and drop files here or click to upload
//             </p>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileUpload}
//               style={{ display: "none" }}
//               id="fileUpload"
//             />
//             <label htmlFor="fileUpload" className="text-muted small mb-0">
//               Choose Files
//             </label>
//           </div>
//         </Form.Group>

//         {/* Additional Notes */}
//         <Form.Group className="mb-4">
//           <Form.Label className="fw-semibold small">
//             Additional Notes
//           </Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="additionalNotes"
//             value={formData.additionalNotes}
//             onChange={handleInputChange}
//             placeholder="Enter any additional notes or observations..."
//           />
//         </Form.Group>

//         {/* Footer Buttons */}
//         <div className="d-flex justify-content-end gap-2">
//           <Button variant="outline-secondary" onClick={() => navigate(-1)}>
//             Cancel
//           </Button>
//           <Button
//             style={{ backgroundColor: "#0052CC" }}
//             type="submit"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                 {isEditMode ? "Updating..." : "Saving..."}
//               </>
//             ) : (
//               <>
//                 <FaSave className="me-2" /> {isEditMode ? "Update ITP" : "Save ITP"}
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddITPs;



import { Modal } from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddITPs() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([{ comment: "", photo: null, status: "Meets spec" }]);
  const [folder, setFolder] = useState("Waterproofing");
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Waterproofing");
  const [taskType, setTaskType] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [reviewerComments, setReviewerComments] = useState("");

  const addStep = () => {
    setSteps([...steps, { comment: "", photo: null, status: "Meets spec" }]);
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSubmit = (isDraft = false) => {
    console.log({
      title,
      category,
      taskType,
      folder,
      steps,
      reviewer,
      reviewerComments,
      status: isDraft ? "Draft" : "Submitted"
    });
    // In a real app, this would submit to a backend
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold mb-6 ">New QA Submission</h2>
      <button
            onClick={() => navigate(-1)}
            className="btn bg-primary text-white"
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </button>
</div>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Title
            </label>
            <input
              type="text"
              // className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
               className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., Waterproofing to Wet Area 102"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Category
            </label>
            <select 
            className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Waterproofing">Waterproofing</option>
              <option value="Framing">Framing</option>
              <option value="Services Rough-In">Services Rough-In</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="HVAC">HVAC</option>
              <option value="Concrete">Concrete</option>
              <option value="Drywall">Drywall</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Task Type or Stage
            </label>
            <input
              type="text"
             className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., In-wall install"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Folder Location
            </label>
            <div className="flex gap-2">
              <select
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                
                placeholder="e.g., Level 2 Zone A"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                <option value="Waterproofing">Level 2</option>
                <option value="Framing">Unit 101</option>
                <option value="zone">Zone A</option>

                </select>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 " onClick={() => setShowFolderModal(true)}>
                + New Folder
              </button>
            </div>
          </div>
        </div>


        {
          showFolderModal && (
            <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)} centered size="md">
              <Modal.Header closeButton>
                <Modal.Title>Create New Folder</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-4">
                  <label className="block text-sm font-medium  mb-1">
                    Folder Name
                  </label>
                  <input
                    type="text"
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="e.g., Level 2 Zone A"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium  mb-1">
                    Description (optional)
                  </label>
                  <textarea
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    rows={3}
                    placeholder="Describe the purpose of this folder..."
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 " onClick={() => setShowFolderModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white" onClick={() => setShowFolderModal(false)}>
                  Create Folder
                </button>
              </Modal.Footer>
            </Modal>
          )
        }

        <hr className="my-6" />

        {/* Step-by-Step Entries */}
        <div>
          <h3 className="text-xl font-medium mb-4">Step-by-Step Entries</h3>
          
          {steps.map((step, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium  mb-1">
                    Step Description
                  </label>
                  <textarea
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    rows={3}
                    placeholder="Describe what was done in this step..."
                    value={step.comment}
                    onChange={(e) => updateStep(index, "comment", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Quality Status
                  </label>
                  <select
                    className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    value={step.status}
                    onChange={(e) => updateStep(index, "status", e.target.value)}
                  >
                    <option value="Meets spec">Meets spec</option>
                    <option value="Requires rework">Requires rework</option>
                    <option value="Needs review">Needs review</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium  mb-1">
                  Photo Evidence
                </label>
                <input
                  type="file"
                 className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  onChange={(e) => updateStep(index, "photo", e.target.files[0])}
                />
              </div>
            </div>
          ))}

          <button 
            className="px-4 py-2 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 text-green-700"
            onClick={addStep}
          >
            + Add Step
          </button>
        </div>

        <hr className="my-6" />

        {/* Review Section */}
        <div>
          <h3 className="text-xl font-medium mb-4">Review Assignment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">
                Assign Reviewer
              </label>
              <select
              className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
              >
                <option value="">Select a reviewer...</option>
                <option value="john-smith">John Smith</option>
                <option value="qa-manager">QA Manager</option>
                <option value="maria-garcia">Maria Garcia</option>
                <option value="robert-johnson">Robert Johnson</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium  mb-1">
              Reviewer Comments (optional)
            </label>
            <textarea
             className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              rows={3}
              placeholder="Add any additional comments for the reviewer..."
              value={reviewerComments}
              onChange={(e) => setReviewerComments(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 "
            onClick={() => handleSubmit(true)}
          >
            Save Draft
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
            onClick={() => handleSubmit(false)}
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}