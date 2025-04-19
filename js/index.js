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

const verifyQuestions = [
  // 首页（5个）
  '在 <a href="./index.html" target="_blank">首页</a> → 为什么选择FCL？ → 开源 的板块中，<mark>第 5 个字符</mark>是什么？',
  '在 <a href="./index.html" target="_blank">首页</a> → 为什么选择FCL？ → 可在启动器内下载游戏资源 的板块中，<mark>第 2 个字符</mark>是什么？',
  '在 <a href="./index.html" target="_blank">首页</a> → 为什么选择FCL？ → 强大的控制布局系统 的板块中，<mark>第 4 个字符</mark>是什么？',
  '在 <a href="./index.html" target="_blank">首页</a> → 侧边栏 → 页面信息 → 创建时间 → 2025年3月?日2时38分 中，<mark>问号</mark>是多少？',
  '在 <a href="./index.html" target="_blank">首页</a> → 展示的启动器截图 → 玩家名称 中，<mark>第 2 个字符</mark>是什么？',
  
  // 下载页面（1个）
  '在 <a href="./down.html" target="_blank">下载</a>页面 → 侧边栏 → 页面信息 → 创建时间 → 2025年3月20日2时?分 中，<mark>问号</mark>是多少？',
  
  // 文档页面（1个）
  '在 <a href="./docs.html" target="_blank">文档</a>页面 → 侧边栏 → 页面信息 → 创建时间 → 2025年3月24日?时06分 中，<mark>问号</mark>是多少？',
  
  // 关于页面（2个）
  '在 <a href="./about.html" target="_blank">关于</a>页面 中，<mark>晚梦的头像图片大小</mark>是多少？（单位：MiB，不需要输入单位）',
  '在 <a href="./about.html" target="_blank">关于</a>页面 中，<mark>洛狐的头像图片大小</mark>是多少？（单位：MiB，不需要输入单位）',
  
  // 所有元素页面（3个）
  '在 <a href="./page/debug/elements.html" target="_blank">所有元素</a>页面 → 行级类 的板块中，有几个<mark>无序列表项</mark>？（包括嵌套）',
  '在 <a href="./page/debug/elements.html" target="_blank">所有元素</a>页面 → 函数类 的板块中，有几个<mark>函数按钮</mark>？',
  '在 <a href="./page/debug/elements.html" target="_blank">所有元素</a>页面 → 侧边栏 → 页面信息 → 你发现了一串神秘的字符 中，<mark>第 3 个到 第 4 个字符</mark>是什么？'
];

const verifyAnswers = [
  '在', // 开源板块字符
  '了', // 可在启动器内下载游戏资源板块字符
  '者', // 强大的控制布局系统板块字符
  '19', // 首页创建日
  'L', // 玩家名第二字符
  
  '42', // 下载页面创建分
  
  '20', // 文档页面创建时
  
  '1.4', // 晚梦头像
  '2.3', // 洛狐头像
  
  '8', // 无序列表项
  '5', // 函数按钮
  'D6' // 神秘字符
];

// ----------------------------------------------------------------------------------------------------

let verifyAnswer = undefined;
// 人机验证的答案
let deviceArch = 'all';
// 设备架构

// ----------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  if (typeof eruda !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.search.includes('debug'))) {
    eruda.init();
    console.warn('Eruda：启用');
  }
  
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
  
  (async () => {
    const dataOsVer = document.querySelector('[data-os-ver]');
    const dataDeviceArch = document.querySelector('[data-device-arch]');
    
    if (!dataOsVer || !dataDeviceArch) {
      console.warn('获取设备信息：找不到展示元素');
      return;
    }
    
    try {
      const deviceChecker = await import('/js/device-checker.js');
      
      try {
        const deviceInfo = await deviceChecker.check();
        
        dataOsVer.textContent = deviceInfo.osVer ?? '未知';
        dataDeviceArch.textContent = deviceInfo.arch ?? '未知';
        
        deviceArch = deviceInfo.arch;
        archHighlight(deviceArch);
        
        console.log('获取设备信息：', deviceInfo);
        
      } catch (checkError) {
        console.error('获取设备信息：', checkError);
        
        switch (checkError.message) {
          case 'cannot-get-ua':
            dataOsVer.textContent = '获取失败：';
            dataDeviceArch.textContent = '无法读取User-Agent';
            break;
            
          default:
            dataOsVer.textContent = '获取失败：';
            dataDeviceArch.textContent = '未知错误';
            break;
        }
      }
      
    } catch (importError) {
      console.error('设备信息模块加载：', importError);
      
      dataOsVer.textContent = '模块异常：';
      dataDeviceArch.textContent = importError.message.includes('Failed to fetch') ?
        '设备检测模块缺失' :
        '模块加载错误';
    }
  })();
  
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
    foolDay();
    console.log('愚人节：是');
  } else {
    console.log('愚人节：否');
  }
  
  console.log('window.onload：完成');
  
};

