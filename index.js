// var square = d3.selectAll("rect");
// var circle = d3.selectAll("circle");
// square.style("fill", "orange");
// circle.style("fill", "steelblue");
//
// circle.attr("cx", function() { return Math.random() * 720; });

const seasons = [
  '2015/16',
  '2016/17'
]

const leagues = [
  '1. Bundesliga',
  // 'Ligue 1',
  'Premier League'//,
  // 'La Liga (Primera Division)',
  // 'Serie A'
]

const seasonsAll = {
  '2015/16': {
      '1. Bundesliga': 394,
      // 'Ligue 1': 396,
      'Premier League': 398//,
      // 'La Liga (Primera Division)': 399,
      // 'Serie A': 401//,
    },
  '2016/17': {
      '1. Bundesliga': 430,
      // 'Ligue 1': 434,
      'Premier League': 426//,
      // 'La Liga (Primera Division)': 436,
      // 'Serie A': 438
    }
}

const season2015_16 = {
  '1. Bundesliga': 394,
  // 'Ligue 1': 396,
  'Premier League': 398//,
  // 'La Liga (Primera Division)': 399,
  // 'Serie A': 401//,
  // 'Champions League': 405
}

const season2016_17 = {
  '1. Bundesliga': 430,
  // 'Ligue 1': 434,
  'Premier League': 426//,
  // 'La Liga (Primera Division)': 436,
  // 'Serie A': 438
}

const leagueTotals = {
  '1. Bundesliga': 0,
  // 'Ligue 1': 0,
  'Premier League': 0//,
  // 'La Liga (Primera Division)': 0,
  // 'Serie A': 0
}


// var width = 420,
//     barHeight = 20;
//
// var x = d3.scaleLinear()
//     .range([0, width]);
//
// var chart = d3.select(".chart")
//     .attr("width", width);
//
// var margin = {top: 20, right: 20, bottom: 100, left: 40},
// width = 400 - margin.left - margin.right,
// height = 300 - margin.top - margin.bottom;
//
//
// // set the ranges
// // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
// var x = d3.scaleBand()
//           .rangeRound([0, width], .05);
//
//
// var y = d3.scaleLinear().range([height, 0]);
//
// // define the axis
// var xAxis = d3.axisBottom()
//     .scale(x);
//     // .orient("bottom");
//
//
// var yAxis = d3.axisLeft()
//     .scale(y);
//     // .orient("left")
//
//
// // add the SVG element
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .attr("id", "chart")
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
//
// x.domain(leagues.map(function(d) { return d; }));
// // y.domain([0, d3.max(data, function(d) { return d.Freq; })]);
//
// // add axis
// svg.append("g")
// .attr("class", "x axis")
// .attr("transform", "translate(0," + height + ")")
// .call(xAxis)
// .selectAll("text")
// .style("text-anchor", "end")
// .attr("dx", "-.8em")
// .attr("dy", "-.55em")
// .attr("transform", "rotate(-90)" );
//
// // svg.append("g")
// // .attr("class", "y axis")
// // .call(yAxis)
// // .append("text")
// //   .text(function(d){
// //   return "Goals";
// // })
// // .attr("transform", "rotate(-90)")
// // .attr("y", 5)
// // .attr("dy", ".71em")
// // // .style("text-anchor", "end");
//
// svg.append("g")
//   .attr('id', "display")

function addToLeagueTotals(leagueName, seasonTotal){
  leagueTotals[leagueName] = seasonTotal;
  // d3.select(".chart")
  // .selectAll("div")
  //   .data(leagueTotals[leagueName])
  // .enter().append("div")
  //   .style("width", function(d) {
  //
  //     return d + "px";
  //   })
  //   .text(function(d) {
  //
  //     return d;
  // //   });
  // x.domain([0, d3.max(leagueTotals, function(d) { return d.value; })]);
  //
  // chart.attr("height", barHeight * leagueTotals.length);
  //
  // var bar = chart.selectAll("g")
  //     .data(leagueTotals)
  //   .enter().append("g")
  //     .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
  //
  // bar.append("rect")
  //     .attr("width", function(d) {
  //
  //       return x(d.value);
  //     })
  //     .attr("height", barHeight - 1);
  //
  // bar.append("text")
  //     .attr("x", function(d) {
  //
  //       return x(d.value) - 3;
  //     })
  //     .attr("y", barHeight / 2)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.value; });
  //console.log(leagueName);
  //console.log(leagueTotals[leagueName]);
}


