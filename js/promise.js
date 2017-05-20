
function warn(error) {
  console.log('hieu erro');
  throw error; // To let the caller handle the rejection
}

module.exports = () => next => action => (
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action)
  );
