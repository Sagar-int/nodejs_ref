import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const ImageToText = () => {

    const [testImage, setTestImage] = useState({
        img: ''
    })
    const [filename, setFilename] = useState('');
    const [output, setOutput] = useState("")
    const inputRef = useRef(null);

    const handleFileUpload1 = (e) => {
        setTestImage({ img: e.target.files[0] });
        setFilename(e.target.files[0].name);
    }

    const handleImage2Text = async (e) => {
        e.preventDefault()
        let ImageData = new FormData();
        ImageData.append('img', testImage.img)

        let url = 'http://localhost:4000/api/upload';
        // let url = 'http://localhost:4000/api//image-to-pdf';
        try {
            const res = await axios.post(url, ImageData);
            const { filename } = res.data;

            const res1 = await axios.post('http://localhost:4000/api/convert-to-pdf', { filename });
            alert(`${res1.data}`);
            // if (res.status == 201) {
            //     // setOutput(res.data)
            //     inputRef.current.value = '';
            //     // alert('Form Submitted Successful');
            // }
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
                    <Form.Control type="file" onChange={handleFileUpload1} ref={inputRef} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Convert to Text
                </Button>

                <br /> <br />
                <h2>Output</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={12} value={output} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default ImageToText
