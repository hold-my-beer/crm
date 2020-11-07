import React from 'react';
import { connect } from 'react-redux';
import { confirmDelete, declineDelete } from '../../actions/del';
import PropTypes from 'prop-types';

const DeleteModal = ({
  confirmDelete,
  declineDelete,
  del: { className, entity }
}) /*({ className, onResetClassName })*/ => {
  return (
    <div className={className}>
      <p className="lead text-center">
        Вы действительно хотите удалить {entity.toLowerCase()}? {entity} и
        связанные данные будут удалены без возможности восстановления.
      </p>
      <input
        type="button"
        className="btn btn-primary btn-block"
        value="Не удалять"
        onClick={declineDelete}
      />
      <input
        type="button"
        className="btn btn-danger btn-block"
        value="Удалить"
        // onClick={onResetClassName}
        onClick={confirmDelete}
      />
    </div>
  );
};

DeleteModal.propTypes = {
  confirmDelete: PropTypes.func.isRequired,
  declineDelete: PropTypes.func.isRequired,
  del: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  del: state.del
});

export default connect(mapStateToProps, { confirmDelete, declineDelete })(
  DeleteModal
);
