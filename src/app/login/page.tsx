'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();

  const handleSignInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setIsSent(true);
      setError('マジックリンクを送信しました。メールを確認してください。');
    } catch (error: any) {
      setError(error.message);
      setIsSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">TODOアプリへようこそ</h1>
                {!isSent ? (
                  <p className="text-balance text-muted-foreground">
                    メールアドレスを入力してログインしてください
                  </p>
                ) : (
                  <p className="text-balance text-muted-foreground">
                    メールを確認してマジックリンクをクリックしてください
                  </p>
                )}
              </div>
              {error && (
                <div className={cn(
                  "rounded-md p-3 text-sm",
                  isSent 
                    ? "bg-green-100 text-green-800" 
                    : "bg-destructive/15 text-destructive"
                )}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSignInWithEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    disabled={isLoading || isSent}
                  />
                </div>
                {!isSent && (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? '送信中...' : 'マジックリンクを送信'}
                  </Button>
                )}
                {isSent && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsSent(false);
                      setError(null);
                    }}
                  >
                    別のメールアドレスを使用
                  </Button>
                )}
              </form>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-muted-foreground">
          続行することで、<a href="#" className="hover:text-primary underline">利用規約</a>と
          <a href="#" className="hover:text-primary underline">プライバシーポリシー</a>に同意したことになります。
        </div>
      </div>
    </div>
  );
} 