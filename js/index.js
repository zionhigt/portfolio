
const logo_s = document.querySelector('.first--letter i');
const logo_eb = document.querySelector('.first--letter span');
const logo = {
    s: logo_s,
    eb: logo_eb
}
logo.s.classList.add('active')
logo.eb.classList.add('active')

window.onload = function () {
    // const panel = document.querySelector('.site-in-building');
    // panel.classList.add('active');

    const paragraphe = document.querySelectorAll(".paragraphe");
    paragraphe.forEach(function(item) {
        item.classList.add('apear');
    })

}