function getParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    console.log(regex)
    if (!results) return 'penerima';
    if (!results[2]) return 'penerima';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const undangan = getParameter('untuk');


if (undangan) {
    document.getElementById('receiver').textContent = undangan;
}