export function createResource(promise) {
  let status = 'pending';
  let res = promise.then(
    (data) => {
      status = 'success';
      res = data;
    },
    (error) => {
      status = 'error';
      res = error;
    }
  );

  return {
    read() {
      if (status === 'pending' || status === 'error') {
        throw res;
      } else {
        return res;
      }
    },
  };
}
