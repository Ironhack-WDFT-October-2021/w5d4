const apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=7HPHHUBJ8LTZPVUT'

const printChart = stockData => {
	const dailyData = stockData['Time Series (Daily)']
	// console.log(dailyData)
	// data for the x axis:
	const stockDates = Object.keys(dailyData)
	console.log(stockDates)
	// data for the y axis:
	const stockPrices = stockDates.map(date => {
		return dailyData[date]['4. close']
	})
	console.log(stockPrices)

	// draw the chart
	const ctx = document.querySelector('#myChart').getContext('2d');

	new Chart(ctx, {
		type: 'bar',
		data: {
			// x-axis:
			labels: stockDates,
			datasets: [
				{
					label: 'Stock Chart',
					backGroundColor: 'rgb(255, 99, 132',
					borderColor: 'rgb(255, 99, 132',
					// y-axis:
					data: stockPrices
				}
			]
		}
	})
}


axios.get(apiUrl).then(response => {
	console.log(response)
	printChart(response.data)
}).catch(err => console.log(err))