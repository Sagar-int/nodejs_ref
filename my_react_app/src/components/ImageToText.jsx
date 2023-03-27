import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const ImageToText = () => {

    const [testImage, setTestImage] = useState({
        img: ''
    })
    const [output, setOutput] = useState("")

    const handleFileUpload1 = (e) => {
        setTestImage({ img: e.target.files[0] });
    }

    const handleImage2Text = async (e) => {
        e.preventDefault()
        let ImageData = new FormData();
        ImageData.append('img', testImage.img)

        let url = 'http://localhost:4000/api/upload';
        try {
            const res = await axios.post(url, ImageData);
            if (res.status == 201) {
                setOutput(res.data)
                setTestImage("");
                alert('Form Submitted Successful');
            }
        } catch (error) {
            alert('Something went wrong');
        }
    }


    return (
        <div>
            <h1>Extract text from the Image Online</h1>
            <br />
            <Form onSubmit={handleImage2Text}>
                <h2>Input</h2>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Control type="file" onChange={handleFileUpload1} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Convert to Text
                </Button>

                <br /> <br />
                <h2>Output</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={12}  value={output}/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ImageToText
