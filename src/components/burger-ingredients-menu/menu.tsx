import styles from './menu.module.css';
import {useEffect, useRef} from 'react';
import Component from "../burger-ingredients-component/component";
import {Ingredient} from "../utlis/types";

export default function Menu({ingredients, activeTab, setActiveTab}: {
    ingredients: Ingredient[],
    activeTab: string,
    setActiveTab: (value: string) => void
}) {
    const bunRef = useRef<HTMLParagraphElement>(null);
    const sauceRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeTab === 'bun') {
            bunRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        if (activeTab === 'sauce') {
            sauceRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        if (activeTab === 'main') {
            mainRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [activeTab])

    useEffect(() => {
        const options = {
            root: rootRef.current,
            rootMargin: '0% 0% -620px 0%',
            target: 1
        };


        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const { target } = entry;

                    if (target === bunRef.current && activeTab !== "bun") {
                        setActiveTab("bun");
                    } else if (target === sauceRef.current && activeTab !== "sauce") {
                        setActiveTab("sauce");
                    } else if (target === mainRef.current && activeTab !== "main") {
                        setActiveTab("main");
                    }
                }
            });
        }, options);

        if (bunRef.current) {
            observer.observe(bunRef.current);
        }
        if (sauceRef.current) {
            observer.observe(sauceRef.current);
        }
        if (mainRef.current) {
            observer.observe(mainRef.current);
        }

        return () => {
            if (bunRef.current) {
                observer.unobserve(bunRef.current);
            }
            if (sauceRef.current) {
                observer.unobserve(sauceRef.current);
            }
            if (mainRef.current) {
                observer.unobserve(mainRef.current);
            }
        };
    }, [activeTab]);

    return (
        <div className={styles.scroll} ref={rootRef}>
            <div>
                <h3 className="text text_type_main-medium" ref={bunRef}>Булки</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient: Ingredient) => ingredient.type === 'bun')
                        .map((ingredient: Ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                </div>
            </div>
            <div>
                <h3 className="text text_type_main-medium" ref={sauceRef}>Соусы</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient: Ingredient) => ingredient.type === 'sauce')
                        .map((ingredient: Ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                </div>
            </div>
            <div>
                <h3 className="text text_type_main-medium" ref={mainRef}>Начинки</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient: Ingredient) => ingredient.type === 'main')
                        .map((ingredient: Ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}