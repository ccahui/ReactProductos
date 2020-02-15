import ReactDOM from 'react-dom';
import React, { Component } from 'react'

class FilterTableProduct extends Component {
    render() {
        return (
            <div>
                <h1>Productos</h1>
                <SearchBar />
                <ProductTable productos = {this.props.productos}/>
            </div>
        )
    }
}

class SearchBar extends Component {
    render() {
        return (
            <div>
                <input name="search"/> <br/>
                <input type="checkbox"/> Productos en stock
            </div>
        )
    }
}

class ProductTable extends Component {
    render() {
        const rowsTable = [];
        let lastCategory = null;
        this.props.productos.forEach(product => {
           
            if(product.category !== lastCategory) {
                rowsTable.push(
                    React.createElement(ProductCategoryRow, {
                      category: product.category,
                      key: product.category }));
            }
            rowsTable.push(
                React.createElement(ProductRow, {
                  product: product,
                  key: product.name }));
            
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Prime</td>
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
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
}

class ProductRow extends Component {
    render() {
        return (
            <tr>
                <td> {this.props.product.price} </td>
                <td> {this.props.product.name} </td>
            </tr>
        )
    }
}


class App extends Component {

    render() {
      return (
      <div>
          <FilterTableProduct productos = {PRODUCTS}/>
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
