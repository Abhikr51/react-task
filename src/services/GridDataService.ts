import { BASE_URL } from "../app.config";
import Endpoints from "../endpoints";

export default {
    fetchDefaultData: () => new Promise((resolve, reject) => {
        fetch(BASE_URL + Endpoints.defaultData)
            .then(response => {
                if (!response.ok) {
                    reject(new Error('Network response was not ok'));
                }
                return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => reject(error));
    }),
    test: () => new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(response => {
                if (!response.ok) {
                    reject(new Error('Network response was not ok'));
                }
                return response.json();
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => reject(error));
    })
}