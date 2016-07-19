import React, { PropTypes } from 'react';
import {Table, Thead, Th} from 'reactable';



const Spinner = () => {
  return (
    <div className="sk-cube-grid">
      <div className="sk-cube sk-cube1"></div>
      <div className="sk-cube sk-cube2"></div>
      <div className="sk-cube sk-cube3"></div>
      <div className="sk-cube sk-cube4"></div>
      <div className="sk-cube sk-cube5"></div>
      <div className="sk-cube sk-cube6"></div>
      <div className="sk-cube sk-cube7"></div>
      <div className="sk-cube sk-cube8"></div>
      <div className="sk-cube sk-cube9"></div>
    </div>
  );
};

const keyToLabel = [
  {key: 'id', label: 'Id'},
  {key: 'name', label: 'Name'},
  {key: 'arrestCount', label: 'Arrest Count'},
  {key: 'draftPick', label: 'Draft Pick'},
  {key: 'team', label: 'Team'},
  {key: 'position', label: 'Position'}
];

class PlayerTable extends React.Component {
  componentDidMount() {
    const {loadData, players} = this.props;
    if(!players.loading) {
      loadData();
    }
  }

  render() {
    const players = this.props.players || {};
    const rows = players.data || [];
    return (
      <div className="flex four grow">
        <Table className="off-fourth" data={rows} columns={keyToLabel} >
        </Table>
      </div>
    );
  };
}

PlayerTable.propTypes = {
  players: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired
  }),
  loadData: PropTypes.func.isRequired
};

export default PlayerTable;