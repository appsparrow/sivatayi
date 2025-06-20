'use client'

import React, { useState } from 'react'
import { Plane, Bluetooth, Wifi, Moon } from 'lucide-react'
import { LiquidButton } from './components/liquid-button'
import { LiquidGlass } from './components/liquid-glass'

export default function Page() {
  const [toggleStates, setToggleStates] = useState({
    airplane: false,
    airdrop: false,
    wifi: true,
    dnd: false,
  })

  const buttons = [
    {
      id: 'airplane',
      icon: Plane,
      label: 'Airplane Mode',
      activeBackground:
        'linear-gradient(135deg, rgba(249, 115, 22, 0.7) 0%, rgba(234, 88, 12, 0.7) 100%)',
      activeBorder: 'rgba(251, 146, 60, 0.8)',
      active: toggleStates.airplane,
    },
    {
      id: 'airdrop',
      icon: Bluetooth,
      label: 'AirDrop',
      activeBackground:
        'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)',
      activeBorder: 'rgba(96, 165, 250, 0.8)',
      active: toggleStates.airdrop,
    },
    {
      id: 'wifi',
      icon: Wifi,
      label: 'Wi-Fi',
      activeBackground:
        'linear-gradient(135deg, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)',
      activeBorder: 'rgba(96, 165, 250, 0.8)',
      active: toggleStates.wifi,
    },
    {
      id: 'dnd',
      icon: Moon,
      label: 'Do Not Disturb',
      activeBackground:
        'linear-gradient(135deg, rgba(168, 85, 247, 0.7) 0%, rgba(147, 51, 234, 0.7) 100%)',
      activeBorder: 'rgba(196, 181, 253, 0.8)',
      active: toggleStates.dnd,
    },
  ]

  const handleToggle = (buttonId: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [buttonId]: !prev[buttonId as keyof typeof prev],
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div
        className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-cover bg-center bg-no-repeat z-10"
        style={{
          backgroundImage: `url('https://picsum.photos/1920/1080')`,
        }}
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <LiquidGlass
        variant="panel"
        intensity="medium"
        rippleEffect={false}
        flowOnHover={false}
        stretchOnDrag={false}
        className="relative z-20"
        style={{ padding: '24px', borderRadius: '64px' }}
      >
        <div className="grid grid-cols-2 relative">
          {buttons.map((button) => {
            const IconComponent = button.icon
            const useStroke = button.id === 'wifi' || button.id === 'airdrop'
            return (
              <LiquidButton
                key={button.id}
                variant="primary"
                size="xl"
                onClick={() => handleToggle(button.id)}
                rippleEffect={false}
                className="shadow-2xl w-24 h-24 !p-0 !rounded-full flex items-center justify-center m-2 transition-all duration-300"
                style={{
                  width: '96px',
                  height: '96px',
                  padding: '0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '8px',
                  background: button.active
                    ? button.activeBackground
                    : undefined,
                  borderColor: button.active ? button.activeBorder : undefined,
                }}
              >
                <IconComponent
                  className="pointer-events-none"
                  size={40}
                  color="white"
                  fill={useStroke ? 'none' : 'white'}
                  strokeWidth={useStroke ? 2 : 0}
                />
              </LiquidButton>
            )
          })}
        </div>
      </LiquidGlass>
    </div>
  )
}


@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --liquid-glass-bg: rgba(255, 255, 255, 0.1);
  --liquid-glass-border: rgba(255, 255, 255, 0.2);
  --liquid-glass-shadow: rgba(0, 0, 0, 0.1);
  --liquid-ripple-color: rgba(255, 255, 255, 0.3);
  --liquid-flow-duration: 0.8s;
  --liquid-bounce-duration: 0.6s;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  overflow-x: hidden;
  /* Disable scroll on mobile */
  overflow-y: hidden;
  position: fixed;
  width: 100%;
  height: 100vh;
  touch-action: none;
  -webkit-overflow-scrolling: touch;
}

/* Prevent pull-to-refresh on mobile */
html {
  overscroll-behavior: none;
  touch-action: none;
}

/* Additional mobile-specific scroll prevention */
@media (max-width: 768px) {
  body {
    position: fixed;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    touch-action: manipulation;
  }

  html,
  body {
    height: 100vh;
    height: -webkit-fill-available;
    overscroll-behavior-y: none;
  }
}

/* Prevent zoom on double tap */
* {
  touch-action: manipulation;
}

