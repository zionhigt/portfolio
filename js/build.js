// data from data.js
const buildParagraphes = async function(items) {
    if (items.hasOwnProperty("templateId")) {
        const template = document.getElementById(items.templateId);
        const parent = document.querySelector("section.main")
        items.content.forEach(function(paragraphe) {
            const clone_paragraphe = document.importNode(template.content, true);
            const elem_paragraphe = clone_paragraphe.querySelector(".paragraphe");
            if (typeof(paragraphe.content) == 'string') {
                const title = elem_paragraphe.querySelector("h3.title");
                title.innerHTML= paragraphe.title;

                const text = elem_paragraphe.querySelector("p.text");
                text.innerHTML = paragraphe.content;

            } else if (paragraphe.content instanceof Array) {
                
                paragraphe.content.forEach(function(deck) {
                    console.log(deck)
                    if (deck.hasOwnProperty("templateId") && deck.templateId == "template-card-deck") {
                        const deck_template = document.querySelector("#template-card-deck");
                        const deck_clone = document.importNode(deck_template.content, true);
                        const deck_elem = deck_clone.querySelector(".card-deck");
                        const deck_title = deck_clone.querySelector("h4");
                        deck_title.innerHTML = deck.name;

                        if (deck.content instanceof Array) {
                            const maxCol = 3;
                            let increment = maxCol;
                            let row;
                            deck.content.forEach(function(card, index) {
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
                        
                    }
                });
                const title = elem_paragraphe.querySelector("h3.title");
                const text = elem_paragraphe.querySelector("p.text");

                if (paragraphe.hasOwnProperty("id")) {
                    elem_paragraphe.setAttribute("id", paragraphe.id)
                }
                console.log(text.parentNode, elem_paragraphe)
                elem_paragraphe.removeChild(text)
                title.innerHTML = paragraphe.title;
                
                
            }
            parent.appendChild(elem_paragraphe);
            return parent;
        });
    } else {
        throw new Error("Undefined template");
    }
};

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

const parseData = async function() {
    try {
        await buildParagraphes(data.paragraphes);
        return 0;
    } catch(e) {
        throw e;
    }
};