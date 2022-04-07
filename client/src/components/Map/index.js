import React, { Component } from "react";

import { connect } from "react-redux";
import { Creators as MapCreator } from "../../store/ducks/mapInfo";

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.props.getMapInfo(0);
  }

  render() {
    const { from, to, mapsKey } = this.props.mapInfo.data;
    return <></>;
  }
}

const mapStateToProps = ({ mapInfo }) => ({ mapInfo });

export default connect(mapStateToProps, { ...MapCreator })(Mapa);
