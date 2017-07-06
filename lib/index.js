var square = d3.selectAll("rect");
var circle = d3.selectAll("circle");
square.style("fill", "orange");
circle.style("fill", "steelblue");

circle.attr("cx", function() { return Math.random() * 720; });
