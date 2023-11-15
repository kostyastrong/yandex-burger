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
        const handleScroll = () => {
            const scrollElement = rootRef.current;
            if (!scrollElement) {
                return;
            }
            const { scrollTop } = scrollElement;
            const bunSectionTop = bunRef.current?.offsetTop || 0;
            const sauceSectionTop = sauceRef.current?.offsetTop || 0;

            if (scrollTop < bunSectionTop && activeTab !== 'bun') {
                setActiveTab('bun');
            } else if (scrollTop >= bunSectionTop && scrollTop < sauceSectionTop && activeTab !== 'sauce') {
                setActiveTab('sauce');
            } else if (scrollTop >= sauceSectionTop && activeTab !== 'main') {
                setActiveTab('main');
            }
        };

        const scrollElement = rootRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [activeTab, setActiveTab]);

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