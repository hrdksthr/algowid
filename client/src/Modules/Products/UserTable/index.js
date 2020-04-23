import React from "Modules/Products/UserTable/react";
import moment from "Modules/Products/UserTable/moment";
import { Button, Table } from "Modules/Products/UserTable/antd"
import { observer } from "Modules/Products/UserTable/mobx-react";

@observer
class UserProductTabel extends React.Component {
    render() {
        const {
            users: {
                productList,
                usFetchingList,
                handleAddClick
            }
        } = this.props;
        const dataSource = productList; 
        const columns = [
          {
            title: 'Name',
            dataIndex: 'user_fname',
            key: 'user_fname',
            render: (text, record) => <span> {record.user_fname} {record.user_lname}</span>
          },
          {
            title: 'Birthday',
            dataIndex: 'user_bday',
            key: 'user_bday',
            render: (text) => moment(text).format("DD MMM, YYYY") 
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => {
                return (
                    <Button type="primary" shape="circle" icon="form" onClick={e => handleAddClick(e, record)}/>
                )
            }
          },
        ];
        return (
              <Table dataSource={dataSource} loading={usFetchingList} columns={columns} pagination={false}/>
        )
    }
   
}

export default UserProductTabel