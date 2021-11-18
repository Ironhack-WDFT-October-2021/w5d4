const getData = input => {
	// make a get request to the rick and morty api
	axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`)
		.then(response => {
			console.log(response.data.results[0])
			const char = response.data.results[0]
			// update the dom
			document.querySelector('#name').innerText = char.name
			document.querySelector('img').setAttribute('src', char.image)
		})
		.catch(err => console.log(err))
}



document.querySelector('button').addEventListener('click', () => {
	const input = document.querySelector('#character').value
	console.log(input)
	getData(input)
})