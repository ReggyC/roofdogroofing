const featuredEl = document.querySelector('#featured-items');
// Other Local Variables
let loading = false;
const homeUrl = `http://localhost:5000/index.html`;
const baseUrl = `http://localhost:5000/projects`;

// ***************************************
// *****   Declare Functions here   ******
// Get the featured pages from the server
const getFeaturedPages = async () => {
    console.log('Start of getFeaturedPages');
    try {
        loading = true;

        // Make request to backend, include parameters as body attributes
        const res = await fetch(baseUrl + '?tag=Featured', {
            method: 'POST'
        });
        if (res.ok) {
            console.log('response was ok, extracting page data');
            const data = await res.json();
            const {pages,message, hasMore,nextCursor} = data;
            console.log(`Response from backend:`, pages);
            loading = false;
            for (let i = 0; i < 4; i++) {
                const div = document.createElement('div');
                div.className = 'content-container col s-12 m-6 l-6 xl-3'
                div.id = pages[i].id;
                div.innerHTML = `
                    <div id="content-card" class="content-card">
                        <h3><a href='http://localhost:5000/project.html?id=${pages[i].id}'>${pages[i].title}</a></h3>
                        <div class="product-type"><p><strong class="trait-title">Type:</strong><span class="prop-details">${pages[i].type.name}</span></p></div>
                        <div class="product-description">
                        <p><strong class="trait-title">Description:</strong></p>
                        <p class="product-description-text">${pages[i].description}</p></div>
                        <a href="http://localhost:5000/project.html?id=${pages[i].id}"><img id="content-img-ID001" src="${pages[i].img}" alt="${pages[i].title}" class="content-img"></a>
                    </div>
                `;
                featuredEl.appendChild(div);
            }
            return data;
        } else {
            throw new Error('Response is not okay');
        }
    } catch (error) {
        console.log(`Error in getPages: ${error.message}`);
        console.log(`Status: ${error.status}`);
        switch (error.status) {
            // Error handling here
            case 400:
                console.log(`Bad Request - Status Code 400 Message: ${error.message}`);
                break;
            case 401:
                console.log(`Unauthorized - Status Code 401 Message: ${error.message}`);
                break;
            case 403:
                console.log(`Forbidden - Status Code 403 Message: ${error.message}`);
                break;
            case 404:
                console.log(`Not Found - Status Code 404 Message: ${error.message}`);
                window.location.replace = 'http://localhost:5000/404.html';
                break;
            case 500:
                console.log(`Internal Server Error (Catch All) - Status Code 500 Message: ${error.message}`);
                break;
            case 503:
                console.log(`Server Unavailable - Status Code 503 Message: ${error.message}`);
                break;
        }
    }
}

// Functions in order
const loadPage = async () => {
    getFeaturedPages();
}

loadPage();