.liquid-glass {
  background: var(--liquid-glass-bg);
  backdrop-filter: blur(5px);
  border: 1px solid var(--liquid-glass-border);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1);
  transition: all var(--liquid-flow-duration) cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  transform-origin: center center;
}

.liquid-glass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.liquid-glass::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  pointer-events: none;
  z-index: 0;
}

@keyframes liquidFlow {
  0% {
    transform: scale(1) translateX(0) skewX(0deg);
  }
  15% {
    transform: scale(1.03, 0.97) translateX(8px) skewX(2deg);
  }
  30% {
    transform: scale(0.97, 1.03) translateX(12px) skewX(-1deg);
  }
  45% {
    transform: scale(1.01, 0.99) translateX(6px) skewX(1deg);
  }
  60% {
    transform: scale(0.99, 1.01) translateX(-2px) skewX(-0.5deg);
  }
  75% {
    transform: scale(1.005, 0.995) translateX(1px) skewX(0.2deg);
  }
  100% {
    transform: scale(1) translateX(0) skewX(0deg);
  }
}

@keyframes liquidRipple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes liquidStretch {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes liquidJiggle {
  0%,
  100% {
    transform: rotate(0deg) scale(1) skewX(0deg);
  }
  10% {
    transform: rotate(1deg) scale(1.02) skewX(1deg);
  }
  20% {
    transform: rotate(-1.5deg) scale(0.98) skewX(-1deg);
  }
  30% {
    transform: rotate(1.2deg) scale(1.01) skewX(0.5deg);
  }
  40% {
    transform: rotate(-0.8deg) scale(0.99) skewX(-0.3deg);
  }
  50% {
    transform: rotate(0.5deg) scale(1.005) skewX(0.2deg);
  }
  60% {
    transform: rotate(-0.3deg) scale(0.995) skewX(-0.1deg);
  }
  70% {
    transform: rotate(0.2deg) scale(1.002) skewX(0.05deg);
  }
  80% {
    transform: rotate(-0.1deg) scale(0.998) skewX(-0.02deg);
  }
  90% {
    transform: rotate(0.05deg) scale(1.001) skewX(0.01deg);
  }
}

@keyframes liquidWave {
  0%,
  100% {
    transform: translateY(0px) scaleY(1);
  }
  25% {
    transform: translateY(-2px) scaleY(1.05);
  }
  50% {
    transform: translateY(0px) scaleY(0.95);
  }
  75% {
    transform: translateY(1px) scaleY(1.02);
  }
}

@keyframes liquidGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  }
}

.liquid-flow {
  animation: liquidFlow var(--liquid-flow-duration) cubic-bezier(0.23, 1, 0.32, 1);
}

.liquid-jiggle {
  animation: liquidJiggle 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.liquid-wave {
  animation: liquidWave 2s ease-in-out infinite;
}

.liquid-glow {
  animation: liquidGlow 3s ease-in-out infinite;
}

.liquid-ripple {
  position: relative;
  overflow: hidden;
}

.liquid-ripple::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--liquid-ripple-color);
  transform: translate(-50%, -50%);
  animation: liquidRipple 0.6s ease-out;
  pointer-events: none;
}

.liquid-glass:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1);
}

.liquid-glass:active {
  transform: translateY(1px) scale(0.96) rotate(0.5deg);
  border-color: rgba(255, 255, 255, 0.5);
  transition: all 0.1s cubic-bezier(0.23, 1, 0.32, 1);
}

.liquid-glass:active::before {
  transition: all 0.1s cubic-bezier(0.23, 1, 0.32, 1);
}

.liquid-morph {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.liquid-morph:hover {
  border-radius: 50%;
  transform: rotate(5deg) scale(1.1);
}

@keyframes liquidFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

.liquid-float {
  animation: liquidFloat 6s ease-in-out infinite;
}

@keyframes liquidPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.liquid-pulse {
  animation: liquidPulse 2s ease-in-out infinite;
}

@keyframes liquidBreathe {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.02) rotate(0.5deg);
  }
}

