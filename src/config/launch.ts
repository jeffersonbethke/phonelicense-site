/**
 * Launch week (Oct 12 to 18, 2026): the free gift, the countdown, and the
 * dates that switch the launch layer on and off by the VISITOR's clock, so the
 * hero reverts to evergreen on Oct 19 without a redeploy.
 *   before `start`  -> data-launch="pre"
 *   start..end      -> data-launch="on"
 *   after `end`     -> data-launch="off"
 * Elements carry .pl-launch-only (hidden when off), .pl-pre-only (only before
 * the open) or .pl-on-only (only from the open on).
 */
export const launch = {
  start: '2026-10-12T07:00:00-05:00',
  end: '2026-10-18T23:59:59-05:00',
  endLabel: 'Sunday, Oct 18 at 11:59 PM Central',
  tag: 'launch-oct12',
  gift: {
    title: 'The Digital Fast',
    author: 'Darren Whitehead',
    format: 'hardcover',
    subtitle: 'Detox Your Mind and Reclaim What Matters Most',
    cover: 'https://darrenwhitehead.com/_next/image?url=%2Fimg%2Fcover-digital-fast.png&w=640&q=80',
    coverFallback: 'https://darrenwhitehead.com/img/cover-digital-fast.png',
    core: 1,
    kit: 5,
    church: 50,
    shipping: 'Ships free in the US.',
  },
} as const;

export const launchPrepaintScript = `(function(){try{var n=Date.now(),s=Date.parse('${launch.start}'),e=Date.parse('${launch.end}');document.documentElement.setAttribute('data-launch',n<s?'pre':(n<=e?'on':'off'));}catch(x){}})();`;
