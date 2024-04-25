import React, { useEffect ,useState} from 'react'

export default function Update() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    // open the modal when the page loads
    setIsOpen(true)
    console.log("dedddddddddddddddddd");
  },[])
  return (
    <div>
      <div className="modal" tabindex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
