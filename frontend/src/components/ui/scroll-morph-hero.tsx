import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type AnimationPhase = "scatter" | "line" | "circle";

type CardTarget = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
};

type FlipCardProps = {
  src: string;
  index: number;
  target: CardTarget;
};

const IMAGES = [
  "https://cdn.21st.dev/assets/mirror/4d/4d1bff4ea8b9f400dff7ae405f92e15bd39ec76e9285c7d96017e64ba1de3ae1.jpg",
  "https://cdn.21st.dev/assets/mirror/ee/ee36e332fe99d7611c43b90511db08a4f84e4545caa78e7b52e9ccffe273864b.jpg",
  "https://cdn.21st.dev/assets/mirror/dd/dddeaa4e6132c65bf7ff99d197f792a30937b5cbfe97a2b1ee54a793684df52e.jpg",
  "https://cdn.21st.dev/assets/mirror/48/487977107b5011b5e1c25289f6e4393ef555e1a92daee554788e9363b233ca14.jpg",
  "https://cdn.21st.dev/assets/mirror/a1/a12509688be6c9d3b2cb26d2ea1cfce48b8a8dbf2653e17be8a3fc31bd69f162.jpg",
  "https://cdn.21st.dev/assets/mirror/05/051f9e565b5b0b221384d9c27a0760febc3fb48d190c046adfda579f3614c958.jpg",
  "https://cdn.21st.dev/assets/mirror/87/87d4f60a4465d19d14b8acefa46275df4ccd767ccea6d7f234ea5bad99cfec56.jpg",
  "https://cdn.21st.dev/assets/mirror/06/0610989e0675a12c02d35aa5464e2644bf77913214b748b73a894808d2d79877.jpg",
  "https://cdn.21st.dev/assets/mirror/fe/fe90b90751e671a9526134c4743e2fcbf6c1a24991aba273ad7418c88fc9c701.jpg",
  "https://cdn.21st.dev/assets/mirror/2e/2e0452c1994fcc2130a1b8ef68e34b5ea52d1b35b80dde09b99349ad1de54598.jpg",
  "https://cdn.21st.dev/assets/mirror/84/847dc523558808119dc4bbb5218ff862ae5f5b455f33e9a0304f2f5a4b2f0f2c.jpg",
  "https://cdn.21st.dev/assets/mirror/2f/2f128763d177d6bdda3de9f0a766693406034977082bdb542138b7b74af9697b.jpg",
  "https://cdn.21st.dev/assets/mirror/30/30f8223f1d1ecc24fc8b7a9995b8ee98449b1e9fc300c14fbccec01b6a83a0ae.jpg",
  "https://cdn.21st.dev/assets/mirror/b4/b4df0e3e425ffce3b4f62fd7bc717e4dc90b94455f4d65d64fc07fe9721b0519.jpg",
  "https://cdn.21st.dev/assets/mirror/90/90c625659f072e4a701c2e37fa4ca46f25c7ca8689d723e7802fe84cf17874e9.jpg",
  "https://cdn.21st.dev/assets/mirror/6a/6aa0befc69cc3db8f3f3558d4b5e1216a5b64ceae1b86f51acf1c3f1432a8cf7.jpg",
  "https://cdn.21st.dev/assets/mirror/dc/dc126cfd753dc217945d0ea2f915e539dfe4ffb5fdea02245d0f576b25a9c4dd.jpg",
  "https://cdn.21st.dev/assets/mirror/ab/ab5f167fcb763aee7c3247fb8af97875998a7f519a6119da7dadd9cf73ae1a2c.jpg",
  "https://cdn.21st.dev/assets/mirror/57/57d6e450f7068e5f3be04907dcc0815343e67df1dc82f2da0ff1c859afc1f700.jpg",
  "https://cdn.21st.dev/assets/mirror/e4/e491359016d1494074e287dfbb55be068cffc0110017ae2257a5d4cdec193a47.jpg",
];

const TOTAL_IMAGES = IMAGES.length;
const MAX_SCROLL = 3000;
const IMAGE_WIDTH = 60;
const IMAGE_HEIGHT = 85;

const lerp = (start: number, end: number, amount: number) =>
  start * (1 - amount) + end * amount;

