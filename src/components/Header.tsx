import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Header() {
    const letters = ['C', 'A', 'R', 'D', 'F', 'L', 'I', 'P', 'P', 'E', 'R'];
    return (
        <div
            style={{
                fontFamily: 'Crete Round',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100vw',
                position: 'absolute',
                top: -35,
                color: 'white',
                fontSize: '5.2rem',
            }}
        >
            {letters.map((letter: string, i: number): ReactNode => {
                return (
                    <motion.p
                        key={i + letter}
                        animate={{
                            y: [10, -10, 10],
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatDelay: 0,
                            duration: 1.5,
                            delay: i * 0.1,
                        }}
                    >
                        {letter}
                    </motion.p>
                );
            })}
        </div>
    );
}