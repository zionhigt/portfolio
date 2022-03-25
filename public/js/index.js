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
    if(post.status === 201) return await post.json();
}

const getBody = function(form) {
    const formData = new FormData(form);
    const bodyVerify = [];
    const body = {};
    
    for(let field of formData.entries()) {
        let v = typeof field[1] === 'string' ? field[1] : '';
        let k = field[0]
        body[field[0]] = v;
        if(v === '') bodyVerify.push(k);
    }
    
    return (bodyVerify.length === 0) ? body : `${bodyVerify.join(", ")} ${bodyVerify.length > 1 ? "sont" : "est"} requis !`;
}

const submitForm = async function(form) {
    const body = getBody(form);

    if(typeof body === 'string') return alert(body);

    const options = {
        method: form.getAttribute("method"),
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }

    const confirmPublish = confirm("En publiant ce message vous acceptez de l'exposer à la vue de tous les visiteurs de ce site !");
    if(!confirmPublish) Promise.reject(new Error("Annulé par l'utilisateur"));

    const postUrl = form.getAttribute("action");
    return sendMessage(postUrl, options);
}

formContact.addEventListener("submit", function(event) {
    event.preventDefault();
    return submitForm(event.target)
    .then(async function(messages) {
        if(!!messages) {
            await refreshMessages();
            $('#messageModal').modal('toggle');
            $('#merciModal').modal('toggle');
            return 0;
        }
    })
    .catch(function(err) {
        console.error(err);
        return 1;
    })
});

window.onload = function () {
    const cookieWindow = document.querySelector("#cookieConsent");
    cookieConsent.classList.remove("d-none");
    const cookieBtn = cookieConsent.querySelector(".btn-primary");
    cookieBtn.addEventListener("click", function() {
        cookieConsent.classList.add("d-none");
    });
    parseData()
    .then(function(code) {
        if (code === 0) {
            const paragraphe = document.querySelectorAll(".paragraphe");
            paragraphe.forEach(function(item) {
                setTimeout(function() {
                    logo.s.classList.remove('active')
                    logo.eb.classList.remove('active')
                }, 700);
            });
        }
    })
    .catch(e => {console.error(e)});

    TMDB();

}

const footerCtnBtn = document.querySelector("#footerContBtn");
footerCtnBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('#messageModal').modal('toggle');
    
})