function FlipCard({ src, index, target }: FlipCardProps) {
  return (
    <motion.div
      className="group absolute cursor-pointer"
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl bg-gray-200 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={`Subscription management visual ${index + 1}`}
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-900 p-2 text-center shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest text-cyan-400">
            SubscriptFlow
          </span>
          <span className="mt-1 text-[9px] font-medium text-white">
            Manage smarter
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  const virtualScroll = useMotionValue(0);

  const smoothMorph = useSpring(
    useTransform(virtualScroll, [0, 600], [0, 1]),
    { stiffness: 40, damping: 20 }
  );

  const smoothRotation = useSpring(
    useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]),
    { stiffness: 40, damping: 20 }
  );

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 30,
    damping: 20,
  });

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  // Generate random starting positions for the cards.
  const scatterPositions = useMemo(
    () =>
      IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      })),
    []
  );

  // Detect the container's dimensions.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Intro animation: scatter -> line -> circle.
  useEffect(() => {
    const firstTimer = window.setTimeout(() => {
      setIntroPhase("line");
    }, 500);

    const secondTimer = window.setTimeout(() => {
      setIntroPhase("circle");
    }, 2500);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, []);

  // Listen for scroll and touch gestures inside the hero.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = (amount: number) => {
      const nextScroll = Math.min(
        Math.max(scrollRef.current + amount, 0),
        MAX_SCROLL
      );

      scrollRef.current = nextScroll;
      virtualScroll.set(nextScroll);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      updateScroll(event.deltaY);
    };

    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY ?? touchStartY;
      updateScroll(touchStartY - touchY);
      touchStartY = touchY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // Mouse movement creates a subtle horizontal parallax effect.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;

      mouseX.set(normalizedX * 100);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX]);

  // Subscribe to smooth animation values.
  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotation = smoothRotation.on("change", setRotateValue);
    const unsubscribeMouse = smoothMouseX.on("change", setParallaxValue);

    return () => {
      unsubscribeMorph();
      unsubscribeRotation();
      unsubscribeMouse();
    };
  }, [smoothMorph, smoothRotation, smoothMouseX]);

  return (
    <section
      ref={containerRef}
      className="relative h-full min-h-[650px] w-full overflow-hidden bg-[#FAFAFA]"
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        {/* Initial heading */}
        <div className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? {
                    opacity: 1 - morphValue * 2,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    filter: "blur(10px)",
                  }
            }
            transition={{ duration: 1 }}
            className="text-2xl font-medium tracking-tight text-gray-900 md:text-5xl"
          >
            Every subscription. One place.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.5 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500"
          >
            SCROLL TO EXPLORE
          </motion.p>
        </div>

        {/* Content shown after the cards form an arc */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="pointer-events-none absolute top-[8%] z-10 flex flex-col items-center px-4 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            Meet SubscriptFlow
          </h2>

          <p className="max-w-lg text-sm leading-relaxed text-gray-600 md:text-base">
            Simplify subscription management, automate billing, track
            payments, and keep your business running smoothly.
          </p>
        </motion.div>

        {/* Animated image cards */}
        <div className="relative flex h-full w-full items-center justify-center">
          {IMAGES.map((src, index) => {
            let target: CardTarget = {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
            };

            if (introPhase === "scatter") {
              target = scatterPositions[index];
            } else if (introPhase === "line") {
              const spacing = 70;
              const totalWidth = TOTAL_IMAGES * spacing;

              target = {
                x: index * spacing - totalWidth / 2,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(
                containerSize.width,
                containerSize.height
              );

              // Circular arrangement.
              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (index / TOTAL_IMAGES) * 360;
              const circleRadians = (circleAngle * Math.PI) / 180;

              const circlePosition = {
                x: Math.cos(circleRadians) * circleRadius,
                y: Math.sin(circleRadians) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Bottom rainbow arc arrangement.
              const baseRadius = Math.min(
                containerSize.width,
                containerSize.height * 1.5
              );

              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY =
                containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(
                Math.max(rotateValue / 360, 0),
                1
              );

              const boundedRotation = -scrollProgress * spreadAngle * 0.8;
              const currentAngle =
                startAngle + index * step + boundedRotation;

              const arcRadians = (currentAngle * Math.PI) / 180;

              const arcPosition = {
                x: Math.cos(arcRadians) * arcRadius + parallaxValue,
                y: Math.sin(arcRadians) * arcRadius + arcCenterY,
                rotation: currentAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              // Morph between circle and rainbow arc.
              target = {
                x: lerp(circlePosition.x, arcPosition.x, morphValue),
                y: lerp(circlePosition.y, arcPosition.y, morphValue),
                rotation: lerp(
                  circlePosition.rotation,
                  arcPosition.rotation,
                  morphValue
                ),
                scale: lerp(1, arcPosition.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={index}
                src={src}
                index={index}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}