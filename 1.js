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
    },
    {
      category: "✈️机场",
      sites: [
        { name: "性价比机场", url: "https://8.218.119.170", icon: "✈️", color: "#4285f4" },
        { name: "红杏云", url: "https://hongxingdl.com", icon: "✈️", color: "#008373" },
        { name: "快猫", url: "https://maojia.net", icon: "✈️", color: "#DE5833" }
        { name: "山水云", url: "https://sy.wgkzg.com/#/login", icon: "✈️", color: "#DE5833" }
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
    <html lang="zh-CN" class="dark">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>全能导航 | Workers</title>
      <style>
        :root {
          /* 颜色系统 */
          --bg-light: #ffffff;
          --bg-dark: #0f172a;
          --text-light: #1e293b;
          --text-dark: #f8fafc;
          --border-light: rgba(0,0,0,0.1);
          --border-dark: rgba(255,255,255,0.1);
          --card-bg-light: rgba(255,255,255,0.98);
          --card-bg-dark: rgba(30,41,59,0.98);
          --accent-light: #e2e8f0;
          --accent-dark: #1e293b;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          transition: 
            background 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease;
        }

        body {
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          background: var(--bg-light);
          color: var(--text-light);
          line-height: 1.5;
        }

        .dark {
          background: var(--bg-dark);
          color: var(--text-dark);
        }

        /* 搜索框 */
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
          font-size: 1rem;
          transition: all 0.3s;
        }
        .dark #searchInput {
          border-color: var(--border-dark);
          background: var(--card-bg-dark);
          color: var(--text-dark);
        }
        #searchInput:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(66,153,225,0.2);
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
          box-shadow: 0 8px 32px rgba(0,0,0,0.05);
        }
        .dark .category {
          background: var(--card-bg-dark);
          border-color: var(--border-dark);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .category h2 {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .dark .category h2 {
          border-color: var(--border-dark);
        }

        /* 导航项 */
        .nav-list {
          display: grid;
          gap: 0.75rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          background: rgba(255,255,255,0.5);
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .nav-item:hover {
          transform: translateY(-2px);
          border-color: var(--border-light);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .dark .nav-item {
          background: rgba(255,255,255,0.05);
        }
        .dark .nav-item:hover {
          border-color: var(--border-dark);
        }

        /* 移动端优化 */
        @media (max-width: 640px) {
          .grid {
            gap: 1rem;
            padding: 0 0.5rem;
          }
          .category {
            padding: 1rem;
            border-radius: 12px;
          }
          .nav-item {
            padding: 0.75rem;
          }
        }

        /* 主题切换按钮 */
        .theme-toggle {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: var(--card-bg-light);
          border: 1px solid var(--border-light);
          cursor: pointer;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }
        .dark .theme-toggle {
          background: var(--card-bg-dark);
          border-color: var(--border-dark);
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
          aria-label="网站搜索"
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
                   rel="noopener noreferrer"
                   data-name="${site.name.toLowerCase()}">
                  <span style="margin-right: 0.8rem">${site.icon}</span>
                  ${site.name}
                </a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <button class="theme-toggle" onclick="toggleTheme()">🌓</button>

      <script>
        // 主题切换
        function toggleTheme() {
          const htmlEl = document.documentElement
          htmlEl.classList.toggle('dark')
          localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light')
        }

        // 搜索功能
        function filterSites() {
          const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase()
          const categories = document.querySelectorAll('.category')
          
          categories.forEach(cat => {
            let visibleCount = 0
            const items = cat.querySelectorAll('.nav-item')
            
            items.forEach(item => {
              const match = item.dataset.name.includes(searchTerm)
              item.style.display = match ? 'flex' : 'none'
              if(match) visibleCount++
            })
            
            cat.style.display = visibleCount > 0 ? 'block' : 'none'
          })
        }

        // 初始化主题
        function initTheme() {
          const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          document.documentElement.classList.toggle('dark', savedTheme === 'dark')
        }

        // 触摸优化
        function setupTouch() {
          document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('touchstart', () => {
              item.style.transform = 'scale(0.98)'
            })
            item.addEventListener('touchend', () => {
              item.style.transform = ''
            })
          })
        }

        // 初始化
        initTheme()
        setupTouch()
      </script>
    </body>
    </html>
  `

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  })
}