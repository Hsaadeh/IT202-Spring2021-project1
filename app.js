// Javascript for the SPA: Project 1 - IT 202


// The functionality for the navbar:
let home_screen = document.querySelector("#Home-Instructions");
home_screen.style.display = "block"; // sets the home screen

let NavBarAnchors = document.querySelectorAll("ul#navbar a");

NavBarAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {

        document.querySelectorAll(".screen").forEach((screen) => {
            screen.style.display = "none";
        });

        let screen = event.target.getAttribute("data-screen");
        let targetScreen = document.querySelector("#" + screen); //changed recently
        targetScreen.style.display = "block";
    });

})
// end of the navbar functionality


// The functionality for the Form: Allows the user to filter the data for the City-Owned Land Inventory
let endpoint = "https://data.cityofchicago.org/resource/aksk-kvfp.json";

let url = endpoint;

// Form search
let filter_by_id_button = document.querySelector("#filter_search_id");
let filter_by_pin_button = document.querySelector("#filter_search_pin");
let filter_by_zip_button = document.querySelector("#filter_search_zip_code");
let filter_by_community_button = document.querySelector("#filter_search_community");

// Data:
// let blank_card = document.querySelector("#card");

// let new_card = blank_card.cloneNode(true);

/*
        <div class="screen" id="Data">
          PLACE HOLDER FOR : DATA
          <div class="card" style="width: 18rem;" id="card">
            <div class="card-header">
              <button id="map_button" type="button">View on Map</button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" id="community_area_name">community_area_name</li>
              <li class="list-group-item" id="zip">zip code</li>
              <li class="list-group-item" id="pin">pin</li>
              <li class="list-group-item" id="address">address</li>
              <li class="list-group-item" id="square_footage">square_footage</li>
            </ul>
          </div>
*/

/**************
 * Create Card
 **************/
function createCard(entry) {
    // seperator
    let line_br = document.createElement('br');
    document.querySelector("#Data").appendChild(line_br);

    // card div
    let card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';

    
    // ul
    let card_ul = document.createElement('ul');
    card_ul.className = "list-group list-group-flush";

    // card header
    // let header = document.createElement('button');
    // header.className = 'map_button';
    // header.id = 'display_map_button';
    // header.type = 'button';
    // header.innerText = 'View on Map';
    // card_ul.appendChild(header);
    
    // li elements
    let li_community = document.createElement('li');
    li_community.className = 'list-group-item';
    //li_community.id = entry['community_area_name'];
    li_community.innerText = "Community: " + entry["community_area_name"];
    card_ul.appendChild(li_community);

    let li_zip = document.createElement('li');
    li_zip.className = 'list-group-item';
    //li_community.id = entry['zip_code'];
    li_zip.innerText = "Zip Code: " + entry["zip_code"];
    card_ul.appendChild(li_zip);

    let li_pin = document.createElement('li');
    li_pin.className = 'list-group-item';
    //li_community.id = entry['pin'];
    li_pin.innerText = "Pin: " + entry["pin"];
    card_ul.appendChild(li_pin);

    let li_address = document.createElement('li');
    li_address.className = 'list-group-item';
    //li_community.id = entry['address'];
    li_address.innerText = "Address: " + entry["address"];
    card_ul.appendChild(li_address);

    let li_square_footage = document.createElement('li');
    li_square_footage.className = 'list-group-item';
    //li_community.id = entry['sq_ft'];
    li_square_footage.innerText = "Square Footage: " + entry["sq_ft"];
    card_ul.appendChild(li_square_footage);

    card.appendChild(card_ul);
    document.querySelector("#Data").appendChild(card);
}

// id filter
filter_by_id_button.addEventListener("click", (event) => {
    let id = document.querySelector("#id_filter").value;
    new_url = url + "?id=" + id;
    fetch(new_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.forEach((entry) => {
                createCard(entry);
            });

        });
})

// pin filter
filter_by_pin_button.addEventListener("click", (event) => {
    let pin = document.querySelector("#pin_filter").value;
    new_url = url + "?pin=" + pin;
    fetch(new_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // work with data
            data.forEach((entry) => {
                createCard(entry);
            });
        });
})

// zip filter
filter_by_zip_button.addEventListener("click", (event) => {
    let zip_code = document.querySelector("#zip_code_filter").value;
    new_url = url + "?zip_code=" + zip_code;
    fetch(new_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // work with data
            data.forEach((entry) => {
                createCard(entry);
            });
        });
})

// Community Filter
filter_by_community_button.addEventListener("click", (event) => {
    let select = document.querySelector("#dropdown_community_options")
    let community = select.options[select.selectedIndex].text;
    //console.log(community);
    new_url = url + "?community_area_name=" + community;
    fetch(new_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // work with data
            data.forEach((entry) => {
                createCard(entry);
            });
        });
})

// // get the filter data 
// filter_button.addEventListener("click", (event) => {
//     let filter_value = document.querySelector("#filter").value;
//     console.log(filter_value);

//     let communities_unique = [];
//     // communities_unique.sort();

//     // use the filter 
//     fetch (url)
//         .then( (response) => {
//             return response.json()})
//         .then( (data) => {
//         // work with data

//             data.forEach( (entry) => {
//                 if(entry.includes(filter_value.values(entry))) {
//                     console.log(entry);
//                 } 

//                 // // if(!communities_unique.includes(entry["community_area_name"])) {
//                 // //     communities_unique.push(entry["community_area_name"]);
//                 // }
//             });
//         });

//     // console.log(communities_unique);
// })



// make an array of all the community names
let communities_unique = [];
communities_unique.sort();

fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // work with data

        data.forEach((entry) => {
            if (!communities_unique.includes(entry["community_area_name"])) {
                communities_unique.push(entry["community_area_name"]);
            }
        });

        // dropdown menu for community names
        let dropdown_community_options_array = [];
        dropdown_community_options_array.push("<option value='' id='community_filter' selected></option>")
        communities_unique.forEach((element) => {
            dropdown_community_options_array.push("<option value='' id='community_filter'>" + element + "</option>");
        });
        document.getElementById("dropdown_community_options").innerHTML = dropdown_community_options_array.join();
    });


// let map_button = document.querySelectorAll("#map_button");

// map_button.addEventListener("click", (event) => {

// })

//get land data

//construct url by filtering data

// end of the Form functionality


// Data:

// let map_button = document.getElementById("#display_map_button");

// map_button.addEventListener("click", (event) => {
//     console.log("Map Displayed in Map Tab");
// })

// Map:
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.8781, lng: -87.6298 },
    zoom: 8,
  });
}

// initMap();
