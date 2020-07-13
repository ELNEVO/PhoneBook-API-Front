import React, { Component } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PhoneNumberEntry from "./PhoneNumberEntry";
import { fetchAllPhoneNumbers } from "../api/phone-number-api";
import PhoneNumberEntryDialog from "./PhoneNumberEntryDialog";
import {Add} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

class PhoneNumberEntryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      entryList: [],
      selected: {}
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll = (fn) => {
    fetchAllPhoneNumbers()
    .then(entryList => {
      this.setState({ entryList });
      if (typeof fn === 'function') fn();
    });
  };

  renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Phone number</TableCell>
      </TableRow>
    </TableHead>
  );

  renderTableBody = () => {
    const { entryList } = this.state;

    return (
      <TableBody>
        {entryList
          ? entryList.map(entry => (
            <PhoneNumberEntry
              key={entry.id}
              entry={entry}
              edit={this.openDialog} />
          )) : null}
      </TableBody>
    );
  };

  openDialog = (entry) => {
    this.setState({ isDialogOpen: true, selected: entry });
  };

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    const { isDialogOpen, selected } = this.state;

    return (<>
      <div style={{display: 'flex', justifyContent: 'flex-end', width: '100vw'}}>
        <Button
            onClick={() => this.openDialog({})}
            color="primary"
            startIcon={<Add/>}>
          Add New Phone Number
        </Button>
      </div>
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
      {isDialogOpen ? <PhoneNumberEntryDialog callback={this.fetchAll} close={this.closeDialog} entry={selected} /> : null}
    </>);
  }
}

export default PhoneNumberEntryList;