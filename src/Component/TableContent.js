import React, { Component }             from 'react';

import { Table, Button }                from 'antd';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';

import ApiConsumer                      from '../api/ApiConsumer'


const { Column } = Table;



export default class TableContent extends Component 
{
    

    constructor(props) 
    {
        super(props);

        this.state      = { columns: [], data: [], error: false }
        this.apiConsumer  = new ApiConsumer()

    }

    onUpdate(from, id) 
    {
        const currentRecord = {
            action: "UPDATE",
            from: from,
            param: id
        }

        this.props.actions.setCurrentPage("form")
        this.props.actions.setCurrentRecord(currentRecord);
    }


    async componentDidMount() 
    {
        switch ( this.props.currentPage ) 
        {
            case "database_users":
            
            try 
            {
                
                const usersCols = [
                    {
                        title : "Username",
                        width: 100,
                        dataIndex: 'username',
                        key: 'username',
                        fixed: 'left',
                    },
                    {
                        title: "Password",
                        width: 100,
                        dataIndex: 'password',
                        key: 'password',
                        fixed: 'left',
                    },
                    {
                        title: "IsActive",
                        width: 100,
                        dataIndex: 'isActive',
                        key: 'isActive',
                        fixed: 'left',
                        render: isActive => isActive === true ? <h1> True </h1> : <h1> False </h1>
                    },
                    {
                        title: "First Name",
                        width: 100,
                        key: 'firstName',
                        fixed: 'left',
                        render: record => <h1> {record.userDetail.firstName}</h1>
                    },
                    {
                        title: "Last Name",
                        width: 100,
                        key: "lastName",
                        fixed: 'left',
                        render: record => <h1> {record.userDetail.lastName}</h1>
                    },
                    {
                        title: "Email",
                        width: 100,
                        key: "email",
                        fixed: 'left',
                        render: record => <h1> {record.userDetail.email}</h1>
                    },
                    {
                        title: "Phone Number",
                        width: 100,
                        key: "phoneNumber",
                        fixed: 'left',
                        render: record => <h1> {record.userDetail.phoneNumber}</h1>
                    },
                    {
                        title: "Update",
                        width: 100,
                        key: "update",
                        fixed: 'left',
                        // TODO: Dinamically to be 
                        render: record => <Button onClick={()=> this.onUpdate("users", record.username)}> Update </Button>
                    },
                    {
                        title: "Delete",
                        width: 100,
                        key: "delete",
                        fixed: 'left',
                        render: record => <Button> Delete </Button>
                    }
                
                ]
                const data = await this.apiConsumer.loadUsers()

                this.setState({ data: data, columns: usersCols })
            }
            catch(err) 
            {
                this.setState ({ error: true })
            }
        }
    }


    renderTable() 
    {

        const { data, columns } = this.state;
        

        // Firstly for test purposes


        return (
            <Table columns={ columns } dataSource = { data } titleColumnsalign = "center"/>
        
        )

    }

    render() 
    {
        return this.renderTable();
    }
}