import React from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Input, Select, Upload, Icon } from "antd";

@observer
class AddEditProduct extends React.Component {
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {
            users: {
                viewAddEditModal,
                AddEditRecord,
                handleSubmitForm,
                handleAddClick,
                categoryList,
                handleImageRemove,
                imageList,
                handleImageChange
            },
            form,
            form: {
                getFieldDecorator,
            }
        } = this.props
        return (
            <Modal
                title={AddEditRecord && AddEditRecord._id ? "Edit Product" : "Add Product"}
                visible={viewAddEditModal}
                footer={[
                    <Button onClick={e => handleAddClick(e)} key="cancel"> Cancel</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        // loading={submiting}
                        onClick={e => handleSubmitForm(e, form)}>
                        {AddEditRecord && AddEditRecord._id ? "Edit Product" : "Add Product"}
                    </Button>
                ]}
            >
                <Form >
                    <Form.Item label={"Product Name"}>
                        {getFieldDecorator('prod_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input product name!'
                                }
                            ],
                            initialValue: AddEditRecord && AddEditRecord.prod_name
                        })(
                            <Input
                                placeholder="Product Name"
                            />
                        )}

                    </Form.Item>
                    <Form.Item label={"Price"}>
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Please input product price!' }],
                            initialValue: AddEditRecord && AddEditRecord.price
                        })(
                            <Input
                                type="number"
                                htmltype="number"
                                placeholder="Product Price"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={"Category"}>
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: 'Please select category!' }],
                            initialValue: (AddEditRecord && Number(AddEditRecord.category)) || 1
                        })(
                            <Select>
                                {categoryList.map(obj => (
                                    <Select.Option key={obj.id} value={obj.id}>
                                        {obj.cat_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Upload
                        name="carImage"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={true}
                        beforeUpload={handleImageChange}
                        onRemove={handleImageRemove}
                        fileList={imageList}
                    >
                        {imageList.length > 0 ? null : uploadButton}
                    </Upload>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(AddEditProduct)