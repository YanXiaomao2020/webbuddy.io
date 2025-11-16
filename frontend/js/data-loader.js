// 数据加载模块 - 用于从前台加载后台管理的数据

// 数据存储键名
const STORAGE_KEYS = {
    CATEGORIES: 'webbuddy_categories',
    WEBSITES: 'webbuddy_websites',
    SETTINGS: 'webbuddy_settings',
    NOTES: 'webbuddy_notes'
};

// 数据加载类
class DataLoader {
    constructor() {
        this.categories = [];
        this.websites = [];
        this.settings = {};
        this.notes = [];
        this.loadData();
    }

    // 加载数据
    loadData() {
        try {
            this.categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || [];
            this.websites = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEBSITES)) || [];
            this.settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {};
            this.notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES)) || [];

            // 加载数据后应用设置
            setTimeout(() => {
                this.applySettings();
            }, 100);
        } catch (error) {
            console.error('加载数据失败:', error);
            // 如果加载数据失败，使用默认数据
            this.loadDefaultData();
            // 加载默认数据后应用设置
            setTimeout(() => {
                this.applySettings();
            }, 100);
        }
    }

    // 加载默认数据
    loadDefaultData() {
        this.categories = [
            { id: 1, name: '工作', icon: 'fas fa-briefcase' },
            { id: 2, name: '学习', icon: 'fas fa-graduation-cap' },
            { id: 3, name: '新闻', icon: 'fas fa-newspaper' },
            { id: 4, name: '娱乐', icon: 'fas fa-film' },
            { id: 5, name: '购物', icon: 'fas fa-shopping-cart' },
            { id: 6, name: '工具', icon: 'fas fa-tools' }
        ];

        this.websites = [
            { id: 1, name: 'GitHub', url: 'https://github.com', categoryId: 1, icon: 'fab fa-github' },
            { id: 2, name: 'Notion', url: 'https://notion.so', categoryId: 1, icon: 'fas fa-sticky-note' },
            { id: 3, name: 'Figma', url: 'https://figma.com', categoryId: 1, icon: 'fab fa-figma' },
            { id: 4, name: 'Slack', url: 'https://slack.com', categoryId: 1, icon: 'fab fa-slack' },
            { id: 5, name: 'Coursera', url: 'https://coursera.org', categoryId: 2, icon: 'fas fa-book-open' },
            { id: 6, name: 'Udemy', url: 'https://udemy.com', categoryId: 2, icon: 'fas fa-chalkboard-teacher' },
            { id: 7, name: 'Khan Academy', url: 'https://khanacademy.org', categoryId: 2, icon: 'fas fa-university' },
            { id: 8, name: 'Duolingo', url: 'https://duolingo.com', categoryId: 2, icon: 'fas fa-language' },
            { id: 9, name: 'Google News', url: 'https://news.google.com', categoryId: 3, icon: 'fab fa-google' },
            { id: 10, name: 'BBC News', url: 'https://bbc.com/news', categoryId: 3, icon: 'fas fa-globe' },
            { id: 11, name: 'Reuters', url: 'https://reuters.com', categoryId: 3, icon: 'fas fa-newspaper' },
            { id: 12, name: 'CNN', url: 'https://cnn.com', categoryId: 3, icon: 'fas fa-tv' },
            { id: 13, name: 'YouTube', url: 'https://youtube.com', categoryId: 4, icon: 'fab fa-youtube' },
            { id: 14, name: 'Netflix', url: 'https://netflix.com', categoryId: 4, icon: 'fas fa-film' },
            { id: 15, name: 'Spotify', url: 'https://spotify.com', categoryId: 4, icon: 'fab fa-spotify' },
            { id: 16, name: 'Twitch', url: 'https://twitch.tv', categoryId: 4, icon: 'fab fa-twitch' },
            { id: 17, name: 'Amazon', url: 'https://amazon.com', categoryId: 5, icon: 'fab fa-amazon' },
            { id: 18, name: 'eBay', url: 'https://ebay.com', categoryId: 5, icon: 'fab fa-ebay' },
            { id: 19, name: 'Taobao', url: 'https://taobao.com', categoryId: 5, icon: 'fas fa-shopping-bag' },
            { id: 20, name: 'JD', url: 'https://jd.com', categoryId: 5, icon: 'fas fa-shopping-cart' },
            { id: 21, name: 'Google Drive', url: 'https://drive.google.com', categoryId: 6, icon: 'fab fa-google-drive' },
            { id: 22, name: 'Dropbox', url: 'https://dropbox.com', categoryId: 6, icon: 'fab fa-dropbox' },
            { id: 23, name: 'Stack Overflow', url: 'https://stackoverflow.com', categoryId: 6, icon: 'fab fa-stack-overflow' }
        ];

        this.settings = {
            siteTitle: 'Webbuddy - 网站导航',
            siteDescription: '一个简洁高效的网站导航工具',
            siteKeywords: '网站导航,网址收藏,书签管理',
            primaryColor: '#0a0e27',
            accentColor: '#00ffff',
            backgroundStyle: 'particles'
        };
        
        this.notes = [
            {
                id: 1,
                title: '我的笔记',
                description: '记录学习与生活的点点滴滴',
                date: '2025-11-15',
                imageUrl: '../../Images/01.jpg'
            }
        ];
    }

    // 获取分类
    getCategories() {
        return this.categories;
    }

    // 获取网站
    getWebsites() {
        return this.websites;
    }

    // 获取设置
    getSettings() {
        return this.settings;
    }
    
    // 获取笔记
    getNotes() {
        return this.notes;
    }
    
    // 根据ID获取笔记
    getNoteById(id) {
        return this.notes.find(note => note.id === id);
    }

    // 根据分类ID获取网站
    getWebsitesByCategory(categoryId) {
        return this.websites.filter(website => website.categoryId === categoryId);
    }

    // 应用设置到页面
    applySettings() {
        if (this.settings.siteTitle) {
            document.title = this.settings.siteTitle;
        }

        if (this.settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', this.settings.primaryColor);
        }

        if (this.settings.accentColor) {
            document.documentElement.style.setProperty('--accent-color', this.settings.accentColor);
        }

        // 应用背景样式
        if (this.settings.backgroundStyle) {
            this.applyBackgroundStyle(this.settings.backgroundStyle);
        }
    }

    // 应用背景样式
    applyBackgroundStyle(style) {
        const particlesContainer = document.getElementById('particles');

        switch(style) {
            case 'particles':
                // 应用星空背景
                this.createStarryBackground();
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
                break;

            case 'gradient':
                // 应用渐变背景
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
                this.removeStarryBackground();
                document.body.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
                break;

            case 'solid':
                // 应用纯色背景
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
                this.removeStarryBackground();
                document.body.style.background = 'var(--primary-color)';
                break;

            case 'image':
                // 应用背景图片
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
                this.removeStarryBackground();
                if (this.settings.backgroundImage) {
                    document.body.style.background = `url(${this.settings.backgroundImage}) no-repeat center center fixed`;
                    document.body.style.backgroundSize = 'cover';
                } else {
                    // 如果没有设置背景图片，使用默认背景
                    document.body.style.background = '';
                }
                break;

            default:
                // 默认使用星空背景
                this.createStarryBackground();
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
                break;
        }
    }

    // 创建星空背景
    createStarryBackground() {
        // 移除可能存在的星空背景
        this.removeStarryBackground();

        // 设置深色背景
        document.body.style.background = 'linear-gradient(to bottom, #0a0e27 0%, #1a1e37 100%)';

        // 创建星空容器
        const starryContainer = document.createElement('div');
        starryContainer.className = 'starry-background';
        starryContainer.style.position = 'fixed';
        starryContainer.style.top = '0';
        starryContainer.style.left = '0';
        starryContainer.style.width = '100%';
        starryContainer.style.height = '100%';
        starryContainer.style.zIndex = '-1';
        starryContainer.style.pointerEvents = 'none';

        // 创建星星
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // 随机大小
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // 随机位置
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            star.style.position = 'absolute';
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;

            // 随机颜色和亮度
            const brightness = Math.random() * 0.8 + 0.2;
            const colors = ['#ffffff', '#ffffcc', '#ccccff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.backgroundColor = color;
            star.style.opacity = brightness;
            star.style.borderRadius = '50%';

            // 添加闪烁动画
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            star.style.animation = `twinkle ${duration}s ${delay}s infinite alternate`;

            starryContainer.appendChild(star);
        }

        // 添加闪烁动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // 将星空容器添加到页面
        document.body.appendChild(starryContainer);
    }

    // 移除星空背景
    removeStarryBackground() {
        const starryBackground = document.querySelector('.starry-background');
        if (starryBackground) {
            starryBackground.remove();
        }
    }

    // 渲染分类导航
    renderCategories() {
        const navList = document.querySelector('.nav-list');
        if (!navList) return;

        navList.innerHTML = '';

        this.categories.forEach((category, index) => {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            if (index === 0) navItem.classList.add('active');
            navItem.setAttribute('data-category', category.name);

            navItem.innerHTML = `
                <i class="${category.icon}"></i>
                <span>${category.name}</span>
            `;

            navList.appendChild(navItem);
        });
    }

    // 渲染分类和网站
    renderCategoriesAndWebsites() {
        const categoriesSection = document.querySelector('.categories');
        if (!categoriesSection) return;

        categoriesSection.innerHTML = '';

        this.categories.forEach((category, index) => {
            const categoryWebsites = this.getWebsitesByCategory(category.id);

            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.setAttribute('data-category', category.name);
            if (index !== 0) {
                categoryDiv.style.display = 'none';
            }

            categoryDiv.innerHTML = `
                <h2><i class="${category.icon}"></i> ${category.name}</h2>
                <div class="websites">
                    ${categoryWebsites.map(website => {
                        // 判断图标是Font Awesome类名还是URL链接
                        let iconElement;
                        if (website.icon && (website.icon.startsWith('http') || website.icon.startsWith('/') || website.icon.startsWith('../'))) {
                            // 如果是URL或路径，创建img元素
                            iconElement = `<img src="${website.icon}" alt="${website.name}" class="website-icon-img">`;
                        } else {
                            // 如果是Font Awesome类名，创建i元素
                            iconElement = `<i class="${website.icon}"></i>`;
                        }
                        
                        return `
                        <a href="${website.url}" target="_blank">
                            <div class="website">
                                ${iconElement}
                                <span>${website.name}</span>
                            </div>
                        </a>
                        `;
                    }).join('')}
                </div>
            `;

            categoriesSection.appendChild(categoryDiv);
        });
    }
    
    // 获取随机图片URL
    async getRandomImageUrl() {
        try {
            const response = await fetch('http://www.wudada.online/Api/ScTp');
            const data = await response.json();
            return data.data || '../../Images/01.jpg'; // 如果API返回data字段，使用它；否则使用默认图片
        } catch (error) {
            console.error('获取随机图片失败:', error);
            return '../../Images/01.jpg'; // 出错时使用默认图片
        }
    }

    // 渲染笔记按钮
    async renderNoteButtons() {
        const noteButtonContainer = document.querySelector('.note-button-container');
        if (!noteButtonContainer) return;
        
        // 清空容器
        noteButtonContainer.innerHTML = '';
        
        // 如果没有笔记数据，显示提示
        if (this.notes.length === 0) {
            noteButtonContainer.innerHTML = '<p class="no-notes">暂无笔记数据</p>';
            return;
        }
        
        // 渲染所有笔记
        for (let index = 0; index < this.notes.length; index++) {
            const note = this.notes[index];
            const noteButton = document.createElement('div');
            // 根据索引添加不同的类名
            noteButton.className = `note-button-wrapper ${index % 2 === 0 ? 'note-left' : 'note-right'}`;
            
            // 根据索引决定图片位置
            const imageFirst = index % 2 === 0;
            
            // 获取两个不同的随机图片URL，确保每个笔记的图片不同
            const imageUrl1 = await this.getRandomImageUrl();
            const imageUrl2 = await this.getRandomImageUrl();
            
            noteButton.innerHTML = `
                <a href="note/${note.id}.html" class="note-button">
                    ${imageFirst ? `
                    <div class="note-button-image">
                        <img src="${note.imageUrl || '../../Images/01.jpg'}" data-src="${imageUrl1}" alt="笔记图片" class="note-image-transition">
                    </div>
                    <div class="note-button-content">
                        <h3 class="note-button-title">${note.title}</h3>
                        <p class="note-button-desc">${note.description}</p>
                        <span class="note-button-date">${note.date}</span>
                    </div>` : `
                    <div class="note-button-content">
                        <h3 class="note-button-title">${note.title}</h3>
                        <p class="note-button-desc">${note.description}</p>
                        <span class="note-button-date">${note.date}</span>
                    </div>
                    <div class="note-button-image note-image-right">
                        <img src="${note.imageUrl || '../../Images/01.jpg'}" data-src="${imageUrl2}" alt="笔记图片" class="note-image-transition">
                    </div>`}
                </a>
            `;
            

            // 延迟加载随机图片，实现平滑过渡效果
            setTimeout(() => {
                const img = noteButton.querySelector('.note-image-transition');
                if (img) {
                    // 添加加载状态
                    img.classList.add('loading');
                    
                    // 创建新图片对象以预加载
                    const newImg = new Image();
                    newImg.onload = function() {
                        // 确保图片完全加载后再替换
                        setTimeout(() => {
                            img.src = img.getAttribute('data-src');
                        
                            // 移除加载状态
                            setTimeout(() => {
                                img.classList.remove('loading');
                            }, 100);
                        }, 200); // 添加额外延迟确保图片完全渲染
                    };
                    newImg.onerror = function() {
                        // 加载失败时，移除加载状态
                        img.classList.remove('loading');
                        console.error('笔记随机图片加载失败');
                    };
                    newImg.src = img.getAttribute('data-src');
                }
            }, 500 + (index * 200)); // 每个笔记图片延迟不同时间加载，创建瀑布效果

            noteButtonContainer.appendChild(noteButton);
        }
    }
}

// 创建数据加载器实例
const dataLoader = new DataLoader();

// 导出数据加载器
window.dataLoader = dataLoader;

// 页面加载完成后渲染数据
document.addEventListener('DOMContentLoaded', function() {
    dataLoader.renderCategories();
    dataLoader.renderCategoriesAndWebsites();
    dataLoader.renderNoteButtons();

    // 延迟应用设置，确保DOM完全加载
    setTimeout(() => {
        dataLoader.applySettings();
        
        // 触发数据渲染完成事件
        const event = new CustomEvent('dataRendered');
        document.dispatchEvent(event);
    }, 200);
});