@keyframes liquidRicochet {
  0% {
    transform: translateX(0) translateY(0) scale(1) rotate(0deg);
  }
  8% {
    transform: translateX(-6px) translateY(-4px) scale(1.02) rotate(-1deg);
  }
  16% {
    transform: translateX(-12px) translateY(-8px) scale(1.05) rotate(-2deg);
  }
  22% {
    transform: translateX(-8px) translateY(-2px) scale(1.03) rotate(-1.2deg);
  }
  30% {
    transform: translateX(8px) translateY(5px) scale(0.95) rotate(1.5deg);
  }
  36% {
    transform: translateX(6px) translateY(3px) scale(0.97) rotate(1deg);
  }
  45% {
    transform: translateX(-5px) translateY(-3px) scale(1.02) rotate(-1deg);
  }
  52% {
    transform: translateX(-3px) translateY(-1px) scale(1.01) rotate(-0.6deg);
  }
  60% {
    transform: translateX(3px) translateY(2px) scale(0.98) rotate(0.5deg);
  }
  67% {
    transform: translateX(2px) translateY(1px) scale(0.99) rotate(0.3deg);
  }
  75% {
    transform: translateX(-1px) translateY(-1px) scale(1.01) rotate(-0.2deg);
  }
  82% {
    transform: translateX(-0.5px) translateY(-0.5px) scale(1.005) rotate(-0.1deg);
  }
  90% {
    transform: translateX(0.5px) translateY(0.5px) scale(0.995) rotate(0.05deg);
  }
  95% {
    transform: translateX(0.2px) translateY(0.2px) scale(0.998) rotate(0.02deg);
  }
  100% {
    transform: translateX(0) translateY(0) scale(1) rotate(0deg);
  }
}

.liquid-breathe {
  animation: liquidBreathe 4s ease-in-out infinite;
}

