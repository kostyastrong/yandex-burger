import styles from './menu.module.css';
import {useEffect, useRef, useState} from 'react';
import Component from "../burger-ingredients-component/component";
import {Ingredient} from "../../utils/types";

export default function Menu({ingredients, activeTab, setActiveTab, scroll, setScroll}: {
    ingredients: Ingredient[],
    activeTab: string,
    scroll: boolean,
    setActiveTab: (value: string) => void,
    setScroll: (value: boolean) => void,
}) {
    const bunRef = useRef<HTMLParagraphElement>(null);
    const sauceRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLParagraphElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const [modalIndex, setModalIndex] = useState("undefined");

    useEffect(() => {
        if (!scroll) {  // for smoother behaviour, useEffect doesn't work when buttons in the tabBar weren't pushed
            if (activeTab === 'bun') {
                bunRef.current?.scrollIntoView({behavior: 'smooth'})
            }
            if (activeTab === 'sauce') {
                sauceRef.current?.scrollIntoView({behavior: 'smooth'})
            }
            if (activeTab === 'main') {
                mainRef.current?.scrollIntoView({behavior: 'smooth'})
            }
        }
    }, [activeTab, scroll])

    useEffect(() => {
        const options = {
            root: rootRef.current,
            rootMargin: '0% 0% -600px 0%',
            target: 1
        };


        // observer tracks upper small part of menu component to intersect with heading
        // if heading is placed fully in this part, observer changes state of activeTab
        // without timeout it cannot change state because previous useEffect with "ScrollIntoView"
        // is set to "smooth" behaviour, it takes time to make current heading out of toggle area.
        // If it was instantaneous, it wouldn't need timeout
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && scroll) {
                    const {target} = entry;

                    if (target === bunRef.current && activeTab !== "bun") {
                        setActiveTab("bun");
                    } else if (target === sauceRef.current && activeTab !== "sauce") {
                        setActiveTab("sauce");
                    } else if (target === mainRef.current && activeTab !== "main") {
                        setActiveTab("main");
                    }
                } else if (entry.isIntersecting) {
                    const delay = (ms: number) => new Promise(
                        resolve => setTimeout(resolve, ms)
                    );
                    const setDelayedScroll = async () => {
                        await delay(200);
                        console.log('200ms passed');
                        setScroll(true);
                    };
                    setDelayedScroll();
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
    }, [activeTab, scroll]);

    return (
        <div className={styles.scroll} ref={rootRef}>
            <section>
                <h3 className="text text_type_main-medium" ref={bunRef}>Булки</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'bun')
                        .map((ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                                setShowModal={(value: string) => setModalIndex(value)}
                                showModal={modalIndex}
                            />
                        ))}
                </div>
            </section>
            <section>
                <h3 className="text text_type_main-medium" ref={sauceRef}>Соусы</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'sauce')
                        .map((ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                                setShowModal={(value: string) => setModalIndex(value)}
                                showModal={modalIndex}
                            />
                        ))}
                </div>
            </section>
            <section>
                <h3 className="text text_type_main-medium" ref={mainRef}>Начинки</h3>
                <div className={styles.list}>
                    {ingredients
                        .filter((ingredient) => ingredient.type === 'main')
                        .map((ingredient) => (
                            <Component
                                ingredient={ingredient}
                                key={ingredient._id}
                                setShowModal={(value: string) => setModalIndex(value)}
                                showModal={modalIndex}
                            />
                        ))}
                </div>
            </section>
        </div>
    );
}