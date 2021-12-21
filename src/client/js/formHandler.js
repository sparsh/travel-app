const ERROR_TEXT = 'Please add valid text';

function isValidUrl (text) {
    const regex = text.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return regex ? "IS a valid URL" : "NOT a valid URL";
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if(formText) {
        fetch(`http://localhost:8080/test?text=${formText}`)
        .then(res => res.json())
        .then(function(res) {
            const text = 
            `
            Model: ${res.model}<br>
            Score Tag: ${res.score_tag}<br>
            Agreement: ${res.agreement}<br>
            Subjectivity: ${res.subjectivity}<br>
            Confidence: ${res.confidence}<br>
            Irony: ${res.irony}<br>
            Valid Url: ${isValidUrl(formText)}`
            document.getElementById('results').innerHTML = text
        });
    }
    else {
        document.getElementById('results').innerHTML = ERROR_TEXT;
    }
}

export { handleSubmit }