function getSeasonGoals(seasonURL){
  d3.json(seasonURL, addToLeagueTotals)
  .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
  .get( function(data){
    // //console.log(data);

    let leagueTableURL = data._links.leagueTable.href;

    leagueTableURL = 'https' + leagueTableURL.substring(leagueTableURL.indexOf(':'));
    d3.json(leagueTableURL, addToLeagueTotals)
    .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
    .get( function(data){
      let totalGoals = getTotalGoals(data.standing);
      let leagueName = data.leagueCaption.slice(0, data.leagueCaption.indexOf(' 20'));
      let season = data.leagueCaption.slice(data.leagueCaption.indexOf('20'));
      // leagueTotals[leagueName] += totalGoals;
      addToLeagueTotals(leagueName, totalGoals);

      return totalGoals;
    //     d3.json('https://api.football-data.org/v1/competitions/394/fixtures')
    //       .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
    //       .get( function(data2){
    //
    //       });
    // });
  });
});
}

  function getTotalGoals(leagueTable){
    let totalGoals = 0;
    leagueTable.forEach( (team) => {
    totalGoals += team.goals;
    });
    return totalGoals;
  }


// for (var property in leagues) {
//   let season2015_16ID = season2015_16[leagues[property]];
//   let season2016_17ID = season2016_17[leagues[property]];
//   let season2015_16URL = `https://api.football-data.org/v1/competitions/${season2015_16ID}/`;
//   let season2016_17URL = `https://api.football-data.org/v1/competitions/${season2016_17ID}/`;
//   //
//   let leagueTotalGoals = getSeasonGoals(season2015_16URL) + getSeasonGoals(season2016_17URL);
//   //
//   // //console.log(leagueTotalGoals);
// }
// //console.log(leagueTotals);
//

// var seasonSelect = d3.select('#season');
makeSelect('season', seasons);


// seasonSelect.append('option')
//             	// .attr('class','select')
//             	.attr('value','null')
//             	.attr('disabled', 'true')
//             	.attr('selected', 'true')
//             	.text('Please Select a Season')
// seasonSelect.on('change', seasonChange)
//
// var seasonsOptions = d3.select('#season')
//                 .selectAll('option')
//               	.data(seasons, function (d, i){
//                   return d + i;
//                 })
//                 .enter()
//               	.append('option')
//               		.text(function (d){
//                     return d;
//                   });

function makeSelect(name, options, extra, clubs){
  let alreadyExists = d3.select(`#${name}`)
  if (alreadyExists._groups[0][0]){

    if (name === 'league') {
      alreadyExists._groups[0][0].setAttribute("year", extra);
    } else if (name === 'team') {
      alreadyExists._groups[0][0].setAttribute("league", extra);
    }
    return alreadyExists;
  } else {
    let select = d3.select('body')
                    .append('select')
                    	.attr('id', name)
    if (name === 'season'){
      select.on('change', seasonChange);
    } else if (name === 'league') {
      ;
      select.attr("year", extra);
      select.on('change', leagueChange);
    } else if (name === 'team') {
      select.attr("league", extra);
      select.attr("clubs", clubs);
      select.on('change', teamChange);
    }
    makeDefault(select);
    makeOptions(select, options, clubs);
    return select;
  }
};

function makeDefault(select){
  select.append('option')
      	// .attr('class','select')
      	.attr('value','null')
      	.attr('disabled', 'true')
      	.attr('selected', 'true')
      	.text('Please Select an Option')
}

