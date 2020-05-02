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

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});