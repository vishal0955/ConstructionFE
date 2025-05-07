import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const PPERegisterUI = () => {
  const templateModalRef = useRef(null);
  const assignmentModalRef = useRef(null);
  const subcontractorModalRef = useRef(null);

  const openModal = (ref) => {
    const modal = new window.bootstrap.Modal(ref.current);
    modal.show();
  };

  const defaultPPEList = [
    "Hard Hat",
    "Safety Glasses",
    "Gloves",
    "High-Vis Vest",
    "Steel-Toe Boots",
    "Respirator"
  ];

  return (
    <div className="main bg-white text-dark" style={{ minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-10 p-4">
            <div className="tab-content">
              <section id="templatesSection" className="tab-pane fade show active">
                <h3>PPE Templates</h3>
                <button className="btn btn-primary mb-3" onClick={() => openModal(templateModalRef)}>+ Create New Template</button>
                <button className="btn btn-primary mb-3" onClick={() => openModal(assignmentModalRef)}>+ Open Smart Assignment</button>
                <button className="btn btn-primary mb-3" onClick={() => openModal(subcontractorModalRef)}>+ Open Subcontractor View</button>

                <div className="row mb-3 g-2">
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Filter by Task Name" />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Filter by PPE Item" />
                  </div>
                  <div className="col-md-4">
                    <select className="form-select">
                      <option>Filter by Assigned Company</option>
                      <option>ABC Constructions</option>
                      <option>XYZ Builders</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" required>
                      <option>High-Risk Works</option>
                      <option>General Trades</option>
                      <option>Site-Wide Requirements</option>
                    </select>
                  </div>
                </div>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Required PPE</th>
                      <th>Mandatory</th>
                      <th>Safety Standard</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="7" className="text-center">No templates found.</td>
                    </tr>
                  </tbody>
                </table>

                <div className="input-group mt-3" style={{ maxWidth: "400px" }}>
                  <input type="text" className="form-control" placeholder="Add New PPE Type" />
                  <button className="btn btn-success">Add</button>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Template Modal */}
      <div className="modal fade" ref={templateModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create PPE Template</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" />
              <div className="mb-3">
                <label className="form-label">Task Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" required>
                  <option>High-Risk Works</option>
                  <option>General Trades</option>
                  <option>Site-Wide Requirements</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description of Task</label>
                <textarea className="form-control" rows="2"></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Required PPE List</label>
                <div className="ppe-list border rounded p-2" style={{ maxHeight: "150px", overflowY: "auto" }}>
                  {defaultPPEList.map((item, i) => (
                    <div className="form-check" key={i}>
                      <input className="form-check-input" type="checkbox" id={`ppe-${i}`} />
                      <label className="form-check-label" htmlFor={`ppe-${i}`}>{item}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="mandatoryToggle" />
                <label className="form-check-label" htmlFor="mandatoryToggle">Mandatory</label>
              </div>
              <div className="mb-3">
                <label className="form-label">Safety Standard Reference</label>
                <input type="text" className="form-control" placeholder="e.g. AS/NZS 1337" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary">Save Template</button>
            </div>
          </form>
        </div>
      </div>

      {/* Smart Assignment Modal */}
      <div className="modal fade" ref={assignmentModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Smart Assignment</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 align-items-center mb-4">
                <div className="col-md-3">
                  <label className="form-label">Assign To</label>
                  <select className="form-select">
                    <option value="Entire Site">Entire Site</option>
                    <option value="Specific Subcontractor">Specific Subcontractor</option>
                    <option value="Specific Task">Specific Task</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Subcontractor</label>
                  <select className="form-select">
                    <option>Select Subcontractor</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Task</label>
                  <select className="form-select">
                    <option>Select Task</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">PPE Template</label>
                  <select className="form-select">
                    <option>Select Template</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">Assign</button>
                </div>
              </form>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Assign To</th>
                    <th>Subcontractor</th>
                    <th>Task</th>
                    <th>PPE Template</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">No assignments yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Subcontractor View Modal */}
      <div className="modal fade" ref={subcontractorModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Subcontractor View</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <h3>Subcontractor View</h3>
              <label className="form-label">Select Subcontractor</label>
              <select className="form-select mb-3">
                <option>ABC Constructions</option>
                <option>XYZ Builders</option>
              </select>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Required PPE</th>
                    <th>Mandatory</th>
                    <th>Safety Standard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">No PPE requirements assigned.</td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-success">Download Checklist</button>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPERegisterUI;