import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@insforge/sdk';

const client = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://zd8jv2d5.us-east.insforge.app',
});

// 用户注册
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === 'register') {
      // 检查邮箱是否已存在
      const { data: existingUser } = await client.database
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        return NextResponse.json(
          { error: '该邮箱已被注册' },
          { status: 400 }
        );
      }

      // 生成用户ID
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      // 创建新用户
      const { data: newUser, error } = await client.database
        .from('users')
        .insert({
          id: userId,
          email,
          password, // 在实际生产环境中应该使用bcrypt等加密
          name: name || email.split('@')[0],
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: '注册失败: ' + error.message },
          { status: 500 }
        );
      }

      // 生成JWT令牌
      const token = generateJWT(newUser.id, newUser.email);

      return NextResponse.json({
        success: true,
        message: '注册成功',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      });
    }

    if (action === 'login') {
      // 验证用户
      const { data: user, error } = await client.database
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !user) {
        return NextResponse.json(
          { error: '邮箱或密码错误' },
          { status: 401 }
        );
      }

      // 生成JWT令牌
      const token = generateJWT(user.id, user.email);

      return NextResponse.json({
        success: true,
        message: '登录成功',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    }

    return NextResponse.json(
      { error: '无效的操作' },
      { status: 400 }
    );
  } catch (error) {
    console.error('认证错误:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
}

// 简单的JWT生成函数（在生产环境中应该使用jsonwebtoken库）
function generateJWT(userId: string, email: string): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const payload = JSON.stringify({
    userId,
    email,
    iat: Math.floor(Date.now() / 1000), // JWT时间戳应该是秒级的
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天过期
  });
  
  const encodedHeader = btoa(header);
  const encodedPayload = btoa(payload);
  
  // 为演示目的，使用简单的签名方法（生产环境应使用加密算法）
  const toSign = `${encodedHeader}.${encodedPayload}`;
  const signature = btoa(toSign.split('').reverse().join('')); // 简单的反转作为签名
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}
