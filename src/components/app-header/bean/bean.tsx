import {ReactNode} from "react";
import {NavLink} from "react-router-dom";
import styles from '../app-header.module.css';

export default function Bean({Icon, text, route}: { Icon: ReactNode, text: string, route: string }) {
    return (
        <section className={styles.link}>
            {Icon}
            <span>{text}</span>
        </section>
    );
}