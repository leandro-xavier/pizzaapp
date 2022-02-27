import response from "../data/data.json"

export const getStoreId = (name) => {

    return response.response.stores.find(store => store.name === name);

}