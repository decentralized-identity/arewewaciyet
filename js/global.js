
import './web-components/tab-panels.js';

const md = window.markdownit({
  linkify: true
});

// FETCH ISSUES

async function getRemainingIssues(){
  var cache = JSON.parse(localStorage.remainingIssues || '{ "issues": [] }');
  var time = cache.time ? new Date(cache.time) : new Date();
  if (location.hostname === 'localhost' || !cache.time || (new Date() > time.setHours(time.getHours() + 1))) {
    let issueList = await fetch(`https://api.github.com/repos/decentralized-identity/waci-presentation-exchange/issues?per_page=100&labels=v0.1`, {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' }
    }).then(response => response.json())
      .catch(e => console.log(e));
    localStorage.remainingIssues = JSON.stringify(cache = {
      issues: issueList || [],
      time: new Date()
    });
  }
  goal_issue_count.textContent = cache.issues.length;
  issues.innerHTML = cache.issues.reduce((html, issue) => {
    return html += `
      <li>
        <h3><a href="${issue.url}"><strong>#${issue.number}</strong></a> ${issue.title}</h3>
        <p>${md.render(issue.body)}</p>
      </li>
    `;
  }, '')
  return cache.issues;
}

getRemainingIssues();

// LISTEN FOR HASHCHANGE

function onHashchange(){
  switch (location.hash) {
    case '#issues':
      tabs.setAttribute('selected-index', 1);
  }
}

window.addEventListener('hashchange', e => onHashchange());

DOM.delegateEvent('click', '[show-issues]', (e) => {
  tabs.setAttribute('selected-index', 1);
}, { passive: true });

onHashchange();



let sounds;
orcaegg.addEventListener('click', e => {
  if (!sounds) {
    sounds = new Audio('assets/bk.mp3');
    sounds.play();
  }
  else {
    if (sounds.paused) sounds.play();
    else sounds.pause();
  }
})