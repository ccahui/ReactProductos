import ReactDOM from 'react-dom';
import React, { Component } from 'react'

class FilterTableProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterStock: false,
        };
    }
    onChangeFilterStock = () => {
        this.setState({
            filterStock: !this.state.filterStock
        });
    }

    onChangeFilterText = (texto) => {
        this.setState({
            filterText: texto
        });
    }
    
    render() {
        return (
            <div>
                <h1>Products</h1>
                <SearchBar filterStock = {this.state.filterStock}  onChangeFilterStock={this.onChangeFilterStock} onChangeFilterText={this.onChangeFilterText}/>
                <br></br>
                <ProductTable productos = {this.props.productos} filterStock={this.state.filterStock} filterText = {this.state.filterText}/>
            </div>
        )
    }
}

class SearchBar extends Component {

    onChange = (e) =>{
        this.props.onChangeFilterText(e.target.value);
    }

    render() {
        return (
            <div className>
                <div className="form-group">
                     <input name="search" onChange={this.onChange} className="form-control" placeholder="Product name"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" onChange={this.props.onChangeFilterStock} /> 
                    <label className="form-check-label">
                     Product Stock
                    </label>
                </div>
                
            </div>
        )
    }
}

class ProductTable extends Component {

    filterText(product, filterText) {
        const productName = product.name.toLowerCase();
        const text = filterText.toLowerCase();

        return productName.indexOf(text) === -1
    }

    createCategoryRow(category) {
       const props = {
           category,
           key: category,
       };
       const component =  React.createElement(ProductCategoryRow, props);

       return component;
    }

    createProductRow(product) {
        const props = {
            product,
            key: product.name
        };
        const component = React.createElement(ProductRow, props);
        
        return component;
    }

    render() {
        const rowsTable = [];
        let lastCategory = null;

        const filterText = this.props.filterText;
        const filterStock = this.props.filterStock;

        this.props.productos.forEach(product => {
            if (this.filterText(product, filterText)) {
                return;
              }

            if (filterStock && !product.stocked) {
                return;
              }

            if(product.category !== lastCategory) {
                rowsTable.push(this.createCategoryRow(product.category));
            }

            rowsTable.push(this.createProductRow(product));
            
            lastCategory = product.category;
        });

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="w-50">Name</th>
                        <th className="w-50">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rowsTable}
                </tbody>
            </table>
        )
    }
}

class ProductCategoryRow extends Component {
    render() {
        return (
            <tr>
                <th colSpan="2" className="text-center">{this.props.category}</th>
            </tr>
        )
    }
}

class ProductRow extends Component {
    
    stockAgotado(name) {
        return <span style={{color:'red', fontWeight: 'bold'}}>{name}</span>;
    }
    
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name : this.stockAgotado(product.name);
        return (
            <tr>
                <td> {name} </td>
                <td> {product.price} </td>
            </tr>
        );
    }
}


class App extends Component {

    render() {
      return (
      <div className="col-md-4 mt-4 mx-auto">
          <FilterTableProduct productos = {PRODUCTS} />
      </div>
      );
    }
}


const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(<App />, document.getElementById('root'));
