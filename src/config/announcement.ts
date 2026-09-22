/**
 * The site-wide announcement bar — two entries and a switch date, so nobody
 * has to remember to change it.
 *
 *   before `switchDate`  → the launch bar (links to the course)
 *   from `switchDate` on → the season bar (links to /events)
 *
 * Both bars are rendered into every page; a pre-paint inline script picks the
 * active one by the visitor's clock (not the build's), so the switch happens
 * on the day even if nobody redeploys. Dismissal is remembered per bar key, so
 * dismissing the launch bar does not hide the season bar later.
 */

export interface BarEntry {
  /** localStorage dismissal key. Change it to re-show a dismissed bar. */
  key: string;
  strong: string;
  text: string;
  cta: string;
  href: string;
}

export const announcement = {
  /** First day (local time) the season bar shows. Launch bar runs through Oct 4. */
  switchDate: '2026-10-05',
  launch: {
    key: 'pl_bar_launch_2026',
    strong: 'Launch week.',
    text: 'Get licensed before Thanksgiving.',
    cta: 'Start Phone License',
    href: '/#pricing',
    // If the Oct 15 Family Q&A Night from the launch playbook is on for
    // launch-week buyers, swap to:
    //   strong: 'Launch week:', text: 'buy this week and join the live Family Q&A Night on Oct 15', cta: 'Start Phone License'
  },
  season: {
    key: 'pl_bar_season_2027',
    strong: 'The 2027 season is coming.',
    text: 'Two summits, one workshop.',
    cta: 'Get first access',
    href: '/events',
  },
} as const;

/**
 * Pre-paint chooser, inlined into <head> on every page that shows the bar.
 * Sets html[data-bar="launch"|"season"] unless that bar was dismissed; the
 * bar CSS shows only the matching one, so there is no flash or layout shift.
 */
export const barPrepaintScript = `(function(){try{var w=Date.now()<Date.parse('${announcement.switchDate}T00:00:00')?'launch':'season';var k=w==='launch'?'${announcement.launch.key}':'${announcement.season.key}';if(localStorage.getItem(k)!=='1'){document.documentElement.setAttribute('data-bar',w);}}catch(e){document.documentElement.setAttribute('data-bar','season');}})();`;
