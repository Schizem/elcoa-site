/**
 * Illustrated Elbow Lake map, drawn as a CSS mask so the line art takes the
 * current theme's ink color (brown on light, warm tan on dark).
 * Source art: public/images/elbow-lake-map.png (alpha = line art).
 */
export function LakeMapBanner() {
  return (
    <div
      className="lake-map"
      role="img"
      aria-label="Illustrated map of Elbow Lake in Franklin Township, Clare County, Michigan, showing the boat launch, Toohy Trail, and South Shore Drive. Lake area 26 acres; deepest point 28 feet."
    />
  );
}
