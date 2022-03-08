import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Btn = ({ onClick, label, ...props }) => (
	<Button color='primary' onClick={onClick} variant='outlined' size='medium' {...props}>
		{label}
	</Button>
);

Btn.propTypes = {
	onClick: PropTypes.func.isRequired,
	label: PropTypes.string,
};

Btn.defaultProps = {
	label: "Envoyer",
};

export default Btn;
