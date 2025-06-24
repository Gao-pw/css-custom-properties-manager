/**
 * CSS 自定义属性管理器
 * 支持动态修改全局或局部 CSS 变量
 * @author siroi
 */
class CSSCustomPropertiesManager {
    private targetElement: HTMLElement;

    /**
     * 构造函数
     * @param target 作用域元素（默认：文档根元素）
     */
    constructor(target?: HTMLElement) {
        this.targetElement = target || document.documentElement;
    }

    /**
     * 设置单个 CSS 自定义属性
     * @param propertyName 属性名（不带 -- 前缀）
     * @param value 属性值（包含单位，如 '10px'、'#fff'）
     */
    setProp(propertyName: string, value: string): void {
        if (!propertyName.startsWith('--')) {
            propertyName = `--${propertyName}`;
        }
        this.targetElement.style.setProperty(propertyName, value);
    }

    /**
     * 批量设置 CSS 自定义属性
     * @param properties 属性对象（键不带 -- 前缀）
     */
    setProps(properties: Record<string, string>): void {
        Object.entries(properties).forEach(([key, value]) => {
            this.setProp(key, value);
        });
    }

    /**
     * 获取 CSS 自定义属性值
     * @param propertyName 属性名（不带 -- 前缀）
     * @returns 属性值（字符串，无值时返回 null）
     */
    getProp(propertyName: string): string | null {
        if (!propertyName.startsWith('--')) {
            propertyName = `--${propertyName}`;
        }
        return getComputedStyle(this.targetElement).getPropertyValue(propertyName).trim();
    }

    /**
     * 删除 CSS 自定义属性
     * @param propertyName 属性名（不带 -- 前缀）
     */
    removeProp(propertyName: string): void {
        if (!propertyName.startsWith('--')) {
            propertyName = `--${propertyName}`;
        }
        this.targetElement.style.removeProperty(propertyName);
    }
}

export default CSSCustomPropertiesManager;
