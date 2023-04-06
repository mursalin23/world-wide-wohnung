//import createPlotlyComponent from 'react-plotlyjs';
////See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
//import Plotly from 'plotly.js/dist/plotly-cartesian';
//const PlotlyComponent = createPlotlyComponent(Plotly);
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import { Table, Image, Row } from 'react-bootstrap';

const Compare = ({ house1, house2 }) => {
	console.log(house1)
	console.log(house2)

	const xData = ["price", "size", "rooms", "supermarktDistance", "busStationDistance", "caution money"]
	const trace1 = {
		x: xData,
		y: [Number(house1.price), Number(house1.size), Number(house1.rooms), Number(house1.supermarktDistance), Number(house1.busStationDistance), Number(house1.caution)],
		name: house1.title,
		type: "bar"
	}
	const trace2 = {
		x: xData,
		y: [Number(house2.price), Number(house2.size), Number(house2.rooms), Number(house2.supermarktDistance), Number(house2.busStationDistance), Number(house2.caution)],
		name: house2.title,
		type: "bar"
	}

	const data = [trace1, trace2]

	//const layout = {
	//	title: "Compare Houses",
	//	yref: "paper",
	//	xaxis: { title: "<i>" + "features" + "</i>", showgrid: true, zeroline: false, showline: false, font: "Raleway" },
	//	yaxis: { title: "<i>" + "feature value" + "</i>", showgrid: true, zeroline: false, showline: false, font: "Raleway" },
	//	font: { family: "Raleway", size: 12 },
	//}

	//const layout = { barmode: 'group' }
	//let config = {
	//	showLink: false,
	//	displayModeBar: true
	//}

	//const config = {
	//	showLink: false,
	//	displayModeBar: true,
	//	toImageButtonOptions: {
	//		format: "png",
	//		filename: "compare_result",
	//		height: 500,
	//		scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
	//	},
	//	responsive: true,
	//	"displaylogo": false
	//}

	return (
		<>
			<Table striped bordered hover>
				<tbody>
					<tr>
						<td>
							<Image src={house1.imageUrl} alt={house1.title} width={400} height={400} />
						</td>
						<td>
							<Image src={house2.imageUrl} alt={house2.title} width={400} height={400} />
						</td>
					</tr>
				</tbody>
			</Table>
			<Row>
				<Plot data={data} layout={{ height: 500, title: 'Compare Result' }} />
			</Row>
		</>
	);
};


export default Compare;

export async function getServerSideProps(context) {
	const id1 = context.query.id1
	const id2 = context.query.id2.slice(0, 36)

	const house1 = await prisma.houses.findUnique({
		where: {
			id: id1
		}
	})

	const house2 = await prisma.houses.findUnique({
		where: {
			id: id2
		}
	})

	return {
		props: { house1: house1, house2: house2 }
	}
}