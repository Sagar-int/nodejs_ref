import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify';

const BasicForm = ({ handleData }) => {
    let obj = {
        name: '',
        city: '',
        mobile: '',
        profile: '',
    }
    const [formData, setFormData] = useState(obj)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value });
    }

    const handleFileUpload = (e) => {
        setFormData({ ...formData, profile: e.target.files[0] });
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        let FormWithFileData = new FormData();
        FormWithFileData.append('profile', formData.profile)
        FormWithFileData.append('name', formData.name)
        FormWithFileData.append('city', formData.city)
        FormWithFileData.append('mobile', formData.mobile)

        let url = 'http://localhost:5000/api/user';
        try {
            const res = await axios.post(url, FormWithFileData);
            if (res.status == 201) {
                toast.success('Form Submitted successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setFormData(obj);
            }
        } catch (error) {
            toast.error(`Oops! Some error occurred!, ${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }


    const getData = async () => {
        const { data } = await axios.get('http://localhost:5000/api/users');
        handleData(data.user)
    }

    useEffect(() => {
        getData()
    }, [formData])




    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="text" name='mobile' value={formData.mobile} onChange={handleInputChange} placeholder="Enter your mobile number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name='city' value={formData.city} onChange={handleInputChange} placeholder="Enter your city name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Profile</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>

                {/* <Button variant="secondary" onClick={() => customToast}>
                    Click Toast
                </Button> */}
            </Form>

        </div>
    )
}

export default BasicForm