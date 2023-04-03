import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';

const initialValues = {
    name: '',
    email: '',
    city: '',
    mobile: ''
}

const FormicForm = () => {

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleReset,
        handleSubmit
    } = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log("Values1111>>>>", values);
        }
    })


    const AfterSubmit = (e) => {
        e.preventDefault()
        console.log("Values222>>>", values);
    }



    return (
        <div className='formic_form'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name='city'
                        value={values.city}
                        onChange={handleChange}
                        placeholder="Enter your city name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                        type="text"
                        name='mobile'
                        value={values.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default FormicForm