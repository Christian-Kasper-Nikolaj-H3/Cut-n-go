console.log("Book page loaded");

const weekJson = {
    weekNumber: 3,
    days: [
        {
            date: "2026-02-01",
            label: "01/02",
            availableTimes: ["07:30", "08:00"]
        },
        {
            date: "2026-02-02",
            label: "02/02",
            availableTimes: ["07:30"]
        },
        {
            date: "2026-02-03",
            label: "03/02",
            availableTimes: ["07:30"]
        },
        {
            date: "2026-02-04",
            label: "04/02",
            availableTimes: []
        },
        {
            date: "2026-02-05",
            label: "05/02",
            availableTimes: []
        }
    ]
}

getWeek()

function getWeek(){
    let head = document.getElementById("week-list");
    let body = document.getElementById("book-list");

    head.innerText = ''
    let thRow = document.createElement("th")
    thRow.innerText = "Week" + weekJson.weekNumber
    head.appendChild(thRow)

    body.innerHTML = ''

    weekJson.days.forEach(day => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${day.label}</td>`;
        console.log(day.availableTimes.length);
        for (let i = 0; i < day.availableTimes.length; i++) {
            let td = document.createElement("td");
            td.innerText = day.availableTimes[i];
            tr.appendChild(td);
        }
        body.appendChild(tr);
    })

}