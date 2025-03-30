//  __   __                       ___                    ____                                   __                      
// /\ \ /\ \  __                 /\_ \                  /\  _`\              __                /\ \__                   
// \ `\`\/'/'/\_\     __      ___\//\ \    __  __    ___\ \ \L\_\___   __  _/\_\    ___      __\ \ ,_\   ___     ___    
//  `\/ > <  \/\ \  /'__`\   / __`\\ \ \  /\ \/\ \  / __`\ \  _\/ __`\/\ \/'\/\ \ /' _ `\  /'_ `\ \ \/  / __`\ /' _ `\  
//     \/'/\`\\ \ \/\ \L\.\_/\ \L\ \\_\ \_\ \ \_\ \/\ \L\ \ \ \/\ \L\ \/>  </\ \ \/\ \/\ \/\ \L\ \ \ \_/\ \L\ \/\ \/\ \ 
//     /\_\\ \_\ \_\ \__/.\_\ \____//\____\\ \____/\ \____/\ \_\ \____//\_/\_\\ \_\ \_\ \_\ \____ \ \__\ \____/\ \_\ \_\
//     \/_/ \/_/\/_/\/__/\/_/\/___/ \/____/ \/___/  \/___/  \/_/\/___/ \//\/_/ \/_/\/_/\/_/\/___L\ \/__/\/___/  \/_/\/_/
//                                                                                           /\____/                    
//                                                                                           \_/__/                     

window.onload = function() {
  
  hideTip('wo');
  checkVerticalView();
  
  console.log('window.onload：完成');
  
  console.error('再送你一个');
};

document.addEventListener('DOMContentLoaded', function() {
  console.error('送你一个错误');
  
  loadSidebar();
  hideTip('dom');
  
  document.querySelectorAll('.blue.window pre').forEach(pre => {
    console.log('内容复制：' + pre);
    pre.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const title = pre.closest('.blue.window').querySelector('.blueT span');
      
      try {
        await navigator.clipboard.writeText(code.textContent);
        
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        const originalText = title.textContent;
        title.textContent = '✓ 复制成功';
        setTimeout(() => title.textContent = originalText, 1000);
        
      } catch (err) {
        console.error('内容复制：', err);
      }
    });
  });
  
  console.log('DOMContentLoaded：完成');
});

window.addEventListener('resize', function() {
  // checkVerticalView();
});

function loadSidebar() {
  const sidebarContainer = document.getElementById('sidebar');
  const errorHtmlS = '<div class="diagonalRed window"><div class="redT windowTitle"><span>错误</span></div><p>无法加载侧边栏';
  const errorHtmlE = '</p></div>'
  
  if (sidebarContainer) {
    fetch('/page/content/sidebar.html')
      .then(response => {
        console.log('加载侧边栏：' + response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        sidebarContainer.insertAdjacentHTML('beforeend', html);
        console.log('加载侧边栏：完成')
      })
      .catch(error => {
        console.error('加载侧边栏：', error);
        sidebarContainer.insertAdjacentHTML('beforeend', errorHtmlS + '<br>' + error + errorHtmlE);
      });
  } else {
    console.warn('加载侧边栏：找不到容器');
  }
  
}

function hideTip(tip) {
  var wot = document.getElementById('windowOnloadtip');
  var jst = document.getElementById('JStip');
  var domt = document.getElementById('DOMtip');
  if (tip === 'wo') {
    wot.style.display = 'none';
  }
  if (tip === 'dom') {
    domt.style.display = 'none';
    jst.style.display = 'none';
  }
}

function expandSidebar(isExpand) {
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const expandButton = document.getElementById('expandSidebar');
  const hideButton = document.getElementById('hideSidebar');
  const contractButton = document.getElementById('contractSidebar');
  if (isExpand === 'E') {
    sidebarElement.classList.add('sidebarExpand');
    mainElement.classList.add('mainExpand');
    expandButton.style.display = 'none';
    hideButton.style.display = 'none';
    contractButton.style.display = 'block';
    console.log('展开侧边栏：是');
  } else {
    sidebarElement.classList.remove('sidebarExpand');
    mainElement.classList.remove('mainExpand');
    expandButton.style.display = 'block';
    hideButton.style.display = 'block';
    contractButton.style.display = 'none';
    console.log('展开侧边栏：否');
  }
}

function hideSidebar(isHide) {
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const tipHtml = '<meta charset="UTF-8"><div class="diagonal window" id="sidebarHideTip"><div class="windowTitle"><span>侧边栏已隐藏</span></div><button onclick="hideSidebar(&quot;D&quot;)" id="showSidebar">显示侧边栏</button></div>'
  const tipElement = document.getElementById('sidebarHideTip');
  if (isHide === 'H') {
    sidebarElement.classList.add('sidebarHide');
    mainElement.classList.add('mainFull');
    mainElement.insertAdjacentHTML('afterbegin', tipHtml);
    console.log('隐藏侧边栏：是');
  } else {
    sidebarElement.classList.remove('sidebarHide');
    mainElement.classList.remove('mainFull');
    tipElement.remove();
    console.log('隐藏侧边栏：否');
  }
}

function checkVerticalView() {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const sidebarContainer = document.getElementById('sidebar');
  const tipHTML = '<meta charset="UTF-8"><div class="diagonal window" id="verticalTip"><div class="windowTitle"><span>视口宽度小于视口高度</span></div><p>视口高度较小，可能会导致侧边栏显示不全或异常。<br><button onclick="expandSidebar(&quot;E&quot;)" id="expandSidebar">展开侧边栏</button> <button onclick="expandSidebar(&quot;C&quot;)" id="contractSidebar" style="display: none">收起侧边栏</button><button onclick="hideSidebar(&quot;H&quot;)" id="hideSidebar">隐藏侧边栏</button> <button onclick="hideSidebar(&quot;D&quot;)" id="showSidebar" style="display: none">显示侧边栏</button></p></div>'
  
  console.log('视口高：' + viewportHeight);
  console.log('视口宽：' + viewportWidth);
  if (viewportHeight > viewportWidth) {
    sidebarContainer.insertAdjacentHTML('beforeend', tipHTML);
    hideSidebar('H');
    console.log('视口为竖屏：是')
    // sidebarElement.classList.add('sidebarVertical');
    // mainElement.classList.add('mainVertical');
  } else {
    const tipElement = document.getElementById('verticalTip');
    if (tipElement) {
      tipElement.style.display = 'none';
    }
    console.log('视口为竖屏：否')
    // sidebarElement.classList.remove('sidebarVertical');
    // mainElement.classList.remove('mainVertical');
  }
  
}