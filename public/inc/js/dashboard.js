document.addEventListener( 'DOMContentLoaded', async function() {
    await loadDashboardOrders();
});


async function loadDashboardOrders() {
    const upcomingBody = document.getElementById('upcomingOrdersBody');
    const completedBody = document.getElementById('completedOrdersBody');
    const upcomingCount = document.getElementById('upcomingCount');
    const completedCount = document.getElementById('completedCount');
    const statusEl = document.getElementById('dashboardStatus');

    const setStatus = (text) => {
        if (statusEl) statusEl.innerText = text;
    };

    const clearBody = (tbody) => {
        while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
    };

    const showEmptyRow = (tbody, text) => {
        clearBody(tbody);
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
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
        td.innerText = order.Id ?? '';
        tr.appendChild(td);

        // Salon (SalonID for now)
        td = document.createElement('td');
        td.innerText = order.SalonID ?? '';
        tr.appendChild(td);

        // Booking date
        td = document.createElement('td');
        td.innerText = formatDate(order.BestillingDato);
        tr.appendChild(td);

        tbody.appendChild(tr);
    };

    try {
        setStatus('Loading orders...');

        const res = await fetch('/user/bookings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
        });

        if (!res.ok) {
            showEmptyRow(upcomingBody, `Error loading upcoming orders (HTTP ${res.status}).`);
            showEmptyRow(completedBody, `Error loading completed orders (HTTP ${res.status}).`);
            upcomingCount.innerText = '0';
            completedCount.innerText = '0';
            setStatus('Error loading orders.');
            return;
        }

        const data = await res.json();

        const allBookings = Array.isArray(data.bookings) ? data.bookings : [];

        const now = new Date();
        const upcomingFiltered = allBookings.filter((appointment) => {
            const d = new Date(appointment.BestillingDato);
            return !Number.isNaN(d.getTime()) && d > now;
        });

        const completedFiltered = allBookings.filter((appointment) => {
            const d = new Date(appointment.BestillingDato);
            return !Number.isNaN(d.getTime()) && d <= now;
        });

        // Upcoming
        if (upcomingFiltered.length === 0) {
            showEmptyRow(upcomingBody, 'No upcoming orders.');
        } else {
            clearBody(upcomingBody);
            for (const order of upcomingFiltered) addOrderRow(upcomingBody, order);
        }

        // Completed
        if (completedFiltered.length === 0) {
            showEmptyRow(completedBody, 'No completed orders.');
        } else {
            clearBody(completedBody);
            for (const order of completedFiltered) addOrderRow(completedBody, order);
        }

        upcomingCount.innerText = String(upcomingFiltered.length);
        completedCount.innerText = String(completedFiltered.length);

        if (allBookings.length === 0) {
            setStatus('No orders yet.');
        } else {
            setStatus(`Loaded ${upcomingFiltered.length} upcoming and ${completedFiltered.length} completed orders.`);
        }
    } catch (error) {
        console.log('Error loading orders:', error);
        showEmptyRow(upcomingBody, 'Error loading upcoming orders.');
        showEmptyRow(completedBody, 'Error loading completed orders.');
        upcomingCount.innerText = '0';
        completedCount.innerText = '0';
        setStatus('Error loading orders');
    }
}