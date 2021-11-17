// data from data.js

const visitorMessages = [];

const buildParagraphe = function(item, type) {
    const template = document.getElementById('template-paragraphe');
    const clone_paragraphe = document.importNode(template.content, true);
    const elem_paragraphe = clone_paragraphe.querySelector(".paragraphe");
    elem_paragraphe.classList.add('apear');
    const title = elem_paragraphe.querySelector("h3.title");
    title.innerHTML = item.title;
    const text = elem_paragraphe.querySelector("p.text");
    switch(type) {
        case "text":
            text.innerHTML = item.content;
            break;

        case "array":
            item.content.forEach(function(c) {
                if (c.hasOwnProperty("templateId")) {
                    if (c.templateId == "template-card-deck") {
                        const deck = c;
                        const deck_template = document.querySelector("#template-card-deck");
                        const deck_clone = document.importNode(deck_template.content, true);
                        const deck_elem = deck_clone.querySelector(".card-deck");
                        const deck_title = deck_clone.querySelector("h4");
                        deck_title.innerHTML = deck.name;

                        if (deck.content instanceof Array) {
                            const maxCol = 3;
                            let increment = maxCol;
                            let row;
                            deck.content.forEach(function (card, index) {
                                if (increment === maxCol) {
                                    row = document.createElement("div");
                                    row.classList.add("row", "justify-content-between", "mx-auto");

                                }
                                if (increment > 0) {
                                    let card_element = buildCard(card);
                                    row.appendChild(card_element);
                                    increment -= 1;
                                }
                                if (increment === 0) {
                                    deck_elem.appendChild(row);
                                    increment = maxCol;
                                }

                                if (index === deck.content.length - 1) {
                                    deck_elem.appendChild(row);
                                }
                            });
                        }
                        elem_paragraphe.appendChild(deck_clone);

                    } else if (c.templateId == "template-messages-stack") {
                        const messages = c;
                        const messages_template = document.querySelector("#template-messages-stack");
                        const messages_clone = document.importNode(messages_template.content, true);
                        const messages_elem = messages_clone.querySelector("#visitorMessages");
                        if (messages.content instanceof Array) {
                            const maxCol = 1;
                            let increment = maxCol;
                            let row;
                            messages.content.forEach(function (message, index) {
                                if (increment === maxCol) {
                                    row = document.createElement("div");
                                    row.classList.add("row", "justify-content-between", "mx-auto");

                                }
                                if (increment > 0) {
                                    let message_element = buildMessage(message);
                                    row.appendChild(message_element);
                                    increment -= 1;
                                }
                                if (increment === 0) {
                                    messages_elem.appendChild(row);
                                    increment = maxCol;
                                }

                                if (index === messages.content.length - 1) {
                                    messages_elem.appendChild(row);
                                }
                            });
                        }
                        elem_paragraphe.appendChild(messages_clone);

                    }
                }
            });
            if (item.hasOwnProperty("id")) {
                elem_paragraphe.setAttribute("id", item.id)
            }
            elem_paragraphe.removeChild(text)
            title.innerHTML = item.title;
            break;
    }

    return elem_paragraphe;
}
const buildParagraphes = async function(items) {
    if (items.hasOwnProperty("templateId")) {
        const parent = document.querySelector("section.main");
        
        items.content.forEach(function(paragraphe) {
            let elem_paragraphe = null
            if (typeof(paragraphe.content) == 'string') {
                elem_paragraphe = buildParagraphe(paragraphe, "text");
            } else if (paragraphe.content instanceof Array) {
                elem_paragraphe = buildParagraphe(paragraphe, "array");
            }

            if(elem_paragraphe != null) {
                parent.appendChild(elem_paragraphe);
            }
            return parent;
        });
    } else {
        throw new Error("Undefined template");
    }
};

const buildMessage = function(item) {
    if (item.hasOwnProperty("templateId") && item.templateId == "template-message") {
        const message_template = document.querySelector("#template-message");
        const message_clone = document.importNode(message_template.content, true);
        
        const message_content = message_clone.querySelector("figure figcaption p.message-content");
        message_content.innerHTML = item.text;

        if(item.name == "110690") {
            item.name = "Seb-dev";
            const figure = message_clone.querySelector("figure");
            figure.classList.add("offset-3", "offset-md-6")
        }
        const message_editor = message_clone.querySelector("figure figcaption span.message-editor");
        message_editor.innerHTML = item.name;

        const message_date = message_clone.querySelector("figure figcaption small.message-post-date");
        const clean_date = (new Date(item.datePost * 1000));
        message_date.innerHTML = `${clean_date.toLocaleDateString()} à ${clean_date.toLocaleTimeString()}`;
        // message_date.style.fontSize = "12px";

        return message_clone;
    }
    return 1;
}

const buildCard = function(item) {
    if (item.hasOwnProperty("templateId") && item.templateId == "template-card") {
        const card_template = document.querySelector("#template-card");
        const card_clone = document.importNode(card_template.content, true);
        
        const card_img = card_clone.querySelector("figure img");
        card_img.setAttribute('src', item.content.img_src);
        
        const card_redirect_link = card_clone.querySelector("figure a");
        card_redirect_link.setAttribute('href', item.content.redirect);

        const card_title = card_clone.querySelector("figure figcaption h5");
        card_title.innerHTML  = item.content.title;
        
        const card_text = card_clone.querySelector("figure figcaption p");
        card_text.innerHTML  = item.content.text;
        
        return card_clone;
    }
    return 1;
};

const getMessages = async function() {
    // const request = await fetch("http://preprod.seb-dev.tech/reponse.php?all=1");
    const request = await fetch("http://localhost/portfolio/reponse.php?all=1");
    return await request.json();
    
}

const refreshMessages = async function(){
    const parent = document.querySelector("section.main");
    const messageView = parent.querySelector("#visitorMessages");
    if(messageView != null) {
        // console.log(messageView.parentNode)
        parent.removeChild(messageView.parentNode);
    }
    let visitorMessages = await getMessages();
    if (visitorMessages.messages.length > 0) {
        const paragrapheOptions = {
            templateId: "template-messages-stack",
            content: visitorMessages.messages.map(function (item) {
                return {
                    templateId: "template-message",
                    text: item.message,
                    name: item.name,
                    datePost: item.write_at
                }
            })
        }
        const paragrapheMessages = buildParagraphe({ title: "Messages de visiteurs", content: [paragrapheOptions] }, "array");
        parent.appendChild(paragrapheMessages);
    }
    return parent;
}
const parseData = async function() {
    buildParagraphes(data.paragraphes);
    await refreshMessages();
    return 0;
};