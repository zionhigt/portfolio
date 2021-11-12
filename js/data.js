const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque iste aperiam tempora assumenda sint eaque! Magnam ab distinctio pariatur voluptate velit alias, dolores ratione consequuntur corporis. Accusantium rerum in aliquid?"
const data = {
    paragraphes: {
        templateId: "template-paragraphe",
        content: [
            {
                title: "C'est quoi un Développeur d'applications ?",
                content: lorem + lorem + lorem + lorem + lorem
            },
            {
                title: "Pourquoi j'ai choisi ce metier ?",
                content: lorem
            },
            {
                title: "Et encore une question ?",
                content: lorem
            },
            {
                title: "Et encore une autre question ?",
                content: lorem
            },
            {
                title: "Mes projets",
                id: "myProjects",
                content: [
                    {
                        name: "OpenClassrooms",
                        templateId: "template-card-deck",
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
                            }
                        ]
                    }
                ]
            }
        ]
    }
}