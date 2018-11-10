import React, { Fragment, Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
const styles = {};

class EditTodoForm extends Component {
	constructor(props) {
		super(props);

		console.log('CONSTRUCTOR: ', props);

		this.state = {
			title: '',
			description: '',
			id: undefined,
			done: false
		};
	}
	onDescriptionChange(e) {
		console.log('DESCRIPTION CHANGE', e.target.value);
		this.setState({
			title: this.state.title,
			description: e.target.value,
			id: this.state.id,
			done: this.state.done
		});
	}

	onTitleChange(e) {
		console.log('TITLE CHANGE', e.target.value);
		this.setState({
			title: e.target.value,
			description: this.state.description,
			id: this.state.id,
			done: this.state.done
		});
	}

	setTodoData(data) {
		console.log('DATA', data);
		this.setState({
			title: data.title,
			description: data.description,
			id: data.id,
			done: data.done
		});
		console.log(this.state);
	}

	componentDidMount(props) {
		console.log('COMPONENT DID MOUNT ->', this.props);
		const { selectedTodo } = this.props;
		this.setState({
			title: selectedTodo.title,
			description: selectedTodo.description,
			id: selectedTodo.id,
			done: selectedTodo.done
		});
		//this.setTodoData(selectedTodo);
		console.log('COMPONENT DID MOUNT <-', this.state);
	}

	render() {
		const { classes, editing, selectedTodo, onCancel, onUpdate } = this.props;

		const { title, description } = this.state;
		console.log('RENDER EDIT FORM = ', this.props, this.state);
		if (editing) {
			//this.setTodoData(selectedTodo);
			return (
				<form>
					<TextField
						onChange={(event) => this.onTitleChange(event)}
						label="Title"
						className={classes.textfield}
						value={title}
					/>
					<TextField
						onChange={(event) => this.onDescriptionChange(event)}
						label="Description"
						multiline
						className={classes.textfield}
						value={description}
					/>
					<Button
						color="secondary"
						onClick={(e) => onUpdate(e, { title, description, id: this.state.id, done: this.state.done })}
					>
						Salva <SaveIcon />
					</Button>
					<Button color="default" onClick={(e) => onCancel(e)}>
						Cancel
					</Button>
				</form>
			);
		} else {
			return <Paper />;
		}
	}
}

EditTodoForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditTodoForm);
