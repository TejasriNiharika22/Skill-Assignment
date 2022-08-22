import React, { Component } from 'react';
import mock from '../mock/data';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      show: false,
      schemaList: [],
      segmentName: "",
      currentSchemaItem: {}
    }
  }
  handleModal() {
    this.setState({ show: !this.state.show })
  }
  handleEdit() {
    this.onEditClick();
    this.handleModal();
  }
  onEditClick = (value) => {
  const list = this.props.Content.regionDropDown;
   const item = list.find((val) => {
      return val.id === value;
   });
  console.log(item);
    this.setState({ currentSchemaItem: item });
  }

  
  handleDropdownChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    this.onEditClick(e.target.value);
  }

  handleSegmentNameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      segmentName: e.target.value
    });
  }

  removeItem = (item) => {
    // TODO need to write
  }

  renderSchemaItem = (item, index) => {
    const list = this.props.Content.regionDropDown;

    return <div key={index}>
       <select ref={this.myRef} style={{ textAlign: "center", color: "green", width: "300px" }} value={item.id} onChange={(e) => this.handleDropdownChange(e)}>
            {list.map((listItem, listIndex) => {
                return <option key={listIndex} value={listItem.id}>{listItem.name}</option>
            })}
       </select>
       <Button onClick={(item) => { this.removeItem(item)}}>-</Button>
    </div>
  }

  renderListItems = () => {
    const {schemaList = []} = this.state;
    const schemaItems = schemaList.map((item, index) => {
      console.log(item);
      return this.renderSchemaItem(item, index)
    });
    return schemaItems;
  }

  addColumnToSchema = () => {
    const {currentSchemaItem = {}, schemaList = [] } = this.state;
    console.log(this.state);
    if(currentSchemaItem){
      schemaList.push(currentSchemaItem);
      this.setState({
        schemaList: schemaList,
        currentSchemaItem: {}
      }, () => {
        console.log(this.state);
      });
    }
  
  }



 
  render() {
    let regionDropDown = this.props.Content.regionDropDown;
    let { currentSchemaItem} = this.state;
    let options = regionDropDown.map((data, index) =>
      <option key={index} value={data.id}>{data.name}</option>)
  
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
              onBlur={(e) => this.handleSegmentNameChange(e)}
              type="text"
              placeholder={this.props.Content.placeholder}
              required
              value={this.props.value} />
            <br />
            {this.renderListItems()}
            <br />
                <select ref={this.myRef} style={{ textAlign: "center", color: "green", width: "300px" }} value={currentSchemaItem?.id ?? ""} onChange={(e) => this.handleDropdownChange(e)}>
                  {options}
                </select>
                <br />
                <br />
                <ul>
                  <Button onClick = {() => {this.addColumnToSchema()}}  variant={"link"} >
                  +Add new schema
                  </Button>
                </ul>

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
