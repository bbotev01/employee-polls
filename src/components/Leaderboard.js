import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

function Leaderboard(props) {
    return (
        <Container data-testid="leaderboard">
            <Table striped>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usersSorted.map((user) => (
                        <tr key={user.id} data-testid={user.id}>
                            <td style={{ textAlign: 'left' }}>
                                <img src={user.avatarURL} height={30} width={30}></img>
                                {user.name}
                                <br />
                                <small style={{ marginLeft: '40px', marginTop: '0' }}>{user.id}</small>
                            </td>
                            <td>{Object.values(user.answers).length}</td>
                            <td>{user.questions.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </Container>
    )
}

const mapStateToProps = ({ users }) => ({
    usersSorted: Object.values(users).sort(
        (a, b) => (b.questions.length + Object.values(b.answers).length) - (a.questions.length + Object.values(a.answers).length)
    ),
});

export default connect(mapStateToProps)(Leaderboard);