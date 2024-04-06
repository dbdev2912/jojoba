const paragraph = (text)=> {
    const lines = text.split('\n')
    return `
        ${ lines.map( line => `<p>${ line }</p>` ).join(' ') }
    `
}

module.exports = {
    paragraph
}