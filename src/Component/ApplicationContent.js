import React, { Component } from 'react';

import HomeContent          from './HomeContent';

import TableContent         from './TableContent';
import ApplicationForm      from './ApplicationForm';

export default class ApplicationContents extends Component 
{

    constructor(props) 
    {
        super(props);


    }

    renderContent() 
    {

        if(this.props.currentPage === "home") 
            return <HomeContent/>
        if(this.props.currentPage.startsWith("database"))
            return <TableContent currentPage={ this.props.currentPage } apiConsumer = { this.props.apiConsumer } actions = { this.props.actions }/>
        if (this.props.currentPage === "form") 
            return <ApplicationForm apiConsumer={ this.props.apiConsumer } currentRecord = { this.props.currentRecord } ></ApplicationForm> 
    }


    render()
    {
        
        

        return this.renderContent();
    }

}