import { useEffect, useRef, useState } from 'react';
import '../App.css';

function SlideContent() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFinalSlide, setIsFinalSlide] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const slidesRef = useRef([]);
    const floatingShapesRef = useRef(null);
    const creativeBtnRef = useRef(null);
    const autoSlideIntervalRef = useRef(null);

    const slideDuration = 4000;

    const slideContent = [
        { id: 1, icon: "🌙", title: "في هدوء اللحظة", subtitle: "بعض الأرواح تقدر تزرع سكينة في قلبك من غير ولا كلمة.. بس وجودها كفاية" },
        { id: 2, icon: "🤏", title: "تفاصيل صغيرة", subtitle: "نظرة عابرة، ابتسامة من بعيد.. أوقات بتكون أبسط اللحظات هي أكتر حاجة بتعيش جوانا" },
        { id: 3, icon: "🔖", title: "مش كل الكلام بيتقال", subtitle: "في حاجات بنحسها من غير ما نعرف نوصفها، بس بنكون متأكدين إنها حقيقية" },
        { id: 4, icon: "🪐", title: "مكان مألوف", subtitle: "في ناس أول ما تقرب منهم، تحس إنك رجعت بيتك من غير ما تكون روّحت" },
        { id: 5, icon: "🎶", title: "صوت معين", subtitle: "في صوت لما تسمعه، قلبك يرتاح كأنك كنت تايه ولقيت نفسك" },
        { id: 6, icon: "👀", title: "لحظة سكون", subtitle: "في نظرات بتقول أكتر من ألف كلمة، ولو ركزت شوية، هتفهم كل حاجة" },
        { id: 7, icon: "🌻", title: "الأمان", subtitle: "مش دايمًا المكان هو اللي يديك إحساس الأمان.. أحيانًا بيكون شخص" },
        { id: 8, icon: "💫", title: "لحظة سحرية", subtitle: "في لحظات معينة، مجرد وجود معين، بينسيك الدنيا كلها" },
        { id: 9, icon: "🍃", title: "حضور خفيف", subtitle: "مش لازم يفضل يتكلم، وجوده بس بيخلي كل حاجة حوالينك أهدى وأجمل" },
        { id: 10, icon: "💡", title: "شعور متناقض", subtitle: "أحيانًا لما شخص مش بيكون حواليك، بتحس إن الدنيا ناقصة حاجة.. رغم إنك مش عارف تقول إيه بالظبط" },
    ];

    const createFloatingShapes = () => {
        const shapeTypes = ['shape-circle', 'shape-triangle'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

            Object.assign(shape.style, {
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                left: `${Math.random() * window.innerWidth}px`,
                top: `${Math.random() * window.innerHeight + window.innerHeight}px`,
                animationDuration: `${Math.random() * 30 + 20}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: (Math.random() * 0.1 + 0.05).toString()
            });

            shape.className = `shape ${shapeType}`;
            fragment.appendChild(shape);
        }

        if (floatingShapesRef.current) {
            floatingShapesRef.current.innerHTML = '';
            floatingShapesRef.current.appendChild(fragment);
        }
    };

    const createSparkles = (element, count) => {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            Object.assign(sparkle.style, {
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
            });
            sparkle.className = 'sparkle';
            fragment.appendChild(sparkle);
        }

        if (element) {
            element.innerHTML = '';
            element.appendChild(fragment);
        }
    };

    const createHeartBubbles = () => {
        if (!document.getElementById('floatUpKeyframes')) {
            const style = document.createElement('style');
            style.id = 'floatUpKeyframes';
            style.textContent = `
                @keyframes floatUp {
                    0% { transform: translateX(-50%) translateY(0) scale(0.5); opacity: 0.3; }
                    50% { transform: translateX(-50%) translateY(-50vh) scale(1); opacity: 1; }
                    100% { transform: translateX(-50%) translateY(-100vh) scale(0.5); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        const bubbleContainer = document.createElement('div');
        bubbleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(bubbleContainer);

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💛';
                const startX = Math.random() * 100;
                const size = Math.random() * 30 + 20;
                const duration = Math.random() * 6 + 4;
                const delay = Math.random() * 2;
                const opacity = Math.random() * 0.7 + 0.3;

                heart.style.cssText = `
                    position: absolute;
                    bottom: -50px;
                    left: ${startX}%;
                    font-size: ${size}px;
                    opacity: ${opacity};
                    transform: translateX(-50%);
                    animation: floatUp ${duration}s ease-in ${delay}s forwards;
                `;

                bubbleContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, (duration + delay) * 1000);
            }, i * 200);
        }

        setTimeout(() => {
            bubbleContainer.remove();
        }, 30 * 200 + 6000);
    };

    const showSlide = (n) => {
        const totalSlides = slideContent.length + 1;
        let nextSlideIdx = n;

        if (nextSlideIdx < 0) {
            nextSlideIdx = totalSlides - 1;
        } else if (nextSlideIdx >= totalSlides) {
            nextSlideIdx = 0;
        }

        if (nextSlideIdx === totalSlides - 1 && !isFinalSlide) {
            setIsFinalSlide(true);
            clearInterval(autoSlideIntervalRef.current);
        }

        const currentActive = slidesRef.current[currentSlideIndex];
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.classList.add('exiting');

            setTimeout(() => {
                currentActive.classList.remove('exiting');
            }, 1000); // Match this with the CSS transition duration
        }

        setCurrentSlideIndex(nextSlideIdx);

        setTimeout(() => {
            const nextSlideElement = slidesRef.current[nextSlideIdx];
            if (nextSlideElement) {
                // First apply entering state without transition
                nextSlideElement.classList.add('entering');
                void nextSlideElement.offsetWidth; // Force reflow

                // Then activate with transition
                nextSlideElement.classList.remove('entering');
                nextSlideElement.classList.add('active');

                // Add slight delay for smoother entry
                setTimeout(() => {
                    nextSlideElement.style.transition =
                        'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out';
                }, 50);
            }
        }, 500);
    };

    const nextSlide = () => {
        if (!isFinalSlide || currentSlideIndex < slideContent.length) {
            showSlide(currentSlideIndex + 1);
        }
    };

    const startAutoSlide = () => {
        clearInterval(autoSlideIntervalRef.current);
        if (!isFinalSlide) {
            autoSlideIntervalRef.current = setInterval(() => {
                if (!document.hidden) {
                    nextSlide();
                }
            }, slideDuration);
        }
    };

    const handleCreativeBtnClick = (e) => {
        e.preventDefault();
        if (creativeBtnRef.current) {
            creativeBtnRef.current.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if (creativeBtnRef.current) {
                    creativeBtnRef.current.style.transform = 'scale(1)';
                }
            }, 200);
        }
        createHeartBubbles();
    };

    useEffect(() => {
        document.documentElement.lang = 'ar';
        document.title = "فقط لأجلك";

        // Initialize slides
        slidesRef.current.forEach((slideEl, index) => {
            if (slideEl) {
                slideEl.classList.remove('active', 'entering', 'exiting');
                if (index === 0) {
                    slideEl.classList.add('active');
                }

                const creativeElement = slideEl.querySelector('.creative-element');
                if (creativeElement) {
                    createSparkles(creativeElement, 15);
                }
            }
        });

        createFloatingShapes();
        startAutoSlide();

        // Simulate loading completion
        setTimeout(() => setIsLoading(false), 1500);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearInterval(autoSlideIntervalRef.current);
            } else if (!isFinalSlide) {
                startAutoSlide();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(autoSlideIntervalRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            const styleTag = document.getElementById('floatUpKeyframes');
            if (styleTag) styleTag.remove();
        };
    });

    useEffect(() => {
        slidesRef.current.forEach((slideEl, idx) => {
            if (slideEl) {
                if (idx === currentSlideIndex) {
                    slideEl.classList.add('active');
                } else {
                    slideEl.classList.remove('active', 'entering', 'exiting');
                }
            }
        });
    }, [currentSlideIndex]);

    if (isLoading) {
        return <div className="loading-screen">جاري التحميل...</div>;
    }

    return (
        <div className='container'>
            <div className="floating-shapes" ref={floatingShapesRef}></div>

            {slideContent.map((slide, idx) => (
                <div
                    className={idx === 0 ? 'slide active' : 'slide'}
                    key={slide.id}
                    ref={el => slidesRef.current[idx] = el}
                >
                    <div className="welcome-icon">{slide.icon}</div>
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                    <div className="creative-element" id={`sparkle${slide.id}`}></div>
                </div>
            ))}

            <div
                className="slide"
                key="final-slide"
                ref={el => slidesRef.current[slideContent.length] = el}
            >
                <div className="welcome-icon">🍬</div>
                <h2>مشاعر بدون مناسبة</h2>
                <p>بتجيلك لحظة فجأة وتلاقي نفسك بتفتكر حد.. من غير سبب.. بس الشعور دافي</p>
                <div className="creative-element" id="sparkle12"></div>
                <button
                    className="creative-btn"
                    onClick={handleCreativeBtnClick}
                    ref={creativeBtnRef}
                >
                    لحظات من القلب 🩷
                </button>
            </div>
        </div>
    );
}

export default SlideContent;
