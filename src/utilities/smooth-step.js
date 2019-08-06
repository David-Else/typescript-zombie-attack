/**
 * Calculate a smooth interpolation percentage of `x` between `min` and `max`.
 *
 * The function receives the number `x` as an argument and returns 0 if `x` is less than or equal to the left edge,
 * 1 if `x` is greater than or equal to the right edge, and smoothly interpolates, using a Hermite polynomial,
 * between 0 and 1 otherwise.
 *
 * @function Phaser.Math.SmoothStep
 * @since 3.0.0
 * @see {@link https://en.wikipedia.org/wiki/Smoothstep}
 *
 * @param {number} x - The input value.
 * @param {number} min - The minimum value, also known as the 'left edge', assumed smaller than the 'right edge'.
 * @param {number} max - The maximum value, also known as the 'right edge', assumed greater than the 'left edge'.
 *
 * @return {number} The percentage of interpolation, between 0 and 1.
 */
var SmoothStep = function (x, min, max) {
    if (x <= min) {
        return 0;
    }
    if (x >= max) {
        return 1;
    }
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
};
//
/**
 * A Smooth Step interpolation method.
 *
 * @function Phaser.Math.Interpolation.SmoothStep
 * @since 3.9.0
 * @see {@link https://en.wikipedia.org/wiki/Smoothstep}
 *
 * @param {number} t - The percentage of interpolation, between 0 and 1.
 * @param {number} min - The minimum value, also known as the 'left edge', assumed smaller than the 'right edge'.
 * @param {number} max - The maximum value, also known as the 'right edge', assumed greater than the 'left edge'.
 *
 * @return {number} The interpolated value.
 */
export function SmoothStepInterpolation(t, min, max) {
    return min + (max - min) * SmoothStep(t, 0, 1);
}
// We have our from and to values, those are our keyframes. So now we need to, over the course of duration, generate values that are inbetween those two.
function tween({ from = 0, to = 1, duration = 300, onUpdate } = {}) {
    const delta = to - from;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const latest = from + progress * delta;
        if (onUpdate)
            onUpdate(latest);
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}
const ball = document.getElementById('ball');
//# sourceMappingURL=smooth-step.js.map