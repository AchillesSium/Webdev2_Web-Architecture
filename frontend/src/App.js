import React from 'react';
import './App.css';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
    ProductsContainer,
    ProductWrapper,
    ProductsHeading,
    ProductTitle,
    ProductCard,
    ProductImg,
    ProductInfo,
    ProductDesc,
    ProductPrice,
    ProductButton
  } from './components/Products/ProductsElements';
  
class Sandwich extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          img_list: null,
          name_value: null,
          toppings_value: null,
          bread_value: null,
          sandwich_id: null,
          new_order_id: null
      };
  }

  handleCheck(e) {
      // console.log(e.currentTarget.dataset.id);
      fetch('http://localhost:8080/v1/order', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "sandwichId": parseInt(e.currentTarget.dataset.id),
              "status": "received",
              "id": 0
          })
      })
      .then(res => res.json())
      .then((result) => {
          console.log(result);
          this.setState({
              new_order_id: result.order_id
          });
          console.log(this.state.new_order_id);
      });
  }

  render() {
      return (
        <ProductsContainer>
            <ProductWrapper>
                    <ProductCard key= {this.props.sandwich_id}>
                    <ProductImg src={this.props.img_list} alt="Image" />
                    <ProductInfo>
                        <ProductTitle>{this.props.name_value}</ProductTitle>
                        <ProductDesc>{this.props.toppings_value}</ProductDesc>
                        <ProductPrice>{this.props.bread_value}</ProductPrice>
                        <ProductButton className='order_button btn btn-primary' onClick={this.handleCheck.bind(this)} data-id={ this.props.sandwich_id }>Order</ProductButton>
                        <p>
                            {(this.state.new_order_id)?'Your order id: '+this.state.new_order_id:''}
                        </p>
                    </ProductInfo>
                    </ProductCard>
            </ProductWrapper>
            </ProductsContainer>    

      );
  }
};

class SandwichList extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          sandwiches: [],
      };
  }

  componentDidMount() {
      fetch("http://localhost:8080/v1/sandwich")
          .then(res => res.json())
          .then(
              (result) => {
                  console.log(result);
                  this.setState({
                      isLoaded: true,
                      sandwiches: result
                  });
              },
              (error) => {
                  this.setState({
                      isLoaded: true,
                      error
                  });
              }
          )
  }

  render() {
      const { error, isLoaded, sandwiches } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          let sandwich_list = sandwiches.map(function (sandwich) {
              let toppings_list = sandwich.toppings.map(function(item) {
                  return item.name;
              });
            
              return (
                  <Sandwich key={sandwich._id} sandwich_id={sandwich.sandwich_id} name_value={sandwich.name} toppings_value={toppings_list.toString()} bread_value={sandwich.breadType} img_list={sandwich.image} />
              );
          });

          return (
            <div className ="container">
            <div className="row">
            
            {sandwich_list}
            
            </div>
            </div>
          );
      }
  }
};

class SearchOrder extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          order_id: '',
          order_status: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
      this.setState({ order_id: e.target.value });
  }

  handleClick() {
      fetch("http://localhost:8080/v1/order/"+this.state.order_id)
      .then(res => res.json())
      .then(
          (result) => {
              if ( result.hasOwnProperty('order_id') ) {
                  this.setState({
                      order_status: result.status
                  });

              } else {
                  this.setState({
                      order_status: null
                  });
              }
          },
          (error) => {
              console.log(error);
              this.setState({
                  order_status: null
              });
          }
      )
  }

  render() {
      return(

          <div className="row check_order_status_div">
              <div className="col-md-2"></div>
              <div className="col-md-4">
              <label className="col-form-label">Search order:</label>
              </div>
              <div className="input-group col-md-4 col-md-offset-4">
                  <input type="text" className="form-control" placeholder="Give order id..." onChange={ this.handleChange } />
                     <span className="input-group-btn">
                          <button className="btn btn-success" type="button" onClick={this.handleClick}>Search!</button>
                     </span>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-12" id="show_order_status">
                  <OrderStatus order_id={this.state.order_id} order_status={this.state.order_status} />
              </div>
          </div>
      );
  }
}

class OrderStatus extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          order_status: null,
          order_id: null
      };
  }

  render() {

      let order_status = this.props.order_status;
      if(order_status === null){
          order_status = 'not found';
      }

      return (
          <p>
              <b>Your order id {this.props.order_id} status is: {order_status}</b>
          </p>
      );
  }
}

class SandwichesView extends React.Component {
  render() {
      return (
    
                <div>
                <header className="App-header">
                 <ProductsHeading>Vegabond's Sandwich</ProductsHeading>
                </header>
                <SearchOrder />
                <SandwichList />
                </div>
               
      );
  }
}



function App() {
  return (
    
      <SandwichesView />
    
  );
}

export default App;
