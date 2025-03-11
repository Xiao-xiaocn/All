addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const navData = [
    {
      category: "⭐ 常用",
      sites: [
        { name: "无影云电脑客户端下载", url: "https://www.aliyun.com/product/wuying/download", color: "#ff6a00" }
      ]
    },
    {
      category: "🚀 开发工具",
      sites: [
        { name: "GitHub", url: "https://github.com", color: "#181717" },
        { name: "Gitee", url: "https://gitee.com", color: "#fc6d26" },
        { name: "Vercel", url: "https://vercel.com", color: "#000000" },
        { name: "CodePen", url: "https://codepen.io", color: "#1e1f26" },
        { name: "Stack Overflow", url: "https://stackoverflow.com", color: "#f48024" }
      ]
    },
    {
      category: "🔍 搜索引擎",
      sites: [
        { name: "Google", url: "https://google.com", color: "#4285f4" },
        { name: "Bing", url: "https://bing.com", color: "#008373" },
        { name: "DuckDuckGo", url: "https://duckduckgo.com", color: "#DE5833" },
        { name: "Yahoo", url: "https://yahoo.com", color: "#6001d2" },
        { name: "百度", url: "https://www.baidu.com", color: "#2163f3" },
        { name: "搜狗", url: "https://www.sogou.com", color: "#5b5b5b" },
        { name: "360搜索", url: "https://www.so.com", color: "#ff4500" }
      ]
    },
    {
      category: "✈️ 机场",
      sites: [
        { name: "性价比机场", url: "https://8.218.119.170", color: "#4285f4" },
        { name: "红杏云", url: "https://hongxingdl.com", color: "#008373" },
        { name: "快猫", url: "https://maojia.net", color: "#DE5833" },
        { name: "山水云", url: "https://sy.wgkzg.com/#/login", color: "#DE5833" }
      ]
    },
    {
      category: "📚 学习资源",
      sites: [
        { name: "Coursera", url: "https://www.coursera.org", color: "#2a73cc" },
        { name: "edX", url: "https://www.edx.org", color: "#050708" },
        { name: "Khan Academy", url: "https://www.khanacademy.org", color: "#14bf96" },
        { name: "Udemy", url: "https://www.udemy.com", color: "#ec5252" },
        { name: "慕课网", url: "https://www.imooc.com", color: "#1abc9c" },
        { name: "网易云课堂", url: "https://study.163.com", color: "#e03a3e" },
        { name: "中国大学MOOC", url: "https://www.icourse163.org", color: "#1d9d74" }
      ]
    },
    {
      category: "📰 新闻",
      sites: [
        { name: "BBC", url: "https://www.bbc.com", color: "#bb1919" },
        { name: "CNN", url: "https://www.cnn.com", color: "#cc0000" },
        { name: "新华网", url: "http://www.xinhuanet.com", color: "#de2910" },
        { name: "新浪新闻", url: "https://news.sina.com.cn", color: "#e6162d" },
        { name: "腾讯新闻", url: "https://news.qq.com", color: "#07c160" },
        { name: "网易新闻", url: "https://news.163.com", color: "#c81623" },
        { name: "人民网", url: "http://www.people.com.cn", color: "#f44336" }
      ]
    },
    {
      category: "💼 工作与招聘",
      sites: [
        { name: "LinkedIn", url: "https://www.linkedin.com", color: "#0077b5" },
        { name: "Indeed", url: "https://www.indeed.com", color: "#2164f3" },
        { name: "拉勾网", url: "https://www.lagou.com", color: "#f97e76" },
        { name: "智联招聘", url: "https://www.zhaopin.com", color: "#ff5722" },
        { name: "前程无忧", url: "https://www.51job.com", color: "#ff9800" },
        { name: "猎聘", url: "https://www.liepin.com", color: "#009688" }
      ]
    },
    {
      category: "🎨 设计与灵感",
      sites: [
        { name: "Dribbble", url: "https://dribbble.com", color: "#ea4c89" },
        { name: "Behance", url: "https://www.behance.net", color: "#1769ff" },
        { name: "Awwwards", url: "https://www.awwwards.com", color: "#000000" },
        { name: "站酷", url: "https://www.zcool.com.cn", color: "#e02020" }
      ]
    },
    {
      category: "💻 技术博客",
      sites: [
        { name: "Medium", url: "https://medium.com", color: "#00ab6c" },
        { name: "Dev.to", url: "https://dev.to", color: "#0a0a0a" },
        { name: "Hacker News", url: "https://news.ycombinator.com", color: "#ff6600" },
        { name: "掘金", url: "https://juejin.cn", color: "#2b8a3e" },
        { name: "CSDN", url: "https://www.csdn.net", color: "#00b2ee" },
        { name: "知乎", url: "https://www.zhihu.com", color: "#0084ff" }
      ]
    },
    {
      category: "🎮 娱乐",
      sites: [
        { name: "YouTube", url: "https://www.youtube.com", color: "#ff0000" },
        { name: "Reddit", url: "https://www.reddit.com", color: "#ff4500" },
        { name: "Twitch", url: "https://www.twitch.tv", color: "#6441a5" },
        { name: "爱奇艺", url: "https://www.iqiyi.com", color: "#ff003f" },
        { name: "腾讯视频", url: "https://v.qq.com", color: "#00a1e9" },
        { name: "优酷", url: "https://www.youku.com", color: "#3ba1da" }
      ]
    },
    {
      category: "🤖 AI",
      sites: [
        { name: "ChatGPT", url: "https://chat.openai.com", color: "#10a37f" },
        { name: "Bard", url: "https://bard.google.com", color: "#4285f4" },
        { name: "Claude", url: "https://anthropic.com/claude", color: "#ff6600" }
      ]
    },
    {
      category: "☁️ 云计算服务",
      sites: [
        { name: "Cloudflare", url: "https://dash.cloudflare.com", color: "#f38020" },
        { name: "DigitalPlat", url: "https://dash.domain.digitalplat.org", color: "#4a90e2" },
        { name: "阿里云", url: "https://www.aliyun.com", color: "#ff6a00" },
        { name: "AWS", url: "https://aws.amazon.com", color: "#ff9900" },
        { name: "Azure", url: "https://portal.azure.com", color: "#0078d4" }
      ]
    }
  ]

  // 获取用户地理位置信息
  const country = request.cf?.country || 'US'
  const isMainlandChina = ['CN', 'HK', 'MO'].includes(country)

  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>全能导航 | Workers</title>
      <style>
        :root {
          --bg-light: #f7f7f7;
          --bg-dark: #121212;
          --text-light: #333333;
          --text-dark: #eeeeee;
          --border-light: rgba(0, 0, 0, 0.1);
          --border-dark: rgba(255, 255, 255, 0.1);
          --card-bg-light: #ffffff;
          --card-bg-dark: #1e1e1e;
          --accent-light: #e2e8f0;
          --accent-dark: #333333;
        }
        html {
          background: var(--bg-light);
          color: var(--text-light);
          font-size: 16px;
        }
        html.dark {
          background: var(--bg-dark);
          color: var(--text-dark);
        }
        body {
          min-height: 100vh;
          margin: 0;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background: transparent;
          color: inherit;
          line-height: 1.6;
          padding-top: 100px; /* 为固定搜索框预留空间 */
        }
        /* 美化后的固定搜索框 */
        .search-container {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 600px;
          background: var(--card-bg-light);
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          justify-content: center;
        }
        .dark .search-container {
          background: var(--card-bg-dark);
          border: 1px solid var(--border-dark);
        }
        /* 搜索输入框样式 */
        #searchInput {
          width: 100%;
          border: none;
          outline: none;
          font-size: 1rem;
          background: transparent;
          color: var(--text-light);
        }
        .dark #searchInput {
          color: var(--text-dark);
        }
        /* 网格布局 */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        /* 分类卡片 */
        .category {
          background: var(--card-bg-light);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .category:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .dark .category {
          background: var(--card-bg-dark);
          border-color: var(--border-dark);
        }
        .category h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--border-light);
        }
        .dark .category h2 {
          border-bottom: 2px solid var(--border-dark);
        }
        /* 导航项 */
        .nav-list {
          display: grid;
          gap: 0.75rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          background: rgba(255,255,255,0.6);
          border: 1px solid transparent;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .nav-item:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.8);
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .dark .nav-item {
          background: rgba(255,255,255,0.05);
        }
        .dark .nav-item:hover {
          background: rgba(255,255,255,0.1);
        }
        /* 主题切换按钮 */
        .theme-toggle {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: var(--card-bg-light);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .theme-toggle:hover {
          transform: scale(1.1);
        }
        .dark .theme-toggle {
          background: var(--card-bg-dark);
        }
      </style>
    </head>
    <body>
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="搜索网站..." oninput="filterSites()" aria-label="网站搜索">
      </div>
      <div class="grid" id="navContainer">
        ${navData.map(cat => `
          <div class="category">
            <h2>${cat.category}</h2>
            <div class="nav-list">
              ${cat.sites.map(site => {
                try {
                  const urlObj = new URL(site.url)
                  const hostname = urlObj.hostname
                  // 智能选择图标源
                  const primarySource = isMainlandChina 
                    ? `https://api.iowen.cn/favicon/${hostname}.png`
                    : `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`
                  const fallbackSource = isMainlandChina
                    ? `https://favicon.cccyun.cc/${hostname}`
                    : `https://api.iowen.cn/favicon/${hostname}.png`

                  return `
                    <a href="${site.url}" 
                       class="nav-item" 
                       target="_blank"
                       rel="noopener noreferrer"
                       data-name="${site.name.toLowerCase()}">
                      <img src="${primarySource}"
                           data-fallback="${fallbackSource}"
                           alt="${site.name}" 
                           loading="lazy"
                           onerror="this.src=this.dataset.fallback;this.onerror=null"
                           style="width:20px; height:20px; margin-right:0.8rem; border-radius:4px;">
                      ${site.name}
                    </a>
                  `
                } catch(e) {
                  // URL解析异常处理
                  return `
                    <div class="nav-item" style="color:red">
                      ⚠ 无效链接: ${site.url}
                    </div>
                  `
                }
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <button class="theme-toggle" id="themeToggleButton">🖥️</button>
      <script>
        // 更新主题状态和按钮图标，并保存设置
        function updateTheme(mode) {
          const htmlEl = document.documentElement;
          const themeToggleButton = document.getElementById('themeToggleButton');
          if (mode === 'system') {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            htmlEl.classList.toggle('dark', systemDark);
            themeToggleButton.textContent = '🖥️';
          } else if (mode === 'dark') {
            htmlEl.classList.add('dark');
            themeToggleButton.textContent = '🌙';
          } else if (mode === 'light') {
            htmlEl.classList.remove('dark');
            themeToggleButton.textContent = '☀️';
          }
          localStorage.setItem('theme', mode);
        }
        
        // 初始化主题，默认使用 system 模式
        function initTheme() {
          const savedTheme = localStorage.getItem('theme') || 'system';
          updateTheme(savedTheme);
        }
        
        // 切换主题模式：system -> dark -> light -> system...
        function toggleTheme() {
          const current = localStorage.getItem('theme') || 'system';
          let next;
          if (current === 'system') {
            next = 'dark';
          } else if (current === 'dark') {
            next = 'light';
          } else if (current === 'light') {
            next = 'system';
          }
          updateTheme(next);
        }
        
        // 监听系统主题变化，添加兼容性支持（addEventListener 或 addListener）
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const mediaQueryListener = e => {
          if ((localStorage.getItem('theme') || 'system') === 'system') {
            updateTheme('system');
          }
        };
        if (typeof mediaQuery.addEventListener === 'function') {
          mediaQuery.addEventListener('change', mediaQueryListener);
        } else if (typeof mediaQuery.addListener === 'function') {
          mediaQuery.addListener(mediaQueryListener);
        }
        
        // 搜索过滤功能
        function filterSites() {
          const searchTerm = document.getElementById('searchInput').value.toLowerCase();
          document.querySelectorAll('.category').forEach(category => {
            let hasVisibleItems = false;
            category.querySelectorAll('.nav-item').forEach(item => {
              const match = item.dataset.name.includes(searchTerm);
              item.style.display = match ? 'flex' : 'none';
              if (match) hasVisibleItems = true;
            });
            category.style.display = hasVisibleItems ? 'block' : 'none';
          });
        }
        
        // 触摸反馈优化
        function setupTouch() {
          document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('touchstart', () => {
              item.style.transform = 'scale(0.98)';
            });
            item.addEventListener('touchend', () => {
              item.style.transform = '';
            });
          });
        }
        
        // 页面初始化
        initTheme();
        setupTouch();
        // 为主题按钮添加点击事件
        document.getElementById('themeToggleButton').addEventListener('click', toggleTheme);
      </script>
    </body>
    </html>
  `

  return new Response(html, {
    headers: { 
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache', // 禁用缓存确保地理位置检测准确
    }
  })
}
