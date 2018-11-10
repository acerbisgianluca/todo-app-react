import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Divider from '@material-ui/core/Divider';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import EditTodoForm from './components/EditTodoForm';
import { findLocalNegativePatterns } from 'fast-glob/out/managers/tasks';

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
			todos: [],
			selectedIdx: -1,
			adding: false,
			editing: false
		};
	}

	todoListItemOnClick(event, i) {
		console.log(i, this);
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: i,
			adding: this.state.adding,
			editing: this.state.editing
		});
	}
	newTodoOnClick(e) {
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: true,
			editing: false
		});
	}

	newTodoSave(e, data) {
		console.log('SAVE', data);
		this.setState({
			todos: [ ...this.state.todos, data ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			editing: false
		});
		console.log('STATE = ', this.state);
	}

	TodoUpdate(e, data) {
		const { id } = data;
		const selectedIdx = this.state.todos.findIndex((elem) => elem.id === id);
		let todos = this.state.todos.filter((todo) => todo.id !== id); // prendo quelli con ID diverso

		todos.splice(selectedIdx, 0, data);
		this.setState({
			todos: [ ...todos ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			editing: false
		});
	}

	newTodoCancel(e) {
		console.log('CANCEL');
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			editing: false
		});
	}

	EditTodoCancel(e) {
		console.log('CANCEL');
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			editing: false
		});
	}

	deleteNote(event, noteId) {
		console.log('DELETING NOTE ', noteId);
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== noteId),
			selectedIdx: this.state.selectedIdx,
			adding: this.state.adding,
			editing: false
		});
	}

	toggleDone(i) {
		console.log(this.state.todos);
		const selectedIdx = this.state.todos.findIndex((elem) => elem.id === i);
		let todos = this.state.todos.filter((todo) => todo.id !== i); // prendo quelli con ID diverso

		let todo = this.state.todos[selectedIdx]; //recupero l'elemento da aggiornare
		todo.done = !todo.done;
		todos.splice(selectedIdx, 0, todo);
		console.log('after', todos);

		this.setState({
			todos: [ ...todos ],
			selectedIdx: this.state.selectedIdx,
			adding: this.state.adding,
			editing: this.state.editing
		});
	}

	editNote() {
		this.setState({
			todos: [ ...this.state.todos ],
			selectedIdx: this.state.selectedIdx,
			adding: false,
			editing: true
		});
	}

	render() {
		const { classes } = this.props;
		const { todos, selectedIdx, adding, editing } = this.state;

		const selectedTodo = todos[todos.findIndex((elem) => elem.id === selectedIdx)] || undefined;
		console.log('TODOS=', todos);
		console.log('SELECTED = ', selectedTodo);
		let editForm;

		editForm = editing ? (
			<EditTodoForm
				idx={selectedIdx}
				selectedTodo={selectedTodo}
				editing={editing}
				onCancel={(e) => this.EditTodoCancel(e)}
				onUpdate={(e, data) => this.TodoUpdate(e, data)}
			/>
		) : (
			''
		);
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
							<Typography variant="h4"> Elenco Di cose da fare </Typography> <Divider />
							<AddTodoForm
								adding={adding}
								onCancel={(e) => this.newTodoCancel(e)}
								onOpen={(e) => this.newTodoOnClick(e)}
								onSave={(e, data) => this.newTodoSave(e, data)}
							/>
							<TodoList
								todos={todos}
								todoListItemOnClick={(e, i) => this.todoListItemOnClick(e, i)}
								onDeleteNote={(e, i) => this.deleteNote(e, i)}
								done={false}
							/>
							<Divider />
							<Typography variant="h6" color="inherit">
								Todo Already done
							</Typography>
							<TodoList
								todos={todos}
								todoListItemOnClick={(e, i) => this.todoListItemOnClick(e, i)}
								onDeleteNote={(e, i) => this.deleteNote(e, i)}
								done={true}
							/>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper>
							<TodoDetails
								idx={selectedIdx}
								selectedTodo={selectedTodo}
								toggleDone={(i) => this.toggleDone(i)}
								editTodo={(e) => this.editNote()}
							/>
						</Paper>
						{editForm}
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
