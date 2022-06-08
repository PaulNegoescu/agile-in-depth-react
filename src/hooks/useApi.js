import { useAuthContext } from '../features/Auth/Auth.context';

const apiUrl = process.env.REACT_APP_API_URL;

export function useApi(resource) {
  const { token, logout } = useAuthContext();
  const url = `${apiUrl}${resource}`;
  const options = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  function handleFetchResponse(res) {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 401) {
      logout();
      return;
    }

    throw new Error('Unexpected fetching error ocurred.');
  }

  function getAll(filters) {
    return fetch(`${url}?${filters}`).then(handleFetchResponse);
  }

  function getOne(id) {
    return fetch(`${url}/${id}`).then(handleFetchResponse);
  }

  function create(body) {
    return fetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }).then(handleFetchResponse);
  }

  function update(id, body) {
    return fetch(`${url}/${id}`, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    }).then(handleFetchResponse);
  }

  function remove(id) {
    return fetch(`${url}/${id}`, { ...options, method: 'DELETE' }).then(
      handleFetchResponse
    );
  }

  return {
    getAll,
    getOne,
    update,
    create,
    remove,
  };
}
