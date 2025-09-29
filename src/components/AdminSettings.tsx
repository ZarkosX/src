import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Settings, Bot, MessageSquare, Save, Eye, EyeOff, Copy, Check } from 'lucide-react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    botToken: 'MTQyMjE0MzI1MDA1OTM2MjMxNQ.GTnhgQ.6v3WFCAUk__Nxy20hjZDdzQ2_mGlJRhBUh8KhI',
    clientId: '1422143250059362315',
    clientSecret: 'd_Yv99NGshnsC_PaOE7wTXNRyTwYJ6I-',
    channelId: '',
    guildId: ''
  });
  const [showToken, setShowToken] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState('');
  const { toast } = useToast();

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('minecraftBotSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('minecraftBotSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم حفظ الإعدادات بنجاح!",
        description: "تم تحديث إعدادات البوت والسيرفر",
      });
    } catch (error) {
      toast({
        title: "خطأ في حفظ الإعدادات",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
      toast({
        title: "تم النسخ!",
        description: `تم نسخ ${type} إلى الحافظة`,
      });
    } catch (error) {
      toast({
        title: "فشل النسخ",
        description: "لم يتم نسخ النص",
        variant: "destructive",
      });
    }
  };

  const isFormValid = settings.botToken && settings.clientId && settings.channelId && settings.guildId;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold glow-text">إعدادات البوت</h1>
        </div>
        <p className="text-muted-foreground">
          قم بإعداد بيانات Discord Bot لتفعيل الخدمات
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="minecraft-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              بيانات البوت
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="botToken">Bot Token</Label>
              <div className="flex gap-2">
                <Input
                  id="botToken"
                  type={showToken ? "text" : "password"}
                  value={settings.botToken}
                  onChange={(e) => setSettings({...settings, botToken: e.target.value})}
                  placeholder="MTAxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="minecraft-input flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(settings.botToken, 'Bot Token')}
                  disabled={!settings.botToken}
                >
                  {copied === 'Bot Token' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <div className="flex gap-2">
                <Input
                  id="clientId"
                  value={settings.clientId}
                  onChange={(e) => setSettings({...settings, clientId: e.target.value})}
                  placeholder="123456789012345678"
                  className="minecraft-input flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(settings.clientId, 'Client ID')}
                  disabled={!settings.clientId}
                >
                  {copied === 'Client ID' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret</Label>
              <div className="flex gap-2">
                <Input
                  id="clientSecret"
                  type={showToken ? "text" : "password"}
                  value={settings.clientSecret}
                  onChange={(e) => setSettings({...settings, clientSecret: e.target.value})}
                  placeholder="d_Yv99NGshnsC_PaOE7wTXNRyTwYJ6I-"
                  className="minecraft-input flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(settings.clientSecret, 'Client Secret')}
                  disabled={!settings.clientSecret}
                >
                  {copied === 'Client Secret' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minecraft-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              إعدادات السيرفر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guildId">Guild ID (معرف السيرفر)</Label>
              <div className="flex gap-2">
                <Input
                  id="guildId"
                  value={settings.guildId}
                  onChange={(e) => setSettings({...settings, guildId: e.target.value})}
                  placeholder="123456789012345678"
                  className="minecraft-input flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(settings.guildId, 'Guild ID')}
                  disabled={!settings.guildId}
                >
                  {copied === 'Guild ID' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channelId">Channel ID (معرف القناة)</Label>
              <div className="flex gap-2">
                <Input
                  id="channelId"
                  value={settings.channelId}
                  onChange={(e) => setSettings({...settings, channelId: e.target.value})}
                  placeholder="123456789012345678"
                  className="minecraft-input flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(settings.channelId, 'Channel ID')}
                  disabled={!settings.channelId}
                >
                  {copied === 'Channel ID' ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="minecraft-card">
        <CardHeader>
          <CardTitle>معلومات مهمة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">كيفية الحصول على Bot Token:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>اذهب إلى Discord Developer Portal</li>
                <li>انشئ تطبيق جديد</li>
                <li>اذهب إلى قسم Bot</li>
                <li>انسخ التوكين</li>
              </ol>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-accent">كيفية الحصول على المعرفات:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>فعل Developer Mode في Discord</li>
                <li>انقر بالزر الأيمن على السيرفر</li>
                <li>اختر "Copy ID" للحصول على Guild ID</li>
                <li>كرر نفس الخطوات للقناة</li>
              </ol>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={isFormValid ? "default" : "secondary"}>
                {isFormValid ? "جاهز للعمل" : "يحتاج إعداد"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                الدومين الحالي: https://lgs2ws.csb.app/
              </span>
            </div>
            
            <Button
              onClick={handleSave}
              disabled={!isFormValid || isSaving}
              className="minecraft-button"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                  جاري الحفظ...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ الإعدادات
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};