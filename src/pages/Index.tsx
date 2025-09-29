import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ServerRequestForm } from '@/components/ServerRequestForm';
import { AdminSettings } from '@/components/AdminSettings';
import { DiscordAuth } from '@/components/DiscordAuth';
import { Button } from '@/components/ui/button';
import { Settings, Server, Home } from 'lucide-react';
import heroImage from '@/assets/minecraft-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'request' | 'admin'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderView = () => {
    if (!isAuthenticated) {
      return <DiscordAuth onAuthenticated={setIsAuthenticated} />;
    }

    switch (currentView) {
      case 'request':
        return <ServerRequestForm />;
      case 'admin':
        return <AdminSettings />;
      default:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold glow-text">
                مرحباً بك في خدمات خوادم Minecraft
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                اطلب خادم Minecraft الخاص بك مع جميع الإعدادات المطلوبة
                <br />
                سيتم إرسال طلبك مباشرة إلى فريق الدعم عبر Discord
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="minecraft-card p-8 space-y-4">
                <Server className="mx-auto h-16 w-16 text-primary" />
                <h3 className="text-2xl font-bold">طلب خادم جديد</h3>
                <p className="text-muted-foreground">
                  اختر نوع الخادم والإعدادات المطلوبة
                </p>
                <Button 
                  className="minecraft-button w-full"
                  onClick={() => setCurrentView('request')}
                >
                  ابدأ طلب الخادم
                </Button>
              </div>
              
              <div className="minecraft-card p-8 space-y-4">
                <Settings className="mx-auto h-16 w-16 text-accent" />
                <h3 className="text-2xl font-bold">إعدادات البوت</h3>
                <p className="text-muted-foreground">
                  قم بإعداد بيانات البوت والسيرفر
                </p>
                <Button 
                  className="diamond-button w-full"
                  onClick={() => setCurrentView('admin')}
                >
                  إدارة الإعدادات
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative">
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="absolute inset-0 opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.01)_10px,rgba(255,255,255,0.01)_20px)]"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          {/* Navigation */}
          {isAuthenticated && (
            <div className="flex justify-center mb-8">
              <div className="minecraft-card p-2 flex gap-2">
                <Button
                  variant={currentView === 'home' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('home')}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  الرئيسية
                </Button>
                <Button
                  variant={currentView === 'request' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('request')}
                  className="flex items-center gap-2"
                >
                  <Server className="h-4 w-4" />
                  طلب خادم
                </Button>
                <Button
                  variant={currentView === 'admin' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('admin')}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  الإعدادات
                </Button>
              </div>
            </div>
          )}

          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Index;