.liquid-ricochet {
  animation: liquidRicochet 1.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes liquidPress {
  0% {
    transform: scale(1) rotate(0deg) translateY(0) translateX(0);
  }
  30% {
    transform: scale(0.92) rotate(1.5deg) translateY(2px) translateX(1px);
  }
  60% {
    transform: scale(0.94) rotate(-0.8deg) translateY(1.5px) translateX(-0.5px);
  }
  100% {
    transform: scale(0.96) rotate(0.5deg) translateY(1px) translateX(0);
  }
}

@keyframes liquidRelease {
  0% {
    transform: scale(0.96) rotate(0.5deg) translateY(1px) translateX(0);
  }
  8% {
    transform: scale(1.12) rotate(-2deg) translateY(-4px) translateX(-3px);
  }
  16% {
    transform: scale(0.92) rotate(2.5deg) translateY(2px) translateX(4px);
  }
  24% {
    transform: scale(1.06) rotate(-1.8deg) translateY(-2px) translateX(-3px);
  }
  32% {
    transform: scale(0.95) rotate(1.5deg) translateY(1px) translateX(2px);
  }
  40% {
    transform: scale(1.04) rotate(-1deg) translateY(-1px) translateX(-2px);
  }
  48% {
    transform: scale(0.97) rotate(0.8deg) translateY(0.5px) translateX(1.5px);
  }
  56% {
    transform: scale(1.02) rotate(-0.6deg) translateY(-0.5px) translateX(-1px);
  }
  64% {
    transform: scale(0.99) rotate(0.4deg) translateY(0.3px) translateX(0.8px);
  }
  72% {
    transform: scale(1.01) rotate(-0.3deg) translateY(-0.2px) translateX(-0.6px);
  }
  80% {
    transform: scale(0.995) rotate(0.2deg) translateY(0.1px) translateX(0.4px);
  }
  88% {
    transform: scale(1.005) rotate(-0.1deg) translateY(-0.1px) translateX(-0.2px);
  }
  96% {
    transform: scale(0.998) rotate(0.05deg) translateY(0.05px) translateX(0.1px);
  }
  100% {
    transform: scale(1) rotate(0deg) translateY(0) translateX(0);
  }
}

@keyframes liquidSquish {
  0% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
  25% {
    transform: scaleX(1.1) scaleY(0.9) rotate(0.5deg);
  }
  50% {
    transform: scaleX(0.95) scaleY(1.05) rotate(-0.3deg);
  }
  75% {
    transform: scaleX(1.02) scaleY(0.98) rotate(0.1deg);
  }
  100% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
}

.liquid-press {
  animation: liquidPress 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.liquid-release {
  animation: liquidRelease 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.liquid-squish {
  animation: liquidSquish 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.liquid-button:active {
  animation: liquidWobbleClick 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.liquid-glass.liquid-wobble-active {
  animation: liquidWobbleClick 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: 50% 50% !important;
}

.liquid-pressed {
  transition: none !important;
}

.liquid-pressed::before {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(0, 0, 0, 0.05) 100%
  ) !important;
}

@keyframes liquidWobbleClick {
  0% {
    transform: scale(1) rotate(0deg) translate(var(--wobble-start-x, 0px), var(--wobble-start-y, 0px));
  }
  4% {
    transform: scale(1.06) rotate(-1deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.6), calc(var(--wobble-start-y, 0px) * -0.6));
  }
  8% {
    transform: scale(1.12) rotate(-2deg)
      translate(calc(var(--wobble-start-x, 0px) * -1.2), calc(var(--wobble-start-y, 0px) * -1.2));
  }
  12% {
    transform: scale(1.04) rotate(-1.2deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.9), calc(var(--wobble-start-y, 0px) * -0.9));
  }
  16% {
    transform: scale(0.92) rotate(2.5deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.8), calc(var(--wobble-start-y, 0px) * 0.8));
  }
  20% {
    transform: scale(0.98) rotate(2deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.65), calc(var(--wobble-start-y, 0px) * 0.65));
  }
  24% {
    transform: scale(1.06) rotate(-1.8deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.5), calc(var(--wobble-start-y, 0px) * -0.5));
  }
  28% {
    transform: scale(1.02) rotate(-1.2deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.4), calc(var(--wobble-start-y, 0px) * -0.4));
  }
  32% {
    transform: scale(0.95) rotate(1.5deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.3), calc(var(--wobble-start-y, 0px) * 0.3));
  }
  36% {
    transform: scale(0.99) rotate(1.2deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.25), calc(var(--wobble-start-y, 0px) * 0.25));
  }
  40% {
    transform: scale(1.04) rotate(-1deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.2), calc(var(--wobble-start-y, 0px) * -0.2));
  }
  44% {
    transform: scale(1.01) rotate(-0.7deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.175), calc(var(--wobble-start-y, 0px) * -0.175));
  }
  48% {
    transform: scale(0.97) rotate(0.8deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.15), calc(var(--wobble-start-y, 0px) * 0.15));
  }
  52% {
    transform: scale(0.995) rotate(0.65deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.125), calc(var(--wobble-start-y, 0px) * 0.125));
  }
  56% {
    transform: scale(1.02) rotate(-0.6deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.1), calc(var(--wobble-start-y, 0px) * -0.1));
  }
  60% {
    transform: scale(1.008) rotate(-0.45deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.09), calc(var(--wobble-start-y, 0px) * -0.09));
  }
  64% {
    transform: scale(0.99) rotate(0.4deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.08), calc(var(--wobble-start-y, 0px) * 0.08));
  }
  68% {
    transform: scale(0.996) rotate(0.35deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.065), calc(var(--wobble-start-y, 0px) * 0.065));
  }
  72% {
    transform: scale(1.01) rotate(-0.3deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.05), calc(var(--wobble-start-y, 0px) * -0.05));
  }
  76% {
    transform: scale(1.004) rotate(-0.22deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.04), calc(var(--wobble-start-y, 0px) * -0.04));
  }
  80% {
    transform: scale(0.995) rotate(0.2deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.03), calc(var(--wobble-start-y, 0px) * 0.03));
  }
  84% {
    transform: scale(0.998) rotate(0.15deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.025), calc(var(--wobble-start-y, 0px) * 0.025));
  }
  88% {
    transform: scale(1.005) rotate(-0.1deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.02), calc(var(--wobble-start-y, 0px) * -0.02));
  }
  92% {
    transform: scale(1.002) rotate(-0.07deg)
      translate(calc(var(--wobble-start-x, 0px) * -0.015), calc(var(--wobble-start-y, 0px) * -0.015));
  }
  96% {
    transform: scale(0.998) rotate(0.05deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.01), calc(var(--wobble-start-y, 0px) * 0.01));
  }
  98% {
    transform: scale(0.999) rotate(0.02deg)
      translate(calc(var(--wobble-start-x, 0px) * 0.005), calc(var(--wobble-start-y, 0px) * 0.005));
  }
  100% {
    transform: scale(1) rotate(0deg) translate(0px, 0px);
  }
}


'use client'

import React, { useState, useCallback } from 'react'
import { LiquidGlass } from './liquid-glass'

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  rippleEffect?: boolean
}

