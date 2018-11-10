import React, { Fragment, Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import Divider from '@material-ui/core/Divider';

const style = {};

class TodoList extends Component {
	render() {
		const { classes, todos, todoListItemOnClick, onDeleteNote, done } = this.props;

		const renderedTodos = todos.filter((e) => e.done === done).map((todo) => (
			<ListItem key={todo.id} button onClick={(event) => todoListItemOnClick(event, todo.id)}>
				<ListItemText primary={todo.title} />
				<ListItemSecondaryAction>
					<IconButton aria-label="Delete" onClick={(event) => onDeleteNote(event, todo.id)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		));

		return <List>{renderedTodos}</List>;
	}
}

export default withStyles(style)(TodoList);
