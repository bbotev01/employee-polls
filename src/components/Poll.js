import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { handleVoteQuestion } from '../actions/questions'

function Poll(props) {
    const [question, setQuestion] = useState(null);
    const [voted, setVoted] = useState(false);
    let params = useParams();

    useEffect(() => {
        setQuestion(props.questions[params.id])
        if (question && (question.optionOne.votes.includes(props.authedUser) || question.optionTwo.votes.includes(props.authedUser))) {
            setVoted(true);
        }
    }, [question])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleVoteClick = (e) => {
        //e.preventDefault()
        let option = e.target.getAttribute('data-option');
        props.dispatch(handleVoteQuestion(question.id, option));
        setVoted(true);
    }

    return (
        question &&
        <Container>
            <h1>Poll by {question.author}</h1>
            <img src={props.users[question.author].avatarURL} alt="avatar"></img>
            <h2>Would you rather?</h2>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                {capitalizeFirstLetter(question.optionOne.text)}
                            </Card.Text>
                            <Button variant="primary" data-option="optionOne" onClick={handleVoteClick} disabled={voted}>Vote</Button>
                        </Card.Body>
                        {voted &&
                            <Card.Footer className="text-muted">Percent: {Math.round(100 * question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))}% <br /> Votes: {question.optionOne.votes.length} </Card.Footer>}
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                {capitalizeFirstLetter(question.optionTwo.text)}
                            </Card.Text>
                            <Button variant="primary" data-option="optionTwo" onClick={handleVoteClick} disabled={voted}>Vote</Button>
                        </Card.Body>
                        {voted && <Card.Footer className="text-muted">Percent: {100 - Math.round(100 * question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))}% <br /> Votes: {question.optionTwo.votes.length} </Card.Footer>}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = ({ questions, users, authedUser }) => ({
    questions,
    users,
    authedUser
});

export default connect(mapStateToProps)(Poll);