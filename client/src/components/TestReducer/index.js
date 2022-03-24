import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as testReducerActions from '../../store/actions/testReducer';

import { Button } from 'react-bootstrap';

// como toggleTestState tem o mesmo nome da action declarada na outra pasta (pasta de actions), podemos só escrever dessa forma abaixo
const TestReducer = ({ infos, toggleTestState }) => (
  <div>
    <h1>Oi</h1>
    {infos.forEach((element) => {
      <div>
        <h2>{element.id}</h2>
        <Button variant='secondary' className='m-1'>
          {element.test}
        </Button>
      </div>;
    })}
  </div>
);

const mapStateToProps = (state) => ({
  infos: state.testReducer.sla,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(testReducerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TestReducer);
