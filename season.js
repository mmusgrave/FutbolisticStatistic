
function seasonChange() {
  d3.select('#instruct').remove();
  let leagueSelect = makeSelect('league', leagues, this.value);
  var width = 420,
      barHeight = 20;

  var x = d3.scaleLinear()
      .range([0, width]);

  var margin = {top: 20, right: 20, bottom: 100, left: 40},
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

  var x = d3.scaleBand()
            .rangeRound([0, width], .05);


  var y = d3.scaleLinear().range([height, 0]);

  // define the axis
  var xAxis = d3.axisBottom()
      .scale(x);

  var yAxis = d3.axisLeft()
      .scale(y);

  // add the SVG element
  d3.select('#chart').remove();
  d3.select('#chart2').remove();
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "chart")
      .attr("rx", "20")
      .attr("ry", "20")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  x.domain(leagues.map(function(d) { return d; }));

  // add axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)" );

  svg.append("g")
    .attr('id', "display")

  let group = svg.select('#display');
  group.selectAll('*').remove();
  let seasonString = this[this.selectedIndex].value;
  let leagueIDs = seasonsAll[seasonString];
  svg.select('#title').remove();
  let title = svg.append("text").attr("id", "title");
  title.text("Goals in the " + seasonString + " Season")
    .attr("font-size", 24);
  for (var key in leagueIDs){
    let league_url = `https://api.football-data.org/v1/competitions/${leagueIDs[key]}`
    d3.json(league_url)
      .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
      .get(function(data){

        let numOfGames = data.numberOfGames;
        let numOfMatchDays = data.numberOfMatchDays;
        let numOfTeams = data.numberOfTeams;
        let leagueTableURL = data._links.leagueTable.href;

        leagueTableURL = 'https' + leagueTableURL.substring(leagueTableURL.indexOf(':'));
        d3.json(leagueTableURL)//, addToLeagueTotals)
        .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
        .get( function(data){
          //

          let totalGoals = getTotalGoals(data.standing);
          let leagueName = data.leagueCaption.slice(0, data.leagueCaption.indexOf(' 20'));
          let season = data.leagueCaption.slice(data.leagueCaption.indexOf('20'));
          // addToLeagueTotals(leagueName, totalGoals);

          let inner_group = group.append('g').attr('id', leagueName);
          inner_group.append("rect")
         .attr("class", "bar")
         .attr("id", leagueName)
         .attr("x", function(d) { return x(leagueName); })
         .attr("width", 35)
         .attr("y", function(d) { return height - (totalGoals/10); })
        //  .attr("y", 100)//function(d) { return y(totalGoals); })
         .attr("height", function(d) { return totalGoals/10; })
        //  .attr("transform", "translate("+ xDistance+ ",0)")
         .attr("transform", "translate(94,0)")
         .attr("text-anchor", "middle");

         inner_group.append('text')
             .attr("x", function(d) { return x(leagueName); })
             .attr("transform", "translate(100,0)")
             .attr("y", function(d) { return height - (totalGoals/10)+10; })
             .text(function(d) {return totalGoals;});


         inner_group.on("mouseover", function (d){
           d3.select(this).raise()
            .append("text")
            .attr("id", "extraStats")
            .attr("x", function(d) { return x(leagueName); })
            .attr("transform", "translate(80,0)")
            .attr("y", function(d) { return height - (totalGoals/10)-20; })
            .text(function(d){
              let statString = "Goals per Game: ";
              let goalsPerGame = Math.round((totalGoals/numOfGames)*100)/100;
              statString += goalsPerGame;
              return statString;
            })
         })
         .on("mouseout", function(d){
           d3.selectAll("#extraStats").remove();
         })
        });
    });
  };

};