export function LiquidButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  style,
  icon,
  iconPosition = 'left',
  rippleEffect = true,
}: LiquidButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-400/30 hover:from-blue-400/30 hover:to-purple-500/30'
      case 'secondary':
        return 'text-gray-100 bg-white/10 border-white/20 hover:bg-white/15'
      case 'ghost':
        return 'text-white bg-transparent border-white/10 hover:bg-white/5'
      case 'danger':
        return 'text-white bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-400/30 hover:from-red-400/30 hover:to-pink-500/30'
      default:
        return 'text-white bg-white/10 border-white/20'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-xl'
      case 'lg':
        return 'px-8 py-4 text-lg rounded-2xl'
      case 'xl':
        return 'px-10 py-5 text-xl rounded-3xl'
      default:
        return 'px-6 py-3 text-base rounded-2xl'
    }
  }

  const handleClick = useCallback(() => {
    if (disabled || loading) return

    setIsPressed(false)
    onClick?.()
  }, [disabled, loading, onClick])

  const buttonContent = (
    <div className="flex items-center justify-center gap-2">
      {loading && (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </div>
  )

  return (
    <LiquidGlass
      variant="button"
      intensity="medium"
      rippleEffect={rippleEffect}
      flowOnHover={!disabled}
      stretchOnDrag={!disabled}
      onClick={handleClick}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isPressed ? 'scale-95' : ''}
        transition-all duration-150 ease-out
        font-medium
        select-none
        backdrop-blur-3xl
        ${className}
      `}
      style={style}
    >
      {buttonContent}
    </LiquidGlass>
  )
}
"use client"

import type React from "react"
import { useState, useRef, useCallback, type ReactNode } from "react"

interface LiquidGlassProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: "button" | "card" | "panel" | "floating"
  intensity?: "subtle" | "medium" | "strong"
  rippleEffect?: boolean
  flowOnHover?: boolean
  stretchOnDrag?: boolean
  onClick?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function LiquidGlass({
  children,
  className = "",
  style,
  variant = "card",
  intensity = "medium",
  rippleEffect = true,
  stretchOnDrag = true,
  onClick,
  onDragStart,
  onDragEnd,
}: LiquidGlassProps) {
  const [isJiggling, setIsJiggling] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [wobbleOffset, setWobbleOffset] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const elementRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const rippleCounter = useRef(0)

  const getVariantClasses = () => {
    const baseClasses = "liquid-glass relative overflow-hidden"

    switch (variant) {
      case "button":
        return `${baseClasses} px-6 py-3 rounded-2xl cursor-pointer select-none`
      case "card":
        return `${baseClasses} p-6 rounded-3xl`
      case "panel":
        return `${baseClasses} p-8 rounded-2xl`
      case "floating":
        return `${baseClasses} p-4 rounded-full shadow-2xl`
      default:
        return baseClasses
    }
  }

  const getIntensityClasses = () => {
    switch (intensity) {
      case "subtle":
        return "backdrop-blur-sm bg-white/5 border-white/10"
      case "strong":
        return "backdrop-blur-3xl bg-white/20 border-white/30"
      default:
        return "backdrop-blur-xl bg-white/10 border-white/20"
    }
  }

  const createRipple = useCallback(
    (e: React.MouseEvent) => {
      if (!rippleEffect || !elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = {
        id: rippleCounter.current++,
        x,
        y,
      }

      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)
    },
    [rippleEffect],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (stretchOnDrag) {
        setIsDragging(true)
        dragStartPos.current = { x: e.clientX, y: e.clientY }
        onDragStart?.()
      } else if (variant === "button") {
        setIsPressed(true)
      }

      createRipple(e)
    },
    [stretchOnDrag, onDragStart, createRipple, variant],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }

      if (!isDragging) return

      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y

      setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 })
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)

      const currentOffset = { ...dragOffset }
      setWobbleOffset(currentOffset)

      setDragOffset({ x: 0, y: 0 })
      onDragEnd?.()

      setIsJiggling(true)
      setTimeout(() => {
        setIsJiggling(false)
        setWobbleOffset({ x: 0, y: 0 })
      }, 1800)
    } else if (variant === "button" && isPressed) {
      setIsPressed(false)
      setWobbleOffset({ x: 0, y: 0 })
      setIsJiggling(true)
      setTimeout(() => setIsJiggling(false), 1800)
    }
  }, [isDragging, dragOffset, onDragEnd, variant, isPressed])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      createRipple(e)
      onClick?.()
    },
    [onClick, createRipple],
  )

  // Add touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      if (stretchOnDrag) {
        setIsDragging(true)
        dragStartPos.current = { x: touch.clientX, y: touch.clientY }
        onDragStart?.()
      } else if (variant === "button") {
        setIsPressed(true)
      }

      // Create ripple effect for touch
      if (rippleEffect && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top

        const newRipple = {
          id: rippleCounter.current++,
          x,
          y,
        }

        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
        }, 600)
      }
    },
    [stretchOnDrag, onDragStart, rippleEffect, variant],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]

      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        setCursorPos({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        })
      }

      if (!isDragging) return

      // Prevent scrolling when dragging
      e.preventDefault()

      const deltaX = touch.clientX - dragStartPos.current.x
      const deltaY = touch.clientY - dragStartPos.current.y

      setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 })
    },
    [isDragging],
  )

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)

      const currentOffset = { ...dragOffset }
      setWobbleOffset(currentOffset)

      setDragOffset({ x: 0, y: 0 })
      onDragEnd?.()

      setIsJiggling(true)
      setTimeout(() => {
        setIsJiggling(false)
        setWobbleOffset({ x: 0, y: 0 })
      }, 1800)
    } else if (variant === "button" && isPressed) {
      setIsPressed(false)
      setWobbleOffset({ x: 0, y: 0 })
      setIsJiggling(true)
      setTimeout(() => setIsJiggling(false), 1800)
    }
  }, [isDragging, dragOffset, onDragEnd, variant, isPressed])

  const transformStyle = isJiggling
    ? ({
        "--wobble-start-x": `${wobbleOffset.x}px`,
        "--wobble-start-y": `${wobbleOffset.y}px`,
      } as React.CSSProperties)
    : {
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) ${isDragging ? "scale(1.02)" : ""}`,
        transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      }

  return (
    <div
      ref={elementRef}
      className={`
        ${getVariantClasses()}
        ${getIntensityClasses()}
        ${isJiggling && variant === "button" ? "liquid-wobble-active" : ""}
        ${isPressed && variant === "button" ? "liquid-pressed" : ""}
        ${className}
      `}
      style={{ ...transformStyle, ...style }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsHovering(false)
        setIsPressed(false)
        handleMouseUp()
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-200"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: "80px",
            height: "80px",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(10px)",
            zIndex: 2,
          }}
        />
      )}

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.4)",
            transform: "translate(-50%, -50%)",
            animation: "liquidRipple 0.6s ease-out forwards",
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-5" />
    </div>
  )
}




