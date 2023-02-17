import { LitElement, html } from "lit";

const QUESTION_TIME_IN_SECONDS = 120; // 2 minutes

export class TimerComponent extends LitElement {
  static properties = {
    isTimerStopped: { type: Boolean },
    remainingTime: { type: Number },
    remainingMinutes: { type: Number },
    remainingSeconds: { type: Number },
  };

  constructor() {
    super();
    this.controller = new AbortController();
    this.remainingTime = QUESTION_TIME_IN_SECONDS;
    this.remainingMinutes = this.getRemainingMinutes(this.remainingTime);
    this.remainingSeconds = this.getRemainingSeconds(this.remainingTime);
    this.updateTime();
  }

  render() {
    return html`<span>${this.remainingMinutes}:${this.remainingSeconds}</span>`;
  }

  getRemainingMinutes(totalSeconds) {
    return this.formatTime(Math.floor(totalSeconds / 60));
  }

  getRemainingSeconds(totalSeconds) {
    return this.formatTime(totalSeconds % 60);
  }

  formatTime(num) {
    return String(num).padStart(2, "0");
  }

  updateTime() {
    animationInterval(1000, this.controller.signal, (t) => {
      if (this.remainingTime > 0 && !this.isTimerStopped) {
        --this.remainingTime;
        this.remainingMinutes = this.getRemainingMinutes(this.remainingTime);
        this.remainingSeconds = this.getRemainingSeconds(this.remainingTime);
      } else if (!this.isTimerStopped) {
        location.reload();
      }
    });
  }
}
customElements.define("ui-timer", TimerComponent);

/**
 * Source: https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95
 */
export function animationInterval(ms, signal, callback) {
  const start = document.timeline
    ? document.timeline.currentTime
    : performance.now();

  function frame(time) {
    if (signal.aborted) return;
    callback(time);
    scheduleFrame(time);
  }

  function scheduleFrame(time) {
    const elapsed = time - start;
    const roundedElapsed = Math.round(elapsed / ms) * ms;
    const targetNext = start + roundedElapsed + ms;
    const delay = targetNext - performance.now();
    setTimeout(() => requestAnimationFrame(frame), delay);
  }

  scheduleFrame(start);
}
