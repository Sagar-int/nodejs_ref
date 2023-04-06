import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify';

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

        let url = 'http://localhost:5000/api/upload';
        try {
            const res = await axios.post(url, ImageData);
            const { filename, text } = res.data;
            
            // const res1 = await axios.post('http://localhost:4000/api/convert-to-pdf', { filename });
            if (res.status == 201) {
                setOutput(text)
                inputRef.current.value = '';
                toast.success('Image successfully uploaded!', {
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
