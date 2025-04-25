addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  /**
   * 主路由函数
   */
  async function handleRequest(request) {
    const url = new URL(request.url)
    let path = decodeURIComponent(url.pathname) // 解码路径，避免重复编码
  
    // 如果访问根路径或 index.html，返回 HTML UI 页面
    if (path === '/' || path === '/index.html') {
      return new Response(getHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  
    // 反代逻辑：解析用户输入（已 encodeURIComponent）并 decode
    const encoded = path.slice(1)  // 获取目标 URL 部分
    if (!encoded) {
      return new Response('请输入要访问的目标，例如 www.example.com 或 https://www.example.com', { status: 400 })
    }
  
    // 对 URL 进行解码和处理
    const raw = decodeURIComponent(encoded) + url.search
  
    // 如果用户未输入协议，默认加上 https://
    const target = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  
    console.log(`正在代理到: ${target}`) // 打印目标 URL 以帮助调试
  
    try {
      const proxyReq = new Request(target, {
        method: request.method,
        headers: request.headers,
        body: ['GET', 'HEAD'].includes(request.method) ? null : await request.text()
      })
  
      const response = await fetch(proxyReq)
      const respHeaders = new Headers(response.headers)
      // 如需跨域，可放开下面一行
      respHeaders.set('Access-Control-Allow-Origin', '*')
  
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: respHeaders
      })
    } catch (err) {
      console.error(`代理请求失败: ${err.message}`)  // 捕获并打印详细错误
      return new Response(`代理请求失败：${err.message}`, { status: 502 })
    }
  }
  
  /**
   * 返回首页的 HTML
   */
  function getHTML() {
    return `<!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>简单反向代理</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body {
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background: #f0f2f5;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
      }
      .search-container {
        width: 90%;
        max-width: 600px;
        display: flex;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
        background: white;
      }
      .search-container input {
        flex: 1;
        padding: 12px 16px;
        font-size: 16px;
        border: none;
        outline: none;
      }
      .search-container button {
        background: #0070f3;
        border: none;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: white;
        font-size: 16px;
        transition: background 0.2s;
      }
      .search-container button:hover {
        background: #005bb5;
      }
      @media (max-width: 480px) {
        .search-container input {
          font-size: 14px;
          padding: 10px 12px;
        }
        .search-container button {
          padding: 0 16px;
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <form class="search-container" action="/" method="GET" onsubmit="event.preventDefault(); 
    let inputVal = target.value.trim(); 
    if (!inputVal.startsWith('http://') && !inputVal.startsWith('https://')) { 
      inputVal = 'https://' + inputVal; 
    } 
    location.href = '/' + encodeURIComponent(inputVal);">
      <input
        type="text"
        id="target"
        placeholder="请输入完整网址，如 https://example.com/path"
        autocomplete="off"
        required
      />
      <button type="submit" aria-label="前往">前往</button>
    </form>
  </body>
  </html>`
  }
  
