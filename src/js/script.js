const postUrl = 'https://jsonplaceholder.typicode.com/posts/'
const form = document.querySelector('.form')

const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: data,
	})
	return res.json()
}

const postConstruction = (formSelector) => {
	const formData = new FormData(formSelector)
	const json = JSON.stringify(Object.fromEntries(formData.entries()))

	console.log(json)

	postData(postUrl, json)
		.then((data) => {
			form.reset()
			console.log('Спасибо за обращение, мы с вами свяжемся!!!')
		})
		.catch((e) => {
			console.log('Ошибка отправки данных')
		})
		.finally(() => {
			form.reset()
		})
}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const { name, company, email, message, checkbox } = form

	if (checkbox.checked) {
		if (
			(name.value !== '') &
			(company.value !== '') &
			(email.value !== '') &
			(message.value !== '')
		) 
		{
			postConstruction(form)
		} 
		else {
			console.log('Пожалуйста, заполните обязательные поля!!!')
		}
	} else {
		console.log('А ну-ка, прими пользовательское соглашение!!!')
	}
})