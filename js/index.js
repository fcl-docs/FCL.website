//  __   __                       ___                    ____                                   __                      
// /\ \ /\ \  __                 /\_ \                  /\  _`\              __                /\ \__                   
// \ `\`\/'/'/\_\     __      ___\//\ \    __  __    ___\ \ \L\_\___   __  _/\_\    ___      __\ \ ,_\   ___     ___    
//  `\/ > <  \/\ \  /'__`\   / __`\\ \ \  /\ \/\ \  / __`\ \  _\/ __`\/\ \/'\/\ \ /' _ `\  /'_ `\ \ \/  / __`\ /' _ `\  
//     \/'/\`\\ \ \/\ \L\.\_/\ \L\ \\_\ \_\ \ \_\ \/\ \L\ \ \ \/\ \L\ \/>  </\ \ \/\ \/\ \/\ \L\ \ \ \_/\ \L\ \/\ \/\ \ 
//     /\_\\ \_\ \_\ \__/.\_\ \____//\____\\ \____/\ \____/\ \_\ \____//\_/\_\\ \_\ \_\ \_\ \____ \ \__\ \____/\ \_\ \_\
//     \/_/ \/_/\/_/\/__/\/_/\/___/ \/____/ \/___/  \/___/  \/_/\/___/ \//\/_/ \/_/\/_/\/_/\/___L\ \/__/\/___/  \/_/\/_/
//                                                                                           /\____/                    
//                                                                                           \_/__/                     

// ----------------------------------------------------------------------------------------------------

const printRandomError = true;
// 控制是否在控制台打印随机错误
const enableFoolDay = true;
// 控制是否启用愚人节内容
const errorMessages = [
    "知道你小子打开了控制台。",
    "送你一个错误。",
    "随机送给有缘人一个错误。",
    "这是一个错误，你别管是什么错误，是个错误就对了。",
    "洛狐是傻逼。",
    "求赞助awa，洛狐真的没钱了。",
    "阿巴阿巴。",
    "qwq",
    "awa"
  ];
// 随机错误合集
const verifyQuestions = [
  '在 <a href="./index.html" target="_blank">首页</a> → 为什么选择FCL？ → 开源 的板块中，<mark>第 5 个字</mark>是什么？',
  '在 <a href="./about.html" target="_blank">关于</a>页面 中，<mark>晚梦的头像图片大小</mark>是多少？（单位：MiB，不需要输入单位）',
  '在 <a href="./about.html" target="_blank">关于</a>页面 中，<mark>洛狐的头像图片大小</mark>是多少？（单位：MiB，不需要输入单位）',
  '在 <a href="./index.html" target="_blank">首页</a> → 展示的启动器截图中，<mark>玩家名称</mark>是什么？',
  '在 <a href="./index.html" target="_blank">首页</a> → 侧边栏 → 创建时间 → 2025年3月?日2时38分 中，<mark>问号</mark>是多少？'
];
// 人机验证的问题合集
const verifyAnswers = [
  '在',
  '2.3',
  '1.4',
  'XLuoFox_DSY',
  '19'
];
// 人机验证的答案合集

// ----------------------------------------------------------------------------------------------------

let verifyAnswer = '';
// 人机验证的答案

// ----------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  const downVerifyBtn = document.getElementById('downVerifyBtn');
  
  loadSidebar();
  
  checkVerticalView();
  
  hideTip('dom');
  
  if (printRandomError) {
    generateRandomError();
  }
  
  
  if (downVerifyBtn) {
    downVerifyBtn.addEventListener('click', function() {
      robotVerify(showDirectLink);
    });
  };
  
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
        title.textContent = '✓ 复制成功: ' + originalText;
        console.log(`代码复制：标题更新`);
        
        setTimeout(() => {
          title.textContent = originalText;
          selection.removeAllRanges();
          console.log('代码复制：状态重置');
        }, 1000);
        
      } catch (err) {
        console.error('代码复制：', err);
        const originalText = title.textContent;
        title.textContent = '✗ 复制失败: ' + originalText;
        
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
  
  window.addEventListener('resize', function() {
    console.log('window.resize：开始');
    
    // checkVerticalView();
  });
  
  console.log('document.DOMContentLoaded：完成');
});

