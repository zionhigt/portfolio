const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque iste aperiam tempora assumenda sint eaque! Magnam ab distinctio pariatur voluptate velit alias, dolores ratione consequuntur corporis. Accusantium rerum in aliquid?"
const data = {
    paragraphes: {
        templateId: "template-paragraphe",
        content: [
            {
                
                title: "Technologies",
                id: "technologies",
                content: [
                    {
                        name: "Web Frontend",
                        templateId: "templateCardDeck",
                        content: [
                            {
                                templateId: "template-card",
                                content: {
                                    title: "HTML",
                                    img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/300px-HTML5_logo_and_wordmark.svg.png",
                                    redirect: "#",
                                    text: "Language de structure d'interface"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "CSS",
                                    img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png",
                                    redirect: "#",
                                    text: "Language de design et de style"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "Javascript",
                                    img_src: "https://3wa.fr/wp-content/uploads/2020/04/logo-js-1-300x300.png",
                                    redirect: "#",
                                    text: "Language de programation d'interface"
                                }
                            }
                        ]
                    },
                    {
                        name: "Web Backend",
                        templateId: "templateCardDeck",
                        content: [
                            
                            {
                                templateId: "template-card",
                                content: {
                                    title: "NodeJS",
                                    img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
                                    redirect: "#",
                                    text: "Framework basé sur Javascript, scripting, REST full Api"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "SQL",
                                    img_src: "https://www.softfluent.fr/wp-content/uploads/2019/10/SQL.png",
                                    redirect: "#",
                                    text: "Api de base de données"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "Python",
                                    img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
                                    redirect: "#",
                                    text: "Django, Django REST Framework"
                                }
                            }
                        ]
                    }
                ]
            },
            {
                title: "Mes projets",
                id: "myProjects",
                content: [
                    {
                        name: "OpenClassrooms",
                        templateId: "templateCardDeck",
                        content: [
                            {
                                templateId: "template-card",
                                content: {
                                    title: "Reservia",
                                    img_src: "https://i.postimg.cc/8zVCJDsQ/reservia.png",
                                    redirect: "https://zionhigt.github.io/SebastienLarcherLaffont_2_13092020/",
                                    text: "Projet d'intégration HTML et CSS"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "Ohmyfood",
                                    img_src: "https://i.postimg.cc/hGDPsr92/ohmyfood.png",
                                    redirect: "https://zionhigt.github.io/Sebastien_Larcher-Laffont_3_20102020/",
                                    text: "Projet d'intégration d'animation en CSS et découverte du SCSS"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "La chouette agence",
                                    img_src: "https://i.postimg.cc/k5TMpbsq/chouette-agence.png",
                                    redirect: "https://zionhigt.github.io/Sebastien_larcher-laffont_P04_21112020/",
                                    text: "Projet d'optimisation, référencement, intégration, best pratices"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "Orinoco",
                                    img_src: "https://i.postimg.cc/Bncn2y18/orinoco.png",
                                    redirect: "https://zionhigt.github.io/Sebastien_LARCHER-LAFFONT_5_13122020/",
                                    text: "Création d'une plateforme e-commerce"
                                }
                            },
                            {
                                templateId: "template-card",
                                content: {
                                    title: "JustStreamIt",
                                    img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
                                    redirect: "https://zionhigt.github.io/Sebastien_Larcher-Laffont_DAP_P6/",
                                    text: "Création d'un catalogue video. Api restful adapté en NodeJS"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}