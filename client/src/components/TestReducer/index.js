import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as testReducerActions from "../../store/actions/testReducer";

import { Button } from "react-bootstrap";

// como toggleTestState tem o mesmo nome da action declarada na outra pasta (pasta de actions), podemos só escrever dessa forma abaixo
class TestReducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    };
  }

  handleChange() {
    this.setState({ change: true });
    this.props.toggleTestState(this.props.info);
  }

  render() {
    return (
      <div>
        {this.props.info.map((element) => (
          <div key={element.id}>
            <p className="m-1">{element.teste}</p>
          </div>
        ))}
        <Button
          variant="secondary"
          className="m-1"
          onClick={(_) => this.handleChange()}
        >
          Adicionar teste
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.testReducer.sla,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(testReducerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TestReducer);
