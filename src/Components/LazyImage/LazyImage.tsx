import React, {useRef, useState} from 'react';
import styles from './LazyImage.module.css'
import useOnScreen from "../../hooks/use-on-screen";
import defaultImage from "../../assets/images/default.png"

interface LazyImageProps {
    src: string,
    alt: string,
    onLoad?: Function,
}

const LazyImage: React.FC<LazyImageProps> = React.memo(({src, alt='', onLoad=() => {}}) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [source, setSource] = useState(src)

    const imageRef = useRef(null)
    const containerRef = useRef(null)
    const isVisible = useOnScreen(containerRef)

    const onError = () => {
        setSource(defaultImage)
    }

    return (
        <div ref={containerRef} className={styles.container + (isLoaded ? ` ${styles.containerLoaded}` : '')}>
            {(isVisible || isLoaded) && <img
                ref={imageRef}
                onError={onError}
                onLoad={() => isVisible ? setIsLoaded(true) : null}
                className={styles.image + (isLoaded ? ` ${styles.imageLoaded}` : '')}
                src={source}
                alt={alt}
            />}
        </div>
    );
});

export default LazyImage;