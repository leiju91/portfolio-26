/**
 * Props shared by home blocks animated after client mount
 * (avoids Framer Motion / SSR mismatch).
 */
export interface HomeMotionReadyProps {
  hydrated: boolean;
}