function makeOptions(select, options, clubs){
  let clubTags = select.selectAll('option')
    .data(options, function (d, i) {
      //
      return d + i;
    })
    .enter()
    .append('option')
      .attr('value', function (d) {
        return d;
      })
      .text(function (d) {
        return d;
      });
      if (clubs){

        //console.log(clubTags._groups)
        let i = 0;
        for (var key in clubs){
          for (var item in clubs[key]){
            clubTags._groups[0][i].setAttribute(item, clubs[key][item]);
            //
          }
          i+= 1;
        }
      }
}


function seasonChange() {

	// let selectValue = d3.select('select').property('value')
  // var url = 'https://api.football-data.org/v1/competitions/394/teams';

  let leagueSelect = makeSelect('league', leagues, this.value);
  var width = 420,
      barHeight = 20;

  var x = d3.scaleLinear()
      .range([0, width]);

  // var chart = d3.select(".chart")
  //     .attr("width", width);

  var margin = {top: 20, right: 20, bottom: 100, left: 40},
  width = 400 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;


  // set the ranges
  // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
  var x = d3.scaleBand()
            .rangeRound([0, width], .05);


  var y = d3.scaleLinear().range([height, 0]);

  // define the axis
  var xAxis = d3.axisBottom()
      .scale(x);
      // .orient("bottom");


  var yAxis = d3.axisLeft()
      .scale(y);
      // .orient("left")


  // add the SVG element
  d3.select('#chart').remove();
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "chart")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  x.domain(leagues.map(function(d) { return d; }));
  // y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

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

  // svg.append("g")
  // .attr("class", "y axis")
  // .call(yAxis)
  // .append("text")
  //   .text(function(d){
  //   return "Goals";
  // })
  // .attr("transform", "rotate(-90)")
  // .attr("y", 5)
  // .attr("dy", ".71em")
  // // .style("text-anchor", "end");

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
        d3.json(leagueTableURL, addToLeagueTotals)
        .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
        .get( function(data){
          //

          let totalGoals = getTotalGoals(data.standing);
          let leagueName = data.leagueCaption.slice(0, data.leagueCaption.indexOf(' 20'));
          let season = data.leagueCaption.slice(data.leagueCaption.indexOf('20'));
          // let numOfGames = data.
          // leagueTotals[leagueName] += totalGoals;
          addToLeagueTotals(leagueName, totalGoals);
          // d3.select('body').selectAll('svg');
          // var chart = d3.select("#chart")
          // chart.append("svg")
          // .attr("id", leagueName)
          // .attr("width", 400)
          // .attr("height", 300);

          // d3.select(`svg`).
          //   append('rect').
          //     attr("x", 0).
          //     attr("y", 0).
          //     attr("height", 100).
          //     attr("width", totalGoals/5).
          //     append('br');

        // let svg = d3.select('svg');
        //
        // let bars =      svg.selectAll("bar");
                  //
     // Add bar chart
    //  let xDistance = ((svg._groups[0][0].childElementCount-2)* 10)+ 70;


     let inner_group = group.append('g').attr('id', leagueName);
     inner_group.append("rect")
         .attr("class", "bar")
         .attr("id", leagueName)
         .attr("x", function(d) { return x(leagueName); })
         .attr("width", 30)
         .attr("y", function(d) { return height - (totalGoals/10); })
        //  .attr("y", 100)//function(d) { return y(totalGoals); })
         .attr("height", function(d) { return totalGoals/10; })
        //  .attr("transform", "translate("+ xDistance+ ",0)")
         .attr("transform", "translate(70,0)")
         .attr("text-anchor", "middle");
         inner_group.on("mouseover", function (d){

           d3.select(this).raise()
            .append("text")
            .attr("id", "extraStats")
            .attr("x", function(d) { return x(leagueName); })
            .attr("transform", "translate(75,0)")
            .attr("y", function(d) { return height - (totalGoals/10)-10; })
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
        //  .attr("transform", "translate(0," + height + ")");
        //  .attr("height", function(d) { return height - y(totalGoals); });
          // svg.
          //   append('br');
          //
          // return totalGoals;

      inner_group.append('text')
          .attr("x", function(d) { return x(leagueName); })
          .attr("transform", "translate(75,0)")
          .attr("y", function(d) { return height - (totalGoals/10)+10; })
          .text(function(d) {return totalGoals;});
      });
    });
  };

};