window.onload = function() {
  
  hideTip('wo');
  
  
  if (typeof hljs !== 'undefined' && hljs.highlightAll) {
    hljs.highlightAll();
    console.log('hljs：' + typeof hljs);
  } else {
    console.warn('hljs：' + typeof hljs);
  }
  
  if (printRandomError) {
    generateRandomError();
  }
  
  console.log('时间：' + new Date());
  
  if (isTodayDate(4, 1) && enableFoolDay) {
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
  
};

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
  
  if (printRandomError) {
    generateRandomError();
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
    
    if (printRandomError) {
      generateRandomError();
    }
    
    
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
    if (tipElement) {
      tipElement.remove();
    }
    console.log('隐藏侧边栏：否');
  }
}

function checkVerticalView() {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  if (printRandomError) {
    generateRandomError();
  }
  
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
    hideSidebar('E');
    console.log('视口为竖屏：否')
    // sidebarElement.classList.remove('sidebarVertical');
    // mainElement.classList.remove('mainVertical');
  }
  
}

function isTodayDate(month, day) {
  const today = new Date();
  return today.getMonth() === month - 1 && today.getDate() === day;
}

function loadDirectLinkVerify() {
  const questionContent = document.getElementById('verifyQuestion');
  const index = getRandomInt(0, verifyQuestions.length - 1);
  
  if (questionContent) {
    questionContent.innerHTML = verifyQuestions[index];
    verifyAnswer = verifyAnswers[index];
  }
}

function robotVerify(thenDo) {
  const input = document.getElementById('verifyInput');
  const answer = verifyAnswer;
  const verifyFrom = document.getElementById('verifyFrom');
  const verifyFail = document.getElementById('verifyFail');
  const verifyFinish = document.getElementById('verifyFinish');
  
  if (printRandomError) {
    generateRandomError();
  }
  
  console.log('人机验证：答案：' + answer);
  if (input.value === answer) {
    thenDo();
    verifyFrom.remove();
    verifyFinish.classList.remove('hide');
    console.log('人机验证：通过');
  } else {
    input.value = '';
    verifyFail.classList.remove('hide');
    setTimeout(() => {
      verifyFail.classList.add('hide');
    }, 3000);
    console.log('人机验证：失败');
  }
}

function showDirectLink() {
  const FCLhtml = `
              <tr>
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11073320" target="_blank">https://vip.123pan.cn/1811746932/11073320</a>
                </td>
                <td>
                  1.2.1.9
                </td>
                <td>
                  all
                </td>
              </tr>
              <tr class="toggleRow" onclick="toggleHistory(this)">
                <td colspan="3">
                  <span class="toggleText">展开历史版本</span>
                </td>
              </tr>
              <tr class="historyRow">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11013197" target="_blank">https://vip.123pan.cn/1811746932/11013197</a>
                </td>
                <td>
                  1.2.1.8
                </td>
                <td>
                  all
                </td>
              </tr>
              <tr class="historyRow">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/10927783" target="_blank">https://vip.123pan.cn/1811746932/10927783</a>
                </td>
                <td>
                  1.2.1.7
                </td>
                <td>
                  arm64-v8a
                </td>
              </tr>
              <tr class="historyRow">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/10843347" target="_blank">https://vip.123pan.cn/1811746932/10843347</a>
                </td>
                <td>
                  1.2.1.6
                </td>
                <td>
                  arm64-v8a
                </td>
              </tr>
  `;
  const MGhtml = `
              <tr>
                <td>
                  <a href="https://vip.123pan.cn/1811746932/10962247" target="_blank">https://vip.123pan.cn/1811746932/10962247</a>
                </td>
                <td>
                  MobileGlues
                </td>
                <td>
                  1.2.3
                </td>
              </tr>
  `;
  const FCLcontent = document.getElementById('directLinkFCLcontent');
  const MGcontent = document.getElementById('directLinkMGcontent');
  
  FCLcontent.innerHTML = FCLhtml;
  MGcontent.innerHTML = MGhtml;
  
  console.log('下载直链：显示');
}

function generateRandomError() {
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  const errorMessage = errorMessages[randomIndex];
  
  console.error(errorMessage);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}