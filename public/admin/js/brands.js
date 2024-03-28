$(() => {

    $('#preview-btn, #preview-img').click(() => {
        $('#preview-file-input').click()
    })


    $('#preview-file-input').change(e => {

        const rawFile = e.target.files[0]
        const reader = new FileReader();

        reader.readAsDataURL(rawFile);

        reader.onload = (e) => {
            $('#preview-img').attr("src", e.target.result)
            $('#preview-img').show()
            $('#preview-btn').hide();
        }
    })
})