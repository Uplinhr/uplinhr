export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.10,
      ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
    },
  }),
};
