'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Terminal, ArrowDown, Activity, Sparkles, Layers, FileDown, ShieldCheck, Cpu } from 'lucide-react';
import { useSystemLog } from '@/context/SystemLogContext';

interface DataStreamHeroProps {
  onOpenTerminal: () => void;
  onWalkJourney: () => void;
  onOpenResume: () => void;
}

export default function DataStreamHero({
  onOpenTerminal,
  onWalkJourney,
  onOpenResume,
}: DataStreamHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streamMode, setStreamMode] = useState<'medallion' | 'high_throughput' | 'sine_wave'>('medallion');
  const [throughput, setThroughput] = useState(2400000); // 2.4M msg/s
  const { addLog } = useSystemLog();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = window.innerWidth < 768 ? 200 : 450;
    interface Particle {
      x: number;
      y: number;
      baseY: number;
      vx: number;
      radius: number;
      amplitude: number;
      frequency: number;
      phase: number;
      color: string;
      layer: 'bronze' | 'silver' | 'gold';
      pulse: number;
    }

    const particles: Particle[] = [];
    const colors = {
      bronze: '#CD7F32',
      silver: '#38BDF8',
      gold: '#D4A853',
    };

    for (let i = 0; i < particleCount; i++) {
      const layerChoice = Math.random();
      const layer = layerChoice < 0.4 ? 'bronze' : layerChoice < 0.75 ? 'silver' : 'gold';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseY: Math.random() * height,
        vx: 1 + Math.random() * 2.5,
        radius: Math.random() * 2.5 + 1,
        amplitude: 20 + Math.random() * 60,
        frequency: 0.002 + Math.random() * 0.005,
        phase: Math.random() * Math.PI * 2,
        color: colors[layer],
        layer,
        pulse: Math.random() * Math.PI,
      });
    }

    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = '#1A1F2E';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle flow paths / background sine wave guides
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(212, 168, 83, 0.04)';
      for (let y = height * 0.2; y < height; y += 120) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 20) {
          const waveY = y + Math.sin(x * 0.003 + time) * 35;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move horizontally
        p.x += p.vx * (streamMode === 'high_throughput' ? 1.8 : 1);
        if (p.x > width) {
          p.x = -10;
          p.baseY = Math.random() * height;
        }

        // Sine vertical motion
        const wave = Math.sin(p.x * p.frequency + time + p.phase) * p.amplitude;
        let targetY = p.baseY + wave;

        // Mouse interaction displacement (data ripple)
        const dx = p.x - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 140;

        if (dist < radius) {
          const force = (1 - dist / radius) * 40;
          const angle = Math.atan2(dy, dx);
          targetY += Math.sin(angle) * force;
          p.x += Math.cos(angle) * (force * 0.1);
        }

        p.y += (targetY - p.y) * 0.1;

        // Render particle with soft glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.layer === 'gold') {
          ctx.shadowColor = '#D4A853';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#E8C878';
        } else if (p.layer === 'silver') {
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#7DD3FC';
        } else {
          ctx.shadowColor = '#CD7F32';
          ctx.shadowBlur = 5;
          ctx.fillStyle = '#E59866';
        }

        ctx.globalAlpha = 0.75 + Math.sin(time + p.pulse) * 0.25;
        ctx.fill();

        // Connect nearby gold particles to simulate stream pipeline connections
        if (p.layer === 'gold' && i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
            const p2 = particles[j];
            if (p2.layer === 'gold') {
              const pdx = p.x - p2.x;
              const pdy = p.y - p2.y;
              const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
              if (pdist < 80) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(212, 168, 83, ${0.25 * (1 - pdist / 80)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Fluctuating throughput timer for live data feel
    const throughputInterval = setInterval(() => {
      setThroughput(2400000 + Math.floor((Math.random() - 0.5) * 80000));
    }, 1500);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(throughputInterval);
    };
  }, [streamMode]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-16 bg-[#1A1F2E] transition-colors duration-300">
      {/* WebGL / Canvas Data Stream Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 data-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Stream Mode & Live Pulse Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-[#2D3447]/80 backdrop-blur-md border border-[#D4A853]/40 text-xs font-mono text-[#E8C878] mb-6 shadow-lg"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wider uppercase text-[11px] text-[#F5F0E8]">
            Cloud Data Engineer
          </span>
          <span className="text-[#8A93A8]">|</span>
          <span className="text-amber-300 flex items-center font-bold">
            <Activity className="w-3 h-3 mr-1 text-emerald-400" />
            {(throughput / 1000000).toFixed(2)}M msgs/sec
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F0E8] tracking-tight leading-[1.05] max-w-5xl"
        >
          Architecting <span className="text-[#D4A853] underline decoration-[#D4A853]/30 decoration-wavy">Data Pipelines</span> That Scale
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-base sm:text-xl text-[#94A3B8] max-w-3xl font-body leading-relaxed"
        >
          Hi, I&apos;m <strong className="text-[#F5F0E8] font-semibold">Sooraj Krishnan V S</strong>. 4+ years building high-throughput ETL/ELT pipelines, Medallion Lakehouses with Azure Event Hubs &amp; ADX, automated FastAPI generators, and AWS AI document parsing platforms.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-4"
        >
          <button
            onClick={onWalkJourney}
            className="px-6 py-3.5 rounded-full bg-[#D4A853] hover:bg-[#E8C878] text-[#1A1F2E] font-display font-bold text-sm sm:text-base shadow-lg shadow-[#D4A853]/20 hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
          >
            <Sparkles className="w-4 h-4 text-[#1A1F2E] group-hover:rotate-12 transition-transform" />
            <span>Walk Sooraj&apos;s Journey</span>
          </button>

          <button
            onClick={onOpenTerminal}
            className="px-6 py-3.5 rounded-full bg-[#2D3447]/90 hover:bg-[#2D3447] text-[#F5F0E8] border border-[#D4A853]/40 hover:border-[#D4A853] font-mono text-sm sm:text-base shadow-md hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Terminal className="w-4 h-4 text-[#D4A853]" />
            <span>Launch KQL Shell</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 text-gray-400 rounded">Ctrl+K</span>
          </button>

          <button
            onClick={onOpenResume}
            className="px-5 py-3.5 rounded-full bg-transparent border border-gray-600 hover:border-[#D4A853] text-gray-300 hover:text-white font-display text-sm sm:text-base transition-all duration-300 flex items-center space-x-2"
          >
            <FileDown className="w-4 h-4 text-[#D4A853]" />
            <span>View Resume</span>
          </button>
        </motion.div>

        {/* Stream Simulator Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 p-2 sm:p-3 rounded-2xl bg-[#0F1419]/80 backdrop-blur-md border border-[#D4A853]/20 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-gray-400"
        >
          <span className="flex items-center text-[#D4A853] font-bold px-2">
            <Layers className="w-3.5 h-3.5 mr-1" /> Stream Mode:
          </span>

          {[
            { id: 'medallion', label: '🥉 🥈 🥇 Medallion Architecture' },
            { id: 'high_throughput', label: '⚡ High Throughput (Kafka/EventHub)' },
            { id: 'sine_wave', label: '🌊 Sine Wave Data River' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                setStreamMode(mode.id as any);
                addLog('STREAM_EVENT', `Hero WebGL Stream Mode Changed: ${mode.label}`, 'Canvas particle simulation re-indexed');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                streamMode === mode.id
                  ? 'bg-[#D4A853] text-[#1A1F2E] font-bold shadow'
                  : 'bg-[#1A1F2E] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex flex-col items-center space-y-2 cursor-pointer group"
          onClick={onWalkJourney}
        >
          <span className="text-[11px] font-mono text-[#8A93A8] uppercase tracking-widest group-hover:text-[#D4A853] transition-colors">
            Scroll to Walk Path
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-gray-600 group-hover:border-[#D4A853] flex justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-[#D4A853]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
