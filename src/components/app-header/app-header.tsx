import Bean from "./bean/bean";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

export default function AppHeader() {
    return (
        <header className={styles.header}>

            <div className={styles.choices}>
                <Bean Icon={<BurgerIcon type="primary"/>} route='/' text="Конструктор"/>
                <Bean Icon={<ListIcon type="primary"/>} route='/feed' text="Лента заказов"/>
            </div>
            <div className={styles.main_logo}><Logo/></div>
            <div className={styles.personal_account}>
                <Bean Icon={<ProfileIcon type="primary"/>} route='/profile' text="Личный кабинет"/>
            </div>

        </header>
    );
}