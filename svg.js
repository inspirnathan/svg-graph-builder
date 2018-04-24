class Graph {
    constructor(graph) {
        this.graph = graph;
    }

    width(width) {
        const graph = Object.assign({}, this.graph);
        graph.width = width + ''; 
        this.graph.svg.setAttribute('width', width);
        return new Graph(graph);
    }

    height(height) {
        const graph = Object.assign({}, this.graph);
        graph.height = height + ''; 
        this.graph.svg.setAttribute('height', height);
        return new Graph(graph);
    }

    gridSize(gridHorzSize, gridVertSize) {
        const graph = Object.assign({}, this.graph);
        graph.gridHorzSize = gridHorzSize;
        graph.gridVertSize = gridVertSize;
        return new Graph(graph);
    }

    appendSingleLine(attrs){
        const graph = Object.assign({}, this.graph);
        const line = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        this.setAttributes(line, attrs);
        this.graph.svg.appendChild(line);
        return new Graph(graph);
    }

    appendPath(attrs){
        const graph = Object.assign({}, this.graph);
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.setAttributes(path, attrs);
        this.graph.svg.appendChild(path);
        return new Graph(graph);
    }

    setAttributes(el, attrs) {
        Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
    }

    buildGrid() {
        
        const graph = Object.assign({}, this.graph);

        const appendGridLines = () => {
            
            const gridA = this.graph.gridHorzSize;
            const gridB = this.graph.gridVertSize;
            const w = this.graph.width;
            const h = this.graph.height;
            const horzLineAttrs = [];
            const vertLineAttrs = [];

            let attrs = {
                x1: '0',
                y1: '0',
                x2: '0',
                y2: '0',
                stroke: 'gray',
                "stroke-width": '2', 
                "stroke-dasharray": '5, 5'
            };
            
            for(let i = 1; i <= gridA - 1; i++) {

                attrs.x1 = 0 + '';
                attrs.y1 = (h/gridA)*i + '';
                attrs.x2 = w + '';
                attrs.y2 = (h/gridA)*i + '';
            
                const newAttrs = Object.assign({}, attrs);
                
                horzLineAttrs.push(newAttrs);
            
            }
            
            for(let i = 1; i <= gridB - 1; i++) {
            
                attrs.x1 = (w/gridB)*i + '';
                attrs.y1 = 0 + '';
                attrs.x2 = (w/gridB)*i + '';
                attrs.y2 = h + '';
            
                const newAttrs = Object.assign({}, attrs);
                
                vertLineAttrs.push(newAttrs);
            
            }
            
            horzLineAttrs.forEach((horzLineAttr) => {
                this.appendSingleLine(horzLineAttr);
            });
            
            vertLineAttrs.forEach((vertLineAttr) => {
                this.appendSingleLine(vertLineAttr);
            });


        }

        appendGridLines();
        console.log('New graph has been built!');
        console.log(this.graph);

        return new Graph(graph);
    }

    drawAxes(){

        const graph = Object.assign({}, this.graph);
        // draw x-axis
        this.appendSingleLine({
            x1: 0, // I am not sure why I can use numbers here instead of strings. I guess Chrome takes care of it, but I'm not sure about the other browsers
            y1: this.graph.height/2,
            x2: this.graph.width,
            y2: this.graph.height/2,
            stroke: 'blue',
            "stroke-width": 3
        });

        // draw y-axis
        this.appendSingleLine({
            x1: this.graph.width/2,
            y1: 0,
            x2: this.graph.width/2,
            y2: this.graph.height,
            stroke: 'blue',
            "stroke-width": 3
        });

        return new Graph(graph);
    }

    static newGraph(rootNode){
        let root = document.getElementById(rootNode);
        root.innerHTML = '<svg></svg>';
        let svg = document.getElementsByTagName('svg')[0];
        svg.setAttribute('width', '100');
        svg.setAttribute('height', '100');
        
        console.log(svg);
        return new Graph({
            svg
        });
    }
}

const graph = Graph.newGraph('root');

graph.width(250).height(250).gridSize(10,10).buildGrid().drawAxes();