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

    } catch (error) {
        console.log("Error fetching data:", error);
    }
};