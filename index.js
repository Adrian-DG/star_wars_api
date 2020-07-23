// Api variables 
const api_url = 'https://swapi.dev/api/'
const api_people = 'people/:id'
const api_planet = 'planets/:id'

const api_people_request = `${api_url}${api_people}`
const api_planet_request = `${api_url}${api_planet}`

let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let ids_length = ids.length
// functions 

async function get_data(data) {
    const promise = data.map(id => fetch_data(id, api_people_request))
    try {
        const data = await Promise.all(promise) // checks if all promises on array succed
        console.log(data)
        render_data(data) // pass data to html
    } catch {
        console.error()
    }
}

function fetch_data(id, request) {
    return fetch(request.replace(':id', id)).then(response => response.json())
}

function render_data(data_array) {
    data_array.forEach(el => {
        to_html(el)
    });
}

function to_html(el) {
    const items = `
            <h3 class="text-center">${el.name}</h3>
            <hr>
            <ul class="info">
                <li><strong>Height:</strong> ${el.height / 100} m</li>
                <li><strong>Birthday:</strong> ${el.birth_year}</li>
                <li><strong>Gender:</strong> ${el.gender}</li>
                <li><strong>Skin color:</strong> ${el.skin_color}</li>
            </ul>
        `
    const node = document.createElement('LI')
    node.classList.add('card')
    node.innerHTML = items
    document.getElementById('list').appendChild(node)
}

function getMore(e) {
    let data_ids = []
    for (let i = 1; i <= 5; i++) {
        data_ids.push(ids_length + i)
        ids_length += i
    }

    get_data(data_ids)
}

// call functions 
get_data(ids)