function leagueChange() {
	// let selectValue = d3.select('select').property('value')

  let leagueString = this[this.selectedIndex].value;
  let yearString = this.getAttribute('year');
  let leagueID = seasonsAll[yearString][leagueString];

  let league_url = `https://api.football-data.org/v1/competitions/${leagueID}`
  d3.json(league_url)
    .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
    .get(function(data){
      let leagueTableURL = data._links.leagueTable.href;

      leagueTableURL = 'https' + leagueTableURL.substring(leagueTableURL.indexOf(':'));
      d3.json(leagueTableURL)
        .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
        .get(function(leagueTable){
          let clubs = {};
          leagueTable.standing.forEach((club) => {
            //
            //console.log(club);
            clubs[club.teamName] = {
              name: club.teamName,
              wins: club.wins,
              draws: club.draws,
              losses: club.losses,
              points: club.points,
              goals: club.goals,
              goalsAgainst: club.goalsAgainst,
              goalDifference: club.goalDifference,
              home: club.home,
              away: club.away

            };
          });
          let teamSelect = makeSelect('team', Object.keys(clubs), leagueTable.leagueCaption, clubs);

          var width = 420,
              barHeight = 20;

          var x = d3.scaleLinear()
              .range([0, width]);

          // var chart = d3.select(".chart")
          //     .attr("width", width);

          var margin = {top: 50, right: 20, bottom: 150, left: 40},
          width = 800 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;


          // set the ranges
          // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
          var x = d3.scaleBand()
                    .rangeRound([0, width], .05);


          var y = d3.scaleLinear().range([height, 0]);

          // define the axis
          var xAxis = d3.axisBottom()
              .scale(x);
              // .orient("bottom");


          var yAxis = d3.axisLeft()
              .scale(y);
              // .orient("left")


          // add the SVG element
          d3.select('#chart').remove();
          var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("id", "chart")
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

          x.domain(Object.keys(clubs).map(function(d) { return d; }));
          // y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

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

          // svg.append("g")
          // .attr("class", "y axis")
          // .call(yAxis)
          // .append("text")
          //   .text(function(d){
          //   return "Goals";
          // })
          // .attr("transform", "rotate(-90)")
          // .attr("y", 5)
          // .attr("dy", ".71em")
          // // .style("text-anchor", "end");

          svg.append("g")
            .attr('id', "display");

          let group = svg.select('#display');
          group.selectAll('*').remove();

          // let seasonString = this[this.selectedIndex].value;
          // let leagueIDs = seasonsAll[seasonString];
          svg.select('#title').remove();
          let title = svg.append("text").attr("id", "title");
          title.text(leagueString + " points breakdown in the " + yearString + " Season")
            .attr("font-size", 24);

          svg.select('g.legend').remove();
          let legendGroup = svg.append('g').attr('class', 'legend');
          let keyGroup = svg.append('g').attr('class', 'legend_key');
          // keyGroup.style('float', 'right');
          keyGroup.attr("transform", "translate(650,0)")
          keyGroup.append('rect')
            .attr('class', 'wins')
            .attr('width', 25)
            .attr('height', 15);
          keyGroup.append('text')
          .attr("transform", "translate(0,10)")
            .text(function(d){ return 'Wins'; });

          keyGroup = svg.append('g').attr('class', 'legend_key');
          // keyGroup.style('float', 'right');
          keyGroup.attr("transform", "translate(650,20)")
          keyGroup.append('rect')
            .attr('class', 'draws')
            .attr('width', 30)
            .attr('height', 15);
          keyGroup.append('text')
          .attr("transform", "translate(0,10)")
            .text(function(d){ return 'Draws'; });


          for (var key in clubs){
            let club = clubs[key];
            // //console.log(club);
            let inner_group = group.append('g').attr('id', club.name);
            let bar_section = inner_group.append('g').attr('class', `wins_group`);
            let pointsFromWins = club.wins * 3;
            bar_section.append("rect")
                .attr("class", "bar")
                .attr("class", "wins")
                .attr("x", function(d) { return x(club.name) + 5; })
                .attr("width", 20)
                .attr("y", function(d) { return height - (pointsFromWins * 4); })
               //  .attr("y", 100)//function(d) { return y(totalGoals); })
                .attr("height", function(d) { return pointsFromWins * 4 })
               //  .attr("transform", "translate("+ xDistance+ ",0)")
                .attr("transform", "translate(5,0)")
                .attr("text-anchor", "middle");
                bar_section.append('text')
                 .attr("x", function(d) { return x(club.name) + 5; })
                 .attr("transform", "translate(10,0)")
                 .attr("y", function(d) { return height - (pointsFromWins * 4) + 10; })
                 .text(function(d) {return pointsFromWins; });

           bar_section = inner_group.append('g').attr('class', `draws_group`);
           bar_section.append("rect")
               .attr("class", "bar")
               .attr("class", "draws")
               .attr("x", function(d) { return x(club.name) + 5; })
               .attr("width", 20)
               .attr("y", function(d) { return height - (club.draws * 4) - (pointsFromWins * 4); })
              //  .attr("y", 100)//function(d) { return y(totalGoals); })
               .attr("height", function(d) { return club.draws * 4; })
              //  .attr("transform", "translate("+ xDistance+ ",0)")
               .attr("transform", "translate(5,0)")
               .attr("text-anchor", "middle");
               bar_section.append('text')
                .attr("x", function(d) { return x(club.name) + 5; })
                .attr("transform", "translate(10,0)")
                .attr("y", function(d) { return height - (club.draws * 4) - (pointsFromWins * 4) + 10; })
                .text(function(d) {return club.draws; });

                d3.selectAll(`g.wins_group`).raise();
             };
          });

      });
  // d3.select('body').append('br');
	// let teamSelect = makeSelect('team', );
};

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

  var w = 900,                        //width
   h = 900,                            //height
   r = 400,                            //radius
  //  color = d3.scale.category20c();     //builtin range of colors
  center = 450,
   color = d3.scaleOrdinal(d3.schemeCategory20c);

   data = [{"label":`Wins ${((clubWins/totalGames)*100).toFixed(2)}%`, "value": (clubWins/totalGames)*100},
           {"label":`Draws: ${((clubDraws/totalGames)*100).toFixed(2)}%`, "value": (clubDraws/totalGames)*100},
           {"label":`Losses: ${((clubLosses/totalGames)*100).toFixed(2)}%`, "value": (clubLosses/totalGames)*100}];


  d3.select('#chart').remove();
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
          .innerRadius(0)//this will create <path> elements for us using arc data
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
     // let seasonString = this[this.selectedIndex].value;
     // let leagueIDs = seasonsAll[seasonString];
     svg.select('#title').remove();
     let title = svg.append("text").attr("id", "title");
     title.text(clubString + " Results Breakdown in the " + yearString + " Season")
       .attr("font-size", 24)
       .attr("transform", "translate(" + 450 + "," + 30 + ")") ;
  // d3.json(league_url)
  //   .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
  //   .get(function(data){
  //
  //     d3.json(data._links.leagueTable.href)
  //       .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
  //       .get(function(leagueTable){
  //
  //       })
  //   })
}

// var seasonSelect = d3.select('#season');
// var leagueSelect = d3.select('#league');
// while (seasonSelect.property("value") === null){
//   if (seasonSelect.property("value") !== null ){
//     leagueSelect
//       .selectAll("option")
//       .data(leagues)
//       .enter()
//       .append("option")
//   }
// }

// for (var property in season2015_16){
//   let league_url = `https://api.football-data.org/v1/competitions/${season2015_16[property]}`
//   d3.json(league_url)
//     .header('X-Auth-Token', 'ee9efc13e5a04bf08b66ea86ddce5d86')
//     .get(function(data){
//
//   });
// };
