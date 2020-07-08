import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // eslint-disable-next-line react/display-name
  return props => {
    // running something before the return statement and inside this components body,
    // effectively simulates the lifecycle hook componentWillMount
    // running something inside useEffect is like simulating componentDidMount - important difference
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal title="Error" show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />;
      </>
    );
  };
};

export default withErrorHandler;
