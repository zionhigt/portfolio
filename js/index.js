
const logo_s = document.querySelector('.first--letter i');
const logo_eb = document.querySelector('.first--letter span');
const logo = {
    s: logo_s,
    eb: logo_eb
}
logo.s.classList.add('active')
logo.eb.classList.add('active')



window.onload = function () {
    parseData()
    .then(function(code) {
        if (code === 0) {
            console.log(code)
            const paragraphe = document.querySelectorAll(".paragraphe");
            paragraphe.forEach(function(item) {
                setTimeout(function() {
                    logo.s.classList.remove('active')
                    logo.eb.classList.remove('active')
                }, 700);
                item.classList.add('apear');
            });
        }
    })
    .catch(e => {console.error(e)});
    // const panel = document.querySelector('.site-in-building');
    // panel.classList.add('active');

}