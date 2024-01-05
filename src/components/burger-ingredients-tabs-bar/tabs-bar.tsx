import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-bar.module.css';

export default function TabsBar({activeTab, setActiveTab, setScrollEnable}: {
    activeTab: string,
    setActiveTab: (value: string) => void
    setScrollEnable: (value: boolean) => void
}) {
    // "bun", "sauce" and "main" are the names of the tabs
    return (
        <div className={styles.tabs_bar}>
            <Tab value="bun" active={activeTab === "bun"} onClick={() => {
                setScrollEnable(false);
                setActiveTab("bun")
            }}>Булки</Tab>
            <Tab value="sauce" active={activeTab === "sauce"} onClick={() => {
                setScrollEnable(false);
                setActiveTab("sauce")
            }}>Соусы</Tab>
            <Tab value="main" active={activeTab === "main"} onClick={() => {
                setScrollEnable(false);
                setActiveTab("main")
            }}>Начинки</Tab>
        </div>
    );
}

