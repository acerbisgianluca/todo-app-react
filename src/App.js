import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';

const styles = {
	root: {
		flexGrow: 1
	},
	grid: {
		paddingTop: 12
	},
	detailsDescription: {
		paddingTop: 24
	},
	textfield: {
		marginLeft: 20,
		marginRight: 20
	}
};
class App extends Component {
	constructor() {
		super();

		this.state = {
			todos: [
				{ title: 'Cosa da fare 1', description: 'descrizione cosa da fare 1' },
				{ title: 'Cosa da fare 2', description: 'descrizione cosa da fare 2' },
				{ title: 'Cosa da fare 3', description: 'descrizione cosa da fare 3' }
			],
			selectedIdx: -1,
			adding: false
		};
	}

	todoListItemOnClick(event, i) {
		console.log(i, this);
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: i,
			adding: this.state.adding,
			form: {
				title: '',
				description: ''
			}
		});
	}
	newTodoOnClick(e) {
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: true,
			form: {
				title: '',
				description: ''
			}
		});
	}

	newTodoSave(e) {
		console.log('SAVE', this.state.form);
		this.setState({
			todos: [ ...this.state.todos, this.state.form ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			form: {
				title: '',
				description: ''
			}
		});
	}

	newTodoCancel(e) {
		console.log('CANCEL');
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			form: {
				title: '',
				description: ''
			}
		});
	}

	onDescriptionChange(e) {
		console.log('DESCRIPTION CHANGE', e.target.value);
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: this.state.adding,
			form: {
				title: this.state.form.title,
				description: e.target.value
			}
		});
	}

	onTitleChange(e) {
		console.log('TITLE CHANGE', e.target.value);
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: this.state.adding,
			form: {
				title: e.target.value,
				description: this.state.form.description
			}
		});
	}

	deleteNote(event, i) {
		console.log('DELETING NOTE ', i);
		this.setState({
			todos: this.state.todos.filter((todo, idx) => idx !== i),
			selectedIdx: this.state.selectedIdx,
			adding: this.state.adding,
			form: {
				title: this.state.form.title,
				description: this.state.form.description
			}
		});
	}

	render() {
		const { classes } = this.props;
		const { todos, selectedIdx, adding } = this.state;

		const renderedTodos = todos.map((todo, i) => (
			<ListItem key={i} button onClick={(event) => this.todoListItemOnClick(event, i)}>
				<ListItemText primary={todo.title} />
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete" onClick={(event) => this.deleteNote(event, i)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		));

		let selectedTodoDetails = '';

		if (selectedIdx >= 0) {
			const selectedTodo = todos[selectedIdx];
			selectedTodoDetails = (
				<Fragment>
					<Typography variant="h4">{selectedTodo.title}</Typography>
					<Divider />
					<Typography variant="body1" component="p" className={classes.detailsDescription}>
						{selectedTodo.description}
					</Typography>
				</Fragment>
			);
		} else {
			selectedTodoDetails = (
				<Typography variant="body1" component="p">
					Seleziona un elemento dalla lista per vederne i dettagli
				</Typography>
			);
		}

		let addTodoUI = '';

		if (adding === true) {
			//mostra il form
			addTodoUI = (
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
					<Button color="secondary" onClick={(e) => this.newTodoSave(e)}>
						Salva <SaveIcon />
					</Button>
					<Button color="default" onClick={(e) => this.newTodoCancel(e)}>
						Cancel
					</Button>
				</form>
			);
		} else {
			addTodoUI = (
				<Button color="secondary" onClick={(e) => this.newTodoOnClick(e)}>
					Nuova cosa da fare
				</Button>
			);
		}

		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography variant="h6" color="inherit">
							Todo App
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid container spacing={8} className={classes.grid}>
					<Grid item xs={4}>
						<Paper>
							<Typography variant="h4">Elenco Di cose da fare</Typography>
							<Divider />
							{addTodoUI}
							<List>{renderedTodos}</List>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper>{selectedTodoDetails}</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
