import { observable } from "mobx";
import userService from "./../Services/user.service";
import { message } from "antd";

class ProductsStore {
    @observable user = {};
    @observable usFetchingList = true;
    @observable productList = [];
    @observable categoryList = [];
    @observable viewAddEditModal = false;
    @observable imageList = []
    @observable imageListURL = []
    @observable AddEditRecord = null;
    @observable submiting = false;
    @observable file = null

    getUsersList = async () => {
        try {
            this.usFetchingList = true;
            const res = await userService.getList({
                id: localStorage.getItem("id")
            });
            this.usFetchingList = false;
            this.productList = res.data.products;
            this.categoryList = res.data.category;
        } catch (error) {
            this.usFetchingList = false;
            message.error(error, 3)
        }
    }

    handleAddClick = (e, record = null) => {
        this.viewAddEditModal = !this.viewAddEditModal;
        this.AddEditRecord = record;
        if (record) {
            this.imageList = [
                {
                    uid: "-1",
                    name: record.prod_name,
                    status: "done",
                    url: record.image_url
                }
            ];
            this.imageUrl = record.image_url
        }
    }

    handleSubmitForm = (e, form) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    this.submiting = true;
                    if (this.AddEditRecord && this.AddEditRecord._id) {
                        values._id = this.AddEditRecord._id
                    }
                    if (!this.file || !this.imageUrl) {
                        message.error("Please select Image", 2)
                        return
                    }
                    const formData = new window.FormData();
                    formData.append("file", this.file);
                    for (const p in values) {
                        if (values.hasOwnProperty(p)) {
                            if (typeof values[p] === "boolean" || values[p] === 0 || values[p]) {
                                formData.append(p, values[p]);
                            }
                        }
                    }
                    formData.append("user_id", localStorage.getItem("id"))
                    await userService.appUpdateUserProduct(formData);
                    this.submiting = false;
                    form.resetFields()
                    this.viewAddEditModal = false;
                    this.getUsersList()
                } catch (e) {
                    message.error("There was an error", 3)
                }
            }
        })
    }

    handleLoginSubmit = (e, form, history) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    const res = await userService.login(values);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("id", res.data._id);
                    history.push(`/home`);

                } catch (e) {
                    message.error(e.message, 3)
                }
            }
        })
    }

    handleRegisterSubmit = (e, form, history) => {
        e.preventDefault();
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                try {
                    const res = await userService.register(values);
                    message.success(res.message, 2)
                    history.push(`/login`);

                } catch (e) {
                    message.error(e.message, 3)
                }
            }
        })
    }

    getBase64(img, callback) {
        const reader = new window.FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleImageChange = (info) => {
        this.loading = true;
        this.file = info
        this.getBase64(info, imageUrl => {
            const image = {
                uid: "-1",
                name: info.name,
                status: "done",
                url: imageUrl
            };
            this.imageUrl = imageUrl;
            this.imageList = [image];
        });
    }

    handleImageRemove = () => {
        if (this.imageList.length) {
            this.imageList = [];
            this.imageUrl = "";
        }
    };
}

export default ProductsStore;