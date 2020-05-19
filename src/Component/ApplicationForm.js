import React, { Component }             from 'react'

import { Form, Input, Button, Select, Spin }  from 'antd';
import { FormInstance }                 from 'antd/lib/form';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class ApplicationForm extends Component 
{

    formRef = React.createRef();

    constructor(props) 
    {
        super(props);

        this.state = {
            fields: [],
            currentData: {},
            loading : true
        }


    }


    async componentDidMount() 
    {
        const { apiConsumer, currentRecord } = this.props;        
        let data;

        if ( currentRecord.action === "UPDATE" )
        {
             data = await apiConsumer.loader( currentRecord.from, currentRecord.param );
            
        }

        this.setState({ loading: false, currentData: data });
        
    }

    

    renderUserForm = () =>  
    {

        console.log(this.state.currentData);
        

        return (
            <Form { ...layout } ref={ this.formRef } name="control-ref">
                <Form.Item
                    label="Username"
                    >

                    <Input value= { this.state.currentData.user.username }/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    >

                    <Input value= { this.state.currentData.user.password }/>
                </Form.Item>

                <Form.Item 
                    label = "IsActive">
                    
                    <Select defaultValue = { this.state.currentData.user.isActive === true ? "true" : "false" } >
                        <Option value="true"> True </Option>
                        <Option value="false"> False </Option>
                    </Select>
                </Form.Item >
                    
                <Form.Item
                    label="authority">

                    

                </Form.Item>

            </Form>
        )

    }
    
    
    render() 
    {
        if(this.state.loading) 
        {
            return <Spin size="large"></Spin>
        }

        let form;

        switch ( this.props.currentRecord.from )
        {
            case "users":
                form = this.renderUserForm();
        }

        return form;

    }
}