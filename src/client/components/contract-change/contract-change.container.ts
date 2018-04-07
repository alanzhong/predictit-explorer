import { connect } from 'react-redux';
import { getContractDifference, State } from '../../store';
import { ContractChange as ContractChangeComponent } from './contract-change.component';

function mapStateToProps(state: State, ownProps: { contractId: number }) {
  const { contractId } = ownProps;
  return {
    change: getContractDifference(state, contractId)
  };
}

export const ContractChange = connect(mapStateToProps)(ContractChangeComponent);
