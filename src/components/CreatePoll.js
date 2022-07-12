import { connect } from "react-redux";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { handleAddQuestion } from '../actions/questions';
import { useNavigate } from "react-router-dom";

function CreatePoll(props) {
    let navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleFirstOptionChange = (e) => {
        const text = e.target.value;
        setFirstOption(text);
    };

    const handleSecondOptionChange = (e) => {
        const text = e.target.value;
        setSecondOption(text);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/", { replace: true })
        setFirstOption("");
        setSecondOption("")

    }

    return (
        <Container>
            <h1>Would you rather?</h1>
            <h3>Create your own poll</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstOption">
                    <Form.Label>First Option</Form.Label>
                    <Form.Control type="text" placeholder="" value={firstOption} onChange={handleFirstOptionChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="secondOption">
                    <Form.Label>Second Option</Form.Label>
                    <Form.Control type="text" placeholder="" value={secondOption} onChange={handleSecondOptionChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default connect()(CreatePoll);