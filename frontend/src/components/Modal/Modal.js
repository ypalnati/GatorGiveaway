import React from 'react';

const Modal = (props) => {

  const handleFileInput = (e) => {
    props.setSelectedFile(e.target.files[0]);
  }
  return (
    <div className="modal fade" id={props.Id} tabindex="-1" aria-labelledby="editPostLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editPostLabel">Edit Post</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={props.method}>
            <div className="modal-body">


              <div className="mb-3">
                <label for="nameIput" className="form-label">Name</label>
                <input className="form-control" type='text' placeholder='Enter Name' name='name' />
              </div>
              <div className="mb-3">
                <label for="DescriptionIput" className="form-label">Description</label>
                <input className="form-control" type='text' placeholder='Enter Description' name='Description' />
              </div>
              <div className="mb-3">
                <label for="LocationIput" className="form-label">Location</label>
                <input className="form-control" type='text' placeholder='Enter Location' name='Location' />
              </div>
              <div className="mb-3">
                <label for="DimensionsIput" className="form-label">Dimensions</label>
                <input className="form-control" type='text' placeholder='Enter Dimensions' name='Dimensions' />
              </div>

              <div className="mb-3">
                <label for="WeightIput" className="form-label">Weight</label>
                <input className="form-control" type='text' placeholder='Enter Weight' name='Weight' />
              </div>

              <div className="mb-3">
                <label for="AgeIput" className="form-label">Age</label>
                <input className="form-control" type='text' placeholder='Enter Age' name='Age' />
              </div>

              <div className="mb-3">
                <label for="CountIput" className="form-label">Count</label>
                <input className="form-control" type='text' placeholder='Enter Count' name='Count' />
              </div>
              <div>
                <div>React S3 File Upload</div>
                <input name='file' type="file" onChange={handleFileInput} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}


export default Modal;