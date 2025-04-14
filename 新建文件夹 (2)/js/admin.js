document.addEventListener('DOMContentLoaded', () => {
  loadNavData();
});

let navData = [];

function loadNavData() {
  fetch('navData.json')
    .then(response => response.json())
    .then(data => {
      navData = data;
      renderCategories();
    })
    .catch(err => {
      alert("加载导航数据失败:" + err);
    });
}

function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';
  navData.forEach((category, catIndex) => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';

    // 分类头部：显示分类名称及操作按钮
    const header = document.createElement('div');
    header.className = 'category-header';

    const catNameInput = document.createElement('input');
    catNameInput.type = 'text';
    catNameInput.value = category.category;
    catNameInput.addEventListener('change', (e) => {
      navData[catIndex].category = e.target.value;
    });

    const btnGroup = document.createElement('div');
    btnGroup.className = 'up-down-buttons';

    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.addEventListener('click', () => moveCategory(catIndex, -1));

    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.addEventListener('click', () => moveCategory(catIndex, 1));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除分类';
    deleteBtn.addEventListener('click', () => deleteCategory(catIndex));

    btnGroup.appendChild(upBtn);
    btnGroup.appendChild(downBtn);
    btnGroup.appendChild(deleteBtn);

    header.appendChild(catNameInput);
    header.appendChild(btnGroup);
    categoryCard.appendChild(header);

    // 站点列表（去除颜色输入）
    const siteList = document.createElement('div');
    siteList.className = 'site-list';

    category.sites.forEach((site, siteIndex) => {
      const siteItem = document.createElement('div');
      siteItem.className = 'site-item';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.value = site.name;
      nameInput.addEventListener('change', (e) => {
        navData[catIndex].sites[siteIndex].name = e.target.value;
      });

      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.value = site.url;
      urlInput.addEventListener('change', (e) => {
        navData[catIndex].sites[siteIndex].url = e.target.value;
      });

      const deleteSiteBtn = document.createElement('button');
      deleteSiteBtn.textContent = '删除';
      deleteSiteBtn.addEventListener('click', () => deleteSite(catIndex, siteIndex));

      siteItem.appendChild(nameInput);
      siteItem.appendChild(urlInput);
      siteItem.appendChild(deleteSiteBtn);

      siteList.appendChild(siteItem);
    });

    // 添加新站点按钮
    const addSiteBtn = document.createElement('button');
    addSiteBtn.textContent = '添加站点';
    addSiteBtn.addEventListener('click', () => addSite(catIndex));

    categoryCard.appendChild(siteList);
    categoryCard.appendChild(addSiteBtn);

    container.appendChild(categoryCard);
  });
}

document.getElementById('addCategoryBtn').addEventListener('click', addCategory);
document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);

function moveCategory(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= navData.length) return;
  const temp = navData[index];
  navData[index] = navData[newIndex];
  navData[newIndex] = temp;
  renderCategories();
}

function deleteCategory(index) {
  if (confirm("确定删除该分类吗？")) {
    navData.splice(index, 1);
    renderCategories();
  }
}

function addCategory() {
  const newCategory = { category: "新分类", sites: [] };
  navData.push(newCategory);
  renderCategories();
}

function deleteSite(catIndex, siteIndex) {
  if (confirm("确定删除该站点吗？")) {
    navData[catIndex].sites.splice(siteIndex, 1);
    renderCategories();
  }
}

function addSite(catIndex) {
  const newSite = { name: "新站点", url: "https://" };
  navData[catIndex].sites.push(newSite);
  renderCategories();
}

function saveChanges() {
  const status = document.getElementById('saveStatus');
  status.style.display = 'block';
  status.textContent = "正在保存...";

  fetch('https://www.xlinkone.shop/saveNavData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(navData)
  })
  .then(response => {
    if (response.ok) {
      status.textContent = "保存成功！";
    } else {
      status.textContent = "保存失败，请检查服务器设置。";
    }
  })
  .catch(err => {
    status.textContent = "保存失败：" + err;
  });
}
