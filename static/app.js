const BASE_URL = "http://localhost:5000/api";


/** Generate the cupcake in HTML form. */ 
function generateCupcakeHTML(cupcake){
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-button">X</button>
            </li>
            <img class="cupcake-img"
                src="${cupcake.image}"
                alt="(no image provided)">
        </div>
    `;
}

/** Display the list of cupcakes. */
async function fetchAllCupcakes(){
    
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake);
    }
}

/** Handle form for adding new cupcakes */

$("#new-cupcake-form").on("submit", async function(e){
    e.preventDefault();

    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

/** Handle clicking to delete cupcakes. */

$('#cupcakes-list').on('click', '.delete-button', async function(e){
    e.preventDefault();
    let $cupcake = $(e.target).closest('div');
    let cupcakeID = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeID}`);
    $cupcake.remove();
});

fetchAllCupcakes();