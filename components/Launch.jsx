import React, { useState } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Row = ({ row, collapse }) => {
	const [open, setOpen] = useState(false);
	const infos = Object.keys(row);

	return (
		<>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={() => setOpen(!open)}>
				{collapse && (
					<TableCell align='left'>
						<IconButton aria-label='expand row'>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
					</TableCell>
				)}
				{infos.map((info) => (
					<TableCell key={`tableCell-${info}`} align='left'>
						{row[info]}
					</TableCell>
				))}
			</TableRow>

			{collapse && (
				<TableRow sx={{}}>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: !open && "none" }} colSpan={infos.length + 1}>
						<Collapse in={open} timeout='auto' unmountOnExit>
							{collapse}
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

Row.propTypes = {
	row: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element])).isRequired,
	collapse: PropTypes.element,
};

Row.defaultProps = {
	collapse: null,
};

const Launch = ({ datas, titles, collapse }) => (
	<TableContainer component={Card} variant='outlined' sx={{ width: "100%" }}>
		<Table aria-label='collapsible table'>
			<TableHead>
				<TableRow>
					{collapse && <TableCell align='left' />}
					{titles.map((title) => (
						<TableCell align='left' key={`tableHead-${title}`}>
							{title}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{datas.map((data, index) => (
					<Row key={`tableBody-${data.id || index}`} row={data} collapse={collapse ? collapse[index] : null} />
				))}
			</TableBody>
		</Table>
	</TableContainer>
);

Launch.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
	titles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
	collapse: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element])),
};

Launch.defaultProps = {
	collapse: null,
};

export default Launch;
