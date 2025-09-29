import React from 'react';
import { Gamepad2, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="minecraft-card p-3 bg-primary/10">
              <Gamepad2 className="h-8 w-8 text-primary pixelated" />
            </div>
            <div>
              <h1 className="text-2xl font-bold glow-text">
                خدمات Minecraft
              </h1>
              <p className="text-sm text-muted-foreground">
                أطلب خادمك الآن
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              متصل بـ Discord
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};