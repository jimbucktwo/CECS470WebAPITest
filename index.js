document.addEventListener("DOMContentLoaded", async () => {
    const url = "https://date.nager.at/api/v2/PublicHolidays";

    document.querySelector("form").addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(url + "/" + data.year + "/" + data.country);

            if (response.ok) {
                const holidays = await response.json();
                document.querySelector("tbody").innerHTML = "";
                holidays.forEach(element => {
                    const row = document.createElement("tr");
                    const date = document.createElement("td");
                    const name = document.createElement("td");
                    const localname = document.createElement("td");
                    const countrycode = document.createElement("td");
                    const global = document.createElement("td");
            
                    date.innerHTML = element.date;
                    name.innerHTML = element.name;
                    localname.innerHTML = element.localName;
                    countrycode.innerHTML = element.countryCode;
                    if (element.global) {
                        global.innerHTML = "&#xea52;";
                    } else {
                        global.innerHTML = "&#xea53;";
                    }
            
                    row.append(date, name, localname, countrycode, global);
                    document.querySelector("tbody").appendChild(row);
                });
            } else {
                console.log("Unable to fetch API");
            }

        } catch (error) {
            console.log(error);
        }
    })
})