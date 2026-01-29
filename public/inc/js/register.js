document.getElementById("register").addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log(e.target.username.value);
    let res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: e.target.username.value,
            name: e.target.name.value,
            surname: e.target.surname.value,
            password: e.target.password.value,
            phone: e.target.phone.value,
            email: e.target.email.value
        })
    })

    if (res.ok) {
        let token = await res.json();
        localStorage.setItem('token', token.token);
        window.location.replace('/dashboard');
    } else {
        alert("Invalid username or password");
    }
});