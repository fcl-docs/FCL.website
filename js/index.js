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
  
  hljs.highlightAll();
  console.log('时间：' + new Date());
  
  if (isTodayDate(4, 1)) {
    const HTML = `
      <div class="yellow window">
        <div class="yellowT windowTitle">
          <span>注意！</span>
        </div>
        <p>
          由于经费不足，此站将会在今天（4月1日）晚上（23时）关停！
        </p>
        <p style="opacity: 0.1;">
          愚人节快乐qwq！
        </p>
      </div>
      `;
    document.querySelectorAll('.main').forEach(container => {
      container.insertAdjacentHTML('afterbegin', HTML);
    });
    console.log('愚人节：是');
  } else {
    console.log('愚人节：否');
  }
  
  console.log('window.onload：完成');
  
  console.error('再送你一个');
};

document.addEventListener('DOMContentLoaded', function() {
  console.error('送你一个错误');
  
  loadSidebar();
  hideTip('dom');
  
document.querySelectorAll('.code.window pre').forEach(pre => {
  console.log('代码复制：' + pre);
  pre.addEventListener('click', async () => {
    console.log('代码复制：已被点击');
    
    const codeWindow = pre.closest('.code.window');
    if (!codeWindow) {
      console.warn('代码复制：未找到.code.window父容器');
      return;
    }
    
    const code = pre.querySelector('code');
    const title = codeWindow.querySelector('.codeT span');
    if (!code || !title) {
      console.warn(code ? '代码复制：未找到标题元素' : '代码复制：未找到代码元素');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(code.textContent);
      console.log('代码复制：成功');
      
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      console.log('代码复制：已选中代码');
      
      const originalText = title.textContent;
      title.textContent = '✓ 复制成功';
      console.log(`代码复制：标题更新`);
      
      setTimeout(() => {
        title.textContent = originalText;
        selection.removeAllRanges();
        console.log('代码复制：状态重置');
      }, 1000);
      
    } catch (err) {
      console.error('代码复制：', err);
      const originalText = title.textContent;
      title.textContent = '✗ 复制失败';
      
      setTimeout(() => {
        title.textContent = originalText;
        console.log('代码复制：状态重置');
      }, 1000);
      
      if (!navigator.clipboard) {
        console.warn('代码复制：尝试降级复制方案');
        const textarea = document.createElement('textarea');
        textarea.value = code.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        console.log('代码复制：降级复制方案成功');
      }
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

function isTodayDate(month, day) {
  const today = new Date();
  return today.getMonth() === month - 1 && today.getDate() === day;
}