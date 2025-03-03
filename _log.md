# 更新记录

<div id="commit-history">
  <p>正在加载更新记录...</p>
</div>

<div id="error-message"></div>

<script>
(function() {
  // 添加你的 GitHub Personal Access Token
  const GITHUB_TOKEN = 'xxx';

  // 将函数定义为全局函数
  window.fetchGitHubCommits = async function() {
    const loadingElement = document.getElementById('commit-history');
    
    try {
      // 获取当前日期和一年前的日期
      const currentDate = new Date();
      const endDate = new Date();
      endDate.setMonth(currentDate.getMonth() - 6); // 向前推6个月

      // 格式化日期为 ISO 8601 格式（YYYY-MM-DDTHH:MM:SSZ）
      const sinceDate = endDate.toISOString();
      const untilDate = currentDate.toISOString();

      // 构造请求参数
      const params = new URLSearchParams({
        since: sinceDate,
        until: untilDate
      });

      // GitHub API URL
      const repoOwner = "731016";
      const repoName = "731016.github.io";
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

      // 完整的请求URL
      const requestUrl = `${apiUrl}?since=${sinceDate}&until=${untilDate}`;
      console.log(`请求地址 ${requestUrl}`);

      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Mozilla/5.0',
        // 'Authorization': `token ${GITHUB_TOKEN}`
      };

      console.log('开始获取提交记录...');
      const response = await fetch(requestUrl, {
        headers: headers
      });

      // 获取详细的错误信息
      const responseData = await response.text();
      let jsonData;
      try {
        jsonData = JSON.parse(responseData);
      } catch (e) {
        jsonData = null;
      }

      if (!response.ok) {
        const errorMessage = jsonData?.message || responseData;
        const errorDetails = jsonData?.documentation_url ? 
          `<br>详细信息: <a href="${jsonData.documentation_url}" target="_blank">${jsonData.documentation_url}</a>` : '';
        
        throw new Error(`
          状态码: ${response.status} ${response.statusText}
          <br>错误信息: ${errorMessage}
          ${errorDetails}
        `);
      }

      const commits = jsonData;
      console.log(`成功获取 ${commits.length} 条提交记录`);

      let html = '';
      let currentYear = '';
      let currentMonth = '';
      
      for (const commit of commits) {
        try {
          const date = new Date(commit.commit.author.date);
          const year = date.getFullYear();
          const month = date.toLocaleString('zh-CN', { month: 'long' });
          
          const formattedDate = date.getFullYear() + '-' + 
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0') + ' ' +
            String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':' +
            String(date.getSeconds()).padStart(2, '0');
          
          if (year !== currentYear) {
            html += `\n## ${year}年\n\n`;
            currentYear = year;
          }
          
          if (month !== currentMonth) {
            html += `\n### ${month}\n\n`;
            currentMonth = month;
            html += '| 更新时间 | 更新内容 |\n|---------|----------|\n';
          }
          
          const message = commit.commit.message;
          const sha = commit.sha.substring(0, 7);
          const commitUrl = commit.html_url;
          const author = commit.commit.author.name;
          
          // 处理文件列表，显示实际目录路径
            let filesList = '';
            if (commit.files) {
              filesList = commit.files
                .map(file => {
                  const parts = file.filename.split('/');
                  const fileName = parts.pop();
                  const directory = parts.join('/') || '/';
                  const fullPath = directory === '/' ? fileName : `${directory}/${fileName}`;
                  return `- 更新文件: [${fullPath}](${file.blob_url})`;
                })
                .join('<br>');
            }
          
          const content = filesList ? 
            `- [${message}](${commitUrl}) <br>${filesList}<br>- 提交者: ${author} <br>- Commit: [\`${sha}\`](${commitUrl})` :
            `- [${message}](${commitUrl}) <br>- 提交者: ${author} <br>- Commit: [\`${sha}\`](${commitUrl})`;
          
          html += `| ${formattedDate} | ${content} |\n`;
        } catch (commitError) {
          console.error('处理单个提交时出错:', commitError);
          continue;
        }
      }
      
      if (html) {
        loadingElement.innerHTML = marked.parse(html);
        console.log('更新记录加载完成');
      } else {
        throw new Error('没有获取到任何提交记录');
      }
    } catch (error) {
      console.error('获取更新记录失败:', error);
      
      // 美化错误显示
      loadingElement.innerHTML = `
        <div style="
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          padding: 20px;
          margin: 10px 0;
        ">
          <h3 style="margin-top: 0;">获取更新记录失败</h3>
          <div style="margin: 10px 0;">
            ${error.message}
          </div>
          <div style="margin-top: 15px;">
            <button onclick="window.fetchGitHubCommits()" style="
              padding: 8px 16px;
              background-color: #dc3545;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            ">重试</button>
          </div>
        </div>
      `;
    }
  };

  // 检查 marked 库加载状态
  function initCommitHistory() {
    if (typeof marked === 'undefined') {
      console.error('marked 库未加载，正在尝试等待...');
      if (typeof marked !== 'undefined') {
          console.log('marked 库已加载，开始获取更新记录');
          clearInterval(checkMarked);
          window.fetchGitHubCommits();
        }
      
      if (typeof marked === 'undefined') {
          document.getElementById('commit-history').innerHTML = `
            <div style="
              color: #856404;
              background-color: #fff3cd;
              border: 1px solid #ffeeba;
              border-radius: 4px;
              padding: 20px;
              margin: 10px 0;
            ">
              <h3 style="margin-top: 0;">加载失败</h3>
              <p>marked 库加载失败，请刷新页面重试</p>
            </div>
          `;
        }
    } else {
      console.log('marked 库已加载，开始获取更新记录');
      window.fetchGitHubCommits();
    }
  }

  // 页面加载完成后初始化
  initCommitHistory();
})();
</script>

<style>
#commit-history table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

#commit-history th,
#commit-history td {
  padding: 12px;
  border: 1px solid #ddd;
}

#commit-history tr:nth-child(even) {
  background-color: #f8f8f8;
}

#commit-history tr:hover {
  background-color: #f0f0f0;
}

#commit-history a {
  color: #0366d6;
  text-decoration: none;
}

#commit-history a:hover {
  text-decoration: underline;
}

#commit-history code {
  padding: 2px 4px;
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 0.9em;
}

/* 加载状态样式 */
#commit-history > p {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>

---

> 💡 本页面同步显示 [GitHub 仓库](https://github.com/731016/731016.github.io)的提交记录。点击文件名可查看具体更新内容。
