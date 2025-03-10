addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest() {
  const navData = [
    {
      category: "🚀 开发工具",
      sites: [
        { name: "GitHub", url: "https://github.com", icon: "🐙", color: "#181717" },
        { name: "Vercel", url: "https://vercel.com", icon: "▲", color: "#000000" },
        { name: "CodePen", url: "https://codepen.io", icon: "✏️", color: "#1e1f26" }
      ]
    },
    {
      category: "🔍 搜索引擎",
      sites: [
        { name: "Google", url: "https://google.com", icon: "🔍", color: "#4285f4" },
        { name: "Bing", url: "https://bing.com", icon: "🔎", color: "#008373" },
        { name: "DuckDuckGo", url: "https://duckduckgo.com", icon: "🦆", color: "#DE5833" }
      ]
    }
  ]

  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>全平台导航 | Workers</title>
      <style>
        :root {
          /* iOS 优化色值 */
          --bg-light: #ffffff;
          --text-light: #1e293b;
          --border-light: rgba(0,0,0,0.12);
          --card-bg-light: rgba(255,255,255,0.98);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent; /* 移除iOS点击高亮 */
        }

        body {
          min-height: 100vh;
          font-family: -apple-system, system-ui, sans-serif; /* 优先使用苹果字体 */
          background: var(--bg-light);
          color: var(--text-light);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased; /* 字体抗锯齿 */
        }

        /* 移除链接下划线 */
        a {
          text-decoration: none;
          color: inherit;
        }

        /* 搜索框 (iOS输入优化) */
        .search-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        #searchInput {
          width: 100%;
          padding: 1rem 1.5rem;
          border: 2px solid var(--border-light);
          border-radius: 12px;
          background: var(--card-bg-light);
          color: var(--text-light);
          font-size: 16px; /* iOS防止缩放 */
          -webkit-appearance: none; /* 移除iOS默认样式 */
        }

        /* 网格布局 (iOS滚动优化) */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          -webkit-overflow-scrolling: touch; /* iOS弹性滚动 */
        }

        /* 分类卡片 (iOS毛玻璃修复) */
        .category {
          background: var(--card-bg-light);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px); /* Safari兼容 */
        }

        /* 导航项 (iOS触摸优化) */
        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(0,0,0,0.03);
          transition: transform 0.2s cubic-bezier(.25,.1,.25,1); /* iOS动画曲线 */
        }
        .nav-item:active {
          transform: scale(0.98); /* 按压反馈 */
        }

        @media (max-width: 640px) {
          /* iOS地址栏适配 */
          .grid {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      </style>
    </head>
    <body>
      <div class="search-container">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="搜索网站..."
          oninput="filterSites()"
          autocapitalize="off" <!-- 关闭iOS首字母大写 -->
        >
      </div>

      <div class="grid" id="navContainer">
        ${navData.map(cat => `
          <div class="category">
            <h2>${cat.category}</h2>
            <div class="nav-list">
              ${cat.sites.map(site => `
                <a href="${site.url}" 
                   class="nav-item" 
                   target="_blank"
                   rel="noopener"
                   data-name="${site.name.toLowerCase()}">
                  <span style="margin-right: 0.8rem">${site.icon}</span>
                  ${site.name}
                </a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <script>
        // 搜索过滤
        function filterSites() {
          const searchTerm = document.getElementById('searchInput').value.toLowerCase()
          document.querySelectorAll('.category').forEach(cat => {
            let visible = 0
            cat.querySelectorAll('.nav-item').forEach(item => {
              const show = item.dataset.name.includes(searchTerm)
              item.style.display = show ? 'flex' : 'none'
              if (show) visible++
            })
            cat.style.display = visible > 0 ? 'block' : 'none'
          })
        }

        // iOS 键盘收起监听
        window.addEventListener('touchstart', () => {
          if (document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur()
          }
        })
      </script>
    </body>
    </html>
  `

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  })
}