HTML and CSS



<div class="bg">
  <img src="https://i.ibb.co/bMvc7Zr6/Vibrant-Summer-Meadow-Watercolor.png" alt="">
  <img src="https://i.ibb.co/ZRH04pV3/Vibrant-Summer-Meadow-Watercolor-1.png" alt="">
  <img src="https://i.ibb.co/bMvc7Zr6/Vibrant-Summer-Meadow-Watercolor.png" alt="">
</div>

<button id="btn" class="glass"></button>

<svg style="position:absolute;width:0;height:0">
  <filter id="frosted" primitiveUnits="objectBoundingBox">
    <feImage href="data:image/png;base64,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" x="0" y="0" width="1" height="1" result="map"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur"/>
    <feDisplacementMap id="disp" in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G">
      <animate attributeName="scale" to="1.4" dur="0.3s" begin="btn.mouseover"  fill="freeze"/>
      <animate attributeName="scale" to="1" dur="0.3s" begin="btn.mouseout"   fill="freeze"/>
    </feDisplacementMap>
  </filter>
</svg>



html,body{height:100%;min-height:500vh;margin:0;font-family:system-ui,sans-serif;overflow-x:hidden}
.bg{position:absolute;inset:0;z-index:-1}
.bg img{width:100%;display:block}

.glass{
  position:fixed;inset:50% auto auto 50%;transform:translate(-50%,-50%);
  width:20rem;height:20rem;border-radius:50%;
  background:rgba(255,255,255,.08);border:2px solid transparent;
  box-shadow:0 0 0 2px rgba(255,255,255,.6),0 16px 32px rgba(0,0,0,.12);
  backdrop-filter:url(#frosted);-webkit-backdrop-filter:url(#frosted);
  display:grid;place-items:center;cursor:pointer;outline:0;
}

.glass::before,
.glass::after{
  content:"";position:absolute;width:40%;height:10px;background:#fff;border-radius:10px;
}
.glass::after{transform:rotate(90deg)}

