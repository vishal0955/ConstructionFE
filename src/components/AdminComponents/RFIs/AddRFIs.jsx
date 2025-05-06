import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRFI } from "../../../redux/slices/rfiSlice";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { Stage, Layer, Circle } from "react-konva";

function AddRFIs() {
  const { data: users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    due_date: "",
    assignee: "",
    department: "",
    description: "",
    image: [],
    drawingMarkup: null, // Stores the drawing markup data
  });

  const [responses, setResponses] = useState([]); // Stores threaded responses
  const [newResponse, setNewResponse] = useState(""); // New response text
  const [showDrawingModal, setShowDrawingModal] = useState(false);
  const [drawingShapes, setDrawingShapes] = useState([]); // Stores shapes drawn on the canvas
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // Default color
  const [aiResponse, setAiResponse] = useState(""); // Stores the AI-generated response
  const [loadingAI, setLoadingAI] = useState(false); // Loading state for AI response
  const [showAIResponseModal, setShowAIResponseModal] = useState(false); // Modal for AI response
  const stageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("subject", formData.subject);
    submitData.append("priority", formData.priority);
    submitData.append("due_date", formData.due_date);
    submitData.append("assignee", formData.assignee);
    submitData.append("department", formData.department);
    submitData.append("description", formData.description);
    submitData.append("drawingMarkup", JSON.stringify(formData.drawingMarkup)); // Include drawing markup

    formData.image.forEach((file) => {
      submitData.append("image", file);
    });

    dispatch(createRFI(submitData))
      .unwrap()
      .then(() => {
        toast.success("RFI created successfully!");
        setAiResponse(""); // Clear AI response after submission
      })
      .catch(() => {
        toast.error("Failed to create RFI");
      });
  };

  const handleGenerateAIResponse = async () => {
    setLoadingAI(true);
    try {
      // Simulate an API call to generate AI response
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              "This is an AI-generated response based on the attached documents and drawings."
            ),
          2000
        )
      );
      setAiResponse(response);
      setShowAIResponseModal(true); // Show the AI response modal
      toast.info("AI-generated suggestion is ready.");
    } catch (error) {
      toast.error("Failed to generate AI response.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSaveAIResponse = () => {
    toast.success("AI response saved successfully!");
    setShowAIResponseModal(false); // Close the modal
  };

  const handleAddResponse = () => {
    if (!newResponse.trim()) {
      toast.error("Response cannot be empty.");
      return;
    }

    const response = {
      text: newResponse,
      role: "builder", // Example role, can be dynamic
      timestamp: new Date().toISOString(),
    };

    setResponses((prev) => [...prev, response]);
    setNewResponse(""); // Clear the input field
    toast.success("Response added successfully!");
  };

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
  };

  const handleDrawingMove = (e) => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    setDrawingShapes((prev) => [
      ...prev,
      { x: point.x, y: point.y, type: "circle", radius: 5, color: selectedColor },
    ]);
  };

  const saveDrawing = () => {
    setFormData((prev) => ({
      ...prev,
      drawingMarkup: drawingShapes,
    }));
    setShowDrawingModal(false);
    toast.success("Drawing markup saved!");
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">New RFI</h5>
        <div className="d-flex gap-2 text-nowrap">
          <Link to="/rfis">
            <button className="btn set_btn text-white">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Assignee</label>
            <select
              className="form-select"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select assignee
              </option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="engineering">Engineering</option>
              <option value="construction">Construction</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Attachments</label>
          <div
            className="border rounded p-3 text-center"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              className="d-none"
              id="fileUpload"
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileUpload"
              className="mb-0"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-cloud-upload fs-3 text-muted"></i>
              <p className="text-muted small mb-0 mt-2">
                Upload files or drag and drop
              </p>
              <p className="text-muted small mb-0">PNG, JPG, PDF up to 10MB</p>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowDrawingModal(true)}
          >
            Mark Area on Drawing
          </button>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit RFI
          </button>
        </div>
      </form>
     {/* Generate AI Response Section */}
     <div className="mt-4">
        <h5>Generate AI Response</h5>
        <button
          className="btn btn-info"
          onClick={handleGenerateAIResponse}
          disabled={loadingAI}
        >
          {loadingAI ? "Generating..." : "Generate AI Response"}
        </button>
      </div>
      {/* Threaded Responses Section */}
      <div className="mt-5">
        <h5>Responses</h5>
        <div className="bg-light p-3 rounded">
          {responses.length > 0 ? (
            responses.map((response, index) => (
              <div key={index} className="mb-3">
                <strong>{response.role}</strong> ({new Date(response.timestamp).toLocaleString()}):
                <p>{response.text}</p>
              </div>
            ))
          ) : (
            <p>No responses yet.</p>
          )}
        </div>
        <div className="mt-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Add a response..."
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleAddResponse}>
            Add Response
          </button>
        </div>
      </div>

 

      {/* AI Response Modal */}
      <Modal
        show={showAIResponseModal}
        onHide={() => setShowAIResponseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>AI-Generated Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows="6"
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
          ></textarea>
          <p className="text-muted mt-2">
            Disclaimer: AI-generated draft. Review before submission.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAIResponseModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAIResponse}>
            Save Response
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Drawing Markup Modal */}
      <Modal show={showDrawingModal} onHide={() => setShowDrawingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mark Area on Drawing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Select Color</label>
            <input
              type="color"
              className="form-control form-control-color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              width: "100%",
              height: "400px",
              position: "relative",
            }}
          >
            <Stage
              width={window.innerWidth * 0.8}
              height={400}
              onMouseDown={handleDrawingStart}
              onMouseUp={handleDrawingEnd}
              onMouseMove={handleDrawingMove}
              ref={stageRef}
            >
              <Layer>
                {drawingShapes.map((shape, index) => (
                  <Circle
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.color}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDrawingModal(false);
              setDrawingShapes([]);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveDrawing}>
            Save Markup
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default AddRFIs;