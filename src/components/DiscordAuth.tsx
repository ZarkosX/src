import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Shield, Users, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscordAuthProps {
  onAuthenticated: (authenticated: boolean) => void;
}

export const DiscordAuth: React.FC<DiscordAuthProps> = ({ onAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDiscordLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Discord OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم تسجيل الدخول بنجاح!",
        description: "مرحباً بك في خدمات خوادم Minecraft",
      });
      
      onAuthenticated(true);
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "حدث خطأ أثناء الاتصال بـ Discord",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="minecraft-card w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            تسجيل الدخول عبر Discord
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            قم بتسجيل الدخول عبر Discord للوصول إلى خدمات الخوادم
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span>أمان وحماية كاملة</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span>إنضمام تلقائي للسيرفر</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-primary-glow" />
              <span>معالجة فورية للطلبات</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Button
              className="minecraft-button w-full py-6 text-lg"
              onClick={handleDiscordLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                  جاري الاتصال...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  تسجيل الدخول بـ Discord
                </div>
              )}
            </Button>
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="text-xs">
              سيتم إضافتك تلقائياً للسيرفر بعد التسجيل
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};