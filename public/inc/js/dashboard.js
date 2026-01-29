document.addEventListener( 'DOMContentLoaded', async function() {
    await loadDashboardOrders();
});


async function loadDashboardOrders() {
    const upcomingBody = document.getElementById('upcomingBody');
    const completedBody = document.getElementById('completedBody');
    const upcomingCount = document.getElementById('upcomingCount');
    const completedCount = document.getElementById('completedCount');
    const statusEl = document.getElementById('dashboardStatus');

    const setStatus = (text) => {
        if (statusEl) statusEl.innerText = text;
    };

    const clearBody = (body) => {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    };

    const showEmptyRow = (tbody, text) => {
        clearBody(tbody);
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 5;
        td.className = 'table__empty';
        td.innerText = text;
        tr.appendChild(td);
        tbody.appendChild(tr);
    };

    const formatDate = (value) => {
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleString('da-DK', {dateStyle: 'short', timeStyle: 'short'});
    };

    const addOrderRow = (tbody, order) => {
        const tr = document.createElement('tr');

        // Order #
        let td = document.createElement('td');
        td.innerText = order.id ?? '';
        tr.appendChild(td);

        // Customer
        td = document.createElement('td');
        td.innerText = order.KundeFornavn + ' ' + order.KundeEfternavn;
        tr.appendChild(td);

        // Phone
        td = document.createElement('td');
        if (order.KundeTelefon) {
            const a = document.createElement('a');
            a.href = `tel:${order.KundeTelefon}`;
            a.innerText = order.KundeTelefon;
            td.appendChild(a);
        } else {
            td.innerText = '';
        }
        tr.appendChild(td);

        // Email
        td = document.createElement('td');
        if (order.KundeEmail) {
            const a = document.createElement('a');
            a.href = `mailto:${order.KundeEmail}`;
            a.innerText = order.KundeEmail;
            td.appendChild(a);
        } else {
            td.innerText = '';
        }
        tr.appendChild(td);

        // Booking date
        td = document.createElement('td');
        td.innerText = formatDate(order.BestillingDato);
        tr.appendChild(td);

        tbody.appendChild(tr);
    };

    try {
        setStatus('Loading orders...');

        const res = await fetch('/api/bookings', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!res.ok) {
            console.log(res.status);
            showEmptyRow(upcomingBody, 'Error loading orders');
            showEmptyRow(completedBody, 'Error loading orders');
            upcomingCount.innerText = '0';
            completedCount.innerText = '0';
            setStatus('Error loading orders');
            return;
        }

        const date = await res.json();

        const upcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
        const completed = Array=isArray(data.completed) ? data.completed : [];

        // Upcoming
        if (upcoming.length === 0) {
            showEmptyRow(upcomingBody, 'No upcoming orders');
        } else {
            clearBody(upcomingBody);
            for (const order of upcoming) addOrderRow(upcomingBody, order);
        }

        // Compoleted
        if (completed.length === 0) {
            showEmptyRow(completedBody, 'No completed orders');
        } else {
            clearBody(completedBody);
            for (const order of completed) addOrderRow(completedBody, order);
        }

        upcomingCount.innerText = String(upcoming.length);
        completedCount.innerText = String(completed.length);

        setStatus(`Loaded ${upcoming.length} upcoming and ${completed.length} completed orders`);
    } catch (error) {
        console.log('Error loading orders:', error);
        showEmptyRow(upcomingBody, 'Error loading upcoming orders.');
        showEmptyRow(completedBody, 'Error loading completed orders.');
        upcomingCount.innerText = '0';
        completedCount.innerText = '0';
        setStatus('Error loading orders');
    }
}