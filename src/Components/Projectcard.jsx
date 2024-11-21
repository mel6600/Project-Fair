import React,{useState} from 'react'
import { Card, Modal } from 'react-bootstrap'
import SERVERURL from '../../Services/serverurl';

const Projectcard = ({displayData}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
  <>
<Card className='shadow btn ' style={{width:'26rem'}}  onClick={handleShow}>
    <Card.Img variant='top' height={'200px'} src={`${SERVERURL}/Uploads/${displayData?.projectImage}`}/>
   <Card.Body > 
   <Card.Title>{displayData?.title}</Card.Title>
    </Card.Body>
</Card>
<Modal size='lg'  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<div className="row">
    <div className="col-lg-6">
        <img className='img-fluid' src={`${SERVERURL}/Uploads/${displayData?.projectImage}`} alt="" />
    </div>
    <div className="col-lg-6">
        <h3>{displayData?.title}</h3>
        <span className='fw-bolder'>Language Used:</span> <span className='text-danger'>{displayData?.title}</span>
        <p>Overview: {displayData?.overview}</p>
    </div>
</div>
<div className='float-start mt-2'>
    <a target='_blank' className='btn btn-secondary' href={displayData?.URL}>
    <i className='fa-brands fa-instagram'></i>
    </a>
    <a target='_blank' className='btn btn-secondary ms-2' href={displayData?.gitHub}>
    <i className='fa-brands fa-github'></i>
    </a>
</div>
        </Modal.Body>
      
      </Modal>
  </>
  )
}

export default Projectcard
