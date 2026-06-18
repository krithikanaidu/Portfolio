import { GitHubCalendar } from 'react-github-calendar';

const lastSixMonths = (contributions) => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 9);
  return contributions.filter(day => new Date(day.date) >= sixMonthsAgo);
};

function GithubActivity() {
  return (
    <div className="github-activity">
      <h3>Github Activity</h3>
      <GitHubCalendar
        username="krithikanaidu"
        colorScheme="dark"
        theme={{
          dark: ['#1a1a1a', '#3d1a0a', '#7a3015', '#b84520', '#e05c2a'],
        }}
        transformData={lastSixMonths}
        hideColorLegend
        hideTotalCount={false}
        fontSize={12}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default GithubActivity