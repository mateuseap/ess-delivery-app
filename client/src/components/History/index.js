import React, { Component } from "react";

import { connect } from "react-redux";
import { Creators as HistoryCreator } from "../../store/ducks/history";

class History extends Component {
  componentDidMount() {
    this.props.getHistory();
  }

  render() {
    const { data } = this.props.history;
    return <h1>oi</h1>;
  }
}

const mapStateToProps = ({ history }) => ({ history });

export default connect(mapStateToProps, { ...HistoryCreator })(History);
