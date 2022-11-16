import axios from "axios";
import { useEffect, useState } from "react";

interface ICountry {
	Country: string;
	TotalConfirmed: number;
	TotalRecovered: number;
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
			<table className="text-zinc-100 border-spacing-4 border-separate border-slate-700">
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
							.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
							.slice(0, 10)
							.map(
								(
									{ Country, TotalConfirmed, TotalRecovered },
									index
								) => {
									const ActiveConfirmed =
										TotalConfirmed - TotalRecovered;
									return (
										<tr key={Country}>
											<td>{index + 1}</td>
											<td>{Country}</td>
											<td>{TotalConfirmed}</td>
											<td>{ActiveConfirmed}</td>
										</tr>
									);
								}
							)}
				</tbody>
			</table>
		</div>
	);
}

export default App;
