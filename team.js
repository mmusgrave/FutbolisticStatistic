function teamChange() {
  let clubString = this[this.selectedIndex].value;
  let clubWins = parseInt(this[this.selectedIndex].getAttribute('wins'));
  let clubDraws = parseInt(this[this.selectedIndex].getAttribute('draws'));
  let clubLosses = parseInt(this[this.selectedIndex].getAttribute('losses'));
  let clubGoals = parseInt(this[this.selectedIndex].getAttribute('goals'));
  let clubGoalsAgainst = parseInt(this[this.selectedIndex].getAttribute('goalsagainst'));
  let clubGoalDifference = parseInt(this[this.selectedIndex].getAttribute('goaldifference'));
  var clubIndex = this.selectedIndex;
  let leagueString = this.getAttribute('league');
  let split = leagueString.indexOf(' 20');
  let yearString = leagueString.slice(split+1);
  //
  let leagueID = seasonsAll[yearString][leagueString.slice(0, split)];
  //
  let league_url = `https://api.football-data.org/v1/competitions/${leagueID}`
  let totalGames = clubWins + clubDraws + clubLosses;

  var w = 700,                        //width
   h = 700,                            //height
   r = 300,                            //radius
  center = 350,
   color = d3.scaleOrdinal(d3.schemeCategory20c);

   data = [{"label":`Wins: ${((clubWins/totalGames)*100).toFixed(2)}%`, "value": (clubWins/totalGames)*100},
           {"label":`Draws: ${((clubDraws/totalGames)*100).toFixed(2)}%`, "value": (clubDraws/totalGames)*100},
           {"label":`Losses: ${((clubLosses/totalGames)*100).toFixed(2)}%`, "value": (clubLosses/totalGames)*100}];


  d3.select('#chart').remove();
  d3.select('#chart2').remove();
   var vis = d3.select("body")
     .append("svg")
     .attr('id', 'chart')
     .data([data])                  //associate our data with the document
           .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
           .attr("height", h)
           .attr("id", "chart")
       .append("g")
            .style("margin-top", 50)//make a group to hold our pie chart
           .attr("transform", "translate(" + center + "," + center + ")")    //move the center of the pie chart from

     var arc = d3.arc()
          .innerRadius(75)//this will create <path> elements for us using arc data
          // .innerRadius(0)//this will create <path> elements for us using arc data
          .outerRadius(r);


      var pie = d3.pie()           //this will create arc data for us given a list of values
          .value(function(d) {

            return d.value;
          });    //we must tell it out to access the value of each element in our data array

      var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
          .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
          .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
              .append("g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                  .attr("class", "slice");    //allow us to style things in the slices (like text)

          arcs.append("path")
                  .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                  .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

          arcs.append("text")                                     //add a label to each slice
                  .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                  //we have to make sure to set these before calling arc.centroid
                  d.innerRadius = 0;
                  d.outerRadius = r;
                  return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
              })
              .attr("text-anchor", "middle")                          //center the text on it's origin
              .text(function(d, i) { return data[i].label; })
              .style('font-size', 12);        //get the label from our original data array
                     //get the label from our original data array
      let svg = d3.select('svg');
     svg.append("g")
       .attr('id', "display");

     let group = svg.select('#display');
     group.selectAll('*').remove();

     svg.attr("text-anchor", "middle");
     svg.select('#title').remove();
     let title = svg.append("text").attr("id", "title");
     title.text(clubString + " Results in the " + yearString + " Season")
       .attr("font-size", 20)
       .attr("transform", "translate(" + 350 + "," + 30 + ")") ;
}
