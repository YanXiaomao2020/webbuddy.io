
// 心灵鸡汤功能模块
class JitangModule {
    constructor() {
        // 获取DOM元素
        this.jitangContent = document.getElementById('jitangContent');
        this.jitangRefreshBtn = document.getElementById('jitangRefreshBtn');
        


        // 设置默认心灵鸡汤内容
        this.defaultJitangLog = '生活就像海洋，只有意志坚强的人才能到达彼岸。';

        // 尝试多个API地址，按速度排序
        this.API_URLS = [
            // 使用更可靠的代理服务
            'https://api.allorigins.win/raw?url=https://api.52vmy.cn/api/wl/yan/du',
            'https://corsproxy.io/?https://api.52vmy.cn/api/wl/yan/du',
            // 备用API
            'https://api.xygeng.cn/open/one',
            'https://v1.jinrishici.com/rensheng.json'
        ];

        // 检查DOM元素是否存在
        if (this.jitangContent && this.jitangRefreshBtn) {
            this.init();
        } else {
            // 延迟初始化，等待DOM加载完成
            setTimeout(() => {
                this.jitangContent = document.getElementById('jitangContent');
                this.jitangRefreshBtn = document.getElementById('jitangRefreshBtn');
                if (this.jitangContent && this.jitangRefreshBtn) {
                    this.init();
                }
            }, 1000);
        }
    }

    // 初始化心灵鸡汤功能
    init() {
        // 设置默认内容
        this.jitangContent.textContent = this.defaultJitangLog;

        // 点击刷新按钮获取新的心灵鸡汤
        this.jitangRefreshBtn.addEventListener('click', (e) => {
            
            // 添加旋转动画效果
            this.jitangRefreshBtn.querySelector('i').classList.add('fa-spin');

            // 获取新的心灵鸡汤
            this.fetchJitangLog().finally(() => {
                // 移除旋转动画效果
                this.jitangRefreshBtn.querySelector('i').classList.remove('fa-spin');
            });
        });
        
        // 添加一个备用点击事件监听器，以防第一个失效
        this.jitangRefreshBtn.onclick = (e) => {
            
            // 添加旋转动画效果
            this.jitangRefreshBtn.querySelector('i').classList.add('fa-spin');

            // 获取新的心灵鸡汤
            this.fetchJitangLog().finally(() => {
                // 移除旋转动画效果
                this.jitangRefreshBtn.querySelector('i').classList.remove('fa-spin');
            });
        };

        // 延迟1秒后自动获取一个心灵鸡汤，减少等待时间
        setTimeout(() => {
            this.fetchJitangLog();
        }, 1000);
    }

    // 获取随机心灵鸡汤
    async fetchJitangLog(apiIndex = 0) {
        try {
            // 显示加载中状态
            this.jitangContent.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在获取心灵鸡汤...';

            // 如果所有API都尝试失败
            if (apiIndex >= this.API_URLS.length) {
                throw new Error('所有API都无法访问');
            }

            // 添加时间戳防止缓存
            const timestamp = new Date().getTime();
            let apiUrl;

            // 根据不同的API类型构建URL
            if (apiIndex === 0) {
                // 对于allorigins代理
                const originalApi = `https://api.52vmy.cn/api/wl/yan/du?t=${timestamp}`;
                apiUrl = `${this.API_URLS[apiIndex]}?url=${encodeURIComponent(originalApi)}`;
            } else if (apiIndex === 1) {
                // 对于corsproxy.io代理
                const originalApi = `https://api.52vmy.cn/api/wl/yan/du?t=${timestamp}`;
                apiUrl = `${this.API_URLS[apiIndex]}${encodeURIComponent(originalApi)}`;
            } else {
                // 对于其他API，直接添加时间戳
                apiUrl = `${this.API_URLS[apiIndex]}?t=${timestamp}`;
            }

            // 设置请求超时
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

            // 发送GET请求
            const response = await fetch(apiUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`网络请求失败 (${response.status})`);
            }

            // 解析JSON数据
            const data = await response.json();

            // 显示心灵鸡汤内容
            let content = '';
            
            if (data) {
                // 尝试不同的数据结构
                if (data.content) {
                    content = data.content;
                } else if (data.text) {
                    content = data.text;
                } else if (data.data && data.data.content) {
                    content = data.data.content;
                } else if (data.data && data.data.text) {
                    content = data.data.text;
                } else if (data.ishot) {
                    // 针对52vmy.cn API的特殊处理
                    content = data.ishot;
                } else if (data.sentence) {
                    // 针对诗词API的特殊处理
                    content = data.sentence;
                } else if (data.origin) {
                    // 针对诗词API的出处信息
                    content = data.origin;
                } else if (typeof data === 'string') {
                    content = data;
                } else {
                    // 如果是最后一个API，尝试将整个对象转为字符串
                    
                    // 如果是最后一个API，尝试将整个对象转为字符串
                    if (apiIndex === this.API_URLS.length - 1) {
                        content = JSON.stringify(data);
                    } else {
                        throw new Error('无法解析API返回的数据');
                    }
                }

                this.jitangContent.textContent = content;
            } else {
                throw new Error('API返回了空数据');
            }
        } catch (error) {
            // 尝试下一个API
            if (apiIndex < this.API_URLS.length - 1) {
                return this.fetchJitangLog(apiIndex + 1);
            } else {
                // 所有API都失败，使用默认内容
                this.jitangContent.textContent = this.defaultJitangLog;
            }
        }
    }
}

// 将类暴露到全局作用域
window.JitangModule = JitangModule;

