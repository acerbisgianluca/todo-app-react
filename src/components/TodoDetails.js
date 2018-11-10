import React, { Fragment, Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
const style = {};

class TodoDetails extends Component {
	render() {
		const { classes, idx, selectedTodo, toggleDone, editTodo } = this.props;

		if (selectedTodo) {
			let toggleDoneTxt = undefined;

			if (selectedTodo.done) {
				toggleDoneTxt = 'Mark as Not Done';
			} else toggleDoneTxt = 'Mark as  Done';
			console.log(selectedTodo, idx);

			const ToggleStatuBtn = (
				<Button
					onClick={(e) => {
						toggleDone(idx);
					}}
				>
					{toggleDoneTxt}
				</Button>
			);

			return (
				<Fragment>
					<Typography variant="h4">{selectedTodo.title}</Typography>
					<Divider />
					<Typography variant="body1" component="p" className={classes.detailsDescription}>
						{selectedTodo.description}
					</Typography>
					<Divider />
					{ToggleStatuBtn}
					<Button onClick={(e) => editTodo(e)}>Edit</Button>
				</Fragment>
			);
		} else {
			return (
				<Typography variant="body1" component="p">
					Seleziona un elemento dalla lista per vederne i dettagli
				</Typography>
			);
		}
	}
}

export default withStyles(style)(TodoDetails);
