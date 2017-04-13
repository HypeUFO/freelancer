import React, { Component } from 'react';
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Header from '../header/header.component';
import SideMenu from '../menu/left-menu.component';
import InvoiceList from '../invoices/invoice-list.component';
import ClientList from '../clients/client-list.component';
import ClientListExpandable from '../clients/client-list-expandable-test';
// import ProjectList from '../projects/project-list.component';

import ProjectListEditable from '../projects/editable-project-list.component';

import ExampleChart from '../dashboard/dashboard.component';

import Landing from '../landing/landing.component';

import AddClient from '../clients/add-client.component';


// import SubHeader from '../subheader/subheader.component';

import './app.css';



// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div className="app">
        {/*<div className="app-header">
        </div>*/}
        { this.props.isLoggedIn ?
        <div>
        <Header className="app-header" />
        <div className="container-fluid" style={{backgroundColor: "#eee"}}>
          <div className="col-xs-3">
            {/*<SubHeader />*/}
          <SideMenu />
          </div>
          <div
            className="col-xs-9"
            style={{textAlign: 'center'}}>
            {this.props.isLoggedIn && this.props.selectedItem === 'dashboard' ? <ExampleChart /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'clientList' ? <ClientListExpandable /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'clients' && this.props.clientView === 'addClient' ? <AddClient /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'projects' ? <ProjectListEditable /> : false}
            {this.props.isLoggedIn && this.props.selectedItem === 'invoices' ? <InvoiceList /> : false}
          </div>
        </div>
        </div>
        :
        //<div>
            <Landing />
            //<LoggedToggle />
          //</div>
        }
      </div>
    );
  }
}

// export default App;

function mapStateToProps(state) {
    return {
        isLoggedIn: state.loginReducer.isLoggedIn,
        selectedItem: state.leftMenuReducer.selectedItem,
        clientView: state.clientReducer.clientView
    };
}

export default connect(mapStateToProps)(App);

