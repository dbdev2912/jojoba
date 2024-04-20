$('#search-input').on("keyup", (e) => {
    console.log(window.location)
    if( e.keyCode === 13 ){

        const query = $(e.target).val();
        const path = `${ window.location.pathname }?page=1&query=${query}`

        window.location = path
    }
})