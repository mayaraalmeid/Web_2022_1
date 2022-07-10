import { Toast, ToastContainer } from "react-bootstrap"

const ToastCheck = (props) => {
    return (
        <ToastContainer className="p-3" position='top-center'>
            <Toast onClose={()=>props.setShowToast(false)} show={props.show}  bg={props.bg} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{props.header}</strong>
                </Toast.Header>
                <Toast.Body className='text-white'>{props.body}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastCheck;