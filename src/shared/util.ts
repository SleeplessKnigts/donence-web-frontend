export const getUrlParameter = (name: string, search: string) => {
    name = name.replace(/[\\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const getAccessToken = (): string => <string>window.localStorage.getItem('ACCESS_TOKEN');
