import httpClient from './constant/HttpClient';
export * from './constant/ApiRoutes';

const controller = async (endpoint, ...data) => {
  const api = endpoint.split(':');
  const client = httpClient[api[0]](api[1], ...data);
  return await client.then(res => res && res).catch(error => error);
};

export default controller;
