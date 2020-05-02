window.sr = ScrollReveal();
sr.reveal('.navbar', {
    duration: 2000,
    distance: '10px',
    origin: 'bottom'
});
sr.reveal('.jumbotron', {
    duration: 2000,
    distance: '500px',
    origin: 'right'
});
sr.reveal('#skills', {
    duration: 2000,
    distance: '500px',
    origin: 'left',
    viewFactor: 0.2
});
sr.reveal('#hobbies', {
    duration: 2000,
    distance: '500px',
    origin: 'right',
    viewFactor: 0.2
});
sr.reveal('#card1', {
    duration: 2000,
    distance: '500px',
    origin: 'left',
    viewFactor: 0.2
});
sr.reveal('#card2', {
    duration: 2000,
    distance: '500px',
    origin: 'bottom',
    viewFactor: 0.2
});
sr.reveal('#card3', {
    duration: 2000,
    distance: '500px',
    origin: 'top',
    viewFactor: 0.2
});
sr.reveal('#card4', {
    duration: 2000,
    distance: '500px',
    origin: 'right',
    viewFactor: 0.2
});
sr.reveal('#education', {
    duration: 2000,
    viewFactor: 0.2
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});