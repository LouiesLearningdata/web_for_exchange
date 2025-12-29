import { createClient } from '@insforge/sdk';

// 解析JWT令牌
export function parseJWT(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = JSON.parse(atob(parts[1]));
    
    // 检查令牌是否过期（JWT时间戳是秒级的，需要转换为毫秒）
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('解析JWT失败:', error);
    return null;
  }
}

// 验证令牌是否有效
export function validateToken(token: string): boolean {
  const payload = parseJWT(token);
  return payload !== null;
}

// 从请求中获取令牌
export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

// 获取认证头
export function getAuthHeaders(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
  };
}
