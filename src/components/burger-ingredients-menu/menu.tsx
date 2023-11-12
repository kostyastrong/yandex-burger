import styles from './menu.module.css';
import { useEffect, useRef, useState } from 'react';
import Component from "../burger-ingredients-component/component";
export default function Menu() {
    const bunRef = useRef<HTMLParagraphElement>(null);
    const sauceRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLParagraphElement>(null);
    const [scroll, setScroll] = useState('bun');

    useEffect(() => {
        if (scroll === 'bun') {
            bunRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        if (scroll === 'sauce') {
            sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        if (scroll === 'main') {
            mainRef.current!.scrollIntoView({ behavior: 'smooth' })
        }
    }, [scroll])

    return (
        <div className={styles.scroll} ref={scrollRef}>
            <div>
                <h3 className="text text_type_main-medium" ref={bunRef}>Булки</h3>
                <div className={styles.list}>
                    <Component text="bun"/>
                </div>
            </div>
            <div>
                <h3 className="text text_type_main-medium" ref={sauceRef}>Соусы</h3>
                <div className={styles.list}>
                    <Component text='sauce'/>
                </div>
            </div>
            <div>
                <h3 className="text text_type_main-medium">Начинки</h3>
                <div className={styles.list}>
                    <Component text='main' />
                </div>
            </div>
        </div>
    );
}