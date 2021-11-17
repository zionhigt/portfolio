
const logo_s = document.querySelector('.first--letter i');
const logo_eb = document.querySelector('.first--letter span');
const logo = {
    s: logo_s,
    eb: logo_eb
}
logo.s.classList.add('active');
logo.eb.classList.add('active');

const formContact = document.querySelector("#formContact");
const sendMessage = async function(url, options) {
    const post = await fetch(url, options);
    return post.json();
}

formContact.addEventListener("submit", function(event) {
    event.preventDefault();

    const confirmPublish = confirm("En publiant ce message vous acceptez de l'exposer à la vue de tous les visiteurs de ce site !");

    if(confirmPublish) {
        const formData = new FormData(event.target);
        const options = {
            method: event.target.getAttribute("method"),
            body: formData
        }

        const postUrl = event.target.getAttribute("action");
        sendMessage(postUrl, options)
        .then(async function(messages) {
            await refreshMessages();
            $('#messageModal').modal('toggle');
            $('#merciModal').modal('toggle');
            return 0;
        })
        .catch(function(err) {
            console.error(err);
        })
    }
});


window.onload = function () {
    parseData()
    .then(function(code) {
        if (code === 0) {
            const paragraphe = document.querySelectorAll(".paragraphe");
            paragraphe.forEach(function(item) {
                setTimeout(function() {
                    logo.s.classList.remove('active')
                    logo.eb.classList.remove('active')
                    item.classList.add('apear');
                }, 700);
            });
        }
    })
    .catch(e => {console.error(e)});
    // const panel = document.querySelector('.site-in-building');
    // panel.classList.add('active');

}