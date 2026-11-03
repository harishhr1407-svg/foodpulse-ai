const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const dir = __dirname;

async function initAndCommit() {
  try {
    console.log('1. Initializing Git repository in:', dir);
    await git.init({ fs, dir, defaultBranch: 'main' });
    console.log('   Initialized empty Git repository.');

    // Recursively list files excluding node_modules and .git
    function getAllFiles(currentDir, relativePath = '') {
      let results = [];
      const list = fs.readdirSync(currentDir);
      for (const file of list) {
        if (file === 'node_modules' || file === '.git' || file === '.system_generated') continue;
        const filePath = path.join(currentDir, file);
        const rel = relativePath ? `${relativePath}/${file}` : file;
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          results = results.concat(getAllFiles(filePath, rel));
        } else {
          results.push(rel);
        }
      }
      return results;
    }

    const files = getAllFiles(dir);
    console.log(`2. Staging ${files.length} project files...`);
    for (const filepath of files) {
      await git.add({ fs, dir, filepath });
    }
    console.log('   All files staged successfully.');

    // Commit
    const sha = await git.commit({
      fs,
      dir,
      message: 'Initial commit: AI-Driven Food Manufacturing Planning Platform (FoodPulse AI) - SRM EEC Zeroth Review',
      author: {
        name: 'Harish Kanna M',
        email: 'harishkanna@example.com'
      }
    });

    console.log('3. Commit created successfully! SHA:', sha);
    console.log('   Branch: main');
    console.log('   Local Git repository is fully initialized and committed.');
  } catch (err) {
    console.error('Error during git init and commit:', err);
  }
}

initAndCommit();
