document.addEventListener('DOMContentLoaded', async function () {
    await fetchAdminData();
});


let fetchAdminData = async () => {
    console.log("Fetching data");

    try {
        const res = await fetch('/api/booking/get/all');
        if(!res.ok) {
            console.log(res.status);
            return;
        }

        const data = await res.json();
        console.log(data);


        for(const booking of data) {
            const tr = document.createElement('tr');

            // Booking ID
            let td = document.createElement('td');
            td.innerText = booking.Id;
            tr.appendChild(td);

            // Fornavn
            td = document.createElement('td');
            td.innerText = booking.KundeFornavn;
            tr.appendChild(td);

            // Efternavn
            td = document.createElement('td');
            td.innerText = booking.KundeEfternavn;
            tr.appendChild(td);

            // Telefon
            td = document.createElement('td');
            let link = document.createElement('a');
            link.href = `tel:${booking.KundeTelefon}`;
            link.innerText = booking.KundeTelefon;
            td.appendChild(link);
            tr.appendChild(td);

            // Email
            td = document.createElement('td');
            link = document.createElement('a');
            link.href = `mailto:${booking.KundeEmail}`;
            link.innerText = booking.KundeEmail;
            td.appendChild(link);
            tr.appendChild(td);

            // Dato
            td = document.createElement('td');

            //format date from 2026-01-28T09:00:00.000Z to 28-01-2026 09:00
            const date = new Date(booking.BestillingDato);
            td.innerText = date.toLocaleString('da-DK', {dateStyle: 'short', timeStyle: 'short'});
            tr.appendChild(td);

            document.getElementById('tableBody').appendChild(tr);
        }

    } catch (error) {
        console.log("Error fetching data:", error);
    }
};