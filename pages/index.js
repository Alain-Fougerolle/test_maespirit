import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';

import styles from '../styles/Home.module.css';
import retrieve from '../api/launches';
import Launch from '../components/Launch';
import Btn from '../components/Btn';

const Home = () => {
	const [datas, setDatas] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [locations, setLocations] = useState([]);

	const success = (result) => {
		setDatas(result);
		setLoading(false);
	};

	const failure = (err) => {
		setLoading(false);
		console.log(err);
	};

	useEffect(() => {
		setLoading(true);
		retrieve({ page: page, locations: locations }).then(success, failure);
	}, [page, locations]);

	if (isLoading) return <p>Loading...</p>
	if (!datas) return <p>No data</p>
	
	return (
		<div className={ styles.container }>
			<Head>
				<title>Homework Maespirit</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={ styles.main }>
				<Stack direction='column' spacing={4}>
					<h1 className={styles.title}>
						Lancement réussi
					</h1>

					<Launch
						titles={["Nom", "Identifiant", "net"]}
						datas={datas.success.map((s) => ({
							name: s.name,
							id: s.id,
							net: s.net
						}))}
						collapse={datas.success.map((s) => (
							<Stack key={s.id} spacing={2} sx={{ padding: '16px' }}>
								<div>Lien : {s.url}</div>
								<div>Dernière mise à jour : {s.last_updated}</div>
								<div>Description mission : {s.mission.description}</div>
							</Stack>
						))}
					/>

					<Stack direction='row' spacing={4}>
						<Btn onClick={ () => setPage(page - 1) } label='Page précédente' disabled={!datas.previousPage || page === 1}/>
						<Btn onClick={ () => setPage(page + 1) } label='Page suivante' disabled={ !datas.nextPage } />
					</Stack>
				</Stack>
			</main>
		</div>
	);
};

export default Home;
