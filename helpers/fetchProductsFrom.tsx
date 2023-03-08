export const fetchProductsFrom = (url: string) => async <R,>(takeCount?: number, offset?: number) => {
    let path = url;
    if (takeCount && offset) {
        path = `${url}?take=${takeCount}&offset=${offset}`
    }
    const response = await fetch(path);
    const data: R[] = await response.json();
    return data;
}