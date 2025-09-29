import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Server, Cpu, HardDrive, Zap, Send } from 'lucide-react';

export const ServerRequestForm = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    serverType: '',
    gameVersion: '',
    ramSize: '',
    gameMode: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate sending request to Discord
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الطلب بنجاح!",
        description: "سيتم مراجعة طلبك وإنشاء الخادم خلال 24 ساعة",
      });
      
      // Reset form
      setFormData({
        playerName: '',
        serverType: '',
        gameVersion: '',
        ramSize: '',
        gameMode: '',
        additionalNotes: ''
      });
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ramOptions = [
    { value: '2gb', label: '2 GB RAM', price: '5$' },
    { value: '4gb', label: '4 GB RAM', price: '10$' },
    { value: '8gb', label: '8 GB RAM', price: '20$' },
    { value: '16gb', label: '16 GB RAM', price: '35$' },
    { value: '32gb', label: '32 GB RAM', price: '65$' }
  ];

  const serverTypes = [
    { value: 'vanilla', label: 'Vanilla', icon: '🟫' },
    { value: 'paper', label: 'Paper', icon: '📄' },
    { value: 'spigot', label: 'Spigot', icon: '🔧' },
    { value: 'forge', label: 'Forge (Mods)', icon: '⚒️' },
    { value: 'fabric', label: 'Fabric (Mods)', icon: '🧵' }
  ];

  const gameModes = [
    { value: 'survival', label: 'سيرفايفل', description: 'البقاء الكلاسيكي' },
    { value: 'lifesteal', label: 'لايف ستيل', description: 'سرقة القلوب' },
    { value: 'bedwars', label: 'بيد وورز', description: 'حرب الأسرة' },
    { value: 'skywars', label: 'سكاي وورز', description: 'حرب السماء' },
    { value: 'creative', label: 'إبداعي', description: 'البناء الحر' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Server className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold glow-text">طلب خادم Minecraft</h1>
        </div>
        <p className="text-muted-foreground">
          املأ النموذج أدناه لطلب خادم مخصص لك
        </p>
      </div>

      <Card className="minecraft-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            تفاصيل الخادم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="playerName">اسم اللاعب</Label>
                <Input
                  id="playerName"
                  value={formData.playerName}
                  onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                  placeholder="أدخل اسمك في Minecraft"
                  className="minecraft-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gameVersion">إصدار Minecraft</Label>
                <Select
                  value={formData.gameVersion}
                  onValueChange={(value) => setFormData({...formData, gameVersion: value})}
                  required
                >
                  <SelectTrigger className="minecraft-input">
                    <SelectValue placeholder="اختر الإصدار" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.21">1.21 (الأحدث)</SelectItem>
                    <SelectItem value="1.20.4">1.20.4</SelectItem>
                    <SelectItem value="1.19.4">1.19.4</SelectItem>
                    <SelectItem value="1.18.2">1.18.2</SelectItem>
                    <SelectItem value="1.16.5">1.16.5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>نوع الخادم</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serverTypes.map((type) => (
                  <Button
                    key={type.value}
                    type="button"
                    variant={formData.serverType === type.value ? "default" : "outline"}
                    onClick={() => setFormData({...formData, serverType: type.value})}
                    className="h-auto p-4 flex flex-col gap-2"
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span className="text-sm">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>مقدار الرام</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ramOptions.map((ram) => (
                  <Button
                    key={ram.value}
                    type="button"
                    variant={formData.ramSize === ram.value ? "default" : "outline"}
                    onClick={() => setFormData({...formData, ramSize: ram.value})}
                    className="h-auto p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span>{ram.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {ram.price}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>نمط اللعب</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gameModes.map((mode) => (
                  <Button
                    key={mode.value}
                    type="button"
                    variant={formData.gameMode === mode.value ? "default" : "outline"}
                    onClick={() => setFormData({...formData, gameMode: mode.value})}
                    className="h-auto p-4 flex flex-col items-start text-right"
                  >
                    <span className="font-semibold">{mode.label}</span>
                    <span className="text-xs text-muted-foreground">{mode.description}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                placeholder="أي طلبات خاصة أو plugins مطلوبة؟"
                className="minecraft-input resize-none"
                rows={4}
              />
            </div>

            <div className="pt-6 border-t border-border">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.playerName || !formData.serverType || !formData.ramSize || !formData.gameMode}
                className="minecraft-button w-full py-6 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    جاري إرسال الطلب...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    إرسال الطلب إلى Discord
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};