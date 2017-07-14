function leagueChange() {

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
            clubs[club.teamName] = {
              name: club.teamName, wins: club.wins, draws: club.draws,
              losses: club.losses, points: club.points, goals: club.goals,
              goalsAgainst: club.goalsAgainst, goalDifference: club.goalDifference,
              home: club.home, away: club.away

            };
          });
          let teamSelect = makeSelect('team', Object.keys(clubs), leagueTable.leagueCaption, clubs);

          var width = 420,
              barHeight = 20;

          var x = d3.scaleLinear()
              .range([0, width]);
          var margin = {top: 50, right: 20, bottom: 150, left: 40},
          width = 800 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;


          // set the ranges
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
          var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("id", "chart")
              .attr("rx", "20")
              .attr("ry", "20")
            .append("g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

          x.domain(Object.keys(clubs).map(function(d) { return d; }));

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
            .attr('id', "display");

          let group = svg.select('#display');
          group.selectAll('*').remove();

          svg.select('#title').remove();
          let title = svg.append("text").attr("id", "title");
          title.text(leagueString + " points breakdown in the " + yearString + " Season")
            .attr("font-size", 24);

          svg.select('g.legend').remove();
          let legendGroup = svg.append('g').attr('class', 'legend');
          let keyGroup = svg.append('g').attr('class', 'legend_key');

          keyGroup.attr("transform", "translate(650,0)")
          keyGroup.append('rect')
            .attr('class', 'draws')
            .attr('width', 100)
            .attr('height', 15);
          keyGroup.append('text')
          .attr("transform", "translate(0,10)")
            .text(function(d){ return 'Points from Draws'; });

          keyGroup = svg.append('g').attr('class', 'legend_key');

          keyGroup.attr("transform", "translate(650,20)")
          keyGroup.append('rect')
            .attr('class', 'wins')
            .attr('width', 100)
            .attr('height', 15);
          keyGroup.append('text')
          .attr("transform", "translate(0,10)")
            .text(function(d){ return 'Points from Wins'; });


          for (var key in clubs){
            let club = clubs[key];
            let inner_group = group.append('g').attr('id', club.name);
            let bar_section = inner_group.append('g').attr('class', `wins_group`);
            let pointsFromWins = club.wins * 3;
            bar_section.append("rect")
                .attr("class", "bar")
                .attr("class", "wins")
                .attr("x", function(d) { return x(club.name) + 5; })
                .attr("width", 20)
                .attr("y", function(d) { return height - (pointsFromWins * 4); })
                .attr("height", function(d) { return pointsFromWins * 4 })
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
               .attr("height", function(d) { return club.draws * 4; })
               .attr("transform", "translate(5,0)")
               .attr("text-anchor", "middle");
               bar_section.append('text')
                .attr("x", function(d) { return x(club.name) + 5; })
                .attr("transform", "translate(10,0)")
                .attr("y", function(d) { return height - (club.draws * 4) - (pointsFromWins * 4) + 10; })
                .text(function(d) {return club.draws; });

                d3.selectAll(`g.wins_group`).raise();
             };

             d3.select('#chart2').remove();
             var svg2 = d3.select("body").append("svg")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .attr("id", "chart2")
                 .attr("rx", "20")
                 .attr("ry", "20")
               .append("g")
                  .attr("height", 400)
                 .attr("transform",
                       "translate(" + margin.left + "," + margin.top + ")");

             x.domain(Object.keys(clubs).map(function(d) { return d; }));

             // add axis
             svg2.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + 400 + ")")
             .call(xAxis)
             .selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", "-.55em")
             .attr("transform", "rotate(-90)" );

             svg2.append("g")
               .attr('id', "display");

             let group2 = svg2.select('#display');
             group2.selectAll('*').remove();

             svg2.select('#title').remove();
             let title2 = svg2.append("text").attr("id", "title");
             title2.text(leagueString + " Losses in the " + yearString + " Season")
               .attr("font-size", 24);

             svg2.select('g.legend').remove();


             for (var key in clubs){
               let club = clubs[key];
               let inner_group = group2.append('g').attr('id', club.name);
               let bar_section = inner_group.append('g').attr('class', `losses_group`);
               bar_section.append("rect")
                   .attr("class", "bar")
                   .attr("class", "losses")
                   .attr("x", function(d) { return x(club.name) + 5; })
                   .attr("width", 20)
                   .attr("y", function(d) { return height - (club.losses * 4); })
                   .attr("height", function(d) { return club.losses * 4 })
                   .attr("transform", "translate(5,0)")
                   .attr("text-anchor", "middle");
                   bar_section.append('text')
                    .attr("x", function(d) { return x(club.name) + 5; })
                    .attr("transform", "translate(10,0)")
                    .attr("y", function(d) { return height - (club.losses * 4) + 10; })
                    .text(function(d) {return club.losses; });


                   d3.selectAll(`g.losses_group`).raise();
                };
          });

      });
};
