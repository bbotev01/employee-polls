import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Dashboard(props) {
    let navigate = useNavigate();
    const [key, setKey] = useState('new');
    let questions_done = []
    let questions_new = []
    let chunk_questions_done = []
    let chunk_questions_new = []

    const chunkArray = (chunkSize, array) => {
        let result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk)
        }
        return result
    }
    questions_done = props.questionIds.filter((id) => Object.keys(props.current_user.answers).includes(id))
    questions_new = props.questionIds.filter((id) => !Object.keys(props.current_user.answers).includes(id))
    chunk_questions_done = chunkArray(4, questions_done)
    chunk_questions_new = chunkArray(4, questions_new)


    const handleClick = (e) => {
        e.preventDefault()
        let id = e.target.getAttribute('data-id')
        navigate(`/questions/${id}`, { replace: true })
    }

    return (
        <Container data-testid="dashboard">
            <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="new" title="New Questions">
                    <h1>New Questions</h1>
                    {chunk_questions_new.map((chunk, i) => (
                        <Row key={`new-${i}`}>
                            {chunk.map((id) => (
                                <Col key={id} className="mb-5 col-3">
                                    <Card id={id} border="primary">
                                        <Card.Body>
                                            <Card.Title>{props.questions[id].author}</Card.Title>
                                            <Card.Text>
                                                {new Date(props.questions[id].timestamp).toLocaleString()}
                                            </Card.Text>
                                            <Button variant="primary" data-id={id} onClick={handleClick}>Show</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ))
                    }
                </Tab>
                <Tab eventKey="done" title="Done">
                    <h1>Done</h1>
                    <Row>
                        {chunk_questions_done.map((chunk, i) => (
                            <Row key={`done-${i}`}>
                                {chunk.map((id) => (
                                    <Col key={id} className="mb-5 col-3">
                                        <Card id={id} border="primary">
                                            <Card.Body>
                                                <Card.Title>{props.questions[id].author}</Card.Title>
                                                <Card.Text>
                                                    {new Date(props.questions[id].timestamp).toLocaleString()}
                                                </Card.Text>
                                                <Button variant="primary" data-id={id} onClick={handleClick}>Show</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ))
                        }
                    </Row>
                </Tab>
            </Tabs>
            <hr />
        </Container>
    )
}



const mapStateToProps = ({ questions, users, authedUser }) => ({
    questionIds: Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    current_user: users[authedUser],
    questions
});

export default connect(mapStateToProps)(Dashboard);