export const fetchProductFrom =
  (url: string) =>
  async <R,>(id: string) => {
    const response = await fetch(`${url}/${id}`);
    const data: R = await response.json();
    return data;
  };
