import React, { Fragment, Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

const styles = {};

class AddTodoForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: ''
		};
	}
	onDescriptionChange(e) {
		console.log('DESCRIPTION CHANGE', e.target.value);
		this.setState({
			title: this.state.title,
			description: e.target.value
		});
	}

	onTitleChange(e) {
		console.log('TITLE CHANGE', e.target.value);
		this.setState({
			title: e.target.value,
			description: this.state.description
		});
	}

	render() {
		const { classes, adding, onCancel, onOpen, onSave } = this.props;
		const { title, description } = this.state;
		console.log(this.props);
		if (adding) {
			return (
				<form>
					<TextField
						onChange={(event) => this.onTitleChange(event)}
						label="Title"
						className={classes.textfield}
					/>
					<TextField
						onChange={(event) => this.onDescriptionChange(event)}
						label="Description"
						multiline
						className={classes.textfield}
					/>
					<Button
						color="secondary"
						onClick={(e) => onSave(e, { title, description, id: Date.now(), done: false })}
					>
						Salva <SaveIcon />
					</Button>
					<Button color="default" onClick={(e) => onCancel(e)}>
						Cancel
					</Button>
				</form>
			);
		} else {
			return (
				<Button color="secondary" onClick={(e) => onOpen(e)}>
					Nuova cosa da fare
				</Button>
			);
		}
	}
}

AddTodoForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTodoForm);
