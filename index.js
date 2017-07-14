const seasons = [
  '2015/16',
  '2016/17'
]

const leagues = [
  '1. Bundesliga',
  'Premier League'
]

const seasonsAll = {
  '2015/16': {
      '1. Bundesliga': 394,
      'Premier League': 398
    },
  '2016/17': {
      '1. Bundesliga': 430,
      'Premier League': 426
    }
}

const season2015_16 = {
  '1. Bundesliga': 394,
  'Premier League': 398
}

const season2016_17 = {
  '1. Bundesliga': 430,
  'Premier League': 426
}

const leagueTotals = {
  '1. Bundesliga': 0,
  'Premier League': 0
}
//
// function addToLeagueTotals(leagueName, seasonTotal){
//   leagueTotals[leagueName] = seasonTotal;
// }


function getTotalGoals(leagueTable){
    let totalGoals = 0;
    leagueTable.forEach( (team) => {
      totalGoals += team.goals;
    });
    return totalGoals;
}

function makeSelect(name, options, extra, clubs){
  let alreadyExists = d3.select(`#${name}`);
  if (alreadyExists._groups[0][0]){

    if (name === 'league') {
      alreadyExists._groups[0][0].setAttribute("year", extra);
      return alreadyExists;
    } else if (name === 'team') {
      alreadyExists._groups[0][0].setAttribute("league", extra);
      d3.select(`#${name}`).remove();
      let select = d3.select('body')
                      .append('select')
                      	.attr('id', name);
      select.attr("league", extra);
      select.attr("clubs", clubs);
      select.on('change', teamChange);
      makeDefault(select);
      makeOptions(select, options, clubs);
      return select;
    }
  } else {
    let select = d3.select('body')
                    .append('select')
                    	.attr('id', name);
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
      	.attr('value','null')
      	.attr('disabled', 'true')
      	.attr('selected', 'true')
      	.text('Please Select an Option')
}

function makeOptions(select, options, clubs){
  let clubTags = select.selectAll('option')
    .data(options, function (d, i) {
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

makeSelect('season', seasons);
