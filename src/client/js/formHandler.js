import StringConstants from "./string";

const getTravelData = (from, to, date) => {
    console.log("the from is ", from, to, date);
}



const handleSubmit = () => {

    const errorElement = document.getElementById("error");
    errorElement.innerText = ""
    const fromPlace = document.getElementById("from").value;
    const toPlace = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    let error = "";
    console.log("Fro", fromPlace, toPlace, date)
    if(!fromPlace) {
        error = StringConstants.emptyFrom;
    }
    else if(!toPlace) {
        error = StringConstants.emptyDestination;
    }
    else if (!date) {
        error = StringConstants.emptyDate;
    }
    else {
        getTravelData(fromPlace, toPlace, date);
    }

    if(error) {
        errorElement.innerText = error;
    }
}

export { handleSubmit }
