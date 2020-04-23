import React from "react";
import UserProductTabel from "./ProdctTable/index";
import AddEditUserModal from "./ProductModal";
import { Button, Layout } from "antd"
import { observer } from "mobx-react";
@observer
class UsersProductComponent extends React.Component {
    componentDidMount() {
        const {
            users: {
                getUsersList,
            }
        } = this.props;
        getUsersList()
    }
    render() {
        const {
            users: {
                handleAddClick
            }
        } = this.props;
        return (
            <div style={{
                padding: "0px 150px"
            }}>
                <div style={{
                    height: "50px"
                }}>
                    <Button
                        type="primary"
                        style={{ float: "right" }}
                        onClick={(e) => handleAddClick(e)}
                    >
                        Add New Product
                    </Button>
                    <Button
                        type="primary"
                        style={{ float: "right" }}
                        onClick={(e) => {
                            localStorage.clear();
                            this.props.history.push('/login')
                        }}
                    >
                        Logout
                    </Button>
                </div>
                <Layout>
                    <Layout>
                        <UserProductTabel {...this.props} />
                    </Layout>
                </Layout>
                <AddEditUserModal {...this.props} />
            </div>
        )
    }
}

export default UsersProductComponent