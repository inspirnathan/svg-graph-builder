# svg-graph-builder
Simple tool to quickly build an SVG grid/graph using method chaining.

## Getting Started
```javascript
const graph = Graph.newGraph('root');
```

## Set SVG dimensions
```javascript
graph.width(500).height(500);
```

## Set the number of grid lines (horizontal, vertical)
```javascript
graph.gridSize(10,10);
```

## Draw axes
```javascript
graph.drawAxes()
```

## Build the graph!
```javascript
graph.build();
```

## Finished graph:
![alt text][svg-graph]

[svg-graph]: https://github.com/inspirnathan/svg-graph-builder/blob/master/images/svg-graph.png

Alternatively, you could have built the whole thing using one string of methods:
```javascript
graph.width(500).height(500).gridSize(10,10).buildGrid().drawAxes();
```

## Extra features
You can also use the following functions: 
```javascript
graph.appendSingleLine(attrs);
graph.appendPath(attrs);
```
The `attrs` parameter is an object that contains key-value pairs of all the attributes you want to pass in. For example, 

```javascript
const attrs = {
    d: 'M0 50 H 250',
    stroke:'red',
    'stroke-width': 2
};
graph.appendPath(attrs);
```
will result in,


![alt text][appendPath]

[appendPath]: https://github.com/inspirnathan/svg-graph-builder/blob/master/images/appendPath-example.png

Notice that you need to wrap quotes around attribute properties that have hyphens in their name.

## Conclusion!
It's very minimal right now, but it's a nice way to see how easy it is to use method chaining to add SVG elements to the DOM.