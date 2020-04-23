import APIProvider from "./../APIProvider";

const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
};


class UserService {
    login = (data) => APIProvider.post("login", data, headers);
    register = (data) => APIProvider.post("register", data, headers);
    getList = (data) => APIProvider.get(`list`, data, headers);

    appUpdateUserProduct = data => {
        headers['Content-Type'] = undefined
        return APIProvider.post("addUpdateProduct", data, headers)
    };
}

export default new UserService()