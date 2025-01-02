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
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/');
      router.refresh();
    } catch (error: any) {
      if (error.message === 'Invalid login credentials') {
        setError('メールアドレスまたはパスワードが正しくありません');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message === 'User already registered') {
          setError('このメールアドレスは既に登録されています。ログインしてください。');
          setIsSignUp(false);
          return;
        }
        throw error;
      }

      setError('確認メールを送信しました。メールを確認してください。');
    } catch (error: any) {
      if (error.message.includes('password')) {
        setError('パスワードは8文字以上である必要があります');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setError(null);
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">TODOアプリへようこそ</h1>
                <p className="text-balance text-muted-foreground">
                  {isSignUp ? '新規アカウントを作成' : 'アカウントにログイン'}してください
                </p>
              </div>
              {error && (
                <div className={cn(
                  "rounded-md p-3 text-sm",
                  error.includes('確認メール') 
                    ? "bg-green-100 text-green-800" 
                    : error.includes('既に登録されています')
                    ? "bg-blue-100 text-blue-800"
                    : "bg-destructive/15 text-destructive"
                )}>
                  {error}
                </div>
              )}
              <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    minLength={8}
                  />
                  {isSignUp && (
                    <p className="text-xs text-muted-foreground">
                      パスワードは8文字以上で設定してください
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isSignUp ? '登録中...' : 'ログイン中...') 
                    : (isSignUp ? '新規登録' : 'ログイン')}
                </Button>
              </form>
              <div className="text-center text-sm">
                {isSignUp ? (
                  <>
                    すでにアカウントをお持ちの方は{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary hover:underline"
                      disabled={isLoading}
                    >
                      ログイン
                    </button>
                  </>
                ) : (
                  <>
                    アカウントをお持ちでない方は{" "}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary hover:underline"
                      disabled={isLoading}
                    >
                      新規登録
                    </button>
                  </>
                )}
              </div>
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