/**
 * 加载侧边栏
 */
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

/**
 * 隐藏那些（哪些啊（悲））提示
 * @param {string} tip - 隐藏的提示
 */
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

/**
 * 展开/收起侧边栏
 * @param {string|boolean} isExpand - 控制侧边栏展开/收起的标志
 */
function expandSidebar(isExpand) {
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const expandButton = document.getElementById('expandSidebar');
  const hideButton = document.getElementById('hideSidebar');
  const contractButton = document.getElementById('contractSidebar');
  if (isExpand) {
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

/**
 * 隐藏/显示侧边栏
 * @param {string|boolean} isHide - 控制侧边栏显示/隐藏的标志
 */
function hideSidebar(isHide) {
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const tipHtml = '<meta charset="UTF-8"><div class="diagonal window" id="sidebarHideTip"><div class="windowTitle"><span>侧边栏已隐藏</span></div><button onclick="hideSidebar(false)" id="showSidebar">显示侧边栏</button></div>'
  const tipElement = document.getElementById('sidebarHideTip');
  if (isHide) {
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

/**
 * 判断视口是否为竖屏
 */
function checkVerticalView() {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  if (printRandomError) {
    generateRandomError();
  }
  
  const sidebarElement = document.querySelector('.sidebar');
  const mainElement = document.querySelector('.main');
  const sidebarContainer = document.getElementById('sidebar');
  const tipHTML = '<meta charset="UTF-8"><div class="diagonal window" id="verticalTip"><div class="windowTitle"><span>视口宽度小于视口高度</span></div><p>视口高度较小，可能会导致侧边栏显示不全或异常。<br><button onclick="expandSidebar(true)" id="expandSidebar">展开侧边栏</button> <button onclick="expandSidebar(false)" id="contractSidebar" style="display: none">收起侧边栏</button><button onclick="hideSidebar(true)" id="hideSidebar">隐藏侧边栏</button> <button onclick="hideSidebar(false)" id="showSidebar" style="display: none">显示侧边栏</button></p></div>'
  
  console.log('视口高：' + viewportHeight);
  console.log('视口宽：' + viewportWidth);
  if (viewportHeight > viewportWidth) {
    sidebarContainer.insertAdjacentHTML('beforeend', tipHTML);
    hideSidebar(true);
    console.log('视口为竖屏：是')
    // sidebarElement.classList.add('sidebarVertical');
    // mainElement.classList.add('mainVertical');
  } else {
    const tipElement = document.getElementById('verticalTip');
    if (tipElement) {
      tipElement.style.display = 'none';
    }
    hideSidebar(false);
    console.log('视口为竖屏：否')
    // sidebarElement.classList.remove('sidebarVertical');
    // mainElement.classList.remove('mainVertical');
  }
  
}

/**
 * 检查给定的月份和日期是否为今天
 * @param {number} month - 要比较的月份(1-12)
 * @param {number} day - 要比较的日期(1-31)
 * @returns {boolean} 如果日期匹配今天则返回true，否则返回false
 */
function isTodayDate(month, day) {
  const today = new Date();
  return today.getMonth() === month - 1 && today.getDate() === day;
}

/**
 * 愚人节
 */
function foolDay() {
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
}

/**
 * 加载人机验证的随机问题和答案
 */
function loadDirectLinkVerify() {
  const questionContent = document.getElementById('verifyQuestion');
  const index = getRandomInt(0, verifyQuestions.length - 1);
  
  if (questionContent) {
    questionContent.innerHTML = verifyQuestions[index];
    verifyAnswer = verifyAnswers[index];
  }
}

/**
 * 执行人机验证并处理验证结果
 * @param {Function} thenDo 验证通过后要执行的回调函数
 */
function robotVerify(thenDo) {
  const input = document.getElementById('verifyInput');
  const answer = verifyAnswer;
  const verifyFrom = document.getElementById('verifyFrom');
  const verifyFail = document.getElementById('verifyFail');
  const verifyFinish = document.getElementById('verifyFinish');
  
  if (printRandomError) {
    generateRandomError();
  }
  
  console.log('人机验证：答案：114514');
  if (input.value === answer) {
    thenDo();
    input.value = '';
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

/**
 * 显示下载页面的直链
 */
function showDirectLink() {
  const FCLhtml = `
              <tr class="all">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11192515" target="_blank">https://vip.123pan.cn/1811746932/11192515</a>
                </td>
                <td>
                  1.2.2.1
                </td>
                <td>
                  all
                </td>
              </tr>
              <tr>
                <td colepan="3">
                  如果您有条件，可以考虑<a href="/support.html target="_blank">赞助一下站长</a>
                </td>
              </tr>
              <tr class="toggleRow" onclick="toggleHistory(this)">
                <td colspan="3">
                  <span class="toggleText">展开历史版本</span>
                </td>
              </tr>
              <tr class="historyRow all">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11158575" target="_blank">https://vip.123pan.cn/1811746932/11158575</a>
                </td>
                <td>
                  1.2.2.0
                </td>
                <td>
                  all
                </td>
              </tr>
              <tr class="historyRow arm64-v8a">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11165175" target="_blank">https://vip.123pan.cn/1811746932/11165175</a>
                </td>
                <td>
                  1.2.2.0
                </td>
                <td>
                  arm64-v8a
                </td>
              </tr>
              <tr class="historyRow armeabi-v7a">
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11165178" target="_blank">https://vip.123pan.cn/1811746932/11165178</a>
                </td>
                <td>
                  1.2.2.0
                </td>
                <td>
                  armeabi-v7a
                </td>
              </tr>
              <tr class="all historyRow">
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
              <tr class="historyRow all">
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
              <tr class="historyRow arm64-v8a">
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
              <tr class="historyRow arm64-v8a">
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
                <td colepan="3">
                  如果您有条件，可以考虑<a href="/support.html target="_blank">赞助一下站长</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="https://vip.123pan.cn/1811746932/11150892" target="_blank">https://vip.123pan.cn/1811746932/11150892</a>
                </td>
                <td>
                  MobileGlues
                </td>
                <td>
                  1.2.4
                </td>
              </tr>
              <tr class="toggleRow" onclick="toggleHistory(this)">
                <td colspan="3">
                  <span class="toggleText">展开历史版本</span>
                </td>
              </tr>
              <tr class="historyRow">
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
  
  if (FCLcontent && MGcontent) {
    FCLcontent.innerHTML = FCLhtml;
    MGcontent.innerHTML = MGhtml;
  }
  
  archHighlight(deviceArch);
  
  console.log('下载直链：显示');
}

/**
 * 在控制台中打印一个随机错误消息
 */
function generateRandomError() {
  const randomIndex = Math.floor(Math.random() * errorMessages.length);
  const errorMessage = errorMessages[randomIndex];
  
  console.error(errorMessage);
}

/**
 * 获取指定范围内的随机整数（包含最小值和最大值）
 * @param {number} min - 随机数范围的最小值
 * @param {number} max - 随机数范围的最大值
 * @returns {number} 返回一个在 min 和 max 之间的随机整数（包含 min 和 max）
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 获取 DOM 元素文本内容中的第 N 个字符
 * @param {HTMLElement} element - 目标 DOM 元素
 * @param {number} n - 要获取的字符位置（从 1 开始计数）
 * @returns {string} 第 N 个字符，如果不存在则返回空字符串
 */
function getNthCharacter(element, n) {
  if (!(element instanceof HTMLElement)) {
    console.warn('Invalid DOM element');
    return '';
  }
  
  if (typeof n !== 'number' || n < 1 || !Number.isInteger(n)) {
    console.warn('Position must be a positive integer');
    return '';
  }
  
  const text = element.textContent || '';
  
  const characters = Array.from(text);
  
  if (n > characters.length) {
    console.warn(`Position ${n} exceeds text length (${characters.length})`);
    return '';
  }
  
  return characters[n - 1];
}

/**
 * 架构高亮
 */
function archHighlight(archInfo) {
  const arch = archInfo.replace(/\s*\([^)]*\)/g, '');
  console.log('架构高亮：' + arch);
  addClassToElements(arch, 'highlightArch');
}

/**
 * 将第二个类添加至所有包含第一个类的DOM元素
 * @param {string} firstClass 需要查找的目标类名
 * @param {string} secondClass 需要添加的新类名
 * @example
 * // 给所有包含'old-class'的元素添加'new-class'
 * addClassToElements('old-class', 'new-class');
 */
function addClassToElements(firstClass, secondClass) {
  const elements = document.querySelectorAll(
    `.${CSS.escape(firstClass)}`
  );
  
  elements.forEach(element => {
    element.classList.add(secondClass);
  });
}