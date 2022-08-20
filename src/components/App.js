import React, { Component } from 'react';
import mock from '../mock/data';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = {
      editing: false,
      show: false,
    }
  }
  handleModal() {
    this.setState({ show: !this.state.show })
  }
  handleEdit() {
    this.onEditClick();
    this.handleModal();
  }
  onEditClick() {
    this.setState({ editing: true });
  }
  
  handleDropdownChange(e) {
    e.preventDefault();
  }
 
  render() {
    let regionDropDown = this.props.Content.regionDropDown
    let options = regionDropDown.map((data) =>
      <option>{data.name}</option>)
    
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.props.Content.heading}</h1>
        <div>
          <Button onClick={() => this.handleEdit()} >{this.props.Content.saveSegment}</Button>
        </div>
        <Modal show={this.state.show} animation={true} onHide={() => this.handleModal()}>
          <Modal.Header>{this.props.Content.modalPopup}</Modal.Header>
          <Modal.Body>
            <p>{this.props.Content.textMatter}</p>
            <input
              handleOnChange={(e) => this.handleOnChange(e)}
              type="text"
              placeholder={this.props.Content.placeholder}
              required
              value={this.props.value} />
            <br />
            <br />
                <select ref={this.myRef} style={{ textAlign: "center", color: "green", width: "300px" }} onChange={this.handleDropdownChange.bind(this)}>
                  {options}
                </select>
                <br />
                <br />
                <Router>
                <ul>
                    <li><Link to="/">+Add new schema</Link></li>
                </ul>
                </Router>
            </Modal.Body>
          <Modal.Footer>
            <Button >{this.props.Content.saveButton}</Button>
            <Button onClick={() => this.handleModal()}>{this.props.Content.cancelButton} </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
App.defaultProps = { Content: mock }

export default App;
