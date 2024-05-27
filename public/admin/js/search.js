$('#search-input').on("keyup", (e) => {
    console.log(window.location)
    if( e.keyCode === 13 ){

        const query = $(e.target).val();
        const path = `${ window.location.pathname }?page=1&query=${query}`

        window.location = path
    }
})

$('#mode-switch').on('click', (e) => {
    const queryString = window.location.search;

    // Parse the query string using URLSearchParams
    const urlParams = new URLSearchParams(queryString);
    const currentPath = window.location.pathname;
    

    // Example: Get specific parameters
    const query = urlParams.get('query');
    const page  = urlParams.get('page');
    const view  = urlParams.get('view')
    if( view == "grid" ){
        window.location = `${currentPath}?page=${ page }${ query ? `&query=${ query }`: "" }`
    }else{
        window.location = `${currentPath}?page=${ page }${ query ? `&query=${ query }`: "" }&view=grid`
    }
})