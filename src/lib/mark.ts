/**
 * The Rachna mark's master drawing (rachna-logo.svg): 301 × 528 units, one stroke weight.
 * Every number on the logo page (/logo) is measured from these coordinates.
 *
 * The leaf is drawn as two halves that start at its tip, so it can draw itself outward
 * from one point. With round caps this renders exactly like the closed outline.
 */
export const mark = {
  width: 301,
  height: 528,
  stroke: 40.0862,
  nibStroke: 7.72016,
  axis: 150.323,
  apex: 20.0431,
  widest: 219.262,
  base: 340.733,
  rx: 130.28,
  ry: 121.471,
  veinEnd: 420.905,
  nib: { left: 96.4581, right: 203.433, x: 149.945, apex: 326.62, top: 419.263, bottom: 426.983, tip: 519.626 },

  leaf: 'M280.603 219.262C280.603 286.346 222.278 340.733 150.323 340.733C78.3685 340.733 20.0431 286.346 20.0431 219.262C20.0431 152.177 150.323 20.0431 150.323 20.0431C150.323 20.0431 280.603 152.167 280.603 219.262Z',
  leafRight: 'M150.323 20.0431C150.323 20.0431 280.603 152.167 280.603 219.262C280.603 286.346 222.278 340.733 150.323 340.733',
  leafLeft: 'M150.323 20.0431C150.323 20.0431 20.0431 152.177 20.0431 219.262C20.0431 286.346 78.3685 340.733 150.323 340.733',
  vein: 'M150.323 20.0431V340.733V420.905',
  nibTop: 'M203.433 419.263H96.4581L149.945 326.62L203.433 419.263Z',
  nibBottom: 'M203.433 426.983H96.4581L149.945 519.626L203.433 426.983Z',
};

/** Measured facts, shown on the logo page. */
export const facts = {
  /** Apex to widest point, divided by widest point to base. */
  leafRatio: (mark.widest - mark.apex) / (mark.base - mark.widest), // 1.640
  /** The angle at the tip of the leaf, from the tangents of its two curves. */
  apexAngle: (2 * Math.atan((mark.axis - 20.0431) / (152.177 - mark.apex)) * 180) / Math.PI, // 89.2
  /** Height of the nib over height of the leaf. */
  nibToLeaf: (mark.nib.tip - mark.nib.apex) / (mark.base - mark.apex), // 0.602
};
