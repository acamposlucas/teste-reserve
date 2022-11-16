import axios from "axios";
import { useEffect, useState } from "react";

interface ICountry {
	country: string;
	totalConfirmed: number;
	totalRecovered: number;
}

function App() {
	const [countries, setCountries] = useState<ICountry[]>([]);

	useEffect(() => {
		const getCountries = async () => {
			const res = await axios.get("https://api.covid19api.com/summary");
			setCountries(res.data.Countries);
		};

		getCountries();
	}, []);
	console.log(countries);

	return (
		<div className="bg-zinc-900 min-h-screen w-full flex items-center justify-center">
			<table className="text-zinc-100">
				<thead>
					<tr>
						<td>Posição</td>
						<td>País</td>
						<td>Total casos ativos</td>
						<td>Total de casos</td>
					</tr>
				</thead>
				<tbody>
					{countries.length > 0 &&
						countries
							.sort((a, b) => a.totalConfirmed - b.totalConfirmed)
							.slice(0, 10)
							.map(
								(
									{ country, totalConfirmed, totalRecovered },
									index
								) => (
									<tr key={country}>
										<td>{index + 1}</td>
										<td>{country}</td>
										<td>{totalConfirmed}</td>
										<td></td>
									</tr>
								)
							)}
				</tbody>
			</table>
		</div>
	);
}

export default App;
