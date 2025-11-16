
// 主入口文件 - 负责初始化所有模块
import { SearchModule } from './modules/search.js';
import { ThemeModule } from './modules/theme.js';
import { ActivityModule } from './modules/activity.js';
import { NotificationModule } from './modules/notification.js';
import { ParticlesModule } from './modules/particles.js';
import { NavigationModule } from './modules/navigation.js';
import { MascotModule } from './modules/mascot.js';
import { FontSettingsModule } from './modules/fontSettings.js';
import { ChatModule } from './modules/chat.js';
import { HistoryModule } from './modules/history.js';
// TiangouModule已在HTML中作为模块加载
// ThemeToggleModule已删除，因为前台没有主题切换按钮

// 应用程序主类
class App {
    constructor() {
        this.modules = {};
        this.init();
    }

    // 初始化应用程序
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
    }

    // 初始化所有模块
    initModules() {
        // 初始化各个模块
        this.modules.search = new SearchModule();
        this.modules.theme = new ThemeModule();
        this.modules.activity = new ActivityModule();
        this.modules.notification = new NotificationModule();
        this.modules.particles = new ParticlesModule();
        this.modules.navigation = new NavigationModule();
        this.modules.mascot = new MascotModule();
        this.modules.chat = new ChatModule();
        this.modules.history = new HistoryModule();
        this.modules.fontSettings = new FontSettingsModule();

        // 确保在所有模块初始化后再初始化tiangou模块
        setTimeout(() => {
            if (window.JitangModule) {
                this.modules.jitang = new window.JitangModule();
            }
        }, 500);

        // 将模块暴露到全局作用域，以便其他脚本可以访问
        window.searchModule = this.modules.search;
        window.notificationModule = this.modules.notification;

        // 添加后台管理按钮点击事件
        const adminBtn = document.getElementById('adminBtn');
        if (adminBtn) {
            adminBtn.addEventListener('click', function() {
                // 跳转到后台登录页面
                window.location.href = '../admin/login.html';
            });
        }

        // 更新统计数据
        this.updateStats();
    }

    // 更新统计数据
    updateStats() {
        // 从dataLoader获取数据
        const categories = window.dataLoader ? window.dataLoader.getCategories() : [];
        const websites = window.dataLoader ? window.dataLoader.getWebsites() : [];
        const notes = window.dataLoader ? window.dataLoader.getNotes() : [];

        // 更新统计显示
        const totalCategoriesEl = document.getElementById('totalCategories');
        const totalWebsitesEl = document.getElementById('totalWebsites');
        const totalNotesEl = document.getElementById('totalNotes');
        const totalFavoritesEl = document.getElementById('totalFavorites');

        if (totalCategoriesEl) totalCategoriesEl.textContent = categories.length;
        if (totalWebsitesEl) totalWebsitesEl.textContent = websites.length;
        if (totalNotesEl) totalNotesEl.textContent = notes.length;
        // 注意：totalFavoritesEl 没有在原始代码中使用，这里保留但不设置
    }
}

// 创建应用程序实例
const app = new App();
