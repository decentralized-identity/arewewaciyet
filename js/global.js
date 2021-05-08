
async function getRemainingIssues(){
  var cache = JSON.parse(localStorage.remainingIssues || '{ "issues": [] }');
  var time = cache.time ? new Date(cache.time) : new Date();
  if (location.hostname === 'localhost' || !cache.time || (new Date() > time.setHours(time.getHours() + 1))) {
    let issues = await fetch(`https://api.github.com/repos/decentralized-identity/waci-presentation-exchange/issues?per_page=100&labels=v0.1`, {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' }
    }).then(response => response.json())
      .catch(e => console.log(e));
    localStorage.remainingIssues = JSON.stringify(cache = {
      issues: issues || [],
      time: new Date()
    });
  }
  goal_issue_count.textContent = cache.issues.length;
  return cache.issues;
}

getRemainingIssues();

let sounds;
orcaegg.addEventListener('click', e => {
  if (!sounds) {
    sounds = new Audio('../assets/bk.mp3');
    sounds.play();
  }
  else {
    if (sounds.paused) sounds.play();
    else sounds.pause();
  }
})