import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from "react";
import styles from './tabs-bar.module.css';

export default function TabsBar({activeTab, setActiveTab}: {
    activeTab: string,
    setActiveTab: (value: string) => void
}) {
    // "bun", "sauce" and "main" are the names of the tabs
    return (
        <div className={styles.tabs_bar}>
            <Tab value="bun" active={activeTab === "bun"} onClick={() => setActiveTab("bun")}>Булки</Tab>
            <Tab value="sauce" active={activeTab === "sauce"} onClick={() => setActiveTab("sauce")}>Соусы</Tab>
            <Tab value="main" active={activeTab === "main"} onClick={() => setActiveTab("main")}>Начинки</Tab>
        </div>
    );
}