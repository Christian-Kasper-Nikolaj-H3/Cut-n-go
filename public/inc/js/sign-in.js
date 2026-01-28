document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('signIn').addEventListener('submit', signIn);
});

function signIn(e) {
    e.preventDefault();
    console.log("Sign in");
}