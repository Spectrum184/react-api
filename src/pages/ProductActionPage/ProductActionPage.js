import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from '../../actions';

class ProductActionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      txtName: '',
      txtPrice: '',
      chkbStatus: ''
    }
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      this.props.onEditProduct(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditting) {
      var { itemEditting } = nextProps;
      this.setState({
        id: itemEditting.id,
        txtName: itemEditting.name,
        txtPrice: itemEditting.price,
        chkbStatus: itemEditting.status
      })
    }
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    })
  }

  onSave = (e) => {
    e.preventDefault();
    let { id, txtName, txtPrice, chkbStatus } = this.state;
    let { history } = this.props;
    let product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus
    }

    if (id) {
      this.props.onUpdateProduct(product);
      history.goBack();
    } else {
      this.props.onAddProduct(product);
      history.goBack();
    }
  }

  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label >Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label >Giá sản phẩm</label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label >Trạng thái</label>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="chkbStatus"
                  value={chkbStatus}
                  onChange={this.onChange}
                  checked={chkbStatus}
                />
                Còn hàng
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mr-10">Lưu lại</button>
          <Link to="/product-list" className="btn btn-danger">
            Trở lại
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemEditting: state.itemEditting
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product))
    },

    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id))
    },

    onUpdateProduct: product => {
      dispatch(actUpdateProductRequest(product));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
