import { FaPoll } from 'react-icons/fa';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import Alert from 'react-bootstrap/Alert';

function LoginPage(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleUsernameChange = (e) => {
        const text = e.target.value;
        setUsername(text);
    };

    const handlePasswordChange = (e) => {
        const text = e.target.value;
        setPassword(text);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if ((props.users[username]) && (props.users[username].password === password)) {
            setShowError(false)
            props.dispatch(setAuthedUser(username))
        } else {
            setShowError(true)
            // alert("Incorrect username or password")
        }
    }

    return (
        <div className="App">
            {showError && <Alert data-testid="alert" variant="danger" onClose={() => setShowError(false)} dismissible>Incorrect username or password</Alert>}
            <h1>Employee Polls</h1>
            <FaPoll size={420} style={{ color: 'gray' }}></FaPoll>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={handleUsernameChange} data-testid="username-input" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} data-testid="password-input" />
                        </Form.Group>
                        <Button variant="primary" type="submit" data-testid="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ users }) => ({
    users
});

export default connect(mapStateToProps)(LoginPage);