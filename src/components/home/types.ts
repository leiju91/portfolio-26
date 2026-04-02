/**
 * Props partagées par les blocs home animés après montage client
 * (évite les écarts Framer Motion / SSR).
 */
export interface HomeMotionReadyProps {
  hydrated: boolean;
}
