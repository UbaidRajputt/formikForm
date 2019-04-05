import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      modal: true
    };
  }
  yes() {
    this.props.callback(true);
    this.toggle();
  }

  no() {
    this.props.callback(false);
    this.toggle();
  }

  componentWillReceiveProps() {
    this.setState({ modal: true });
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Warning!</ModalHeader>
          <ModalBody>
            There are unsaved changes, Do you still want to navigate to the
            other page?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.yes}>
              Proceed
            </Button>{" "}
            <Button color="secondary" onClick={this.no}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Popup;
