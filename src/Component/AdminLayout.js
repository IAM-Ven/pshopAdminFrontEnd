import React, { Component }                 from 'react'

import { Layout, Menu, Breadcrumb, Button } from 'antd';

import ApplicationContent                   from './ApplicationContent';


import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import ApiConsumer                          from '../api/ApiConsumer'
import { setCurrentPage, setCurrentRecord } from '../helpers/actions'

import "../css/applicationLayout.css"


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class AdminLayout extends Component {
    constructor(props) 
    {
        super(props);

        this.state = {
            collapsed: false,
            currentPage: "home",
            
            // This is used to indetify the selected record in the tables portion
            selectedRecord : {}
          };

        this.apiConsumer = new ApiConsumer();
        this.setCurrentPage = setCurrentPage.bind(this);
        this.setCurrentRecord = setCurrentRecord.bind(this);

    }
  
    onCollapse = collapsed => 
    {
      this.setState({ collapsed });
    };

    onDatabasesClick = (e) =>
    {
        this.setState({ currentPage: e.key })
        
    }

    onReset = (e) => 
    {
        // I dont want unecessary setState calls.
        if(this.state.currentPage !== "home") 
        {
            this.setState( {currentPage: "home"} );
        }
        
    }

    renderLayout() 
    {
        const actions = {};

        actions.setCurrentPage      = this.setCurrentPage;
        actions.setCurrentRecord    = this.setCurrentRecord

        return (
            <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <img className="logo" onClick={this.onReset} src={require('../img/logo.png')}></img>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    <span>Database</span>
                  </span>
                }
                onClick={ this.onDatabasesClick }
              >
                <Menu.Item key="database_users">Users</Menu.Item>
                <Menu.Item key="database_orders">Orders</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <TeamOutlined />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <FileOutlined />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <ApplicationContent 
                    currentPage     = { this.state.currentPage }
                    currentRecord   = { this.state.currentRecord }
                    apiConsumer     = { this.apiConsumer }
                    actions         = { actions }
                    />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
        );


    }

  
    render() {
      return this.renderLayout();
    }
  }

export default AdminLayout;