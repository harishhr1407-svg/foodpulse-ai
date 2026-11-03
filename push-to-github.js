const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = __dirname;

async function pushToGithub() {
  const args = process.argv.slice(2);
  const repoUrl = args[0] || process.env.GITHUB_REPO_URL;
  const token = args[1] || process.env.GITHUB_TOKEN;

  if (!repoUrl) {
    console.error('Usage: node push-to-github.js <github-repo-url> [github-token]');
    console.error('Example: node push-to-github.js https://github.com/your-username/foodpulse-ai.git ghp_yourPersonalAccessToken');
    process.exit(1);
  }

  try {
    console.log(`Connecting to remote: ${repoUrl}`);
    
    // Add remote
    try {
      await git.addRemote({
        fs,
        dir,
        remote: 'origin',
        url: repoUrl,
        force: true
      });
    } catch (e) {
      // Remote might already exist
    }

    console.log('Pushing main branch to GitHub...');
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      onAuth: () => ({ username: token || 'git', password: token || '' })
    });

    console.log('Push completed successfully!', pushResult);
  } catch (err) {
    console.error('Push failed:', err.message);
    if (err.data) console.error('Details:', err.data);
  }
}

pushToGithub();
