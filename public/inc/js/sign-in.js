document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('signIn').addEventListener('submit', signIn);
});

async function signIn(e) {
    e.preventDefault();

    let res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        })
    })

    if(res.ok) {
        let token = await res.json();
        localStorage.setItem('token', token.token);
        window.location.replace('/dashboard');
    } else {
        alert("Invalid username or password");
    }
}
