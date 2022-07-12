import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import CreatePoll from './CreatePoll';
import Poll from './Poll';
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';
import { handleInitialData } from "../actions/shared";
import { useEffect, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  if (props.loading === true) {
    return (
      <LoadingBar />
    )
  } else if (props.authorized === true) {
    return (
      <Fragment>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/add" element={<CreatePoll />} />
            <Route path="/question/:id" element={<Poll />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Fragment>

    )
  } else {
    return (
      <LoginPage />
    )
  }
}

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  loading: loadingBar.default === 1,
  authorized: authedUser !== null
});

export default connect(mapStateToProps)(App);
