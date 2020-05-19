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

    onFinish = values => {
        console.log(values);
        
    }


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
            console.log(data);
            
        }

        this.setState({ loading: false, currentData: data });
        
    }

    generateAuthorityList() { 
      return this.state.currentData.authorityList.map((authority) => { 
            return <Option key={ authority.id } value={ authority.authority }> { authority.authority } </Option>
        })
    }
    

    renderUserForm = () =>  
    {
        return (
            <Form { ...layout } ref={ this.formRef } name="control-ref" 
            onFinish= { this.onFinish }
            initialValues={
                {
                    username: this.state.currentData.user.username,
                    password: this.state.currentData.user.password,
                    isActive: this.state.currentData.user.isActive == true ? "true": "false",
                    authority: this.state.currentData.user.authority.authority

                }
            }
            >
                <Form.Item
                    name="username"
                    label="Username"
                    >

                    <Input />
                </Form.Item>

                <Form.Item
                    name = "password"
                    label="Password"
                    >

                    <Input/>
                </Form.Item>

                <Form.Item 
                name= "isActive"
                    label = "IsActive">
                    
                    <Select  >
                        <Option value="true"> True </Option>
                        <Option value="false"> False </Option>
                    </Select>
                </Form.Item >
                    
                <Form.Item
                    name="authority"
                    label="Authority">
                        <Select>
                            { this.generateAuthorityList() }
                        </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
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