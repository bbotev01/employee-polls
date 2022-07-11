import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';


const Navbar = (props) => {
    function logout() {
        props.dispatch(setAuthedUser(null))
    }
    return (
        <Nav>
            <img src={props.avatarURL} height={30} width={30} className="mt-2" style={{ float: 'right' }}></img>
            <NavLink className="nav-link" to="/" data-testid="navbar-home">Home</NavLink>
            <NavLink className="nav-link" to="/leaderboard" data-testid="navbar-leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/add" data-testid="navbar-new">New</NavLink>
            <NavLink className="nav-link" to="/" onClick={logout} data-testid="navbar-logout" style={{ float: 'right' }}>Logout</NavLink>
        </Nav>
    );
};

const mapStateToProps = ({ users, authedUser }) => ({
    avatarURL: users[authedUser].avatarURL
});

export default connect(mapStateToProps)(Navbar);