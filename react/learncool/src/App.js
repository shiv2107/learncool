import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloConsumer } from 'react-apollo';

const GET_VIDEOS = gql`
  query VIDEOS($id: String!) {
    customers(id: $id) {
      id
    }
  }
`;


class App extends Component {
  state = {
    data:null,
    keyword:null
  }
  saveVal(e){
    console.log("dasdasd",e.target.value)
    this.setState({keyword:e.target.value})
    
  }
  results(data){
    this.setState({data})
  }
  render() {
    return (
      <body data-spy="scroll" data-target="#primary-menu">

    <div className="preloader" style={{ display: "none",}}>
        <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
    </div>
    <div className="mainmenu-area affix-top" data-spy="affix" data-offset-top="100">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#primary-menu">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a href="https://colorlib.com/etc/colid/index.html#" className="navbar-brand logo">
                    <h2>learncool</h2>
                </a>
            </div>
            <nav className="collapse navbar-collapse" id="primary-menu">
                <ul className="nav navbar-nav navbar-right">

                    <li className=""></li>





                    <li className="active">
                        <a>YOUTUBE</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <footer className="footer-area relative sky-bg" id="contact-page">
        <div className="absolute footer-bg"></div>
        <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
                        <div className="page-title">
                            <h2>search videos</h2>
                            <i className="fab fa-youtube fa-5x"></i>



                        </div>
                    </div>
                </div>
                <div className="row">
                <ApolloConsumer>
                  {client => (
                    <div>
                    <div className="col-xs-12 col-md-8">
                        <form action="https://colorlib.com/etc/colid/process.php" id="contact-form" method="post" className="contact-form">
                            <div className="form-double">
                                <input 
                                type="text" 
                                id="form-name" 
                                name="form-name" placeholder="SEARCH" className="form-control" r
                                onChange={async (e) => {
                                  this.saveVal(e)
                                  const { data } = await client.query({
                                    query: GET_VIDEOS,
                                    variables: { id: e.target.value }
                                  });
                                  this.results(data);
                                }}
                                />

                            </div>



                        </form>
                      {this.state.keyword&&this.state.data &&<p>{this.state.data.customers.map(x=><p>{x.id}</p>)}</p>}
                        
                    </div>
                    </div>
                    )}
                  </ApolloConsumer>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 text-center">
                        <p>LEARNCOOL 2018 </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
   


</body>
    );
  }
}

export default App;
