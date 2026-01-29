document.addEventListener( 'DOMContentLoaded', async function() {
    await getData();
});


let getData = async () => {
    const bookings = await fetch('/user/bookings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if(!bookings.ok) {
        console.log(bookings.status);
        return;
    }

    const data = await bookings.json();
    console.log(data);
}