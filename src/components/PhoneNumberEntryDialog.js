import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Delete} from '@material-ui/icons';
import {
  addPhoneNumber,
  deletePhoneNumber,
  updatePhoneNumber
} from "../api/phone-number-api";

class PhoneNumberEntryDialog extends Component {

  constructor(props) {
    super(props);

    const {entry, callback, close} = props;

    this.state = {
      isNewEntry: !Object.prototype.hasOwnProperty.call(entry, 'phoneNumber'),
      id: entry.id || null,
      name: entry.name || '',
      phoneNumber: entry.phoneNumber || '',
      isPhoneNumberValid: this.validatePhoneNumber(entry.phoneNumber),
      callback,
      close
    };
  }

  handleSave = () => {
    const {id, name, phoneNumber, isNewEntry, callback, close} = this.state;
    const entryRequest = {id, name, phoneNumber};
    const promise = (isNewEntry ? this.create(entryRequest) : this.update(
        entryRequest));
    promise.then(() => callback(close));
  };

  handleDelete = () => {
    const {id, callback, close} = this.state;
    this.delete(id).then(() => callback(close));
  };

  create = entry => addPhoneNumber(entry)
  .then(console.log);

  update = entry => updatePhoneNumber(entry)
  .then(console.log);

  delete = id => deletePhoneNumber(id)
  .then(console.log);

  renderDialogContent = () => {
    const {name, phoneNumber} = this.state;

    return (
        <form noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item sm={6}>{this.renderName(name)}</Grid>
            <Grid item sm={6}>{this.renderPhoneNumber(phoneNumber)}</Grid>
          </Grid>
        </form>
    );
  };

  renderName = name => (
      <TextField
          id="name"
          label="Name"
          value={name}
          onChange={e => this.handleChange('name', e.target.value)}
          fullWidth
          margin="none"
          autoFocus
          inputProps={{maxLength: 100}}/>
  );

  renderPhoneNumber = phoneNumber => (
      <TextField
          id="phone-number"
          label="Phone Number *"
          value={phoneNumber}
          onChange={e => this.handleChange('phoneNumber', e.target.value)}
          fullWidth
          margin="none"
          inputProps={{maxLength: 25}}/>
  );

  handleChange = (type, value) => {
    if (type === 'phoneNumber') {
      if (!this.validatePhoneNumberOnCharacterInput(value)) {
        return false;
      }
      this.setState({isPhoneNumberValid: this.validatePhoneNumber(value)});
    }

    const categoryObj = {};
    categoryObj[type] = value;
    this.setState(categoryObj);
    return true;
  };

  validatePhoneNumber = (phoneNumber) => {
    return this.validatePhoneNumberOnCharacterInput(phoneNumber)
        && this.validatePhoneNumberOnLength(phoneNumber);
  };

  validatePhoneNumberOnCharacterInput = (phoneNumber) => {
    return typeof phoneNumber === 'string' && !!phoneNumber.match(/^[+0-9\-()\s]*$/);
  };

  validatePhoneNumberOnLength = (phoneNumber) => {
    return !!phoneNumber && phoneNumber.length >= 3;
  };

  render() {
    const {isNewEntry, isPhoneNumberValid, close} = this.state;

    return (
        <Dialog open onClose={close} fullWidth maxWidth="xs"
                disableBackdropClick>
          <DialogTitle>{isNewEntry ? 'Add New Phone Number'
              : 'Edit Phone Number'}</DialogTitle>

          <DialogContent>
            {this.renderDialogContent()}
          </DialogContent>

          <DialogActions>
            {!isNewEntry ? (
                <Button
                    onClick={this.handleDelete}
                    color="secondary"
                    startIcon={<Delete/>}>
                  Delete
                </Button>
            ) : null}
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button
                onClick={this.handleSave}
                color="primary"
                disabled={!isPhoneNumberValid}>
              {isNewEntry ? 'Add' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default PhoneNumberEntryDialog;