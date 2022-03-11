// data from data.js


class StackElement {
    constructor(item, templateId) {
        this.item = item;
        this.templateId = templateId;
    }

    stack(buildMethod, deckElementId) {
        const deck = this.item;
        const deckClone = getJqueryTemplate(this.templateId);
        const deckElem = deckClone.find(deckElementId);
        const deckTitle = deckClone.find("h4");
        if(deckTitle.length) {
            deckTitle.text(deck.name);
        }

        if (deck.content instanceof Array) {
            const maxCol = 3;
            let decrement = maxCol;
            let row;
            deck.content.forEach(function (card, index) {
                if (decrement === maxCol) {
                    row = $("<div>");
                    row.addClass("row justify-content-between mx-auto");

                }
                if (decrement > 0) {
                    let cardElement = buildMethod(card);
                    row.append(cardElement);
                    decrement -= 1;
                }
                if (decrement === 0) {
                    deckElem.append(row);
                    decrement = maxCol;
                }

                if (index === deck.content.length - 1) {
                    deckElem.append(row);
                }
            });
        }
        return deckClone;
    }
}


const visitorMessages = [];


const getJqueryTemplate = function(templateId) {
    const template = document.querySelector(templateId);
    const clone = document.importNode(template.content, true);
    return $(clone);
}

const buildArray = function(item, parent) {
    const templateConfig = {
        templateCardDeck: {
            elemSelector: ".card-deck",
            method: buildCard
        },
        templateMessageStack: {
            elemSelector: "#visitorMessages",
            method: buildMessage
        }
    }
    item.content.forEach(function(deck) {
        if (deck.hasOwnProperty("templateId")) {
            if (templateConfig.hasOwnProperty(deck.templateId)) {
                const stack = new StackElement(deck, `#${deck.templateId}`);
                const helper = templateConfig[deck.templateId]
                const deckClone = stack.stack(helper.method, helper.elemSelector);
                parent.append(deckClone);
            } 
        }
    });
    return;
    
}

const  isVisible = function($el) {
    const winTop = $(window).scrollTop();
    const winHalf = $(window).height();
    const winMiddle = winHalf + winTop
    const elTop = $el.offset().top;
    return elTop - 800 <= winMiddle;
  }

const buildParagraphe = function(item, type) {
    const cloneParagraphe = getJqueryTemplate('#template-paragraphe');
    const elemParagraphe = cloneParagraphe.find(".paragraphe");
    
    // elemParagraphe.addClass('apear');
    const title = elemParagraphe.find("h3.title");
    title.text(item.title);
    const text = elemParagraphe.find("p.text");
    switch(type) {
        case "text":
            text.text(item.content);
            break;

        case "array":
            buildArray(item, elemParagraphe);
            if (item.hasOwnProperty("id")) {
                elemParagraphe.attr("id", item.id)
            }
            text.remove()
            title.text(item.title);
            break;
    }


    return elemParagraphe;
}
const buildParagraphes = async function(items) {
    if (items.hasOwnProperty("templateId")) {
        const parent = document.querySelector("section.main");
        
        items.content.forEach(function(paragraphe) {
            let elemParagraphe = null
            if (typeof(paragraphe.content) == 'string') {
                elemParagraphe = buildParagraphe(paragraphe, "text");
            } else if (paragraphe.content instanceof Array) {
                elemParagraphe = buildParagraphe(paragraphe, "array");
            }

            if(elemParagraphe != null) {
                parent.appendChild(elemParagraphe[0]);
            }
            return parent;
        });
    } else {
        throw new Error("Undefined template");
    }
};

const buildMessage = function(item) {
    if (item.hasOwnProperty("templateId") && item.templateId == "template-message") {
        const messageClone = getJqueryTemplate("#template-message");

        const message_content = messageClone.find("figure figcaption p.message-content");
        message_content.text(item.text);

        if(item.name == "110690") {
            item.name = "Seb-dev";
            const figure = messageClone.find("figure");
            figure.addClass("bg-primary", "admin-message");
            figure.find(".message-header span").removeClass("text-primary").addClass("text-light")
            figure.removeClass("bg-light")
            figure.parent().addClass("justify-content-end");
            figure.parent().removeClass("justify-content-between");

        }
        const message_editor = messageClone.find("figure figcaption span.message-editor");
        message_editor.text(item.name);

        const message_date = messageClone.find("figure figcaption small.message-post-date");
        const clean_date = (new Date(item.datePost));
        message_date.text(`${clean_date.toLocaleDateString()} à ${clean_date.toLocaleTimeString()}`);

        return messageClone;
    }
    return 1;
}

const buildCard = function(item) {
    if (item.hasOwnProperty("templateId") && item.templateId == "template-card") {

        const cardClone = getJqueryTemplate("#template-card");

        const cardImg = cardClone.find("figure img");
        const imgSrc = item.content.img_src
        cardImg.attr('src', imgSrc ? imgSrc : "");
        
        const cardRedirectLink = cardClone.find("figure a");
        const redirect = item.content.redirect
        cardRedirectLink.attr('href', redirect ? redirect : "#");

        const cardTitle = cardClone.find("figure figcaption h5");
        cardTitle.text(item.content.title);
        
        const cardText = cardClone.find("figure figcaption p");
        cardText.text(item.content.text);
        
        return cardClone;
    }
    throw new Error("Bad value: templateId must be a card template");
};

const getMessages = async function() {
    // const request = await fetch("http://preprod.seb-dev.tech/reponse.php?all=1");
    const request = await fetch("/messages");
    return await request.json();
    
}

const refreshMessages = async function(){
    const parent = $("section.main");
    const messageView = parent.find("#visitorMessages");
    if(messageView.length > 0) {
        messageView.parent().remove();
    }
    let visitorMessages = await getMessages();
    if (visitorMessages.length > 0) {
        const paragrapheOptions = {
            templateId: "templateMessageStack",
            content: visitorMessages.map(function (item) {
                return {
                    templateId: "template-message",
                    text: item.message,
                    name: item.name,
                    datePost: item.writeAt
                }
            })
        }
        const paragrapheMessages = buildParagraphe({
            title: "Messages de visiteurs",
            id: "visitorsMessages",
            content: [paragrapheOptions]
        }, "array");
        paragrapheMessages.addClass('apear')
        parent.append(paragrapheMessages);
    }
    return parent;
}
const parseData = async function() {
    buildParagraphes(data.paragraphes);
    $(window).ready(function(ev) {
        const $paragraphes = $("section.main").children();
        $($paragraphes).each(function() {
            $(this).addClass("apear");
        });
        // $(window).scroll(function() {
        //     $paragraphes.filter(function() {
        //         return !$(this).hasClass('apear');
        //     }).each(function() {
        //         $el = $(this);
        //         console.log($el.attr('id'))
        //         if(isVisible($el)) {
        //             $el.addClass("apear")
        //         }
        //     })
        // }.bind(this));
    })
    await refreshMessages();
    return 0;
};
