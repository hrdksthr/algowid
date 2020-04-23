import React from "react";
import { Button, Table } from "antd"
import { observer } from "mobx-react";

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
        title: 'Image',
        dataIndex: 'image_url',
        key: 'image_url',
        render: (text, record) => <img src={`file:/${text}`} alt={record.prod_name} />
      },
      {
        title: 'Product Name',
        dataIndex: 'prod_name',
        key: 'prod_name',
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => {
          return (
            <Button type="primary" shape="circle" icon="form" onClick={e => handleAddClick(e, record)} />
          )
        }
      },
    ];
    return (
      <Table dataSource={dataSource} rowKey={record => record._id} loading={usFetchingList} columns={columns} pagination={false} />
    )
  }

}

export default UserProductTabel