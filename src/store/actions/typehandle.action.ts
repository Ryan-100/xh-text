export const FetchRequest = type => ({
  type,
});

export const FetchSuccess = (type, payload) => ({
  type,
  payload,
});

export const FetchFailure = (type, error) => ({
  type,
  error,
});
