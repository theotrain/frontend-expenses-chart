// alert('hiyyeee');

fetch('data.json')
  .then(response => response.json())
  .then(parsed => drawChart(parsed))
  .catch(err => console.log('failed to load data: ', err))

const drawChart = (data) => {
  // get largest spend of the week
  console.log(data)
  const spendiest = [...data].sort((day1, day2) => day1.amount - day2.amount)[data.length-1].amount
  console.log(spendiest)
  const chart = document.querySelector('#chart')
  const chartDays = document.querySelector('#chart-days')
  const delay = 50;
  let chartInner = ''
  let chartDaysInner = ''
  // data.forEach((day, idx) => {
  //   console.log(day.amount, spendiest)
  //   chartInner += `<div class="chart-bar zero-height" style="height:${percentageSpent(day.amount, spendiest)}%; transition-delay: ${delay*idx}ms"></div>`
  // })
  data.forEach((day, idx) => {
    // console.log(day.amount, spendiest)
    chartInner += `<div data-height="${percentageSpent(day.amount, spendiest)}"  data-amount="${day.amount}" class="chart-bar ${isToday(day) ? 'today' : ''}" style="transition-delay: ${delay*idx}ms"></div>`
    chartDaysInner += `<div>${day.day}</div>`
  })
  console.log(chartInner)
  chart.innerHTML = chartInner
  chartDays.innerHTML = chartDaysInner
  setTimeout(() => updateChartHeights(chart), 50)
}

const isToday = (day) => {
  //return true if day.day is the day of tghe week today
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const d = new Date()
  return day.day == days[d.getDay()]
}

const tooltipSetup = () => {
  const tooltip = document.querySelector('#spending')
  document.querySelectorAll('#chart div').forEach(div => div.addEventListener('mouseover', function(e) {
    positionTooltip(tooltip, this)
    tooltip.classList.add('show')
  }))
  document.querySelectorAll('#chart div').forEach(div => div.addEventListener('click', function(e) {
    positionTooltip(tooltip, this)
    tooltip.classList.add('show')
  }))
  window.addEventListener('resize', function(e){
    tooltip.style.top = '0px'
    tooltip.style.left = '0px'
    tooltip.classList.remove('show')
});
}

const positionTooltip = (tooltip, bar) => {
  tooltip.innerHTML = '$' + bar.dataset.amount
  tooltip.classList.add('show')
  tooltip.style.top = (bar.offsetTop - tooltip.offsetHeight - 6) + 'px'
  tooltip.style.left = (bar.offsetLeft + bar.offsetWidth / 2) - (tooltip.offsetWidth / 2) + 'px'
}

const updateChartHeights = (chart) => {
  chart.querySelectorAll('div').forEach(div => {
    div.style.height = div.dataset.height + '%'
    console.log(div)
  })
  tooltipSetup();
}

const percentageSpent = (today, max) => {
  // return % of money spent today vs most spent
  if (max == 0) return 0;
  return Math.round((today/max) * 100);
}
// hi there
{/* <div id="chart">
<div class="chart-bar"></div>
<div class="chart-bar"></div>
<div class="chart-bar"></div>
<div class="chart-bar"></div>
<div class="chart-bar"></div>
<div class="chart-bar"></div>
<div class="chart-bar"></div>
</div>
<div id="chart-days">
<div data-day="1">mon</div>
<div>tue</div>
<div>wed</div>
<div>thu</div>
<div>fri</div>
<div>sat</div>
<div>sun</div>
</div> */}
