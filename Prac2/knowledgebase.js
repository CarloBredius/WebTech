// JavaScript code for the knowledge base page
$(document).ready(function () {
    // Fill tree with information
    root = new Node("Virtual Reality",
        [   new Node("---> Startpagina",
            [   new InfoNode("------> Gebruikte afkortingen", [], "Uitleg van afkortingen."),
                new Node("------> Intro Video", [])]),

            new Node("---> Vorm en Functie",
                [   new InfoNode("------> Het auditieve deel", [], "AR en VR op gebied van geluid."),
                    new InfoNode("------> Het visuele deel", [], "AR en VR op gebied van zien."),
                    new InfoNode("------> Het sensomotorische deel", [], "AR en VR op gebied van hand oog co&ouml;rdinatie.")]),

            new Node("---> Professioneel gebruik",
                [   new InfoNode("------> Medisch", [], "Gebruik in de medische wereld."),
                    new InfoNode("------> Militair", [], "Gebruik bij de defensie."),
                    new InfoNode("------> Educatie", [], "Gebruik in scholen.")]),

            new Node("---> Persoonlijk gebruik",
                [   new InfoNode("------> Gamers", [], "Gebruik in games."),
                    new InfoNode("------> Musea", [], "Gebruik ik musea."),
                    new InfoNode("------> Vliegreizen", [], "Vermaak tijdens lange vliegreizen."),
                    new InfoNode("------> Pretparken", [], "Het gebruik van AR tijdens attracties."),
                    new InfoNode("------> Sport", [], "Evaluatie met AR in de sportwereld."),
                    new InfoNode("------> Muziek", [], "Het bijwonen van bijvoorbeeld concerten met AR.")]),

            new Node("---> AR verbeteren",
                [   new InfoNode("------> Wat ontbreekt er aan AR?", [], "Welke verbeteringen zijn er nog mogelijk."),
                    new InfoNode("------> Wat willen we nog meer zien", [], "Welke visie er is voor AR.")]),

            new Node("---> Plaatjes",
                [   new InfoNode("------> Augmented Reality", [], "Plaatjes van Augmented Reality."),
                    new InfoNode("------> Virtual Reality", [], "Plaatjes van Virtual Reality.")]),

            new Node("---> Knowledge Base", []),

            new Node("---> Plot",
                [   new Node("------> Virtual Reality market share over the years", []),
                    new Node("------> Event propagation", [])])]);
    // When the knowledge base button is clicked, acutally show it
    document.getElementById("knowledgeBase").addEventListener("click", function () {
        drawKnowledgeBase();
    });
});

// Standard node
class Node {
    constructor(title, nodes) {
        this.title = title;
        this.show = false;
        this.nodes = nodes;
    }
    // Function to display
    display() {
        var element = document.createElement("p");
        element.innerText = this.title;
        let node = this;
        // When clicked on
        element.addEventListener("click", (event) => {
            if (this.show) {
                element.innerText = this.title;
            }
            else { // Show children
                for (var i = 0; i < node.nodes.length; i++) {
                    element.appendChild(node.nodes[i].display());
                }
            }
            node.show = !node.show
            event.stopPropagation();
        });
        return element;
    }
}
// Subclass to extend for nodes that have additional information
class InfoNode extends Node {
    constructor(title, nodes, info) {
        super(title, nodes);
        this.info = info;
    }
    // Function to display
    display() {
        var element = document.createElement("div");
        element.innerHTML = "<p>" + this.title + "<br /><br />" + this.info + "</p>";
        return element;
    }
}
// To not be able to open the knowledge base multiple times
var opened = false;
function drawKnowledgeBase() {
    if (!opened) {
        document.getElementById("area").appendChild(root.display());
        opened = true;
    }
}