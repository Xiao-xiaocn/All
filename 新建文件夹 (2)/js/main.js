let navData = [];
let isMainlandChina = false; // 全局标记

document.addEventListener('DOMContentLoaded', () => {
  // 同时加载导航数据和用户国家信息
  Promise.all([
    fetch('navData.json').then(resp => resp.json()),
    getCountry()
  ])
  .then(([data, country]) => {
    navData = data;
    isMainlandChina = ['CN', 'HK', 'MO'].includes(country);
    renderNav();
    initTheme();
    setupTouch();
    document.getElementById('themeToggleButton').addEventListener('click', toggleTheme);
  })
  .catch(err => {
    console.error('加载数据或定位信息失败，采用默认设置', err);
    // 出错时仍加载导航数据，默认非大陆用户
    fetch('navData.json')
      .then(resp => resp.json())
      .then(data => {
         navData = data;
         isMainlandChina = false;
         renderNav();
         initTheme();
         setupTouch();
         document.getElementById('themeToggleButton').addEventListener('click', toggleTheme);
      });
  });
});

// 使用 ipapi.co 获取用户国家代码，出错默认返回 'US'
function getCountry() {
  return fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => data.country || 'US')
    .catch(() => 'US');
}

function renderNav() {
  const container = document.getElementById('navContainer');
  container.innerHTML = navData.map(cat => `
    <div class="category">
      <h2>${cat.category}</h2>
      <div class="nav-list">
        ${cat.sites.map(site => {
          try {
            const urlObj = new URL(site.url);
            const hostname = urlObj.hostname;
            // 根据用户所在区域选择图标源
            const primarySource = isMainlandChina
                ? `https://api.iowen.cn/favicon/${hostname}.png`
                : `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
            const fallbackSource = isMainlandChina
                ? `https://favicon.cccyun.cc/${hostname}`
                : `https://www.google.com/s2/favicons?sz=64&domain=${hostname}`;
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
                     onerror="this.src=this.dataset.fallback;this.onerror=null">
                ${site.name}
              </a>
            `;
          } catch (e) {
            // URL 解析异常处理
            return `
              <div class="nav-item" style="color:red">
                ⚠ 无效链接: ${site.url}
              </div>
            `;
          }
        }).join('')}
      </div>
    </div>
  `).join('');
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

// --------------------- 主题切换 ---------------------
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  updateTheme(savedTheme);
}

function updateTheme(mode) {
  const htmlEl = document.documentElement;
  const btn = document.getElementById('themeToggleButton');
  if (mode === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlEl.classList.toggle('dark', systemDark);
    btn.textContent = '🖥️';
  } else if (mode === 'dark') {
    htmlEl.classList.add('dark');
    btn.textContent = '🌙';
  } else if (mode === 'light') {
    htmlEl.classList.remove('dark');
    btn.textContent = '☀️';
  }
  localStorage.setItem('theme', mode);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'system';
  const next = current === 'system' ? 'dark' : current === 'dark' ? 'light' : 'system';
  updateTheme(next);
}

// --------------------- 触摸反馈 ---------------------
function setupTouch() {
  document.addEventListener('touchstart', e => {
    const navItem = e.target.closest('.nav-item');
    if (navItem) navItem.style.transform = 'scale(0.98)';
  });
  document.addEventListener('touchend', e => {
    const navItem = e.target.closest('.nav-item');
    if (navItem) navItem.style.transform = '';
  });
}
