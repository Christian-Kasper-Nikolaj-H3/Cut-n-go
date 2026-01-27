document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');
    const message = document.getElementById('message');
    const salonSelect = document.getElementById('salon');
    const dateInput = document.getElementById('dato');
    const timeSelect = document.getElementById('tid');

    // Hent ledige tider når salon og dato er valgt
    const fetchAvailableTimes = async () => {
        const salonID = salonSelect.value;
        const date = dateInput.value;

        if (!salonID || !date) {
            timeSelect.disabled = true;
            timeSelect.innerHTML = '<option value="">Vælg først salon og dato...</option>';
            return;
        }

        try {
            const res = await fetch(`/api/booking/available-times?salonID=${salonID}&date=${date}`);
            const data = await res.json();

            if (res.ok && data.availableTimes) {
                timeSelect.disabled = false;
                timeSelect.innerHTML = '<option value="">Vælg tidspunkt...</option>';
                
                if (data.availableTimes.length === 0) {
                    timeSelect.innerHTML = '<option value="">Ingen ledige tider</option>';
                    timeSelect.disabled = true;
                } else {
                    data.availableTimes.forEach(time => {
                        const option = document.createElement('option');
                        option.value = time;
                        option.innerText = time;
                        timeSelect.appendChild(option);
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching available times:', error);
            message.className = 'message error';
            message.innerText = 'Kunne ikke hente ledige tider.';
        }
    };

    salonSelect.addEventListener('change', fetchAvailableTimes);
    dateInput.addEventListener('change', fetchAvailableTimes);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const date = dateInput.value;
        const time = timeSelect.value;
        const dateTime = `${date}T${time}:00`;

        const formData = {
            SalonID: salonSelect.value,
            KundeFornavn: document.getElementById('fornavn').value,
            KundeEfternavn: document.getElementById('efternavn').value,
            KundeTelefon: document.getElementById('telefon').value,
            KundeEmail: document.getElementById('email').value,
            BestillingDato: dateTime
        };

        try {
            const res = await fetch('/api/booking/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                message.className = 'message success';
                message.innerText = 'Booking oprettet! Vi glæder os til at se dig.';
                form.reset();
                timeSelect.disabled = true;
                timeSelect.innerHTML = '<option value="">Vælg først salon og dato...</option>';
            } else {
                message.className = 'message error';
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).join(', ');
                    message.innerText = `Fejl: ${errorMessages}`;
                } else {
                    message.innerText = data.status || 'Der opstod en fejl';
                }
            }
        } catch (error) {
            message.className = 'message error';
            message.innerText = 'Der opstod en fejl. Prøv igen senere.';
            console.error('Error:', error);
        }
    });
});