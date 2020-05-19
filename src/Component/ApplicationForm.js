import React, { Component }             from 'react'

import { Form, Input, Button, Select }  from 'antd';
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
            currentData: {}
        }


    }


    async componentDidMount() 
    {
        const { apiConsumer, currentRecord } = this.props;        

        if ( currentRecord.action === "UPDATE" )
        {
            const data = await apiConsumer.loader( currentRecord.from, currentRecord.param );
            
            this.setState({ currentData: data });
        }
        


    }

    renderUserForm = () =>  
    {

        console.log(this.state.currentData);
        

        return (
            <Form { ...layout } ref={ this.formRef } name="control-ref">
                <Form.Item
                    label="Username"
                    >

                    <Input value= { this.state.currentData.username }/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    >

                    <Input value= { this.state.currentData.password }/>
                </Form.Item>

                <Form.Item 
                    label = "IsActive">
                    
                    <Select defaultValue = { this.state.currentData.isActive === true ? "female" : "male" } >
                        <Option value="male"> Male </Option>
                        <Option value="female"> Female </Option>
                    </Select>

                </Form.Item>

            </Form>
        )

    }
    
    
    render() 
    {
        let form;

        switch ( this.props.currentRecord.from )
        {
            case "users":
                form = this.renderUserForm();
        }

        return form;

    }
}