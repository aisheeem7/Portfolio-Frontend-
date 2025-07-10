let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navigationbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.homeimg, .projectbox, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    let errorMessages = [];
    const fullName = document.getElementById("fullName").value;
    if (!fullName.trim()) {
        isValid = false;
        errorMessages.push("Full Name is required.");
    }
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        isValid = false;
        errorMessages.push("Please enter a valid email address.");
    }
    const contactNumber = document.getElementById("contactNumber").value;
    if (!contactNumber.trim() || contactNumber.length < 10) {
        isValid = false;
        errorMessages.push("Please enter a valid contact number (at least 10 digits).");
    }
    const subject = document.getElementById("subject").value;
    if (!subject.trim()) {
        isValid = false;
        errorMessages.push("Subject is required.");
    }
    const message = document.getElementById("message").value;
    if (!message.trim()) {
        isValid = false;
        errorMessages.push("Message cannot be empty.");
    }
    const errorMessagesDiv = document.getElementById("errorMessages");
    if (!isValid) {
        errorMessagesDiv.innerHTML = errorMessages.join("<br>");
        errorMessagesDiv.style.color = "red";
    } else {
        errorMessagesDiv.innerHTML = "";
        alert("Form submitted successfully!");
    }
});

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const userDataContainer = document.getElementById('userData');

        users.slice(0, 2).forEach(user => {
            const card = document.createElement('div');
            card.className = 'projectbox';

            card.innerHTML = `<i class='bx bx-user'></i>
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <a href="mailto:${user.email}" class="button">Contact</a>`;

            userDataContainer.appendChild(card);
        });
        ScrollReveal().clean('.myfriends .projectbox');
        ScrollReveal().reveal('.myfriends .projectbox', {origin: 'bottom'});

    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });

